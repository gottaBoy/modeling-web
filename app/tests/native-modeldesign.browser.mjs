import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import { resolveNativeModelDesignTarget } from './modeldesign-target.mjs';
import { nativeFieldRoundtrip, readNativeBrowserToken } from './native-field-roundtrip.mjs';
import {
  expectedAuthenticationEvent,
  captureNativeLogin,
  inspectCentralNavigationRequest,
  inspectCentralNavigationService,
  inspectNativeAppModel,
  summarizeNativeBrowserReport,
  verifyCentralNavigation,
} from './native-model-contract.mjs';

export function nativeLoginLocale(locale) {
  assert.ok(typeof locale === 'string' && /^[A-Za-z]{2}(?:[-_][A-Za-z0-9]{2,8}){0,3}$/.test(locale),
    'Native browser locale must select supported Chinese or English');
  const language = locale.split(/[-_]/)[0].toLowerCase();
  assert.ok(language === 'en' || language === 'zh',
    'Native browser locale must select supported Chinese or English');
  return language === 'en'
    ? { language: 'en', buttonName: 'Login' }
    : { language: 'zh-CN', buttonName: '\u767b\u5f55' };
}

export async function configureNativeBrowserLanguage(context, locale) {
  const selected = nativeLoginLocale(locale);
  // The application reads its normal saved language preference, not navigator.language.
  await context.addInitScript(language => window.localStorage.setItem('language', language), selected.language);
  return selected;
}

export async function submitNativeLogin(page, locale) {
  const selected = nativeLoginLocale(locale);
  const runtime = await page.evaluate(() => ({
    htmlLanguage: document.documentElement.lang,
    applicationLanguage: window.ibiz?.i18n?.getLang?.() ?? null,
  }));
  assert.equal(runtime.htmlLanguage, selected.language, 'Native login HTML language must match the selected locale');
  assert.equal(runtime.applicationLanguage, selected.language,
    'Native login application language must match the selected locale');
  await page.getByRole('button', { name: selected.buttonName, exact: true }).click();
  return { ...selected, ...runtime };
}

