import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { PinnedDirectories, readPinnedFile } from '../../../scripts/native-candidate-files.mjs';
import { verifyBridgeProcess, verifyOwnedBridgeRuntime } from '../../../scripts/launch-owned-native-modeldesign.mjs';
import { verifyModelingAppData } from '../../../scripts/run-owned-native-permission-http.mjs';
import { launchChromium } from '../../../scripts/browser-launch.mjs';
import { captureNativeLogin } from './native-model-contract.mjs';
import {
  collectNativeIndexEvidence, configureNativeBrowserLanguage, submitNativeLogin, waitForNativeIndexReady,
} from './native-modeldesign.browser.mjs';
import { readOnlyBrowserRequestAllowed } from './owned-five-dataset.browser.mjs';

const workspace = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const hash = value => createHash('sha256').update(value).digest('hex');
const json = value => `${JSON.stringify(value, null, 2)}\n`;
const appId = 'ibizmodeling__modeldesign';
const clean = value => String(value).replace(/(refresh_token\/)[^/"'\s?]+/gi, '$1[redacted]')
  .replace(/(Bearer\s+)[A-Za-z0-9_.-]+/gi, '$1[redacted]');
const pathInside = (root, value) => {
  const path = resolve(workspace, value);
  const child = relative(root, path);
  assert.ok(child && !child.startsWith('../') && !child.startsWith('/'));
  return path;
};

export function browserReadMatrix(manifest) {
  return manifest.users.flatMap(actor => manifest.roots.flatMap(root =>
    ['zh-CN', 'en-US'].flatMap(locale => ['desktop', 'mobile'].map(viewport => ({
      actor: actor.loginname, role: actor.role, rootId: root.rootId, locale, viewport,
      expectedRead: actor.rootId === root.rootId && ['editor', 'viewer'].includes(actor.role),
      status: 'NOT-EXECUTED-NOT-ACCEPTED',
    })))));
}

export async function runBootstrapBrowser(options) {
  assert.equal(options.runReadonlyBrowser, true);
  for (const key of ['launchSha256', 'stateSha256', 'deploymentSha256']) assert.match(options[key] ?? '', /^[a-f0-9]{64}$/);
  assert.match(options.runId ?? '', /^[a-f0-9]{12}$/);
  const output = pathInside(join(workspace, '.artifacts/owned-modeling-bootstrap-browser'), options.output);
  assert.equal(dirname(output), join(workspace, '.artifacts/owned-modeling-bootstrap-browser'));
  assert.match(basename(output), /^[a-z0-9][a-z0-9-]{0,95}$/);
  const dirs = new PinnedDirectories();
  const bound = [];
  const read = (path, sha, privateInput = false) => {
    path = pathInside(workspace, path);
    const file = readPinnedFile(dirs, dirs.open(dirname(path)), basename(path));
    if (sha) assert.equal(hash(file.data), sha);
    if (privateInput) {
      assert.equal(file.identity.uid, process.geteuid());
      assert.equal(file.identity.mode & 0o077, 0);
    }
    bound.push({ path, bytes: file.data.length, sha256: hash(file.data) });
    return JSON.parse(file.data);
  };
  const directory = dirs.open(output, { create: true, exclusive: true });
  const report = {
    contract: 'owned-modeling-bootstrap-live-ui-v1', status: 'FAILED',
    nativeAcceptance: false, permissionAcceptance: false, editorSaveAcceptance: false,
    freshSessionReadbackAcceptance: false, modelWritesRequested: false,
    identityOrHeaderInjection: false, acceptedForProduction: false,
    startedAt: new Date().toISOString(), cases: [],
    source: { path: fileURLToPath(import.meta.url), sha256: hash(fs.readFileSync(fileURLToPath(import.meta.url))) },
  };
  let browser;
  try {
    const launch = pathInside(join(workspace, '.artifacts/owned-native-modeldesign-launch'), options.launch);
    assert.equal(dirname(launch), join(workspace, '.artifacts/owned-native-modeldesign-launch'));
    const launchReport = read(join(launch, 'report.json'), options.launchSha256);
    assert.equal(launchReport.status, 'RUNNING-OWNED-FRONTEND-NOT-ACCEPTED');
    const state = read(join(launch, 'launch-state.private.json'), options.stateSha256, true);
    const input = read(launchReport.input.path, launchReport.input.sha256);
    assert.deepEqual(state.input, launchReport.input);
    assert.equal(input.ownedBackend.runId, options.runId);
    const deploymentPath = pathInside(join(workspace, '.artifacts/native-nonadmin-fixtures', options.runId), options.deployment);
    const deployment = read(deploymentPath, options.deploymentSha256, true);
    assert.equal(deployment.runId, options.runId);
    assert.equal(input.ownedBackend.deploymentInput.sha256, options.deploymentSha256);
    assert.equal(launchReport.deploymentInput.path, deploymentPath);
    const manifest = read(input.ownedBackend.manifest.path, input.ownedBackend.manifest.sha256);
    const credentials = read(join(dirname(input.ownedBackend.manifest.path), 'credentials.private.json'), undefined, true);
    const actor = manifest.users.find(user => user.loginname === options.actor);
    const root = manifest.roots.find(value => value.side === options.rootSide);
    assert.ok(actor && root && actor.role === 'editor' && actor.rootId === root.rootId,
      'Only editor own-root probes are enabled; other matrix rows stay unexecuted');
    report.matrix = browserReadMatrix(manifest);
    report.runId = manifest.runId;
    report.actor = { loginname: actor.loginname, role: actor.role, rootId: actor.rootId };
    const specs = state.bridges.map(bridge => ({
      bridge, spec: read(bridge.specPath, bridge.specSha256, true),
    }));
    const guard = fullMountedHash => {
      for (const file of bound) {
        const current = readPinnedFile(dirs, dirs.open(dirname(file.path)), basename(file.path));
        assert.equal(hash(current.data), file.sha256);
      }
      for (const { bridge, spec } of specs) {
        assert.equal(spec.runtime.deploymentPath, deploymentPath);
        verifyBridgeProcess(bridge.identity, bridge.specPath, bridge.specSha256);
        verifyOwnedBridgeRuntime({ workspace, directories: dirs, input,
          runtime: spec.runtime, frontendPins: spec.frontendPins, fullMountedHash });
      }
    };
    guard(true);
    const app = input.applications.find(value => value.application === 'ModelDesign');
    const origin = new URL(app.entry).origin;
    const api = read(join(workspace,
      'vendor-upstream/ibizmodeling-standard/modelapi-core/src/main/resources/model/net/ibizsys/modeling/PSSYSSERVICEAPIS/ModelAPI.json'));
    const readPolicy = {
      rootIds: manifest.roots.map(value => value.rootId),
      readFetchPaths: new Set(api.getPSDEServiceAPIs.flatMap(entity =>
        (entity.getPSDEServiceAPIMethods ?? []).filter(method =>
          method.methodType === 'FETCH' && method.dataAccessAction === 'READ')
          .map(method => `${entity.codeName2.toLowerCase()}/${method.codeName.toLowerCase()}`))),
      readCollections: new Set(api.getPSDEServiceAPIs.filter(entity =>
        entity.getPSDEServiceAPIMethods?.some(method => method.codeName === 'Get' &&
          method.requestMethod === 'GET' && method.dataAccessAction === 'READ'))
        .map(entity => entity.codeName2.toLowerCase())),
    };
    const require = createRequire(join(workspace, 'ibiz-app-hub/package.json'));
    browser = await launchChromium(require('playwright').chromium, { args: ['--no-sandbox'] });
    for (const locale of ['zh-CN', 'en-US']) for (const viewportName of ['desktop', 'mobile']) {
      guard(false);
      const row = { locale, viewport: viewportName, status: 'FAILED', stages: {},
        responses: [], blocked: [], errors: [], startedAt: new Date().toISOString(),
        M03: { status: 'NOT-EXECUTED-NOT-ACCEPTED', reason: 'Requires successful native list/editor navigation and a complete config-r6 native seed receipt; no writes authorized by this probe' } };
      report.cases.push(row);
      const context = await browser.newContext({
        locale, serviceWorkers: 'block', viewport: viewportName === 'desktop'
          ? { width: 1440, height: 900 } : { width: 390, height: 844 },
      });
      const page = await context.newPage();
      page.setDefaultTimeout(20_000);
      await configureNativeBrowserLanguage(context, locale);
      const screenshot = async stage => {
        const name = `${locale}-${viewportName}-${stage}.png`;
        await page.screenshot({ path: join(output, name), fullPage: true });
        row[`${stage}Screenshot`] = name;
      };
      let authenticated = false;
      let appdata;
      const pending = [];
      page.on('response', response => {
        const url = new URL(response.url());
        if (url.origin !== origin || !url.pathname.startsWith(`/api/${appId}/`)) return;
        const request = response.request();
        row.responses.push({ path: clean(url.pathname), status: response.status(), method: request.method(), authenticated });
        if (url.pathname === `/api/${appId}/appdata` && response.status() === 200) {
          pending.push((async () => {
            const headers = await request.allHeaders();
            appdata = { status: 200, error: null, data: await response.json() };
            row.appdataHeaders = { srforgid: headers.srforgid ?? null, srfsystemid: headers.srfsystemid ?? null,
              authorizationPresent: Boolean(headers.authorization) };
          })().catch(error => row.errors.push({ type: 'appdata', message: clean(error.message) })));
        }
      });
      page.on('pageerror', error => row.errors.push({ type: 'pageerror', message: clean(error.message) }));
      page.on('console', message => {
        if (message.type() === 'error') row.errors.push({ type: 'console', authenticated, message: clean(message.text()) });
      });
      await context.route('**/*', route => {
        const request = route.request();
        const url = new URL(request.url());
        const method = request.method();
        const sessionRefresh = method === 'GET' &&
          new RegExp(`^/api/${appId}/uaa/refresh_token/[A-Za-z0-9-]+$`).test(url.pathname);
        const counterRead = method === 'POST' && url.pathname === `/api/${appId}/work_items/count_my_todo`;
        if (url.origin === origin && (sessionRefresh || counterRead ||
          readOnlyBrowserRequestAllowed({ method, path: url.pathname }, readPolicy))) {
          return route.continue();
        }
        row.blocked.push({ method, path: clean(url.pathname), origin: url.origin });
        return route.abort('blockedbyclient');
      });
      try {
        const entry = new URL(app.entry);
        entry.hash = `/psdevslnsys=${root.rootId}/modelingindex/-`;
        await page.goto(entry.href, { waitUntil: 'domcontentloaded' });
        await page.locator('input[type="password"]').first().waitFor();
        await screenshot('login');
        await page.locator('input[type="text"]').first().fill(actor.loginname);
        await page.locator('input[type="password"]').first().fill(credentials.users[actor.loginname]);
        row.stages.login = await captureNativeLogin(page, { entry: app.entry, applicationId: appId },
          () => submitNativeLogin(page, locale));
        authenticated = true;
        const deadline = Date.now() + 30_000;
        while (!appdata && Date.now() < deadline) {
          await Promise.all(pending); await page.waitForTimeout(100);
        }
        assert.ok(appdata, 'Normal login did not produce authenticated appdata');
        verifyModelingAppData(appdata, actor, { system: 'ibizmodeling', organization: `${actor.centerId}_org` });
        assert.deepEqual(row.appdataHeaders, { srforgid: `${actor.centerId}_org`,
          srfsystemid: 'ibizmodeling', authorizationPresent: true });
        row.stages.bootstrap = { status: 'PASS', naturallyAuthenticatedAppdata: true };
        try {
          row.stages.home = { status: 'PASS', evidence: await waitForNativeIndexReady(page, {
            application: 'ModelDesign', applicationId: appId,
            indexPath: 'PSSYSAPPS/ModelDesign/PSAPPINDEXVIEWS/ModelingIndex.json',
          }) };
        } catch (error) { row.stages.home = { status: 'FAIL', error: clean(error.message), evidence: error.evidence }; }
        await screenshot('home');
        const index = await page.evaluate(collectNativeIndexEvidence, {
          application: 'ModelDesign', applicationId: appId,
          indexPath: 'PSSYSAPPS/ModelDesign/PSAPPINDEXVIEWS/ModelingIndex.json',
        });
        const items = index.menus.filter(menu => menu.name === 'leftsidemenu').flatMap(menu => menu.items)
          .filter(item => item.target?.viewId?.toLowerCase().endsWith('pssystemmainsidebartreeview') &&
            item.visible === true && item.permitted === true && item.dom.length === 1 && !item.dom[0].disabled);
        assert.equal(items.length, 1, 'System menu must resolve uniquely from its actual model');
        const locator = page.locator(items[0].dom[0].selector);
        row.pointer = await locator.evaluate(element => {
          const rect = element.getBoundingClientRect();
          const hit = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
          return { rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
            hit: hit ? { tag: hit.tagName, className: hit.className, text: hit.textContent?.slice(0, 180) } : null,
            targetReceivesPointer: Boolean(hit && (hit === element || element.contains(hit))) };
        });
        row.openDrawers = await page.locator('.ibiz-drawer.open').count();
        if (!row.pointer.targetReceivesPointer && row.openDrawers > 0) {
          await page.keyboard.press('Escape');
          await page.waitForTimeout(200);
          row.normalDrawerDismissal = {
            operation: 'trusted-keyboard-Escape', before: row.openDrawers,
            after: await page.locator('.ibiz-drawer.open').count(),
          };
          await screenshot('after-escape');
        }
        try {
          await locator.click();
          row.stages.systemMenu = { status: 'CLICKED-NOT-YET-NAVIGATION-ACCEPTED' };
        } catch (error) {
          row.stages.systemMenu = { status: 'FAIL', error: clean(error.message) };
        }
        await screenshot('menu');
        row.status = row.stages.home.status === 'PASS' && row.stages.systemMenu.status.startsWith('CLICKED')
          && row.blocked.length === 0 ? 'BOOTSTRAP-AND-NATURAL-CLICK-OBSERVED-NOT-NATIVE-ACCEPTED' : 'FAILED';
      } catch (error) {
        row.error = clean(error.message);
        await screenshot('failure').catch(() => {});
      } finally {
        await Promise.all(pending);
        row.finishedAt = new Date().toISOString();
        const matrix = report.matrix.find(value => value.actor === actor.loginname && value.rootId === root.rootId &&
          value.locale === locale && value.viewport === viewportName);
        matrix.status = row.status;
        await context.close();
        dirs.write(directory, `${locale}-${viewportName}.private.json`, json(row));
        console.log(JSON.stringify({ locale, viewport: viewportName, status: row.status,
          bootstrap: row.stages.bootstrap?.status, menu: row.stages.systemMenu?.status, error: row.error }));
      }
    }
    guard(true);
    report.status = report.cases.every(row => row.status.startsWith('BOOTSTRAP'))
      ? 'OBSERVED-BOOTSTRAP-NATURAL-CLICK-NOT-FULL-ACCEPTANCE' : 'FAILED-LIVE-BROWSER-REMAINING-BLOCKERS';
  } catch (error) { report.error = clean(error.message); }
  finally {
    await browser?.close();
    report.finishedAt = new Date().toISOString();
    report.inputs = bound;
    dirs.write(directory, 'report.private.json', json(report));
    dirs.close();
  }
  console.log(JSON.stringify({ output, status: report.status, cases: report.cases.length }));
  if (!report.status.startsWith('OBSERVED')) process.exitCode = 1;
  return report;
}

export async function main(argv = process.argv.slice(2)) {
  const { values } = parseArgs({ args: argv, options: {
    launch: { type: 'string' }, 'launch-sha256': { type: 'string' }, 'state-sha256': { type: 'string' },
    deployment: { type: 'string' }, 'deployment-sha256': { type: 'string' },
    'run-id': { type: 'string' }, actor: { type: 'string' }, 'root-side': { type: 'string' },
    output: { type: 'string' }, 'run-readonly-browser': { type: 'boolean' },
  } });
  return runBootstrapBrowser({
    launch: values.launch, launchSha256: values['launch-sha256'], stateSha256: values['state-sha256'],
    deployment: values.deployment, deploymentSha256: values['deployment-sha256'],
    runId: values['run-id'], actor: values.actor, rootSide: values['root-side'],
    output: values.output, runReadonlyBrowser: values['run-readonly-browser'],
  });
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(clean(error.message)); process.exitCode = 1; });
}
