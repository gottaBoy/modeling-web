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
  collectNativeIndexEvidence, configureNativeBrowserLanguage, submitNativeLogin,
} from './native-modeldesign.browser.mjs';

const workspace = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const hash = value => createHash('sha256').update(value).digest('hex');
const appId = 'ibizmodeling__modeldesign';
const clean = value => String(value).replace(/(refresh_token\/)[^/"'\s?]+/gi, '$1[redacted]')
  .replace(/(Bearer\s+)[A-Za-z0-9_.-]+/gi, '$1[redacted]');
const inside = (root, value) => {
  const path = resolve(workspace, value);
  const child = relative(resolve(root), path);
  assert.ok(child && !child.startsWith('../') && !child.startsWith('/'));
  return path;
};

export const permissionCases = Object.freeze([
  { id: 'viewer-own-a-zh-desktop', actorRole: 'viewer', actorSide: 'a', rootSide: 'a', locale: 'zh-CN', viewport: 'desktop' },
  { id: 'no-access-own-a-en-desktop', actorRole: 'no-access', actorSide: 'a', rootSide: 'a', locale: 'en-US', viewport: 'desktop' },
  { id: 'viewer-own-b-zh-mobile', actorRole: 'viewer', actorSide: 'b', rootSide: 'b', locale: 'zh-CN', viewport: 'mobile' },
  { id: 'no-access-own-b-en-mobile', actorRole: 'no-access', actorSide: 'b', rootSide: 'b', locale: 'en-US', viewport: 'mobile' },
  { id: 'editor-cross-a-to-b-zh-desktop', actorRole: 'editor', actorSide: 'a', rootSide: 'b', locale: 'zh-CN', viewport: 'desktop' },
  { id: 'editor-cross-b-to-a-en-mobile', actorRole: 'editor', actorSide: 'b', rootSide: 'a', locale: 'en-US', viewport: 'mobile' },
]);

function publicRootReady(evidence, rootId) {
  const view = evidence?.index;
  return evidence?.matchingIndexCount === 1 && view?.controllerId === view?.domId &&
    view.appId === appId && view.lifecycle?.isCreated === true &&
    view.lifecycle?.isMounted === true && view.lifecycle?.isLoading === false &&
    view.lifecycle?.isDestroyed === false && view.lifecycle?.hasError === false &&
    (view.context?.psdevslnsys === rootId || view.model?.context?.psdevslnsys === rootId);
}

async function waitRoot(page, options) {
  const deadline = Date.now() + 35_000;
  let evidence;
  while (Date.now() < deadline) {
    try {
      evidence = await page.evaluate(collectNativeIndexEvidence, options);
      if (publicRootReady(evidence, options.rootId)) return evidence;
    } catch (error) {
      if (!/Execution context was destroyed|Cannot find context with specified id/.test(error.message)) throw error;
    }
    await page.waitForTimeout(100);
  }
  const error = new Error(`ModelDesign root did not become ready for ${options.rootId}`);
  error.evidence = evidence;
  throw error;
}

function allApiReadOrLogin(request, origin) {
  const url = new URL(request.url());
  if (url.origin !== origin) return false;
  if (['GET', 'HEAD'].includes(request.method())) return true;
  if (request.method() !== 'POST') return false;
  return url.pathname === `/api/${appId}/v7/login` ||
    url.pathname === `/api/${appId}/work_items/count_my_todo` ||
    /\/fetch[a-z0-9_]+$/.test(url.pathname);
}

export async function runPermissionBrowser(options) {
  assert.equal(options.runReadonlyBrowser, true);
  for (const key of ['launchSha256', 'stateSha256', 'deploymentSha256']) assert.match(options[key] ?? '', /^[a-f0-9]{64}$/);
  assert.match(options.runId ?? '', /^[a-f0-9]{12}$/);
  const output = inside(join(workspace, '.artifacts/owned-modeling-permission-browser'), options.output);
  assert.equal(dirname(output), join(workspace, '.artifacts/owned-modeling-permission-browser'));
  assert.match(basename(output), /^[a-z0-9][a-z0-9-]{0,95}$/);
  assert.ok(!fs.existsSync(output));
  const dirs = new PinnedDirectories();
  const bound = [];
  const read = (path, sha, privateInput = false) => {
    path = inside(workspace, path);
    const file = readPinnedFile(dirs, dirs.open(dirname(path)), basename(path));
    if (sha) assert.equal(hash(file.data), sha);
    if (privateInput) {
      assert.equal(file.identity.uid, process.geteuid());
      assert.equal(file.identity.mode & 0o077, 0);
    }
    bound.push({ path, bytes: file.data.length, sha256: hash(file.data) });
    return JSON.parse(file.data);
  };
  const dir = dirs.open(output, { create: true, exclusive: true });
  const report = {
    contract: 'owned-modeling-permission-readonly-browser-v1', status: 'FAILED',
    runId: options.runId, nativeAcceptance: false, permissionAcceptance: false,
    modelWritesRequested: false, identityOrHeaderInjection: false, acceptedForProduction: false,
    cases: [], startedAt: new Date().toISOString(),
  };
  let browser;
  try {
    const launch = inside(join(workspace, '.artifacts/owned-native-modeldesign-launch'), options.launch);
    const launchReport = read(join(launch, 'report.json'), options.launchSha256);
    assert.equal(launchReport.status, 'RUNNING-OWNED-FRONTEND-NOT-ACCEPTED');
    const state = read(join(launch, 'launch-state.private.json'), options.stateSha256, true);
    const input = read(launchReport.input.path, launchReport.input.sha256);
    const deploymentPath = inside(join(workspace, '.artifacts/native-nonadmin-fixtures', options.runId), options.deployment);
    const deployment = read(deploymentPath, options.deploymentSha256, true);
    assert.equal(input.ownedBackend.deploymentInput.sha256, options.deploymentSha256);
    assert.equal(deployment.runId, options.runId);
    const manifest = read(input.ownedBackend.manifest.path, input.ownedBackend.manifest.sha256);
    const credentials = read(join(dirname(input.ownedBackend.manifest.path), 'credentials.private.json'), undefined, true);
    const specs = state.bridges.map(bridge => ({
      bridge, spec: read(bridge.specPath, bridge.specSha256, true),
    }));
    const guard = full => {
      for (const file of bound) {
        const current = readPinnedFile(dirs, dirs.open(dirname(file.path)), basename(file.path));
        assert.equal(hash(current.data), file.sha256);
      }
      for (const { bridge, spec } of specs) {
        assert.equal(spec.runtime.deploymentPath, deploymentPath);
        verifyBridgeProcess(bridge.identity, bridge.specPath, bridge.specSha256);
        verifyOwnedBridgeRuntime({ workspace, directories: dirs, input,
          runtime: spec.runtime, frontendPins: spec.frontendPins, fullMountedHash: full });
      }
    };
    guard(true);
    const app = input.applications.find(row => row.application === 'ModelDesign');
    const origin = new URL(app.entry).origin;
    const require = createRequire(join(workspace, 'ibiz-app-hub/package.json'));
    browser = await launchChromium(require('playwright').chromium, { args: ['--no-sandbox'] });
    for (const spec of permissionCases) {
      const actor = manifest.users.find(user => user.role === spec.actorRole && user.centerId.endsWith(`_${spec.actorSide}`));
      const root = manifest.roots.find(value => value.side === spec.rootSide);
      assert.ok(actor && root);
      const row = {
        ...spec, actor: actor.loginname, rootId: root.rootId, expectedOwnRootRead: actor.rootId === root.rootId &&
          ['editor', 'viewer'].includes(actor.role), status: 'FAILED', responses: [], blocked: [], errors: [],
      };
      report.cases.push(row);
      const context = await browser.newContext({
        locale: spec.locale, viewport: spec.viewport === 'desktop' ? { width: 1440, height: 900 } : { width: 390, height: 844 },
        serviceWorkers: 'block',
      });
      await configureNativeBrowserLanguage(context, spec.locale);
      const page = await context.newPage();
      page.setDefaultTimeout(20_000);
      page.on('response', response => {
        const url = new URL(response.url());
        if (url.origin === origin && url.pathname.startsWith(`/api/${appId}/`)) row.responses.push({
          path: clean(url.pathname), status: response.status(), method: response.request().method(),
        });
      });
      page.on('console', message => { if (message.type() === 'error') row.errors.push(clean(message.text())); });
      page.on('pageerror', error => row.errors.push(clean(error.message)));
      await context.route('**/*', route => {
        if (allApiReadOrLogin(route.request(), origin)) return route.continue();
        row.blocked.push({ method: route.request().method(), path: clean(new URL(route.request().url()).pathname) });
        return route.abort('blockedbyclient');
      });
      try {
        const entry = new URL(app.entry);
        entry.hash = `/psdevslnsys=${root.rootId}/modelingindex/-`;
        await page.goto(entry.href, { waitUntil: 'domcontentloaded' });
        await page.locator('input[type="password"]').first().waitFor();
        await page.locator('input[type="text"]').first().fill(actor.loginname);
        await page.locator('input[type="password"]').first().fill(credentials.users[actor.loginname]);
        await captureNativeLogin(page, { entry: app.entry, applicationId: appId },
          () => submitNativeLogin(page, spec.locale));
        row.login = 'PASS';
        const evidence = await waitRoot(page, {
          application: 'ModelDesign', applicationId: appId,
          indexPath: 'PSSYSAPPS/ModelDesign/PSAPPINDEXVIEWS/ModelingIndex.json', rootId: root.rootId,
        });
        row.home = 'PASS';
        row.menu = evidence.menus.filter(menu => menu.name === 'leftsidemenu').flatMap(menu =>
          menu.items.filter(item => item.visible === true).map(item => ({
            caption: item.caption, permitted: item.permitted, disabled: item.disabled,
            dom: item.dom.length,
          })));
        row.permittedMenuCount = row.menu.filter(item => item.permitted).length;
        row.postLogin401 = row.responses.filter(item => item.status === 401);
        row.readStatuses = row.responses.filter(item => /\/fetch[a-z0-9_]+$/.test(item.path))
          .map(item => item.status);
        row.screenshot = `${spec.id}.png`;
        await page.screenshot({ path: join(output, row.screenshot), fullPage: true });
        row.status = 'OBSERVED-READONLY-MATRIX-NOT-ACCEPTED';
      } catch (error) {
        row.error = clean(error.message);
        await page.screenshot({ path: join(output, `${spec.id}-failure.png`), fullPage: true }).catch(() => {});
      } finally { await context.close(); }
    }
    guard(true);
    report.status = 'OBSERVED-READONLY-MATRIX-NOT-FULL-ACCEPTANCE';
  } catch (error) {
    report.error = clean(error.message);
  } finally {
    await browser?.close();
    report.finishedAt = new Date().toISOString();
    report.inputs = bound;
    dirs.write(dir, 'report.private.json', `${JSON.stringify(report, null, 2)}\n`);
    dirs.close();
  }
  console.log(JSON.stringify({ output, status: report.status,
    cases: report.cases.map(row => ({ id: row.id, status: row.status, postLogin401: row.postLogin401?.length ?? null })) }));
  return report;
}

export async function main(argv = process.argv.slice(2)) {
  const { values } = parseArgs({ args: argv, options: {
    launch: { type: 'string' }, 'launch-sha256': { type: 'string' }, 'state-sha256': { type: 'string' },
    deployment: { type: 'string' }, 'deployment-sha256': { type: 'string' }, 'run-id': { type: 'string' },
    output: { type: 'string' }, 'run-readonly-browser': { type: 'boolean' },
  } });
  return runPermissionBrowser({
    launch: values.launch, launchSha256: values['launch-sha256'], stateSha256: values['state-sha256'],
    deployment: values.deployment, deploymentSha256: values['deployment-sha256'],
    runId: values['run-id'], output: values.output, runReadonlyBrowser: values['run-readonly-browser'],
  });
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(clean(error.message)); process.exitCode = 1; });
}