// This callback uses the public host registry, not Vue's private DOM instance fields.
export function collectNativeIndexEvidence({ application, applicationId, indexPath }) {
  const visible = element => {
    if (!element.getClientRects().length) return false;
    for (let node = element; node instanceof Element; node = node.parentElement) {
      const style = getComputedStyle(node);
      if (style.display === 'none' || style.visibility === 'hidden' ||
          style.visibility === 'collapse' || Number(style.opacity) === 0) return false;
    }
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  };
  const lifecycle = controller => ({
    isCreated: controller?.state?.isCreated ?? null,
    isMounted: controller?.state?.isMounted ?? null,
    isLoading: controller?.state?.isLoading ?? null,
    isDestroyed: controller?.state?.isDestroyed ?? null,
    hasError: controller?.state?.hasError ?? null,
  });
  const stack = window.ibiz?.util?.viewStack;
  const viewEvidence = element => {
    const controller = stack?.getView?.(element.id);
    return {
      domId: element.id, controllerId: controller?.id ?? null,
      id: controller?.model?.id ?? null, codeName: controller?.model?.codeName ?? null,
      appId: controller?.model?.appId ?? controller?.context?.srfappid ?? null,
      viewType: controller?.model?.viewType ?? null,
      lifecycle: lifecycle(controller), visible: visible(element),
    };
  };
  const roots = [...document.querySelectorAll('.ibiz-view-appindexview')].filter(visible);
  const codeName = indexPath?.split('/').at(-1)?.replace(/\.json$/, '');
  const matches = roots.filter(element =>
    stack?.getView?.(element.id)?.model?.codeName?.toLowerCase() === codeName?.toLowerCase());
  const root = matches.length === 1 ? matches[0] : undefined;
  const controller = root && stack?.getView?.(root.id);
  const panel = controller?.layoutPanel;
  const panels = [];
  const seen = new Set();
  const visit = parent => {
    for (const item of Object.values(parent?.panelItems ?? {})) {
      if (!item || seen.has(item)) continue;
      seen.add(item);
      panels.push({
        id: item.model?.id ?? null, name: item.model?.name ?? null,
        role: item.model?.rawItem?.predefinedType ?? null,
        provider: parent.providers?.[item.model?.id]?.component ?? null,
        appMenu: item.appMenu ? {
          name: item.appMenu.name, id: item.appMenu.id,
          itemCount: item.appMenu.appMenuItems?.length ?? 0,
        } : null,
        lifecycle: lifecycle(item),
      });
      visit(item);
    }
  };
  visit(panel);
  const sides = {
    leftsidemenu: '.ibiz-left-side-menu', rightsidemenu: '.ibiz-right-side-menu',
    topsidemenu: '.ibiz-top-side-menu', bottomsidemenu: '.ibiz-bottom-side-menu',
  };
  const controls = [...(controller?.model?.controls ?? []),
    ...(controller?.model?.viewLayoutPanel?.controls ?? [])];
  const domSelector = element => {
    const parts = [];
    for (let node = element; node && node !== root; node = node.parentElement) {
      parts.unshift(`${node.tagName.toLowerCase()}:nth-child(${
        [...node.parentElement.children].indexOf(node) + 1})`);
    }
    return `#${CSS.escape(root.id)} > ${parts.join(' > ')}`;
  };
  const menus = controls.filter(control => Object.hasOwn(sides, control.name || control.id))
    .map(model => {
      const name = model.name || model.id;
      const bindings = [...seen].filter(item => item.appMenu === model);
      const menu = bindings.length === 1 ? bindings[0] : undefined;
      const wrappers = root ? [...root.querySelectorAll(sides[name])]
        .filter(element => element.closest('.ibiz-view-appindexview') === root) : [];
      const buttons = wrappers.flatMap(element =>
        [...element.querySelectorAll('button, .el-menu-item')]).filter(visible);
      const items = (model.appMenuItems ?? []).map(item => {
        const state = menu?.state?.menuItemsState?.[item.id];
        const caption = String(item.caption ?? '').trim();
        const indexed = buttons.filter(element => element.getAttribute('index') === item.id);
        const uniqueCaption = caption && model.appMenuItems.filter(entry =>
          String(entry.caption ?? '').trim() === caption).length === 1;
        const matched = indexed.length ? indexed : uniqueCaption ? buttons.filter(element =>
          !element.hasAttribute('index') && element.textContent.trim() === caption) : [];
        const appId = item.appId || menu?.context?.srfappid || applicationId;
        let func;
        if (item.appFuncId) func = window.ibiz?.hub?.getApp?.(appId)?.getAppFunc?.(item.appFuncId);
        return {
          id: item.id, caption, appFuncId: item.appFuncId ?? null,
          hidden: Boolean(item.hidden), disabled: Boolean(item.disabled),
          visible: state?.visible ?? null, permitted: state?.permitted ?? null,
          itemType: item.itemType, childCount: item.appMenuItems?.length ?? 0,
          openDefault: Boolean(item.openDefault),
          providerClick: typeof menu?.itemProviders?.[item.id]?.onClick === 'function',
          target: func?.appFuncType === 'APPVIEW' && func.appViewId
            ? { appId, viewId: func.appViewId } : null,
          dom: matched.map(element => ({
            selector: domSelector(element), matchedBy: indexed.length ? 'index' : 'caption',
            text: element.textContent.trim(), index: element.getAttribute('index'),
            disabled: element.matches(':disabled, [aria-disabled="true"], .is-disabled'),
          })),
        };
      });
      return {
        name, declarationCount: controls.filter(item => (item.name || item.id) === name).length,
        itemCount: model.appMenuItems?.length ?? 0,
        bindingCount: bindings.length, ownerMatches: Boolean(menu && menu.view === controller),
        boundModelName: menu?.appMenu?.name ?? null,
        controller: menu ? panels.find(item => item.id === menu.model?.id) : null,
        wrapperCount: wrappers.length, visibleWrapperCount: wrappers.filter(visible).length,
        items,
      };
    });
  return {
    application, applicationId, indexPath, url: location.href,
    injectedApplication: window.Environment?.nativeModelApp ?? null,
    runtimeApplicationId: window.ibiz?.env?.appId ?? null,
    visibleOverlays: [...document.querySelectorAll(
      '#app-loading-x, .app-loading-x, .el-loading-mask, .el-skeleton')].filter(visible)
      .map(element => ({ id: element.id, className: element.className })),
    indexRoots: roots.map(viewEvidence), matchingIndexCount: matches.length,
    index: root ? viewEvidence(root) : null,
    layout: panel ? { lifecycle: lifecycle(panel), panels } : null,
    designIndexErrors: controller?.state?.designIndexErrors ?? [],
    defaultOpens: { ...(controller?.state?.designIndexDefaultOpens ?? {}) },
    menus,
    views: [...document.querySelectorAll('.ibiz-view')].map(viewEvidence),
    modelErrorVisible: Boolean(document.body?.innerText.includes('\u6a21\u578b\u914d\u7f6e\u7f3a\u5931')),
  };
}

