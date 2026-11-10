import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(new URL('../../../ibiz-app-hub/package.json', import.meta.url));
const { chromium } = require('playwright');

const entry = process.argv[2] || 'http://100.65.39.166:31198/central/';
const output = path.resolve('.artifacts/native-central-trace');
await mkdir(output, { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox'],
});

const context = await browser.newContext({ locale: 'zh-CN', viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const events = [];

page.on('response', async response => {
  const url = new URL(response.url());
  if (!/\/api\/|\/remotemodel\/|\/central\//.test(url.pathname)) return;
  const event = {
    method: response.request().method(),
    status: response.status(),
    path: url.pathname + url.search,
    contentType: response.headers()['content-type'] ?? '',
  };
  const requestData = response.request().postData();
  if (requestData) event.requestData = requestData;
  try {
    const body = await response.text();
    event.bodyLength = body.length;
    event.bodyPrefix = body.slice(0, 2000);
    try { event.json = JSON.parse(body); } catch (error) { event.jsonError = String(error); }
  } catch (error) {
    event.bodyError = String(error);
  }
  events.push(event);
});

page.on('console', message => {
  if (message.type() === 'error' || message.type() === 'warning') {
    events.push({ kind: 'console', type: message.type(), text: message.text() });
  }
});
page.on('pageerror', error => events.push({ kind: 'pageerror', text: String(error) }));
page.on('framenavigated', frame => {
  if (frame === page.mainFrame()) events.push({ kind: 'navigated', url: frame.url() });
});

await page.goto(entry, { waitUntil: 'domcontentloaded' });
await page.locator('input[type="text"]').first().fill('aibizhi');
await page.locator('input[type="password"]').first().fill('123456');
await page.getByRole('button', { name: '登录', exact: true }).click();
await page.waitForTimeout(20_000);

const state = await page.evaluate(() => ({
  href: location.href,
  title: document.title,
  text: document.body.innerText.slice(0, 5000),
  localStorage: { ...localStorage },
  sessionStorage: { ...sessionStorage },
  runtimeAppId: window.ibiz?.env?.appId ?? null,
  nativeModelApp: window.Environment?.nativeModelApp ?? null,
  hubApps: window.ibiz?.hub?.appMap ? Object.fromEntries([...window.ibiz.hub.appMap].map(([key, app]) => [key, {
    context: app?.context ?? null,
    dataContext: app?.dataContext ?? null,
  }])) : null,
  viewContexts: Object.fromEntries([...document.querySelectorAll('.ibiz-view')].map(element => [element.id, {
    context: window.ibiz?.util?.viewStack?.getView?.(element.id)?.context ?? null,
    caption: window.ibiz?.util?.viewStack?.getView?.(element.id)?.caption ?? null,
  }])),
}));

await page.screenshot({ path: path.join(output, 'central.png'), fullPage: true });
await writeFile(path.join(output, 'trace.json'), `${JSON.stringify({ state, events }, null, 2)}\n`);
await browser.close();
console.log(path.join(output, 'trace.json'));
