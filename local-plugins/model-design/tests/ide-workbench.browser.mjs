import assert from 'node:assert/strict';
import { createHash, randomUUID } from 'node:crypto';
import fs from 'node:fs/promises';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { launchChromium } from '../../../../scripts/browser-launch.mjs';

const workspace = fileURLToPath(new URL('../../../../', import.meta.url));
const sourceRoot = join(workspace, 'modelingweb/local-plugins/model-design/enhancements');
const appRequire = createRequire(join(workspace, 'modelingweb/app/package.json'));
const hubRequire = createRequire(join(workspace, 'ibiz-app-hub/package.json'));
const jsxRequire = createRequire(appRequire.resolve('@vitejs/plugin-vue-jsx'));
const esbuild = createRequire(appRequire.resolve('vite/package.json'))('esbuild');
const babel = jsxRequire('@babel/core');
const jsx = jsxRequire('@vue/babel-plugin-jsx');
const sass = hubRequire('sass');
const { chromium } = hubRequire('playwright');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const sourceNames = [
  'model-edit-view.tsx', 'model-edit-document.ts', 'model-edit-messages.ts', 'model-edit-view.scss',
];
const sourceSnapshot = async () => Promise.all(sourceNames.map(async name => {
  const path = join(sourceRoot, name);
  const bytes = await fs.readFile(path);
  return { path: relative(workspace, path), bytes: bytes.length, sha256: hash(bytes) };
}));

const fixture = `
import {createApp,defineComponent,h,reactive} from 'vue';
import ModelEditView from ${JSON.stringify(join(sourceRoot, 'model-edit-view.tsx'))};
const query=new URLSearchParams(location.search);
const language=query.get('language')||'en';
const readonly=query.get('readonly')==='true';
const baseline={name:'Original model',revision:1,nested:{description:'Baseline description'},flags:['a','b']};
const state=window.controlled={boundary:'controlled-test-adapter-not-native',ready:false,
 language,readonly,calls:[],messages:[],confirmations:[],answers:[],dismissals:[],cancelled:0,
 server:structuredClone(baseline),modalAttempts:0,editorUpdates:0,trustedClicks:[]};
document.addEventListener('click',event=>{
 const button=event.target.closest('button');
 if(button)state.trustedClicks.push({label:button.getAttribute('aria-label')||button.textContent.trim(),
 isTrusted:event.isTrusted,disabled:button.disabled});
},true);
const hooks=()=>({listeners:[],tapPromise(fn){this.listeners.push(fn)},removeTapPromise(fn){
 this.listeners=this.listeners.filter(item=>item!==fn)}});
const modal={hooks:{shouldDismiss:hooks(),beforeDismiss:hooks()},async dismiss(result){
 state.modalAttempts++;const context={allowClose:true};
 for(const fn of this.hooks.shouldDismiss.listeners)await fn(context);
 if(!context.allowClose){state.cancelled++;return}
 for(const fn of this.hooks.beforeDismiss.listeners)await fn(result);
 state.dismissals.push(structuredClone(result));
}};
window.ibiz={i18n:{getLang:()=>language},message:{error:message=>state.messages.push(message)},
 confirm:{warning:async question=>{state.confirmations.push(question);return state.answers.shift()??false}},
 hub:{getAppDataEntity:async()=>({id:'controlled.psdataentity',codeName:'PSDataEntity',
 keyAppDEFieldId:'psdataentityid'}),getApp:()=>({deService:{getService:async()=>({
 async exec(action,context,data,params){
 state.calls.push({action,context:structuredClone(context),data:structuredClone(data),params:structuredClone(params)});
 if(action==='ExportModelV2')return{status:200,data:{model:structuredClone(state.server)}};
 if(action==='ImportModelV2'){state.server=structuredClone(data.model);return{status:200,data:{}}}
 throw Error('Unexpected controlled action '+action);
 }})}})}};
const Editor=defineComponent({name:'ControlledTextEditorAdapter',
 props:{modelValue:String,readonly:Boolean},emits:['update:modelValue'],
 setup(props,{emit}){return()=>h('textarea',{'aria-label':'Controlled JSON text adapter',
 'data-controlled-editor':'textarea-not-monaco',spellcheck:false,readonly:props.readonly,
 value:props.modelValue,onInput:event=>{state.editorUpdates++;emit('update:modelValue',event.target.value)}})}});
const Button=defineComponent({name:'ControlledElButtonAdapter',props:{disabled:Boolean},
 setup(props,{slots}){return()=>h('button',{type:'button',disabled:props.disabled,class:'el-button'},slots.default?.())}});
const app=createApp({render:()=>h(ModelEditView,{caption:language==='en'?
 'Native model editing workbench':'\\u6a21\\u578b\\u7f16\\u8f91\\u5de5\\u4f5c\\u53f0',
 codeName:'PSDataEntity',readonly,modal,
 context:{srfappid:'controlled_modeldesign',psdataentity:'controlled-entity-a',srfmodelv2scope:'ALL'},
 params:{controlled:true}})});
app.component('iBizDesignCodeEditor',Editor);app.component('IBizDesignCodeEditor',Editor);
app.component('el-button',Button);
app.directive('loading',{mounted(element,binding){element.setAttribute('aria-busy',String(binding.value))},
 updated(element,binding){element.setAttribute('aria-busy',String(binding.value))}});
app.mount('#app');state.ready=true;
state.unmount=()=>app.unmount();
`;