export function inspectNativeIndexReadiness(evidence) {
  const failures = [];
  const ready = view => view && view.domId === view.controllerId &&
    view.appId === evidence.applicationId && view.lifecycle.isCreated === true &&
    view.lifecycle.isMounted === true && view.lifecycle.isLoading === false &&
    view.lifecycle.isDestroyed === false && view.lifecycle.hasError === false;
  if (evidence.injectedApplication !== evidence.application ||
      evidence.runtimeApplicationId !== evidence.applicationId) failures.push('application identity mismatch');
  if (evidence.visibleOverlays.length) failures.push('visible loading overlay/skeleton');
  if (evidence.matchingIndexCount !== 1 || !ready(evidence.index) ||
      evidence.index?.viewType !== 'APPINDEXVIEW') failures.push('index ViewController is not ready');
  if (evidence.modelErrorVisible) failures.push('visible model configuration error');
  if (evidence.application === 'ModelDesign') {
    if (evidence.layout?.lifecycle.isCreated !== true ||
        evidence.layout?.lifecycle.isMounted !== true) failures.push('index layout is not mounted');
    if (evidence.designIndexErrors.length ||
        Object.values(evidence.defaultOpens).includes('failed')) failures.push('design index lifecycle errors');
    if (!evidence.menus.some(menu => menu.itemCount)) failures.push('no declared side menus');
    for (const menu of evidence.menus.filter(item => item.itemCount)) {
      if (menu.declarationCount !== 1 || menu.bindingCount !== 1 || !menu.ownerMatches ||
          menu.boundModelName !== menu.name) failures.push(`${menu.name}: missing/ambiguous host menu binding`);
      const permitted = menu.items.filter(item => item.itemType === 'MENUITEM' &&
        !item.hidden && !item.disabled && item.visible === true && item.permitted === true);
      if (permitted.length && (menu.wrapperCount !== 1 || menu.visibleWrapperCount !== 1 ||
          permitted.some(item => item.dom.length !== 1 || item.dom[0].disabled))) {
        failures.push(`${menu.name}: model menus have no unique visible DOM`);
      }
    }
    if (!evidence.menus.some(menu => menu.items.some(item =>
      item.itemType === 'MENUITEM' && !item.hidden && !item.disabled &&
      item.visible === true && item.permitted === true && item.dom.length === 1))) {
      failures.push('no permitted rendered side-menu item');
    }
  }
  return failures;
}

