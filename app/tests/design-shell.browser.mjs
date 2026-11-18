import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import test from 'node:test';
import { launchChromium } from '../../../scripts/browser-launch.mjs';

const workspace = new URL('../../../', import.meta.url).pathname;
const appRequire = createRequire(join(workspace, 'modelingweb/app/package.json'));
const hubRequire = createRequire(join(workspace, 'ibiz-app-hub/package.json'));
const jsxRequire = createRequire(appRequire.resolve('@vitejs/plugin-vue-jsx'));
const babel = jsxRequire('@babel/core');
const jsx = jsxRequire('@vue/babel-plugin-jsx');
const esbuild = createRequire(appRequire.resolve('vite/package.json'))('esbuild');
const host = join(workspace, 'ibiz-app-hub');
const util = join(host, 'packages/vue3-util/src');
const components = join(host, 'components/ibiz-next-vue3/src');
const globalTheme = join(host, 'packages/theme/style/global.scss');
const output = join(workspace, '.artifacts/design-shell-browser', `probe-${Date.now()}`);
const style = await readFile(join(workspace, 'modelingweb/local-plugins/design-index/src/style.css'), 'utf8');
const baselineStyle = appRequire('postcss').parse(style);
baselineStyle.walkRules(rule => {
  if (rule.selectors.some(selector => selector.includes('.aibiz-design-shell'))) rule.remove();
});
const marker = join(workspace, 'modelingweb/local-plugins/design-index/src/model.ts');
const { DSLHelper } = await import(appRequire.resolve('@ibiz/rt-model-api'));
const nativeModel = new DSLHelper().appView(JSON.parse(await readFile(join(workspace,
  'vendor-upstream/ibizmodeling-standard/modelapi-core/src/main/resources/model/net/ibizsys/modeling/PSSYSAPPS/ModelDesign/PSAPPINDEXVIEWS/ModelingIndex.json'), 'utf8')));

const fixture = `
import {createApp,h,reactive} from 'vue';
import {ScrollContainer} from ${JSON.stringify(join(util, 'panel-component/scroll-container/scroll-container/scroll-container.tsx'))};
import {ScrollContainerItem} from ${JSON.stringify(join(util, 'panel-component/scroll-container/scroll-container-item/scroll-container-item.tsx'))};
import {PanelContainer} from ${JSON.stringify(join(util, 'panel-component/panel-container/panel-container.tsx'))};
import {PanelAppHeader} from ${JSON.stringify(join(components, 'panel-component/panel-app-header/panel-app-header.tsx'))};
import {IBizRow} from ${JSON.stringify(join(components, 'common/row/row.tsx'))};
import {IBizCol} from ${JSON.stringify(join(components, 'common/col/col.tsx'))};
import {prepareIndexModel} from ${JSON.stringify(marker)};
const english=new URL(location.href).searchParams.get('language')==='en-US';
const labels=english?['System','Entities','User Interface','Workflow','Favorites','Settings']:
 ['系统','实体','界面','流程','收藏','设置'];
const model=${JSON.stringify(nativeModel).replaceAll('<', '\\u003c')};
const shell=prepareIndexModel(model).viewLayoutPanel.rootPanelItems.find(item=>item.id==='container_scroll1');
const state=item=>({model:item,containerClass:item.sysCss?[item.sysCss.cssName]:[],
 panel:{view:{model:{mainMenuAlign:'LEFT'}}},
 state:reactive({visible:true,loading:false,layout:{width:item.width?item.width+'px':'',
 height:item.height?item.height+'px':'',extraStyle:{},extraClass:[]}}),onClick(){}});
const controls=new Map();
const controller=item=>{if(!controls.has(item.id))controls.set(item.id,state(item));return controls.get(item.id)};
let actions=0;
function menu(labels,side) {
 const items=labels.map((label,index)=>h('div',{
  class:'ibiz-extend-menu-button__content--item ibiz-extend-menu-button__content--menuitem'
 },[h('div',{class:'ibiz-extend-menu-button__content--item-container'},[
  h('button',{class:'el-button ibiz-extend-menu-button__menuitem',
   'data-nav':side+'-'+index,onClick:()=>{actions++}},[h('span',label)])
 ])]));
 if(side==='left')items.splice(5,0,h('div',{
  class:'ibiz-extend-menu-button__content--item ibiz-extend-menu-button__content--seperator'
 },[h('hr')]));
 return h('div',{class:'ibiz-'+side+'-side-menu'},[
  h('div',{class:'ibiz-extend-menu-button is-vertical'},[
   h('div',{class:'ibiz-extend-menu-button__content is-vertical'},items)
  ])
 ]);
}
const header=shell.panelItems.find(item=>item.id==='container_scroll_header').panelItems[0];
function renderHeaderSide(side) {
 const child=header.panelItems.find(item=>item.id==='app_header_'+side);
 return h(PanelContainer,{modelData:child,controller:controller(child)},{
  default:()=>side==='left'
   ?[h('span',{'data-logo':true,style:'display:inline-block;height:40px;line-height:40px;white-space:nowrap'},
    english?'Modeling Studio - long system name':'模型设计 - 很长的系统名称')]
   :[h('div',{style:'display:flex;flex:none;width:740px;gap:16px'},[
    h('input',{'aria-label':english?'Model Retrieval':'模型检索',style:'width:240px'}),
    h('button',{'data-header':'overview'},english?'System Overview':'系统总览'),
    h('button',{'data-header':'account'},english?'Current Account':'当前账号')
   ])]
 });
}
function regionContent(item) {
 if(item.id==='container_scroll_header')return[
  h(PanelAppHeader,{modelData:header,controller:controller(header)},{
   default:()=>['left','right'].map(renderHeaderSide)
  })
 ];
 if(item.id==='container_scroll_left')return[menu(labels,'left')];
 if(item.id==='container_scroll_right')return[menu([english?'Plugin Applications':'插件应用管理'],'right')];
 if(item.id==='container_scroll_main')return[
  h('main',{'data-editor':'true',style:'width:100%;height:100%;min-width:0;overflow:auto'},[
   h('h2',english?'Entity Navigation':'实体导航'),
   h('input',{'data-search':'true',style:'box-sizing:border-box;width:100%'}),
   h('div',{style:'min-height:1200px'},english?'Actual host container geometry':'真实宿主容器布局')
  ])
 ];
 return[h('div',{style:'height:50px'},english?'Console':'控制台')];
}
const renderRegion=item=>h(ScrollContainerItem,{modelData:item,controller:controller(item)},{
 default:()=>regionContent(item)
});
const app=createApp({render:()=>h('div',{class:'aibiz-design-index'},[
 h(ScrollContainer,{modelData:shell,controller:controller(shell)},{
 default:()=>shell.panelItems.map(renderRegion)})])});
app.component('iBizRow',IBizRow);app.component('iBizCol',IBizCol);
app.directive('loading',{mounted(){},updated(){}});
window.ibiz={log:{debug(){throw Error('Unexpected layout position')}},i18n:{t:value=>value}};
app.mount('#app');window.fixture={ready:true,actions:()=>actions};
`;

