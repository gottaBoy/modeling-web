import { createRequire } from 'node:module';

const require = createRequire(new URL('../../../ibiz-app-hub/package.json', import.meta.url));
const { chromium } = require('playwright');
const executablePath = process.env.CHROME_BIN || '/usr/bin/google-chrome';

const url = process.argv[2] ?? 'http://10.10.14.241:31198/central/';
const browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const consoleErrors = [];
const failedRequests = [];
page.on('console', message => {
  if (message.type() === 'error') consoleErrors.push(message.text());
});
page.on('requestfailed', request => failedRequests.push(
  `${request.method()} ${request.url()}: ${request.failure()?.errorText}`));

await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
await page.waitForTimeout(15_000);
const evidence = await page.evaluate(() => ({
  href: location.href,
  title: document.title,
  bodyText: document.body.innerText.slice(0, 2000),
  passwordInputs: document.querySelectorAll('input[type="password"]').length,
  views: document.querySelectorAll('.ibiz-view').length,
  modelErrorVisible: document.body.innerText.includes('模型配置缺失'),
}));
console.log(JSON.stringify({
  evidence,
  consoleErrors,
  failedRequests,
}, null, 2));
await browser.close();