async function compileFixture() {
  const output = await esbuild.build({
    stdin: { contents: fixture, resolveDir: sourceRoot, sourcefile: 'controlled-test-adapter.mjs' },
    bundle: true, write: false, format: 'iife', platform: 'browser',
    target: 'es2022', outdir: 'controlled-browser-output', logLevel: 'silent',
    alias: { vue: appRequire.resolve('vue/dist/vue.esm-browser.prod.js') },
    plugins: [{
      name: 'controlled-vue-tsx-and-host-adapter',
      setup(build) {
        build.onResolve({ filter: /^@ibiz-template\/vue3-util$/ }, () => ({
          path: 'controlled-use-namespace', namespace: 'controlled-adapter',
        }));
        build.onLoad({ filter: /.*/, namespace: 'controlled-adapter' }, () => ({
          contents: `export const useNamespace=name=>({b:(part)=>'ibiz-'+name+(part?'-'+part:'')});`,
          loader: 'js',
        }));
        build.onLoad({ filter: /model-edit-view\.tsx$/ }, async args => {
          const transformed = babel.transformSync(await fs.readFile(args.path, 'utf8'), {
            filename: args.path, babelrc: false, configFile: false,
            parserOpts: { plugins: ['typescript', 'jsx'] },
            plugins: [[jsx.default ?? jsx, { isCustomElement: tag => tag === 'ion-icon' }]],
          });
          return { contents: transformed.code, loader: 'ts', resolveDir: dirname(args.path) };
        });
        build.onLoad({ filter: /\.scss$/ }, async args => {
          const theme = join(workspace, 'ibiz-app-hub/packages/theme/style/global.scss');
          const result = sass.renderSync({
            data: `@import ${JSON.stringify(theme)};\n${await fs.readFile(args.path, 'utf8')}`,
            includePaths: [dirname(args.path)], outputStyle: 'expanded',
            logger: { warn() {} },
          });
          return { contents: result.css.toString(), loader: 'css', resolveDir: dirname(args.path) };
        });
      },
    }],
  });
  const js = output.outputFiles.find(file => file.path.endsWith('.js'));
  const css = output.outputFiles.find(file => file.path.endsWith('.css'));
  assert.ok(js && css, 'Real workbench JS and SCSS must both be compiled');
  return { js: js.contents, css: css.contents };
}

const html = `<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Controlled IDE browser fixture</title>
<link rel="icon" href="data:,"><link rel="stylesheet" href="/workbench.css">
<script src="/icons/ionicons.js"></script>
<style>
*{box-sizing:border-box}html,body,#app{margin:0;width:100%;height:100%;min-width:0}
body{font:14px Arial,sans-serif;color:#202428;background:#fff;
--ibiz-color-fill-1:#f2f4f5;--ibiz-color-fill-2:#e2eaee;--ibiz-color-primary:#167b70;
--ibiz-color-border:#cbd4d6;--ibiz-color-danger:#b52b30}
button,textarea{font:inherit}button{cursor:pointer}.el-button{padding:6px 9px;min-height:30px;
border:1px solid #cbd4d6;border-radius:4px;background:#fff;color:inherit;white-space:nowrap}
button:disabled{opacity:.45;cursor:default}button:focus-visible{outline:2px solid #167b70}
[data-controlled-editor]{display:block;width:100%;height:100%;min-height:90px;resize:none;
border:0;padding:12px;color:#21313d;background:#fbfcfd;font:13px/1.5 monospace}
</style></head><body><div id="app"></div><script src="/workbench.js"></script></body></html>`;