async function compile() {
  const result = await esbuild.build({
    stdin: { contents: fixture, resolveDir: workspace, sourcefile: 'real-host-shell-fixture.mjs' },
    bundle: true, write: false, format: 'iife', platform: 'browser', target: 'es2022',
    outdir: 'controlled-browser-output', logLevel: 'silent',
    alias: { vue: appRequire.resolve('vue/dist/vue.esm-browser.prod.js') },
    plugins: [{
      name: 'real-host-layout-with-controlled-controllers',
      setup(build) {
        build.onResolve({ filter: /^@ibiz-template\/(?:runtime|vue3-util)$/ }, args =>
          ({ path: args.path, namespace: 'controlled-boundary' }));
        build.onResolve({ filter: /^(\.\.\/)+use$/ }, () =>
          ({ path: 'namespace', namespace: 'controlled-boundary' }));
        build.onLoad({ filter: /.*/, namespace: 'controlled-boundary' }, () => ({
          contents: `export class PanelContainerController{};export class ViewLayoutPanelController{};
          export class PanelItemController{};
          export const useSemanticNode=()=>({semanticClass:()=>'',semanticStyle:()=>undefined});
          export const calcContentAlignStyle=()=>undefined;export const useNamespace=name=>({
          b:part=>'ibiz-'+name+(part?'-'+part:''),m:modifier=>'ibiz-'+name+'--'+modifier,
          e:element=>'ibiz-'+name+'__'+element,be:(block,element)=>'ibiz-'+name+'-'+block+'__'+element,
          is:(name,value=true)=>value?'is-'+name:''});`,
          loader: 'js',
        }));
        build.onLoad({ filter: /\.tsx$/ }, async args => {
          const transformed = babel.transformSync(await readFile(args.path, 'utf8'), {
            filename: args.path, babelrc: false, configFile: false,
            parserOpts: { plugins: ['typescript', 'jsx'] }, plugins: [[jsx.default ?? jsx, {}]],
          });
          return { contents: transformed.code, loader: 'ts', resolveDir: dirname(args.path) };
        });
        build.onLoad({ filter: /\.scss$/ }, async args => ({
          contents: appRequire('sass').compileString(
            `@import "${globalTheme}";\n${await readFile(args.path, 'utf8')}`,
            { loadPaths: [dirname(args.path), dirname(globalTheme)], logger: { warn() {}, debug() {} } },
          ).css, loader: 'css', resolveDir: dirname(args.path),
        }));
      },
    }],
  });
  const css = result.outputFiles.find(file => file.path.endsWith('.css')).text;
  const menuScss = await readFile(join(components,
    'panel-component/app-extend-menu/extend-menu-base/extend-button-menu/extend-button-menu.scss'), 'utf8');
  const menuCss = appRequire('sass').compileString(`@import "${globalTheme}";\n${menuScss}`,
    { loadPaths: [dirname(globalTheme)], logger: { warn() {}, debug() {} } }).css;
  return {
    js: result.outputFiles.find(file => file.path.endsWith('.js')).text,
    css: `${await readFile(appRequire.resolve('element-plus/dist/index.css'), 'utf8')}\n${css}\n${menuCss}`,
  };
}

