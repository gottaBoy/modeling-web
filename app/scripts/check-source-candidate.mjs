#!/usr/bin/env node
import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { containedFile } from './audit-source-contracts.mjs';
import { fingerprint } from '../../../scripts/localization-baseline.mjs';

const workspace = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const require = createRequire(join(workspace, 'ibiz-app-hub/package.json'));
const { chromium, devices } = require('playwright');
const safeUrl = value => {
  try {
    const url = new URL(value);
    return url.origin + url.pathname;
  } catch {
    return String(value).slice(0, 200);
  }
};
const safeMessage = value =>
  String(value)
    .replace(/Bearer\s+\S+/gi, 'Bearer [redacted]')
    .replace(/https?:\/\/[^\s"'<>]+/g, safeUrl)
    .slice(0, 4000);

export function isExpectedLoginTransition(
  event,
  { loginVisible, appDataUnauthorized },
) {
  if (!loginVisible || !appDataUnauthorized) return false;
  if (
    event.message.includes('status of 401') &&
    event.source.endsWith('/api/ibizmodeling__modeldesign/appdata')
  )
    return true;
  return event.message.includes(
    'Navigation aborted from "/" to "/-/index/-" via a navigation guard.',
  );
}

// The runtime's AppHub.loadExtensionPlugin requests
// `${baseUrl}/${appId}${remoteModelUrl}/ext/package.json` for every hub
// sub-application and catches any failure with a warn-level log
// (runtime.application.noExtensionPlugin). The original backend endpoint
// `/{id}/extension/dynamodels/pssysapps/{app}/ext/**` also answers 404 when the
// application has no extension plugin, and the working deployment on 32003
// returns 404 for the same path. That 404 is therefore the platform's own
// "no extension plugin" response, not a delivery failure. Only this exact
// manifest path is classified as expected; other model files are not.
const extensionManifestPattern =
  /^\/api\/[A-Za-z0-9_]+__[A-Za-z0-9_]+\/remotemodel\/ext\/package\.json$/;

export function isExpectedExtensionManifestMiss(item) {
  if (item.status !== 404) return false;
  try {
    return extensionManifestPattern.test(new URL(item.url).pathname);
  } catch {
    return false;
  }
}

export function isExpectedExtensionManifestConsole(event) {
  if (!event.message.includes('status of 404')) return false;
  try {
    return extensionManifestPattern.test(new URL(event.source).pathname);
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Authenticated read-only phase helpers (pure, unit-tested).
// ---------------------------------------------------------------------------

// Removes credential values from any text before it is recorded. Tokens are
// already redacted by safeMessage; this covers the login name/password that
// the checker itself typed, should they ever be echoed by the page.
export function redactSecrets(value, secrets = []) {
  let text = String(value);
  for (const secret of secrets) {
    if (!secret || secret.length < 3) continue;
    text = text.split(secret).join('[redacted]');
    text = text.split(encodeURIComponent(secret)).join('[redacted]');
  }
  return text;
}

// The verification proxy answers 403 with {code:'CANDIDATE_READ_ONLY'} for a
// POST that is not on its allow list. When the UI's read flow needs such a
// call, the candidate cannot be blamed: it is a proxy scope finding.
export function isProxyReadOnlyBlock(item) {
  return item.status === 403 && item.bodyCode === 'CANDIDATE_READ_ONLY';
}

// The candidate lane sets pluginBaseUrl to "/modeldesign/plugins". The
// runtime's PluginFactory.parseUrl treats a non-URL base as relative to
// window.location.pathname ("/modeldesign/"), so the first stylesheet request
// for a remote plugin goes to "/modeldesign/modeldesign/plugins/.../style.css"
// and answers 404 before the correct path is fetched. It is a candidate
// configuration finding (the working deployment loads the same files with 200).
const doubledPluginBasePattern =
  /^\/modeldesign\/modeldesign\/plugins\/.+\/dist\/style\.css$/;

export function isDoubledPluginBaseMiss(item) {
  if (item.status !== 404) return false;
  try {
    return doubledPluginBasePattern.test(new URL(item.url).pathname);
  } catch {
    return false;
  }
}

// Classifies one HTTP response recorded during an authenticated step.
export function classifyAuthenticatedResponse(item) {
  if (item.status < 400) return 'ok';
  if (isExpectedExtensionManifestMiss(item)) return 'expected-extension-manifest-404';
  if (isProxyReadOnlyBlock(item)) return 'proxy-read-only-block';
  if (isDoubledPluginBaseMiss(item)) return 'candidate-plugin-base-doubled-404';
  return 'unexpected';
}

// Classifies one console error recorded during an authenticated step, given
// the responses of the same step so that "Failed to load resource" lines can
// be tied to an already-classified response.
export function classifyAuthenticatedConsole(event, responses = []) {
  if (isExpectedExtensionManifestConsole(event))
    return 'expected-extension-manifest-404';
  const status = /status of (\d{3})/.exec(event.message)?.[1];
  if (status) {
    const match = responses.find(
      item =>
        String(item.status) === status &&
        safeUrl(item.url) === safeUrl(event.source),
    );
    if (match) {
      const category = classifyAuthenticatedResponse(match);
      if (category !== 'ok') return category;
    }
  }
  // loglevel prints the bare Event object handed to a <link>.onerror handler
  // when a plugin stylesheet fails; attribute it only while the same step
  // actually recorded a doubled-base stylesheet 404.
  if (
    /ERROR: Event$/.test(event.message.trim()) &&
    responses.some(isDoubledPluginBaseMiss)
  )
    return 'candidate-plugin-base-doubled-404';
  return 'unexpected';
}

// Extracts the first "url:line:column" frame from a browser error stack.
export function parseStackFrame(stack) {
  const match = /(https?:\/\/[^\s()]+?):(\d+):(\d+)\)?/.exec(String(stack));
  if (!match) return null;
  return {
    url: match[1],
    line: Number(match[2]),
    column: Number(match[3]),
  };
}

// Minimal source-map v3 resolver (base64 VLQ), dependency free. Lines and
// columns are 1-based on input and output, like browser stacks.
const vlqChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

export function resolveSourceMapPosition(map, line, column) {
  const lines = String(map.mappings || '').split(';');
  const target = lines[line - 1];
  if (target === undefined) return null;
  let source = 0;
  let sourceLine = 0;
  let sourceColumn = 0;
  let name = 0;
  for (let index = 0; index < line - 1; index++) {
    for (const segment of lines[index].split(',')) {
      if (!segment) continue;
      const values = decodeVlq(segment);
      if (values.length >= 4) {
        source += values[1];
        sourceLine += values[2];
        sourceColumn += values[3];
        if (values.length >= 5) name += values[4];
      }
    }
  }
  let generatedColumn = 0;
  let best = null;
  for (const segment of target.split(',')) {
    if (!segment) continue;
    const values = decodeVlq(segment);
    generatedColumn += values[0];
    if (values.length >= 4) {
      source += values[1];
      sourceLine += values[2];
      sourceColumn += values[3];
      if (values.length >= 5) name += values[4];
      if (generatedColumn <= column - 1)
        best = {
          source: map.sources?.[source] ?? null,
          line: sourceLine + 1,
          column: sourceColumn + 1,
          name: values.length >= 5 ? (map.names?.[name] ?? null) : null,
        };
    }
    if (generatedColumn > column - 1) break;
  }
  return best;
}

function decodeVlq(segment) {
  const values = [];
  let shift = 0;
  let value = 0;
  for (const char of segment) {
    const digit = vlqChars.indexOf(char);
    if (digit < 0) throw new Error(`Invalid VLQ character ${char}`);
    value += (digit & 31) << shift;
    if (digit & 32) shift += 5;
    else {
      const negative = value & 1;
      value >>= 1;
      values.push(negative ? -value : value);
      shift = 0;
      value = 0;
    }
  }
  return values;
}

const slug = value =>
  String(value)
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40) || 'step';

// Resolves a browser stack frame to the candidate's served source map when
// the script comes from the candidate dist and a sibling ".map" exists.
async function resolveFrame(run, frame) {
  if (!frame) return null;
  try {
    const pathname = new URL(frame.url).pathname;
    if (!pathname.startsWith('/modeldesign/')) return { mapped: false };
    const file = await containedFile(
      join(run, 'dist'),
      join(run, 'dist', pathname.slice('/modeldesign/'.length)),
    );
    if (!existsSync(`${file}.map`)) return { mapped: false, file };
    const map = JSON.parse(await readFile(`${file}.map`, 'utf8'));
    return {
      mapped: true,
      file,
      position: resolveSourceMapPosition(map, frame.line, frame.column),
    };
  } catch (error) {
    return { mapped: false, error: safeMessage(error.message) };
  }
}

// Authenticated READ-ONLY phase. Only runs when credentials are provided via
// AIBIZ_LOGINNAME / AIBIZ_PASSWORD. It never exercises a write: the proxy
// blocks them anyway, and the phase only navigates, opens list/portal views
// and logs out.
async function runAuthenticatedPhase({
  browser,
  server,
  origin,
  output,
  run,
  credentials,
}) {
  const secrets = [credentials.loginname, credentials.password];
  const redact = value => redactSecrets(safeMessage(value), secrets);
  const withTimeout = (promise, ms, label) =>
    Promise.race([
      Promise.resolve(promise),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms),
      ),
    ]);
  const phase = {
    scope:
      'Authenticated read-only workflows: login, workbench, menu navigation, list/portal views, dictionary loads and logout. No create/update/delete was exercised; the proxy blocks explicit writes.',
    loginname: '[redacted]',
    verified: false,
    loginSucceeded: false,
    menuEntries: [],
    findings: [],
    views: [],
  };
  const viewports = [
    ['desktop', { viewport: { width: 1440, height: 900 } }, true],
    [
      'mobile-viewport',
      {
        ...devices['Pixel 7'],
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 1,
      },
      false,
    ],
  ];
  for (const [name, options, full] of viewports) {
    const view = { name, steps: [], blockedExternal: [] };
    phase.views.push(view);
    const context = await browser.newContext({ ...options, locale: 'zh-CN' });
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.origin === origin || ['data:', 'blob:'].includes(url.protocol))
        return route.continue();
      view.blockedExternal.push(safeUrl(url.href));
      return route.abort('blockedbyclient');
    });
    let step = null;
    let pending = [];
    let lastResponseAt = Date.now();
    let page;
    let cdp;
    let scripts;
    let pausedEvent = null;
    // A page with a CDP debugger attached up front: Debugger.pause is one of
    // the few protocol commands the renderer honours while its main thread is
    // busy, so a hung page can still hand back its call stack.
    const openPage = async () => {
      page = await context.newPage();
      scripts = new Map();
      pausedEvent = null;
      cdp = await context.newCDPSession(page);
      cdp.on('Debugger.scriptParsed', event =>
        scripts.set(event.scriptId, event.url),
      );
      cdp.on('Debugger.paused', event => {
        pausedEvent = event;
      });
      await cdp.send('Debugger.enable');
      page.on('console', message => {
        if (message.type() === 'error' && step)
          step.consoleErrors.push({
            message: redact(message.text()),
            source: safeUrl(message.location().url),
          });
      });
      page.on('pageerror', error => {
        if (!step) return;
        const stack = String(error.stack || error.message);
        step.pageErrors.push({
          message: redact(stack),
          frame: parseStackFrame(stack),
        });
      });
      page.on('requestfailed', request => {
        if (step)
          step.failedRequests.push({
            method: request.method(),
            url: safeUrl(request.url()),
            error: request.failure()?.errorText,
          });
      });
      page.on('response', response => {
        lastResponseAt = Date.now();
        if (!step) return;
        const item = {
          status: response.status(),
          method: response.request().method(),
          url: safeUrl(response.url()),
        };
        step.responses.push(item);
        if (
          item.status >= 400 &&
          new URL(response.url()).pathname.startsWith('/api/') &&
          /json/.test(response.headers()['content-type'] || '')
        )
          pending.push(
            response
              .text()
              .then(text => {
                const body = JSON.parse(text);
                if (typeof body?.code === 'string') item.bodyCode = body.code;
              })
              .catch(() => {}),
          );
      });
    };
    const settle = async (quiet = 1500, max = 15000) => {
      const started = Date.now();
      lastResponseAt = Date.now();
      while (Date.now() - started < max) {
        await page.waitForTimeout(250);
        if (Date.now() - lastResponseAt >= quiet) break;
      }
      await Promise.all(pending);
      pending = [];
    };
    const responsive = () =>
      withTimeout(page.evaluate(() => true), 5000, 'main thread probe')
        .then(() => true)
        .catch(() => false);
    const bodyText = () =>
      withTimeout(
        page.evaluate(() =>
          document.body.innerText.replace(/\s+/g, ' ').slice(0, 300),
        ),
        5000,
        'body text',
      ).then(redact, () => null);
    const tabTexts = () =>
      withTimeout(
        page.locator('.el-tabs__item, [role="tab"]').allInnerTexts(),
        5000,
        'tabs',
      ).then(
        items => items.map(item => item.trim()).filter(Boolean).slice(0, 20),
        () => [],
      );
    // Captures the call stack of a page whose main thread no longer yields.
    const captureBlockedStack = async () => {
      pausedEvent = null;
      try {
        await withTimeout(cdp.send('Debugger.pause'), 5000, 'Debugger.pause');
        for (let attempt = 0; attempt < 20 && !pausedEvent; attempt++)
          await new Promise(resolve => setTimeout(resolve, 250));
        if (!pausedEvent) return null;
        const frames = await Promise.all(
          pausedEvent.callFrames.slice(0, 15).map(async frame => {
            const url = scripts.get(frame.location.scriptId) || '';
            const entry = {
              function: frame.functionName || '<anonymous>',
              url: safeUrl(url),
              line: frame.location.lineNumber + 1,
              column: frame.location.columnNumber + 1,
            };
            entry.resolved = await resolveFrame(run, { ...entry, url });
            return entry;
          }),
        );
        await withTimeout(cdp.send('Debugger.resume'), 5000, 'resume').catch(
          () => {},
        );
        return { reason: pausedEvent.reason, frames };
      } catch (error) {
        return { error: redact(error.message) };
      }
    };
    const replacePage = async () => {
      await withTimeout(page.close(), 10000, 'page.close').catch(() => {});
      await openPage();
      await page.goto(server.url, {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });
      await page
        .locator('.ibiz-control-appmenu__item')
        .first()
        .waitFor({ state: 'visible', timeout: 30000 })
        .catch(() => {});
      await settle();
    };
    const runStep = async (label, action) => {
      step = {
        step: label,
        startedAt: new Date().toISOString(),
        responses: [],
        consoleErrors: [],
        pageErrors: [],
        failedRequests: [],
      };
      const index = view.steps.length + 1;
      view.steps.push(step);
      const current = step;
      try {
        const detail = await withTimeout(action(current), 90000, label);
        if (detail) Object.assign(current, detail);
        await settle();
      } catch (error) {
        current.error = redact(error.message);
      }
      current.url = safeUrl(page.url()) + (new URL(page.url()).hash || '');
      current.mainThreadResponsive = await responsive();
      current.screenshot = join(output, `auth-${name}-${index}-${slug(label)}.png`);
      if (current.mainThreadResponsive)
        await page
          .screenshot({ path: current.screenshot, fullPage: false, timeout: 15000 })
          .catch(error => {
            current.screenshotError = redact(error.message);
          });
      else {
        current.screenshotError = 'main thread blocked; screenshot skipped';
        current.blockedStack = await captureBlockedStack();
        current.error =
          current.error ||
          'Page main thread stopped yielding after this step (JavaScript hang)';
      }
      await Promise.all(pending);
      pending = [];
      for (const item of current.pageErrors)
        item.resolved = await resolveFrame(run, item.frame);
      current.httpErrors = current.responses
        .filter(item => item.status >= 400)
        .map(item => ({ ...item, category: classifyAuthenticatedResponse(item) }));
      current.consoleErrors = current.consoleErrors.map(item => ({
        ...item,
        category: classifyAuthenticatedConsole(item, current.responses),
      }));
      current.unexpectedHttpErrors = current.httpErrors.filter(
        item => item.category === 'unexpected',
      );
      current.unexpectedConsoleErrors = current.consoleErrors.filter(
        item => item.category === 'unexpected',
      );
      current.dictionaryLoads = current.responses.filter(
        item =>
          item.status === 200 &&
          /\/(PSAPPCODELISTS|codelists?)\//.test(item.url),
      ).length;
      current.findingCategories = [
        ...new Set(
          [...current.httpErrors, ...current.consoleErrors]
            .map(item => item.category)
            .filter(
              category => !['ok', 'expected-extension-manifest-404'].includes(category),
            ),
        ),
      ];
      const failed =
        current.error ||
        !current.mainThreadResponsive ||
        current.pageErrors.length ||
        current.unexpectedHttpErrors.length ||
        current.unexpectedConsoleErrors.length ||
        current.failedRequests.some(
          item => !current.httpErrors.some(error => error.url === item.url),
        );
      current.status = failed
        ? 'failed'
        : current.findingCategories.length
          ? 'passed-with-findings'
          : 'passed';
      // Keep the report compact: full 2xx/3xx lists are not needed per step.
      current.responseCount = current.responses.length;
      current.apiResponses = current.responses.filter(item =>
        /\/api\//.test(item.url),
      );
      delete current.responses;
      step = null;
      if (!current.mainThreadResponsive) {
        current.recovery = 'page closed and reopened for the following steps';
        await replacePage().catch(error => {
          current.recoveryError = redact(error.message);
        });
      }
      return current;
    };
    const menuItems = () => page.locator('.ibiz-control-appmenu__item');
    const workbenchVisible = async () =>
      (await menuItems().count()) > 0 &&
      !(await page
        .locator('input[type="password"]')
        .first()
        .isVisible()
        .catch(() => false));
    try {
      await openPage();
      await runStep('open-login', async () => {
        await page.goto(server.url, {
          waitUntil: 'domcontentloaded',
          timeout: 30000,
        });
        await page.waitForFunction(
          () => document.querySelector('#app')?.childElementCount > 0,
          null,
          { timeout: 20000 },
        );
        await page
          .locator('input[type="password"]')
          .first()
          .waitFor({ state: 'visible', timeout: 15000 });
        return { loginVisible: true };
      });
      const login = await runStep('login', async current => {
        const account = page
          .locator('input[placeholder="请输入账号"], input[type="text"]')
          .first();
        await account.fill(credentials.loginname);
        await page
          .locator('input[type="password"]')
          .first()
          .fill(credentials.password);
        await page.getByRole('button', { name: '登录' }).first().click();
        await page
          .locator('.ibiz-control-appmenu__item')
          .first()
          .waitFor({ state: 'visible', timeout: 30000 })
          .catch(() => {});
        await settle();
        const loginResponse = current.responses.find(item =>
          item.url.endsWith('/v7/login'),
        );
        const appData = current.responses.find(
          item => item.url.endsWith('/appdata') && item.status === 200,
        );
        const menu = (await menuItems().allInnerTexts())
          .map(text => text.trim())
          .filter(Boolean);
        return {
          loginStatus: loginResponse?.status ?? null,
          appDataStatus: appData?.status ?? null,
          workbenchVisible: await workbenchVisible(),
          menuEntries: menu,
        };
      });
      const loggedIn =
        login.loginStatus === 200 &&
        login.appDataStatus === 200 &&
        login.workbenchVisible;
      view.loginSucceeded = loggedIn;
      if (name === 'desktop') {
        phase.loginSucceeded = loggedIn;
        phase.menuEntries = login.menuEntries;
      }
      if (!loggedIn) {
        view.loginFailure = {
          loginStatus: login.loginStatus,
          appDataStatus: login.appDataStatus,
          workbenchVisible: login.workbenchVisible,
          pageText: await bodyText(),
        };
      } else {
        await runStep('workbench', async () => ({
          tabs: await tabTexts(),
          text: await bodyText(),
        }));
        if (full) {
          const clickTab = async text => {
            const tab = page
              .locator('.el-tabs__item, [role="tab"]', { hasText: text })
              .first();
            if (!(await tab.count())) return { present: false };
            await tab.click({ timeout: 10000 });
            await settle();
            return { present: true, text: await bodyText() };
          };
          await runStep('workbench-dashboard', () => clickTab('仪表盘'));
          for (const entry of login.menuEntries) {
            await runStep(`menu:${entry}`, async () => {
              await page.keyboard.press('Escape').catch(() => {});
              await menuItems()
                .filter({ hasText: entry })
                .first()
                .click({ timeout: 10000, noWaitAfter: true });
              await settle();
              return {
                menuEntry: entry,
                tabs: await tabTexts(),
                text: await bodyText(),
              };
            });
          }
          for (const [label, action] of authenticatedSubViews)
            await runStep(label, () =>
              action({ page, settle, redact, clickTab, bodyText, tabTexts }),
            );
        }
        await runStep('logout', async current => {
          const result = await withTimeout(
            page.evaluate(async () => {
              const auth = window.ibiz?.auth;
              if (auth && typeof auth.logout === 'function')
                return { via: 'ibiz.auth.logout', ok: await auth.logout() };
              await window.ibiz.net.get('/v7/logout');
              return { via: 'ibiz.net.get', ok: true };
            }),
            20000,
            'logout',
          );
          await settle();
          const logoutResponse = current.responses.find(item =>
            item.url.endsWith('/v7/logout'),
          );
          await page.reload({ waitUntil: 'domcontentloaded', timeout: 30000 });
          await page
            .locator('input[type="password"]')
            .first()
            .waitFor({ state: 'visible', timeout: 20000 })
            .catch(() => {});
          return {
            ...result,
            logoutStatus: logoutResponse?.status ?? null,
            loginVisibleAfterLogout: await page
              .locator('input[type="password"]')
              .first()
              .isVisible()
              .catch(() => false),
          };
        });
      }
    } catch (error) {
      view.error = redact(error.stack || error.message);
    } finally {
      await withTimeout(context.close(), 20000, 'context.close').catch(() => {});
    }
    view.stepsPassed = view.steps.filter(item => item.status === 'passed').length;
    view.stepsWithFindings = view.steps.filter(
      item => item.status === 'passed-with-findings',
    ).length;
    view.stepsFailed = view.steps.filter(item => item.status === 'failed').length;
  }
  const categories = new Map();
  for (const view of phase.views)
    for (const item of view.steps)
      for (const category of item.findingCategories || [])
        categories.set(category, [
          ...(categories.get(category) || []),
          `${view.name}/${item.step}`,
        ]);
  const explanations = {
    'proxy-read-only-block':
      'The verification proxy answered 403 CANDIDATE_READ_ONLY to a POST the UI issues during a read flow (not on the fetch_*/recents/login allow list). The workbench renders its 403 page for that tab. This limits what the candidate lane can verify; it is not a candidate defect and the proxy rules were not relaxed.',
    'candidate-plugin-base-doubled-404':
      'The candidate overrides pluginBaseUrl with "/modeldesign/plugins"; PluginFactory.parseUrl joins a non-URL base onto window.location.pathname, so the first stylesheet request for remote plugins goes to /modeldesign/modeldesign/plugins/.../style.css (404) before the correct path loads (200). Candidate configuration finding; the working deployment loads these styles with 200 on its first request.',
  };
  phase.findings = [...categories].map(([category, steps]) => ({
    category,
    steps,
    explanation: explanations[category] || null,
  }));
  const allSteps = phase.views.flatMap(view => view.steps);
  const hung = phase.views.flatMap(view =>
    view.steps
      .filter(item => item.mainThreadResponsive === false)
      .map(item => `${view.name}/${item.step}`),
  );
  if (hung.length)
    phase.findings.push({
      category: 'main-thread-hang',
      steps: hung,
      explanation:
        'The page main thread stopped yielding after the step (no evaluate/screenshot possible). The blockedStack of the step is the call stack captured through CDP Debugger.pause while hung.',
    });
  phase.pageErrors = phase.views.flatMap(view =>
    view.steps.flatMap(item =>
      item.pageErrors.map(error => ({
        view: view.name,
        step: item.step,
        url: item.url,
        ...error,
      })),
    ),
  );
  phase.dictionaryLoadsObserved = allSteps.reduce(
    (sum, item) => sum + (item.dictionaryLoads || 0),
    0,
  );
  phase.verified =
    phase.loginSucceeded &&
    phase.views.every(view => view.loginSucceeded && !view.error) &&
    allSteps.every(item => item.status === 'passed') &&
    !phase.views.some(view => view.blockedExternal.length);
  phase.status = !phase.loginSucceeded
    ? 'login-failed'
    : allSteps.some(item => item.status === 'failed') ||
        phase.views.some(view => view.error)
      ? 'failed'
      : phase.findings.length
        ? 'read-workflows-completed-with-findings'
        : 'read-workflows-passed';
  return phase;
}

