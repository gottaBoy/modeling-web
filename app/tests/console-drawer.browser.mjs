import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { buildLocalDesignIndex } from '../../local-plugins/design-index/build.mjs';
import { buildLocalConsoleLayout } from '../../local-plugins/console-layout/build.mjs';
import { launchChromium } from '../../../scripts/browser-launch.mjs';

const workspace = fileURLToPath(new URL('../../../', import.meta.url));
const appRequire = createRequire(resolve(workspace, 'modelingweb/app/package.json'));
const browserRequire = createRequire(resolve(workspace, 'ibiz-app-hub/package.json'));
const ts = appRequire('typescript');
const { chromium } = browserRequire('playwright');
const output = resolve(workspace, `.artifacts/console-drawer-browser/probe-${randomUUID()}`);

async function hostModule(path, dependencies) {
  const source = await readFile(resolve(workspace, path), 'utf8');
  const compiled = ts.transpileModule(source, {
    fileName: path, reportDiagnostics: true,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  assert.equal(compiled.diagnostics.length, 0);
  return `(function(){const exports={};const boundaries=${dependencies};
const require=id=>{if(!(id in boundaries))throw Error('Unspecified fixture dependency '+id);return boundaries[id]};
(function(exports,require){${compiled.outputText}\n})(exports,require);return exports})()`;
}

async function fixtureResources() {
  const [design, consoleBuild] = await Promise.all([
    buildLocalDesignIndex({ writeOutputs: false }),
    buildLocalConsoleLayout({ writeOutputs: false }),
  ]);
  const openCommand = await hostModule(
    'ibiz-app-hub/packages/runtime/src/command/app/open-app-view/open-app-view.ts',
    `{ '@ibiz-template/core':{ModelError:Error,RuntimeError:Error},
       ramda:{clone:value=>value.clone()},
       '../../../model':{}, '../../../utils':{stringifyObj:JSON.stringify},
       '../../../service':{Srfuf:{CREATE:0}} }`);
  const funcCommand = await hostModule(
    'ibiz-app-hub/packages/runtime/src/command/app/app-func/app-func.ts',
    `{ '@ibiz-template/core':{ModelError:Error,RuntimeError:Error},
       '../../../utils':{convertNavData:()=>({})},
       '../open-app-view/open-app-view':openCommand,
       '../../../ui-action':{} }`);
  const drawer = await hostModule(
    'ibiz-app-hub/components/ibiz-next-vue3/src/util/app-drawer/app-drawer-component.tsx',
    `{ vue:Vue, '@ibiz-template/vue3-util':{OverlayContainer:class{},
       useNamespace:name=>({b:()=> 'ibiz-'+name}),useUIStore:()=>({zIndex})},
       '@ibiz-template/runtime':{Modal,ViewMode:{DRAWER:'DRAWER'}},
       'lodash-es':{isNumber:value=>typeof value==='number'},
       '@ibiz-template/core':{calcOpenModeStyle:value=>value<=100?value+'%':value},
       './app-drawer-component.scss':{} }`);
  const runtime = `
import * as Vue from 'vue';
const {reactive}=Vue;
export function eventBus(){const map=new Map();return {
 on:(key,fn)=>{if(!map.has(key))map.set(key,new Set());map.get(key).add(fn)},
 off:(key,fn)=>map.get(key)?.delete(fn),emit:(key,...args)=>[...map.get(key)||[]].forEach(fn=>fn(...args))
}}
export class ViewController{
 constructor(model,context,params,ctx){Object.assign(this,{model,context,params,ctx,engines:[{}],
 state:reactive({presetClassList:[]}),modal:{mode:'EMBED'}})}
 async onCreated(){} async onMounted(){} async onDestroyed(){}
 setLayoutPanel(panel){this.layoutPanel=panel}
}
export class Modal{
 constructor(options){this.options=options;this.mode=options.mode}
 async dismiss(data={ok:false,data:[]}){this.options.dismiss(data);return true}
}
const zIndex={value:500,increment(){return ++this.value},decrement(){return --this.value}};
const providers=new Map();
export const registerViewProvider=(id,provider)=>providers.set(id,provider);
export const provider=id=>providers.get(id)();
const openCommand=${openCommand};
const funcCommand=${funcCommand};
export const AppFuncCommand=funcCommand.AppFuncCommand;
export const AppDrawerComponent=${drawer}.AppDrawerComponent;
const commands=new Map();
export const records={commands:[],drawerOptions:[],errors:[]};
window.ibiz={
 env:{appId:'ibizmodeling__modeldesign',enableMqtt:false},
 appData:{},i18n:{getLang:()=>window.fixtureLanguage},
 log:{error:error=>records.errors.push(String(error)),warn:()=>{}},
 net:{post:async()=>({status:200,data:{my_todo_count:0}})},
 hub:{getApp:()=>window.fixtureApp,getAppAsync:async()=>window.fixtureApp,
      config:{view:{get:async()=>window.fixtureView}}},
 commands:{
  register:(key,handler)=>commands.set(key,handler),
  execute:(...args)=>{records.commands.push(args);return commands.get(args[0])(...args.slice(1))}
 },
 openView:{drawer:(id,context,params,options)=>{
  records.drawerOptions.push(options);return window.openFixtureDrawer(id,context,params,options)
 }}
};
new openCommand.OpenAppViewCommand();new AppFuncCommand();
`;
  const hostView = `
import {defineComponent,h,provide,ref,onMounted,onBeforeUnmount} from 'vue';
export const IBizView=defineComponent({
 props:{modelData:Object,context:Object,params:Object,provider:Object,modal:Object,state:Object},
 setup(props,{slots}){
  const ctx={};const c=props.provider.createController(props.modelData,props.context,props.params,ctx);
  ctx.view=c;provide('ctx',ctx);const ready=ref(false);
  const creating=c.onCreated().then(()=>{ready.value=true});
  onMounted(async()=>{await creating;await c.onMounted()});
  onBeforeUnmount(()=>c.onDestroyed());
  return()=>h('div',{'data-fixture-host-view':'console'},ready.value?slots.default?.():null)
 }
});
`;
  const themeGlobal = appRequire.resolve('@ibiz-template/theme/style/global.scss');
  const drawerScss = await readFile(resolve(workspace,
    'ibiz-app-hub/components/ibiz-next-vue3/src/util/app-drawer/app-drawer-component.scss'), 'utf8');
  const drawerCss = appRequire('sass').compileString(
    `@import "${themeGlobal}";\n${drawerScss}`,
    { loadPaths: [dirname(themeGlobal)], logger: { warn() {}, debug() {} } }).css;
  const resources = new Map([
    ['/design-index.mjs', { bytes: design.artifacts.get('index.mjs'), type: 'text/javascript' }],
    ['/design-index.css', { bytes: design.artifacts.get('style.css'), type: 'text/css' }],
    ['/console.mjs', { bytes: consoleBuild.artifacts.get('console/index.mjs'), type: 'text/javascript' }],
    ['/console.css', { bytes: consoleBuild.artifacts.get('console/style.css'), type: 'text/css' }],
    ['/drawer.css', { bytes: drawerCss, type: 'text/css' }],
    ['/runtime.mjs', { bytes: runtime, type: 'text/javascript' }],
    ['/host-view.mjs', { bytes: hostView, type: 'text/javascript' }],
  ]);
  for (const [url, path, type] of [
    ['/vue.mjs', appRequire.resolve('vue/dist/vue.runtime.esm-browser.js'), 'text/javascript'],
    ['/element.mjs', appRequire.resolve('element-plus/dist/index.full.mjs'), 'text/javascript'],
    ['/element.css', appRequire.resolve('element-plus/dist/index.css'), 'text/css'],
    ['/en.mjs', appRequire.resolve('element-plus/dist/locale/en.mjs'), 'text/javascript'],
    ['/zh.mjs', appRequire.resolve('element-plus/dist/locale/zh-cn.mjs'), 'text/javascript'],
    ['/font-awesome/css/font-awesome.min.css', resolve(workspace,
      'modelingweb/app/dist/assets/font-awesome-4.7.0/css/font-awesome.min.css'), 'text/css'],
    ['/font-awesome/fonts/fontawesome-webfont.woff2', resolve(workspace,
      'modelingweb/app/dist/assets/font-awesome-4.7.0/fonts/fontawesome-webfont.woff2'), 'font/woff2'],
  ]) resources.set(url, { bytes: await readFile(path), type });
  return { resources, receipts: { design: design.receipt, console: consoleBuild.receipt } };
}

const frameHtml = `<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="data:,">
<link rel="stylesheet" href="/element.css"><link rel="stylesheet" href="/drawer.css">
<link rel="stylesheet" href="/console.css"><link rel="stylesheet" href="/design-index.css">
<link rel="stylesheet" href="/font-awesome/css/font-awesome.min.css">
<style>
body{margin:0;font:14px sans-serif}#app{min-height:100vh}
main{padding:16px}nav{position:fixed;bottom:0;left:0;right:0;padding:8px;border-top:1px solid #ccc;background:#fff}
button,input{font:inherit}.fixture-console-slot,[data-fixture-host-view="console"]{height:100%;min-height:0}
</style>
<script type="importmap">{"imports":{"vue":"/vue.mjs","@ibiz-template/runtime":"/runtime.mjs","@ibiz-template/vue3-util":"/host-view.mjs"}}</script>
</head><body><div id="app"></div><script type="module">
import * as Vue from 'vue';import ElementPlus from '/element.mjs';
import en from '/en.mjs';import zh from '/zh.mjs';
import {DesignIndexController} from '/design-index.mjs';import consolePlugin from '/console.mjs';
import {AppDrawerComponent,eventBus,provider,records} from '/runtime.mjs';
const {createApp,defineComponent,h,reactive,ref,onMounted,resolveComponent}=Vue;
window.fixtureLanguage=new URL(location.href).searchParams.get('locale');
const english=window.fixtureLanguage==='en-US';const caption=english?'Console':'控制台';
window.fixtureView={id:'modeldesign.pssysdevbktasktabexpview',openMode:'DRAWER_BOTTOM'};
window.fixtureApp={getAppFunc:()=>({appFuncType:'APPVIEW',appViewId:window.fixtureView.id})};
const menuItem={id:'terminal',name:'terminal',appFuncId:'console-function',caption,openDefault:true};
const controls=['appmenu','leftsidemenu','rightsidemenu','topsidemenu','bottomsidemenu','captionbar']
 .map(name=>({id:name,name,appMenuItems:name==='bottomsidemenu'?[menuItem]:[]}));
const context={srfappid:'ibizmodeling__modeldesign',clone(){return {...this}}};
const c=new DesignIndexController({
 id:'modeldesign.modelingindex',appId:context.srfappid,viewType:'APPINDEXVIEW',
 controls:controls.filter(x=>x.name==='captionbar'),
 viewLayoutPanel:{controls:controls.filter(x=>x.name!=='captionbar'),rootPanelItems:[]}
},context,{}, {evt:eventBus()});
const actualMenu=c.model.viewLayoutPanel.controls.find(x=>x.name==='bottomsidemenu');
const menu={model:{id:'bottomsidemenu'},appMenu:actualMenu,context,params:{},itemProviders:{},
 state:{menuItemsState:{terminal:{visible:true,permitted:true}}},
 handleClickMenuItem(){throw Error('Console must dispatch through its scoped AppFunc options')}};
const panel={state:{isCreated:true},providers:{shortcut:{component:'IBizShortCut'}},evt:eventBus(),
 panelItems:{
  nav:{model:{rawItem:{predefinedType:'NAV_POS_INDEX'}},state:{},onViewCreated(){},closeViewByKeys(){}},
  tabs:{model:{rawItem:{predefinedType:'NAV_TABS'}}},
  shortcut:{model:{id:'shortcut',rawItem:{predefinedType:'SHORTCUT'}}},menu
 }};
const overlays=reactive([]);const mainClicks=ref(0);
window.demo={ready:false,records,mainClicks,modelOpenDefault:menuItem.openDefault};
window.openFixtureDrawer=(id,ctx,params,options)=>new Promise(resolve=>{
 overlays.push({id,context:ctx,params,options,resolve})
});
const Root=defineComponent({setup(){
 onMounted(async()=>{await c.onCreated();c.setLayoutPanel(panel);await c.onMounted();window.demo.ready=true});
 return()=>[
  h('main',[h('h1',english?'Modeling IDE':'建模 IDE'),
   h('button',{'data-main-action':'inspect',onClick:()=>mainClicks.value++},english?'Inspect model':'查看模型'),
   h('p',String(mainClicks.value))]),
  h('nav',[h('button',{'data-open-console':'true',onClick:event=>menu.handleClickMenuItem(menuItem,event,true)},caption)]),
  ...overlays.map((entry,index)=>h(AppDrawerComponent,{
   key:index,opts:{withHeader:false,...entry.options,placement:'bottom'},
   ref:instance=>instance?.present(),
   onDismiss:data=>{entry.resolve(data);overlays.splice(overlays.indexOf(entry),1)}
  },{default:()=>h('div',{class:'fixture-console-slot'},[
   h(resolveComponent('AibizConsoleView'),{modelData:{id:'console',viewType:'DECUSTOMVIEW'},
    context:{srfconsoleid:'owned/readonly-console'},params:{},provider:provider('VIEW_CUSTOM_CONSOLE_VIEW')})
  ])}))
 ]
}});
const app=createApp(Root);app.use(ElementPlus,{locale:english?en:zh});app.use(consolePlugin);app.mount('#app');
</script></body></html>`;

test('console defaults use the real command chain and host drawer with normal close/reopen in both languages and viewports',
  { timeout: 120_000 }, async t => {
    const { resources, receipts } = await fixtureResources();
    const report = { contract: 'design-console-drawer-source-browser-v1', status: 'FAILED',
      nativeAcceptance: false, businessWrites: false, sharedDistModified: false,
      boundary: 'Real source AppFunc/OpenView/Drawer and Vue/Element Plus; controlled host context and transport, not live IDE acceptance',
      receipts, cases: [] };
    await mkdir(output, { recursive: true });
    t.after(async () => {
      report.status = report.cases.length === 4 && report.cases.every(row => row.status === 'PASS') ? 'PASS' : 'FAILED';
      await writeFile(resolve(output, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
      console.log(`Console drawer browser report: ${output}/report.json`);
    });
    const server = createServer((request, response) => {
      const path = new URL(request.url, 'http://127.0.0.1').pathname;
      const resource = resources.get(path);
      response.setHeader('Cache-Control', 'no-store');
      if (resource) {
        response.writeHead(200, { 'Content-Type': resource.type });response.end(resource.bytes);
      } else if (path === '/frame') {
        response.writeHead(200, { 'Content-Type': 'text/html' });response.end(frameHtml);
      } else if (path === '/') {
        const locale = new URL(request.url, 'http://127.0.0.1').searchParams.get('locale');
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(`<!doctype html><html><head><link rel="icon" href="data:,"><style>html,body{margin:0;height:100%}iframe{border:0;width:100%;height:100%;display:block}</style></head><body><iframe title="IDE source fixture" src="/frame?locale=${encodeURIComponent(locale)}"></iframe></body></html>`);
      } else { response.writeHead(404);response.end(); }
    });
    t.after(() => new Promise(done => { server.close(done);server.closeAllConnections(); }));
    await new Promise(done => server.listen(0, '127.0.0.1', done));
    const origin = `http://127.0.0.1:${server.address().port}`;
    const browser = await launchChromium(chromium);
    t.after(() => browser.close());
    for (const locale of ['zh-CN', 'en-US']) for (const [name, viewport] of [
      ['desktop', { width: 1144, height: 856 }], ['mobile', { width: 390, height: 844 }],
    ]) {
      await t.test(`${locale}/${name}`, async () => {
        const row = { locale, viewport: name, status: 'FAILED', errors: [], outsideRequests: [] };
        report.cases.push(row);
        const context = await browser.newContext({ viewport, locale, serviceWorkers: 'block' });
        try {
          await context.route('**/*', route => {
            if (new URL(route.request().url()).origin === origin) return route.continue();
            row.outsideRequests.push(route.request().url());return route.abort();
          });
          const page = await context.newPage();
          page.on('pageerror', error => row.errors.push({ type: 'pageerror', message: error.message }));
          page.on('console', message => { if (message.type() === 'error') row.errors.push({ type: 'console', message: message.text() }); });
          await page.goto(`${origin}/?locale=${locale}`);
          const frame = page.frames().find(item => item.url().startsWith(`${origin}/frame`));
          assert.ok(frame);
          await frame.waitForFunction(() => window.demo?.ready);
          const drawer = frame.locator('.ibiz-drawer.open');
          await drawer.waitFor({ state: 'visible' });
          const close = drawer.locator('.el-drawer__close-btn');
          await close.waitFor({ state: 'visible' });
          await close.click({ trial: true });
          row.open = await drawer.evaluate(element => {
            const bounds = element.getBoundingClientRect();
            const button = element.querySelector('.el-drawer__close-btn');
            const rect = button.getBoundingClientRect();
            const title = element.querySelector('.el-drawer__title');
            const titleBounds = title.getBoundingClientRect();
            const hit = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
            return { height: bounds.height, top: bounds.top, frameHeight: innerHeight,
              title: element.querySelector('.el-drawer__header')?.textContent,
              closeLabel: button.getAttribute('aria-label'),
              closeColor: getComputedStyle(button).color,
              titleAndCloseOverlap: Math.min(rect.right, titleBounds.right) > Math.max(rect.left, titleBounds.left) &&
                Math.min(rect.bottom, titleBounds.bottom) > Math.max(rect.top, titleBounds.top),
              titleInsideDrawer: titleBounds.top >= bounds.top && titleBounds.bottom <= bounds.bottom,
              closeReceivesPointer: Boolean(hit && (hit === button || button.contains(hit))) };
          });
          assert.ok(row.open.height < row.open.frameHeight * 0.6 && row.open.top > row.open.frameHeight * 0.35);
          assert.equal(row.open.closeReceivesPointer, true);
          assert.equal(row.open.titleAndCloseOverlap, false);
          assert.equal(row.open.titleInsideDrawer, true);
          assert.equal(row.open.closeColor, 'rgb(32, 33, 36)');
          assert.ok(row.open.closeLabel);
          assert.match(await drawer.innerText(), locale === 'en-US' ? /MQTT is disabled/ : /当前部署未启用 MQTT/);
          await page.screenshot({ path: resolve(output, `${locale}-${name}-open.png`) });
          await close.click();
          await drawer.waitFor({ state: 'detached' });
          await frame.locator('[data-main-action="inspect"]').click();
          assert.equal(await frame.evaluate(() => window.demo.mainClicks.value), 1);
          await frame.locator('[data-open-console="true"]').click();
          await drawer.waitFor({ state: 'visible' });
          await drawer.locator('.el-drawer__close-btn').click();
          await drawer.waitFor({ state: 'detached' });
          await frame.locator('[data-main-action="inspect"]').click();
          row.commands = await frame.evaluate(() => ({
            mainClicks: window.demo.mainClicks.value,
            modelOpenDefault: window.demo.modelOpenDefault,
            keys: window.demo.records.commands.map(args => args[0]),
            options: window.demo.records.drawerOptions,
            errors: window.demo.records.errors,
            horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
          }));
          assert.equal(row.commands.mainClicks, 2);
          assert.equal(row.commands.modelOpenDefault, true);
          assert.deepEqual(row.commands.keys, [
            'ibiz.app-func.exec', 'ibiz.app-view.open', 'ibiz.app-func.exec', 'ibiz.app-view.open',
          ]);
          assert.equal(row.commands.options.length, 2);
          for (const options of row.commands.options) {
            assert.equal(options.height, 45);assert.equal(options.withHeader, true);
            assert.equal(options.showClose, true);assert.equal(options.closeOnPressEscape, true);
            assert.equal(options.title, locale === 'en-US' ? 'Console' : '控制台');
          }
          assert.equal(row.commands.horizontalOverflow, false);
          assert.deepEqual(row.commands.errors, []);
          assert.deepEqual(row.errors, []);
          assert.deepEqual(row.outsideRequests, []);
          await page.screenshot({ path: resolve(output, `${locale}-${name}-closed.png`) });
          row.status = 'PASS';
        } finally { await context.close(); }
      });
    }
  });