test('recognized native shell retains navigation, header tools and a usable mobile editor', async t => {
  const compiled = await compile();
  await mkdir(output, { recursive: true });
  const server = createServer((request, response) => {
    const url = new URL(request.url, 'http://127.0.0.1');
    if (url.pathname !== '/') { response.writeHead(404); response.end(); return; }
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1">
      <link rel="icon" href="data:,"><style>*{box-sizing:border-box}html,body,#app{margin:0;height:100%;width:100%}
      body{font:14px Arial;color:#202428;background:white}button,input{font:inherit}
      ${compiled.css}\n${baselineStyle.toString()}</style></head><body><div id="app"></div><script>${compiled.js}</script></body></html>`);
  });
  await new Promise(done => server.listen(0, '127.0.0.1', done));
  t.after(() => new Promise(done => { server.close(done); server.closeAllConnections(); }));
  const browser = await launchChromium(hubRequire('playwright').chromium, { args: ['--no-sandbox'] });
  t.after(() => browser.close());
  for (const language of ['zh-CN', 'en-US']) for (const width of [360, 390, 767, 1440]) {
    await t.test(`${language}/${width}`, async () => {
      const context = await browser.newContext({ viewport: { width, height: 844 }, locale: language });
      try {
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(`http://127.0.0.1:${server.address().port}/?language=${language}`);
        await page.waitForFunction(() => window.fixture?.ready);
        const measure = () => page.locator('[data-editor]').evaluate(element => {
          const r = element.getBoundingClientRect();
          return { x: r.x, right: r.right, width: r.width, height: r.height, y: r.y, bottom: r.bottom };
        });
        const original = await measure();
        if (width < 768) assert.ok(original.width < width / 2 || original.x >= width,
          'The real host fixed sidebars must reproduce the cropped editor');
        await page.addStyleTag({ content: style });
        await page.evaluate(async () => {
          document.body.getBoundingClientRect();
          await Promise.all(document.getAnimations().map(animation => animation.finished));
        });
        const current = await measure();
        assert.ok(current.width >= (width < 768 ? width - 1 : 200), JSON.stringify(current));
        assert.ok(current.height >= 200 && current.x >= 0 && current.right <= width, JSON.stringify(current));
        if (width >= 768) assert.deepEqual(current, original, 'Desktop shell geometry must remain unchanged');
        for (let index = 0; index < 6; index++) {
          const nav = page.locator(`[data-nav=left-${index}]`);
          if (width < 768) {
            const r = await nav.boundingBox();
            assert.ok(r && r.x >= 0 && r.x + r.width <= width && r.y >= 0 && r.y + r.height <= 844);
          }
          await nav.click();
        }
        await page.locator('[data-header=overview]').click();
        await page.locator('[data-header=account]').click();
        await page.locator('[data-nav=right-0]').click();
        await page.locator('[data-search]').fill('entity');
        assert.equal(await page.evaluate(() => window.fixture.actions()), 7);
        assert.deepEqual(errors, []);
        await page.screenshot({ path: join(output, `${language}-${width}.png`) });
        await writeFile(join(output, `${language}-${width}.json`),
          `${JSON.stringify({ language, width, original, current, errors, nativeAcceptance: false }, null, 2)}\n`);
      } finally { await context.close(); }
    });
  }
});