const labels = {
  en: { format: 'Format JSON', undo: 'Undo', redo: 'Redo', changes: 'Changes', save: 'Save',
    saveClose: 'Save and close', close: 'Close', download: 'Download JSON', reload: 'Reload',
    modified: 'Modified', saved: 'Saved and verified', clean: 'Unchanged', readonly: 'Read-only', valid: 'Valid JSON object',
    invalid: 'Invalid JSON object', conflict: 'The server model changed. Reload and compare before saving.' },
  'zh-CN': {
    format: '\u683c\u5f0f\u5316 JSON', undo: '\u64a4\u9500', redo: '\u91cd\u505a',
    changes: '\u4fee\u6539\u5bf9\u6bd4', save: '\u4fdd\u5b58', saveClose: '\u4fdd\u5b58\u5e76\u5173\u95ed',
    close: '\u5173\u95ed', download: '\u4e0b\u8f7d JSON', reload: '\u91cd\u65b0\u52a0\u8f7d',
    modified: '\u5df2\u4fee\u6539', saved: '\u5df2\u4fdd\u5b58\u5e76\u6821\u9a8c',
    clean: '\u672a\u4fee\u6539',
    readonly: '\u53ea\u8bfb', valid: 'JSON \u5bf9\u8c61\u6709\u6548', invalid: 'JSON \u5bf9\u8c61\u65e0\u6548',
    conflict: '\u670d\u52a1\u7aef\u6a21\u578b\u5df2\u53d8\u66f4\uff0c\u8bf7\u91cd\u65b0\u52a0\u8f7d\u5e76\u5bf9\u6bd4\u540e\u518d\u4fdd\u5b58\u3002',
  },
};

async function layoutEvidence(page) {
  const evidence = await page.evaluate(() => {
    const header = document.querySelector('.ibiz-model-edit-view-header');
    const rect = node => {
      const r = node.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height, right: r.right, bottom: r.bottom };
    };
    const nodes = [...header.querySelectorAll('button, .ibiz-model-edit-view-header-caption, .ibiz-model-edit-view-status')];
    const controls = nodes.map(node => ({
      label: node.getAttribute('aria-label') || node.textContent.trim(), ...rect(node),
      textFits: node.scrollWidth <= node.clientWidth + 1,
    })).filter(node => node.width > 0 && node.height > 0);
    const overlaps = [];
    for (let a = 0; a < controls.length; a++) for (let b = a + 1; b < controls.length; b++) {
      const left = controls[a], right = controls[b];
      if (Math.min(left.right, right.right) - Math.max(left.x, right.x) > 1 &&
          Math.min(left.bottom, right.bottom) - Math.max(left.y, right.y) > 1) {
        overlaps.push([left.label, right.label]);
      }
    }
    const panel = document.querySelector('.ibiz-model-edit-view-changes');
    const cells = panel ? [...panel.querySelectorAll('th,td')].map(node => ({
      text: node.textContent, ...rect(node), fontSize: Number.parseFloat(getComputedStyle(node).fontSize),
    })) : [];
    return { viewport: innerWidth, documentWidth: document.documentElement.scrollWidth,
      header: rect(header), controls, overlaps, panel: panel ? rect(panel) : null, cells,
      loadedIcons: [...header.querySelectorAll('ion-icon')].filter(node => node.shadowRoot?.querySelector('svg')).length };
  });
  assert.ok(evidence.documentWidth <= evidence.viewport + 1, 'Workbench must not overflow the viewport horizontally');
  assert.deepEqual(evidence.overlaps, [], 'Header controls must not overlap');
  for (const control of evidence.controls) {
    assert.ok(control.x >= -1 && control.right <= evidence.viewport + 1, `Offscreen header control: ${control.label}`);
    assert.ok(control.textFits, `Clipped header label: ${control.label}`);
  }
  if (evidence.panel) {
    assert.ok(evidence.panel.width >= 200 && evidence.panel.height >= 80, 'Changes panel must remain readable');
    assert.ok(evidence.cells.every(cell => cell.fontSize >= 12), 'Change diagnostics must retain readable type');
  }
  assert.ok(evidence.loadedIcons >= 7, 'Real local Ionicons must render rather than blank icon buttons');
  return evidence;
}