async function pollNativeIndex(page, options, inspect) {
  const timeout = options.timeout ?? 20_000;
  const stableFor = options.stableFor ?? 200;
  assert.ok(Number.isFinite(timeout) && timeout > 0 && Number.isFinite(stableFor) && stableFor >= 0);
  let evidence;
  let failures = ['no runtime evidence'];
  let readySince;
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    try {
      evidence = await page.evaluate(collectNativeIndexEvidence, options);
      failures = inspect(evidence);
    } catch (error) {
      if (!/Execution context was destroyed|Cannot find context with specified id/.test(error.message)) {
        error.evidence = { runtime: evidence };
        throw error;
      }
      failures = ['document replacement is still in progress'];
    }
    if (!failures.length) {
      readySince ??= Date.now();
      if (Date.now() - readySince >= stableFor) return evidence;
    } else readySince = undefined;
    await delay(50);
  }
  const error = new Error(`Native index readiness timed out: ${failures.join('; ')}`);
  error.evidence = { readinessFailures: failures, runtime: evidence };
  throw error;
}

export async function waitForNativeIndexReady(page, options) {
  return pollNativeIndex(page, options, inspectNativeIndexReadiness);
}

function nativeHomeRoutePattern(application, entry) {
  if (application === 'Central') return /#\/-\/index\//;
  return /#\/psdevslnsys=[^/]+\/modelingindex\//;
}

async function waitForNativeHomeRoute(page, route, options = {}) {
  const timeout = options.timeout ?? 30_000;
  const interval = 100;
  const deadline = Date.now() + timeout;
  do {
    if (route.test(page.url())) return page.url();
    await delay(interval);
  } while (Date.now() < deadline);
  const error = new Error(`Native home route timed out: ${page.url()}`);
  error.evidence = { expected: String(route), actual: page.url() };
  throw error;
}

export async function verifyModelDesignMenuNavigation(page, options) {
  assert.equal(options.application, 'ModelDesign');
  let before;
  let click;
  let observation;
  try {
    before = await waitForNativeIndexReady(page, options);
    const candidates = before.menus.filter(menu => menu.name === 'leftsidemenu').flatMap(menu => menu.items
      .filter(item => item.itemType === 'MENUITEM' && !item.hidden && !item.disabled &&
        item.visible === true && item.permitted === true && !item.openDefault &&
        !item.childCount && !item.providerClick && item.target && item.dom.length === 1 &&
        !item.dom[0].disabled && !before.views.some(view =>
        view.id === item.target.viewId && view.appId === item.target.appId))
      .map(item => ({ menu: menu.name, ...item })));
    assert.ok(candidates.length, 'ModelDesign needs an unambiguous non-default APPVIEW menu click target');
    const item = candidates[0];
    click = { menu: item.menu, itemId: item.id, caption: item.caption,
      appFuncId: item.appFuncId, target: item.target, dom: item.dom[0] };
    const locator = page.locator(click.dom.selector);
    observation = await locator.evaluateHandle(element => {
      const result = { event: null };
      const listener = event => {
        result.event = { type: event.type, isTrusted: event.isTrusted, button: event.button,
          index: element.getAttribute('index'), text: element.textContent.trim() };
      };
      element.addEventListener('click', listener, { capture: true });
      result.dispose = () => element.removeEventListener('click', listener, { capture: true });
      return result;
    });
    if (await page.locator('.ibiz-drawer.open').count()) {
      await page.keyboard.press('Escape');
    }

    // A real Playwright click must produce a newly mounted model-linked target, not just a URL change.
    await locator.click({ timeout: options.timeout ?? 20_000 });
    click.event = await observation.evaluate(result => result.event);
    assert.equal(click.event?.isTrusted, true, 'ModelDesign menu must receive the actual browser click');
    assert.equal(click.event?.button, 0, 'ModelDesign menu requires a primary-button click');
    const after = await pollNativeIndex(page, options, evidence => {
      const failures = inspectNativeIndexReadiness(evidence);
      const targets = evidence.views.filter(view => view.visible &&
        view.id === click.target.viewId && view.appId === click.target.appId &&
        !before.views.some(previous => previous.controllerId === view.controllerId));
      if (targets.length !== 1 || targets[0].domId !== targets[0].controllerId ||
          targets[0].lifecycle.isCreated !== true || targets[0].lifecycle.isMounted !== true ||
          targets[0].lifecycle.isLoading !== false || targets[0].lifecycle.hasError !== false ||
          targets[0].lifecycle.isDestroyed !== false) failures.push('clicked APPVIEW target is not mounted');
      return failures;
    });
    return { click, before, after };
  } catch (error) {
    error.evidence = { before, click, ...error.evidence };
    throw error;
  } finally {
    if (observation) {
      await observation.evaluate(result => result.dispose()).catch(() => {});
      await observation.dispose();
    }
  }
}