// Read-only sub-views opened after the menu walk (desktop only). Each action
// receives the page helpers and returns details to record on its step.
const authenticatedSubViews = [];

export async function checkCandidate(run) {
  run = await containedFile(
    join(workspace, '.artifacts/frontend-candidates'),
    resolve(run),
  );
  const server = JSON.parse(await readFile(join(run, 'server.json'), 'utf8'));
  await mkdir(join(run, 'checks'), { recursive: true });
  const output = await mkdtemp(
    join(run, 'checks', `${new Date().toISOString().replaceAll(':', '-')}-`),
  );
  const report = {
    generatedAt: new Date().toISOString(),
    target: server.url,
    status: 'checking',
    deployable: false,
    authenticatedWorkflowsVerified: false,
    scope:
      'Isolated browser startup, visible images and read-only proxy checks; no business records are created.',
    expectedDiagnostics: {
      extensionManifest404:
        'A 404 for /api/<app>/remotemodel/ext/package.json is the platform "no extension plugin" response: AppHub.loadExtensionPlugin catches it with a warn log, the original ExtensionGatewayRestController returns 404 for a missing ext file, and the working 32003 deployment returns the same 404.',
    },
    views: [],
    proxyReads: [],
  };
  let browser;
  try {
    const executablePath = [
      process.env.CHROME_PATH,
      chromium.executablePath(),
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    ].find(path => path && existsSync(path));
    if (!executablePath) throw new Error('No local Chrome/Chromium executable');
    browser = await chromium.launch({
      headless: true,
      executablePath,
      timeout: 20000,
    });
    report.browserVersion = browser.version();
    const origin = new URL(server.url).origin;
    const probe = await browser.newPage();
    const healthResponse = await probe.goto(
      new URL('/__candidate/health', server.url).href,
      { timeout: 15000 },
    );
    const health = await healthResponse.json();
    if (
      health.identity !== (await fingerprint(join(run, 'report.json'))).sha256
    )
      throw new Error('Running server does not match candidate report');
    report.serverIdentityVerified = true;
    await probe.close();
    for (const [name, options] of [
      ['desktop', { viewport: { width: 1440, height: 900 } }],
      [
        'mobile-viewport',
        {
          ...devices['Pixel 7'],
          viewport: { width: 390, height: 844 },
          deviceScaleFactor: 1,
        },
      ],
    ]) {
      const result = {
        name,
        requests: [],
        blockedExternal: [],
        consoleErrors: [],
        pageErrors: [],
        failedRequests: [],
      };
      report.views.push(result);
      const context = await browser.newContext({ ...options, locale: 'zh-CN' });
      await context.route('**/*', route => {
        const url = new URL(route.request().url());
        if (url.origin === origin || ['data:', 'blob:'].includes(url.protocol))
          return route.continue();
        result.blockedExternal.push(safeUrl(url.href));
        return route.abort('blockedbyclient');
      });
      const page = await context.newPage();
      page.on('console', message => {
        if (message.type() === 'error')
          result.consoleErrors.push({
            message: safeMessage(message.text()),
            source: safeUrl(message.location().url),
          });
      });
      page.on('pageerror', error =>
        result.pageErrors.push(safeMessage(error.stack || error.message)),
      );
      page.on('requestfailed', request =>
        result.failedRequests.push({
          method: request.method(),
          url: safeUrl(request.url()),
          error: request.failure()?.errorText,
        }),
      );
      page.on('response', response =>
        result.requests.push({
          status: response.status(),
          url: safeUrl(response.url()),
        }),
      );
      try {
        await page.goto(server.url, {
          waitUntil: 'domcontentloaded',
          timeout: 30000,
        });
        await page
          .waitForFunction(
            () => document.querySelector('#app')?.childElementCount > 0,
            null,
            { timeout: 20000 },
          )
          .catch(() => {});
        await page.waitForTimeout(3000);
        result.loginVisible = await page
          .locator('input[type="password"]')
          .first()
          .isVisible()
          .catch(() => false);
        if (result.loginVisible) {
          const password = page.locator('input[type="password"]').first();
          await password.fill('candidate-input-check');
          result.passwordInputInteractive =
            (await password.inputValue()) === 'candidate-input-check';
          await password.clear();
        }
        result.page = await page.evaluate(() => ({
          title: document.title,
          appChildren: document.querySelector('#app')?.childElementCount || 0,
          appText:
            document.querySelector('#app')?.textContent?.trim().slice(0, 600) ||
            '',
          loadingVisible: (() => {
            const element = document.querySelector('#app-loading-x');
            return Boolean(
              element &&
                element.getBoundingClientRect().width > 0 &&
                getComputedStyle(element).display !== 'none',
            );
          })(),
          horizontalOverflow:
            document.documentElement.scrollWidth > window.innerWidth + 2,
          brokenImages: Array.from(document.images)
            .filter(img => {
              const rect = img.getBoundingClientRect();
              return (
                rect.width > 0 &&
                rect.height > 0 &&
                img.complete &&
                !img.naturalWidth
              );
            })
            .map(img => ({ path: new URL(img.src).pathname, alt: img.alt })),
          frameworkReady: Boolean(window.ibiz?.hub && window.ibiz?.engine),
          clippedControls: Array.from(
            document.querySelectorAll('input, button'),
          )
            .filter(element => {
              const rect = element.getBoundingClientRect();
              return (
                rect.width > 0 &&
                rect.height > 0 &&
                (rect.left < -1 || rect.right > innerWidth + 1)
              );
            })
            .map(element => ({
              tag: element.tagName,
              type: element.getAttribute('type'),
            })),
          clippedLoginText: Array.from(
            document.querySelectorAll(
              '.ibiz-panel-rawitem--static_text1 span, .ibiz-panel-container--container_4 .ibiz-panel-app-title__title',
            ),
          )
            .filter(element => {
              const rect = element.getBoundingClientRect();
              return (
                rect.width > 0 &&
                (rect.left < -1 || rect.right > innerWidth + 1)
              );
            })
            .map(element => element.className),
        }));
        result.finalUrl = safeUrl(page.url());
        result.loginRendered =
          result.loginVisible &&
          result.page.appChildren > 0 &&
          !result.page.loadingVisible;
        const appDataUnauthorized = result.requests.some(
          item =>
            item.status === 401 &&
            item.url.endsWith('/api/ibizmodeling__modeldesign/appdata'),
        );
        result.expectedAuthResponses = result.requests.filter(
          item => item.status === 401 && result.loginVisible,
        );
        result.expectedExtensionManifestMisses = result.requests.filter(
          isExpectedExtensionManifestMiss,
        );
        result.unexpectedHttpErrors = result.requests.filter(
          item =>
            item.status >= 400 &&
            !(item.status === 401 && result.loginVisible) &&
            !isExpectedExtensionManifestMiss(item),
        );
        result.expectedAuthConsole = result.consoleErrors.filter(item =>
          isExpectedLoginTransition(item, {
            loginVisible: result.loginVisible,
            appDataUnauthorized,
          }),
        );
        result.expectedExtensionManifestConsole = result.consoleErrors.filter(
          isExpectedExtensionManifestConsole,
        );
        result.unexpectedConsoleErrors = result.consoleErrors.filter(
          item =>
            !isExpectedLoginTransition(item, {
              loginVisible: result.loginVisible,
              appDataUnauthorized,
            }) && !isExpectedExtensionManifestConsole(item),
        );
        result.oldFrameworkRequests = result.requests.filter(item =>
          item.url.includes('/extras/js/@ibiz-template/'),
        );
        result.startupPassed =
          result.page.appChildren > 0 &&
          !result.page.loadingVisible &&
          !result.pageErrors.length &&
          !result.unexpectedHttpErrors.length &&
          !result.unexpectedConsoleErrors.length &&
          !result.oldFrameworkRequests.length &&
          !result.blockedExternal.length &&
          !result.page.brokenImages.length &&
          !result.page.clippedControls.length &&
          !result.page.clippedLoginText.length &&
          !result.page.horizontalOverflow;
      } catch (error) {
        result.error = safeMessage(error.message);
        result.startupPassed = false;
      } finally {
        const screenshot = join(output, `${name}.png`);
        await page
          .screenshot({ path: screenshot, fullPage: true })
          .catch(error => {
            result.screenshotError = safeMessage(error.message);
          });
        result.screenshot = screenshot;
        await context.close();
      }
    }
    for (const path of [
      '/api/ibizmodeling__modeldesign/jsonschema/TICKET',
      '/api/ibizmodeling__modeldesign/jsonschema/WORK_ITEM',
    ]) {
      const page = await browser.newPage();
      const response = await page.goto(new URL(path, server.url).href, {
        timeout: 15000,
      });
      const body = await response.text();
      let validJson = false;
      try {
        validJson = Boolean(JSON.parse(body));
      } catch {}
      report.proxyReads.push({
        path,
        status: response.status(),
        validJson,
        contentType: response.headers()['content-type'],
      });
      await page.close();
    }
    report.status =
      report.views.every(view => view.startupPassed) &&
      report.proxyReads.every(item => item.status === 200 && item.validJson)
        ? 'startup-passed-not-accepted'
        : 'failed';
    const credentials = {
      loginname: process.env.AIBIZ_LOGINNAME,
      password: process.env.AIBIZ_PASSWORD,
    };
    if (credentials.loginname && credentials.password) {
      const phase = await runAuthenticatedPhase({
        browser,
        server,
        origin,
        output,
        run,
        credentials,
      });
      report.authenticatedReadWorkflows = phase;
      report.authenticatedWorkflowsVerified = phase.verified;
      report.authenticatedWorkflows = phase.verified
        ? 'Read-only workflows verified with the supplied test account (login, workbench, menu navigation, list/portal views, dictionary loads, logout). No write workflow was exercised; the proxy blocks explicit writes.'
        : `Read-only workflows ran with the supplied test account but are not verified: ${phase.status}. No write workflow was exercised; the proxy blocks explicit writes.`;
      if (phase.status === 'login-failed' || phase.status === 'failed')
        report.status = 'failed';
    } else
      report.authenticatedWorkflows =
        'Not run: no login credentials were used (set AIBIZ_LOGINNAME and AIBIZ_PASSWORD); write workflows remain blocked by the verification proxy.';
  } catch (error) {
    report.status = 'failed';
    report.error = safeMessage(error.stack || error.message);
  } finally {
    if (browser) await browser.close();
    report.finishedAt = new Date().toISOString();
    await writeFile(
      join(output, 'report.json'),
      JSON.stringify(report, null, 2) + '\n',
      { flag: 'wx', mode: 0o600 },
    );
  }
  console.log(
    JSON.stringify(
      {
        output,
        status: report.status,
        error: report.error,
        views: report.views.map(view => ({
          name: view.name,
          startupPassed: view.startupPassed,
          loginVisible: view.loginVisible,
          pageErrors: view.pageErrors.length,
          consoleErrors: view.consoleErrors.length,
          blockedExternal: view.blockedExternal.length,
        })),
        proxyReads: report.proxyReads,
        deployable: false,
      },
      null,
      2,
    ),
  );
  return report;
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const { values } = parseArgs({ options: { run: { type: 'string' } } });
  if (!values.run) throw new Error('--run is required');
  const report = await checkCandidate(values.run);
  if (report.status === 'failed') process.exitCode = 1;
}