test('actual IDE Vue workbench DOM in controlled adapters, not Monaco or native business acceptance',
  { timeout: 120_000 }, async t => {
    const parent = join(workspace, '.artifacts/model-design-ide-workbench-browser');
    await fs.mkdir(parent, { recursive: true });
    const output = join(parent, `run-${new Date().toISOString().replaceAll(':', '-')}-${randomUUID()}`);
    await fs.mkdir(output);
    const report = {
      contract: 'model-design-ide-workbench-controlled-browser-v1', status: 'FAILED',
      nativeAcceptance: false, monacoAcceptance: false, schemaValidationAcceptance: false,
      acceptedForProduction: false, realBackendAcceptance: false,
      boundary: 'Actual enhancement Vue render, document logic and Sass; controlled textarea, modal, Element button and Export/Import adapters only',
      sourceBefore: await sourceSnapshot(), scenarios: {}, requests: [], startedAt: new Date().toISOString(),
      test: {
        path: relative(workspace, fileURLToPath(import.meta.url)),
        sha256: hash(await fs.readFile(fileURLToPath(import.meta.url))),
      },
    };
    let server;
    let browser;
    t.after(async () => {
      await browser?.close();
      if (server) await new Promise(done => { server.close(done); server.closeAllConnections(); });
      report.sourceAfter = await sourceSnapshot();
      report.sourceStable = JSON.stringify(report.sourceBefore) === JSON.stringify(report.sourceAfter);
      report.finishedAt = new Date().toISOString();
      report.status = report.sourceStable && Object.keys(report.scenarios).length === 4 &&
        Object.values(report.scenarios).every(row => row.status === 'PASS') ? 'PASSED-CONTROLLED-UI-NOT-NATIVE' : 'FAILED';
      await fs.writeFile(join(output, 'report.json'), `${JSON.stringify(report, null, 2)}\n`, { flag: 'wx' });
      console.log(`Controlled IDE browser report: ${output}/report.json`);
      assert.equal(report.sourceStable, true, 'Enhancement source changed during the browser test');
    });
    const bundle = await compileFixture();
    await fs.writeFile(join(output, 'controlled-test-adapter.js'), bundle.js, { flag: 'wx' });
    await fs.writeFile(join(output, 'actual-workbench.css'), bundle.css, { flag: 'wx' });
    report.generated = {
      js: { bytes: bundle.js.length, sha256: hash(bundle.js) },
      css: { bytes: bundle.css.length, sha256: hash(bundle.css) },
    };
    const iconRoot = join(workspace, 'modelingweb/app/dist/assets/ionicons/7.1.2');
    server = createServer(async (request, response) => {
      const path = new URL(request.url, 'http://127.0.0.1').pathname;
      let bytes, type;
      if (path === '/') { bytes = html; type = 'text/html'; }
      else if (path === '/workbench.js') { bytes = bundle.js; type = 'text/javascript'; }
      else if (path === '/workbench.css') { bytes = bundle.css; type = 'text/css'; }
      else if (path.startsWith('/icons/')) {
        const file = resolve(iconRoot, path.slice('/icons/'.length));
        const child = relative(iconRoot, file);
        if (child && child !== '..' && !child.startsWith(`..${sep}`) && !child.startsWith(sep)) {
          try { bytes = await fs.readFile(file); type = path.endsWith('.svg') ? 'image/svg+xml' : 'text/javascript'; }
          catch {}
        }
      }
      const status = bytes === undefined ? 404 : 200;
      report.requests.push({ path, status });
      response.writeHead(status, { 'Content-Type': type ?? 'text/plain', 'Cache-Control': 'no-store' });
      response.end(bytes ?? 'Controlled fixture resource is absent');
    });
    await new Promise(done => server.listen(0, '127.0.0.1', done));
    const origin = `http://127.0.0.1:${server.address().port}`;
    browser = await launchChromium(chromium, { args: ['--no-sandbox'] });
    for (const language of ['en', 'zh-CN']) for (const [size, viewport] of [
      ['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }],
    ]) {
      const name = `${language}-${size}`;
      await t.test(name, { timeout: 25_000 }, async () => {
        const result = { status: 'FAIL', language, viewport, errors: [], nonlocalRequests: [], screenshots: [] };
        report.scenarios[name] = result;
        const context = await browser.newContext({ locale: language, viewport, acceptDownloads: true, serviceWorkers: 'block' });
        const page = await context.newPage();
        page.setDefaultTimeout(5_000);
        page.on('pageerror', error => result.errors.push({ kind: 'pageerror', message: error.message }));
        page.on('console', message => {
          if (message.type() === 'error') result.errors.push({ kind: 'console', message: message.text() });
        });
        await context.route('**/*', route => {
          if (new URL(route.request().url()).origin === origin) return route.continue();
          result.nonlocalRequests.push(route.request().url());
          return route.abort();
        });
        const label = labels[language];
        const button = key => page.getByRole('button', { name: label[key], exact: true });
        const textarea = page.getByRole('textbox', { name: 'Controlled JSON text adapter' });
        const snapshot = async suffix => {
          const path = join(output, `${name}-${suffix}.png`);
          await page.screenshot({ path, fullPage: true });
          result.screenshots.push(relative(output, path));
        };
        const open = async (readonly = false) => {
          await page.goto(`${origin}/?language=${encodeURIComponent(language)}&readonly=${readonly}`);
          await page.waitForFunction(() => window.controlled?.ready &&
            document.querySelector('textarea')?.value.includes('Original model'));
          await page.waitForFunction(() => [...document.querySelectorAll('ion-icon')].filter(
            node => node.shadowRoot?.querySelector('svg')).length >= 7);
        };
        const actions = () => page.evaluate(() => window.controlled.calls.map(row => row.action));
        try {
          await open();
          assert.deepEqual(await actions(), ['ExportModelV2']);
          const compact = JSON.stringify({ name: 'Edited model', revision: 1,
            nested: { description: 'Changed description with a long but fully inspectable value' }, flags: ['a', 'b'] });
          await textarea.fill(compact);
          assert.equal(await page.locator('.ibiz-model-edit-view-status').textContent(), label.modified);
          await button('format').click();
          const pretty = await textarea.inputValue();
          assert.ok(pretty.includes('\n    "name"'));
          await button('undo').click();
          assert.equal(await textarea.inputValue(), compact);
          await button('redo').click();
          assert.equal(await textarea.inputValue(), pretty);
          await button('changes').click();
          await page.getByRole('table').waitFor();
          assert.match(await page.getByRole('table').textContent(), /\/name/);
          result.layout = await layoutEvidence(page);
          await snapshot('changes');
          await textarea.fill('{"name":');
          assert.equal(await button('save').isDisabled(), true);
          assert.equal(await button('format').isDisabled(), true);
          assert.equal(await button('download').isDisabled(), true);
          assert.equal(await page.locator('.ibiz-model-edit-view-validation').textContent(), label.invalid);
          await assert.rejects(button('save').click({ timeout: 150 }), /Timeout/);
          assert.deepEqual(await actions(), ['ExportModelV2']);
          result.invalidJsonPreventedImport = true;
          await snapshot('invalid-json');
          await textarea.fill(compact);
          await button('close').click();
          await page.waitForFunction(() => window.controlled.cancelled === 1);
          assert.equal(await page.evaluate(() => window.controlled.dismissals.length), 0);
          assert.equal(await page.evaluate(() => window.controlled.confirmations.length), 1);
          result.dirtyCloseRejected = true;
          await page.evaluate(() => { window.controlled.server = { ...window.controlled.server, revision: 2 }; });
          await button('save').click();
          await page.getByRole('alert').filter({ hasText: label.conflict }).waitFor();
          assert.deepEqual(await actions(), ['ExportModelV2', 'ExportModelV2']);
          assert.equal(await page.locator('.ibiz-model-edit-view-status').textContent(), label.modified);
          result.conflictPreventedImport = true;
          await snapshot('conflict');
          await page.evaluate(() => window.controlled.answers.push(true));
          await button('reload').click();
          await page.waitForFunction(() => JSON.parse(document.querySelector('textarea').value).revision === 2 &&
            !document.querySelector('textarea').readOnly);
          const persisted = { name: 'Saved model', revision: 2, nested: { description: 'Verified readback' }, flags: ['a', 'b'] };
          await textarea.fill(JSON.stringify(persisted));
          const beforeSave = (await actions()).length;
          await button('save').click();
          await page.waitForFunction(expected => document.querySelector('.ibiz-model-edit-view-status')?.textContent === expected,
            label.saved);
          assert.deepEqual((await actions()).slice(beforeSave), ['ExportModelV2', 'ImportModelV2', 'ExportModelV2']);
          assert.deepEqual(JSON.parse(await textarea.inputValue()), persisted);
          const imported = await page.evaluate(() => window.controlled.calls.find(row => row.action === 'ImportModelV2'));
          assert.deepEqual(imported.data, { psdataentityid: 'controlled-entity-a', srfmodelv2scope: 'ALL', model: persisted });
          result.readbackVerified = true;
          const downloading = page.waitForEvent('download');
          await button('download').click();
          const download = await downloading;
          assert.equal(download.suggestedFilename(), 'model.json');
          const downloadPath = join(output, `${name}-model.json`);
          await download.saveAs(downloadPath);
          assert.deepEqual(JSON.parse(await fs.readFile(downloadPath, 'utf8')), persisted);
          await snapshot('saved');
          const external = { ...persisted, name: 'Externally changed after save', revision: 3 };
          await page.evaluate(model => { window.controlled.server = model; }, external);
          await button('reload').click();
          await page.waitForFunction(expected => {
            const editor = document.querySelector('textarea');
            return !editor.readOnly && JSON.parse(editor.value).name === expected;
          }, external.name);
          assert.deepEqual(JSON.parse(await textarea.inputValue()), external);
          assert.equal(await page.locator('.ibiz-model-edit-view-status').textContent(), label.clean,
            'A new server export must not retain a previous saved-and-verified status');
          assert.equal((await actions()).filter(action => action === 'ImportModelV2').length, 1);
          result.reloadClearedVerifiedSave = true;
          await snapshot('external-reload');
          await button('close').click();
          await page.waitForFunction(() => window.controlled.dismissals.length === 1);
          const dismiss = await page.evaluate(() => window.controlled.dismissals[0]);
          assert.deepEqual(dismiss, { ok: true, params: { isSave: true } });
          result.editable = await page.evaluate(() => ({
            calls: window.controlled.calls, confirmations: window.controlled.confirmations,
            dismissals: window.controlled.dismissals, editorUpdates: window.controlled.editorUpdates,
            trustedClicks: window.controlled.trustedClicks,
          }));
          assert.ok(result.editable.trustedClicks.length >= 11 &&
            result.editable.trustedClicks.every(click => click.isTrusted && !click.disabled),
          'Workbench commands must receive actual trusted browser clicks');
          await open(true);
          assert.equal(await textarea.getAttribute('readonly'), '');
          assert.equal(await button('save').count(), 0);
          assert.equal(await button('saveClose').count(), 0);
          for (const key of ['undo', 'redo', 'format']) assert.equal(await button(key).isDisabled(), true);
          await button('changes').click();
          await button('download').click();
          result.readonlyLayout = await layoutEvidence(page);
          await snapshot('readonly');
          await button('close').click();
          await page.waitForFunction(() => window.controlled.dismissals.length === 1);
          assert.deepEqual(await actions(), ['ExportModelV2']);
          result.readonlyPreventedImport = true;
          await open();
          await textarea.fill('{"name":"Save and close","revision":3}');
          await button('saveClose').click();
          await page.waitForFunction(() => window.controlled.dismissals.length === 1);
          assert.deepEqual(await actions(), ['ExportModelV2', 'ExportModelV2', 'ImportModelV2', 'ExportModelV2']);
          result.saveCloseReadbackVerified = true;
          assert.deepEqual(result.errors, []);
          assert.deepEqual(result.nonlocalRequests, []);
          result.status = 'PASS';
        } catch (error) {
          result.error = { message: error.message, stack: error.stack };
          await snapshot('failure').catch(() => {});
          throw error;
        } finally { await context.close(); }
      });
    }
    assert.ok(report.requests.every(row => row.status === 200), 'All requested fixture assets must load locally');
  });