export async function runNativeModelDesignBrowser() {
  const workspace = fileURLToPath(new URL('../../../', import.meta.url));
  const require = createRequire(new URL('../../../ibiz-app-hub/package.json', import.meta.url));
  const { chromium } = require('playwright');
  const probeOnly = process.argv[2] === '--probe-only';
  assert.ok(process.argv.length === 2 || (process.argv.length === 3 && probeOnly),
    'Usage: node tests/native-modeldesign.browser.mjs [--probe-only]');
  const locale = process.env.MODEL_DESIGN_BROWSER_LOCALE || 'zh-CN';
  const selectedLocale = nativeLoginLocale(locale);
  const target = resolveNativeModelDesignTarget(process.env, workspace);
  const { nativeCandidateRoot, modelRoot, composeFiles, entries } = target;
  const output = path.resolve(process.env.MODEL_DESIGN_ARTIFACT_DIR || path.join(workspace,
    '.artifacts/native-modeldesign', new Date().toISOString().replaceAll(':', '-')));
  const report = {
    schemaVersion: 1,
    contract: 'native-modeling-browser-prerequisites',
    mode: probeOnly ? 'probe-only' : 'acceptance',
    nativeAcceptance: false,
    releaseAcceptance: false,
    locale,
    language: selectedLocale.language,
    nativeCandidateRoot,
    nativeServiceCandidateRoot: target.nativeServiceCandidateRoot,
    nativeAiCodeRuntimeRoot: target.nativeAiCodeRuntimeRoot,
    modelRoot,
    composeFiles,
    composeEnvFiles: target.composeEnvFiles,
    localModels: {},
    applications: {},
  };
  const hash = data => createHash('sha256').update(data).digest('hex');
  await mkdir(output, { recursive: true });
  let browser;

  try {
    for (const [application] of entries) {
      const sourcePath = path.join(modelRoot, 'PSSYSAPPS', application, 'PSSYSAPP.json');
      const bytes = await readFile(sourcePath);
      report.localModels[application] = { path: sourcePath, sha256: hash(bytes) };
    }
    browser = await chromium.launch({
      executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
      headless: true,
      args: ['--no-sandbox'],
    });
    for (const [application, entry] of entries) {
      const code = application.toLowerCase();
      const applicationId = `ibizmodeling__${code}`;
      const context = await browser.newContext({ locale, viewport: { width: 1440, height: 900 } });
      await configureNativeBrowserLanguage(context, locale);
      const page = await context.newPage();
      const app = { entry, applicationId, stages: {}, requests: [], errors: [], expectedAuthEvents: [] };
      report.applications[application] = app;
      const homeRoute = nativeHomeRoutePattern(application, entry);
      const centralDatasetResponses = [];
      let authenticated = false;
      if (application === 'Central') {
        page.on('response', response => {
          const url = new URL(response.url());
          if (url.origin === new URL(entry).origin &&
            url.pathname === '/api/ibizmodeling__central/psdevslns/fetchcurdcslnuser') {
            centralDatasetResponses.push(response);
          }
        });
      }
      page.on('response', response => {
        const url = new URL(response.url());
        const event = {
          kind: 'response', authenticated, status: response.status(),
          method: response.request().method(), path: url.pathname,
        };
        if (response.status() >= 400) {
          (expectedAuthenticationEvent(event, applicationId) ?
            app.expectedAuthEvents : app.errors).push(event);
        }
        if (/\/(plugins|remotemodel)\//.test(url.pathname) ||
          url.pathname.startsWith(`/api/${applicationId}/`)) {
          app.requests.push(event);
        }
      });
      page.on('console', message => {
        if (message.type() !== 'error') return;
        const location = message.location().url;
        const event = {
          kind: 'console', authenticated, text: message.text(),
          path: location ? new URL(location, entry).pathname : '',
        };
        (expectedAuthenticationEvent(event, applicationId) ?
          app.expectedAuthEvents : app.errors).push(event);
      });
      page.on('pageerror', error => app.errors.push({
        kind: 'pageerror', authenticated, text: String(error),
      }));
      const stage = async (name, run) => {
        try {
          const evidence = await run();
          app.stages[name] = { status: 'PASS', evidence };
          return evidence;
        } catch (error) {
          app.stages[name] = {
            status: 'FAIL', error: String(error),
            ...(error.evidence ? { evidence: error.evidence } : {}),
          };
          return false;
        }
      };
      const capture = async name => {
        const screenshot = `${code}-${name}.png`;
        await page.screenshot({ path: path.join(output, screenshot), fullPage: true });
        return { url: page.url(), title: await page.title(), screenshot };
      };
      const pluginAssets = [];
      await stage('model', async () => {
        const response = await page.request.get(
          new URL(`/api/${applicationId}/remotemodel/PSSYSAPP.hub.json`, entry).href,
        );
        assert.equal(response.status(), 200, 'Native app model must be served');
        const bytes = await response.body();
        const source = await readFile(path.join(modelRoot, 'PSSYSAPPS', application, 'PSSYSAPP.json'));
        assert.equal(hash(source), report.localModels[application].sha256,
          'Selected candidate model must not change during the browser run');
        assert.equal(hash(bytes), hash(source),
          'Served model must match the selected NATIVE_CANDIDATE_ROOT model');
        const model = inspectNativeAppModel(JSON.parse(bytes), application);
        app.model = { ...model, sha256: hash(bytes), source: report.localModels[application] };
        return app.model;
      });
      await stage('plugin-assets', async () => {
        assert.ok(app.model, 'Native model preflight failed');
        for (const plugin of [...app.model.plugins, ...app.model.themes]) {
          const url = new URL(`plugins/${plugin.repo}/package.json`, entry);
          const response = await page.request.get(url.href);
          const result = {
            repo: plugin.repo, path: url.pathname, status: response.status(), assets: [],
            ...(plugin.themes ? { themes: plugin.themes } : {}),
          };
          pluginAssets.push(result);
          if (response.status() !== 200) continue;
          try {
            const manifest = await response.json();
            result.identityMatches = manifest.name === plugin.name && manifest.version === plugin.version;
            assert.equal(result.identityMatches, true, 'Native package identity must match its model reference');
            assert.equal(typeof manifest.system, 'string', 'SystemJS entry is required');
            for (const asset of [manifest.system, ...(manifest.styles || [])]) {
              const assetUrl = new URL(asset, url);
              assert.equal(assetUrl.origin, url.origin, 'Plugin assets must stay local');
              assert.ok(assetUrl.pathname.startsWith(new URL('.', url).pathname),
                'Plugin assets must stay within their package');
              const resource = await page.request.get(assetUrl.href);
              result.assets.push({ path: assetUrl.pathname, status: resource.status() });
            }
          } catch (error) {
            result.error = String(error);
          }
        }
        app.pluginAssets = pluginAssets;
        const failures = pluginAssets.filter(plugin => plugin.status !== 200 ||
        !plugin.identityMatches || plugin.error || !plugin.assets.length ||
        plugin.assets.some(asset => asset.status !== 200));
        assert.equal(failures.length, 0, `Missing/invalid native packages: ${failures.map(item => item.repo).join(', ')}`);
        return pluginAssets;
      });
      const login = await stage('login', async () => {
        await page.goto(entry, { waitUntil: 'domcontentloaded' });
        assert.equal(await page.evaluate(() => window.Environment?.nativeModelApp), application,
          'Container must inject the native application selector');
        await page.locator('input[type="password"]').first().waitFor({ timeout: 20_000 });
        await capture('login');
        await page.locator('input[type="text"]').first().fill(process.env.MODEL_DESIGN_USER || 'aibizhi');
        await page.locator('input[type="password"]').first().fill(process.env.MODEL_DESIGN_PASSWORD || '123456');
        let localeEvidence;
        const evidence = await captureNativeLogin(page, { entry, applicationId },
          async () => { localeEvidence = await submitNativeLogin(page, locale); });
        authenticated = true;
        return { account: process.env.MODEL_DESIGN_USER || 'aibizhi', ...evidence, locale: localeEvidence };
      });
      const home = await stage('home', async () => {
        assert.ok(login, 'Native login failed');
        await waitForNativeHomeRoute(page, homeRoute);
        const runtime = await waitForNativeIndexReady(page, {
          application, applicationId, indexPath: app.model?.indexPath,
        });
        return { ...await capture('home'), runtime };
      });
      await stage('theme-rendering', async () => {
        assert.ok(login && app.model, 'Native login/model preflight failed');
        const declarations = app.model.themes.flatMap(plugin => plugin.themes);
        if (!declarations.length) return { declaredThemes: 0 };
        await page.waitForFunction(tags => tags.every(tag => document.documentElement.classList.contains(tag)),
          declarations.map(theme => theme.tag), { timeout: 10_000 });
        const styles = pluginAssets.filter(plugin => plugin.themes).flatMap(plugin =>
          plugin.assets.filter(asset => asset.path.endsWith('.css')).map(asset => asset.path));
        assert.ok(styles.length >= app.model.themes.length, 'Native themes require verified stylesheet assets');
        const rendering = await page.evaluate(expectedStyles => {
          const computed = getComputedStyle(document.documentElement);
          return {
            rootClasses: [...document.documentElement.classList],
            styles: expectedStyles.map(path => ({
              path,
              loaded: [...document.querySelectorAll('link[rel="stylesheet"]')]
                .some(link => new URL(link.href).pathname === path && Boolean(link.sheet)),
            })),
            background: computed.getPropertyValue('--ibiz-color-bg-0').trim(),
            primary: computed.getPropertyValue('--ibiz-color-primary').trim(),
          };
        }, styles);
        assert.ok(rendering.styles.every(style => style.loaded), 'Native theme styles must actually load in the document');
        assert.ok(rendering.background && rendering.primary, 'Native theme tokens must resolve on the actual root');
        if (app.model.themes.some(theme => theme.repo === '@aibiz/studio-theme@0.1.0')) {
          assert.equal(rendering.background, '#1a1b1d');
          assert.equal(rendering.primary, '#78d3c1');
        }
        return rendering;
      });
      await stage('navigation', async () => {
        assert.ok(home, 'Native home did not initialize');
        if (application === 'Central') {
          const models = {};
          const servedModel = async (name, modelPath) => {
            const url = new URL(`/api/${applicationId}/remotemodel/${modelPath}`, entry);
            const response = await page.request.get(url.href);
            models[name] = { path: url.pathname, status: response.status() };
            assert.equal(response.status(), 200, `Navigation ${name} model must be served`);
            assert.match(response.headers()['content-type'] ?? '', /^application\/json(?:\s*;|$)/i,
              `Navigation ${name} model must be JSON`);
            const bytes = await response.body();
            models[name].sha256 = hash(bytes);
            return JSON.parse(bytes);
          };
          try {
            const view = await servedModel('view', 'PSSYSAPPS/Central/PSAPPDEVIEWS/PSDevSlnGridView.json');
            const entity = await servedModel('entity', 'PSSYSAPPS/Central/PSAPPDATAENTITIES/PSDevSln.json');
            const expected = inspectCentralNavigationRequest(entity, entry, view);
            const service = await servedModel('service', 'PSSYSSERVICEAPIS/ModelAPI.json');
            const serviceDeclaration = inspectCentralNavigationService(service, entity, expected);
            const navigation = await verifyCentralNavigation(page, expected, {
              preexistingResponse: centralDatasetResponses[0],
            });
            return { ...await capture('navigation'), models, serviceDeclaration, ...navigation };
          } catch (error) {
            error.evidence = { models, ...error.evidence };
            throw error;
          }
        } else {
          const navigation = await verifyModelDesignMenuNavigation(page, {
            application, applicationId, indexPath: app.model?.indexPath,
          });
          return { ...await capture('navigation'), ...navigation };
        }
      });
      await stage('reload', async () => {
        assert.ok(home, 'Native home did not initialize');
        await page.goto(entry, { waitUntil: 'domcontentloaded' });
        await waitForNativeHomeRoute(page, homeRoute);
        const runtime = await waitForNativeIndexReady(page, {
          application, applicationId, indexPath: app.model?.indexPath,
        });
        assert.equal(await page.locator('input[type="password"]').count(), 0,
        'Reload must retain the authenticated session');
        return { ...await capture('reload'), runtime };
      });
      if (!probeOnly && application === 'ModelDesign') {
        const roundtrip = nativeFieldRoundtrip({
          request: page.request, entry, applicationId,
          basePath: `/api/${applicationId}/psdevslnsys/28F7326A-7C72-4C2D-A497-A16372ABBADC/psdataentities/123d50d7b350ff6951b4a31c4de5b5d0/psdefields`,
          fieldId: '0288c6d945e39aabfa7028fa58ab3896',
          readToken: () => readNativeBrowserToken(page),
          credentials: {
            loginname: process.env.MODEL_DESIGN_USER || 'aibizhi',
            password: process.env.MODEL_DESIGN_PASSWORD || '123456',
          },
        });
        await stage('editor-save', async () => {
          assert.ok(home, 'Native editor did not reach its home route');
          assert.ok(login?.tokenPersisted, 'Native model save requires verified browser authentication');
          return roundtrip.save();
        });
        await stage('fresh-session-readback', () => roundtrip.readback());
        await stage('editor-restore', async () => {
          const cleanup = await roundtrip.restore();
          app.editorRestored = cleanup.restored;
          return cleanup;
        });
      }
      await capture('final').catch(error => app.errors.push({ kind: 'screenshot', text: String(error) }));
      await stage('browser-errors', async () => {
        assert.equal(app.errors.length, 0, `Unexplained browser errors: ${app.errors.length}`);
        return { unexpected: app.errors.length, expectedAuthentication: app.expectedAuthEvents.length };
      });
      await context.close();
    }
    report.verdict = summarizeNativeBrowserReport(report.applications, {
      fullAcceptance: !probeOnly,
    });
    if (!probeOnly) {
      report.editorRestored = report.applications.ModelDesign?.editorRestored === true;
      report.acceptanceFailure = !report.verdict.prerequisiteChecksPassed
        ? 'Native browser prerequisites failed; editor save/readback cannot be accepted'
        : report.editorRestored ? null
          : 'Native editor save/readback did not complete restoration';
    }
    if (!report.verdict.prerequisiteChecksPassed ||
      (!probeOnly && (report.acceptanceFailure || !report.editorRestored))) process.exitCode = 1;
  } catch (error) {
    report.fatalError = String(error);
    process.exitCode = 1;
  } finally {
    await browser?.close();
    const reportPath = path.join(output, 'report.json');
    await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
    console.log(`Native modeling browser report: ${reportPath}`);
    console.log(`Prerequisites passed: ${report.verdict?.prerequisiteChecksPassed ?? false}`);
    if (report.fatalError || report.acceptanceFailure) {
      console.error(report.fatalError || report.acceptanceFailure);
    }
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await runNativeModelDesignBrowser();
}
