import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { attachBrowserSourceDiagnostics } from '../../../scripts/browser-source-diagnostics.mjs';

const require = createRequire(import.meta.url);
const appRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const target =
  process.env.MODEL_DESIGN_URL ?? 'http://127.0.0.1:32003/modeldesign/';
const username = process.env.MODEL_DESIGN_USER;
const password = process.env.MODEL_DESIGN_PASSWORD;
const artifactDirectory = resolve(
  process.env.SMOKE_ARTIFACT_DIR ??
    join(appRoot, 'test-results/modeldesign-smoke'),
);

function loadPlaywright() {
  const moduleName = process.env.PLAYWRIGHT_MODULE ?? 'playwright';
  try {
    return require(moduleName);
  } catch (error) {
    throw new Error(
      `无法加载 Playwright 模块 "${moduleName}"。请在当前项目安装固定版本，或通过 PLAYWRIGHT_MODULE 指定模块目录。原始错误: ${error.message}`,
    );
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function cleanBaseUrl(url) {
  return url.endsWith('/') ? url : `${url}/`;
}

function isExpectedAuthenticationConsole(message, authenticated) {
  const url = message.location().url;
  return (
    !authenticated &&
    message.text().includes('responded with a status of 401') &&
    (url.includes('/api/ibizmodeling__modeldesign/uaa/getbydcsystem/') ||
      url.endsWith('/api/ibizmodeling__modeldesign/appdata'))
  );
}

function isExpectedAuthenticationNavigationAbort(message, authenticated) {
  if (authenticated || !message.includes('Navigation aborted from')) {
    return false;
  }
  const match = message.match(
    /Navigation aborted from "([^"]+)" to "([^"]+)" via a navigation guard/,
  );
  if (!match || match[1] !== '/') {
    return false;
  }
  return match[2] === '/-/index/-' || match[2].startsWith('/login');
}

async function visible(locator) {
  return locator.isVisible().catch(() => false);
}

async function firstVisible(locator, timeout = 30000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    const count = await locator.count();
    for (let index = 0; index < count; index += 1) {
      const candidate = locator.nth(index);
      if (await visible(candidate)) return candidate;
    }
    await locator.page().waitForTimeout(250);
  }
  throw new Error(
    `等待可见元素超时: ${await locator
      .first()
      .evaluate(element => element.outerHTML)
      .catch(() => 'locator')}`,
  );
}

async function clickExact(page, text) {
  const locator = await firstVisible(page.getByText(text, { exact: true }));
  await locator.click();
}

async function waitForBodyText(page, text, timeout = 30000) {
  await firstVisible(page.getByText(text, { exact: false }), timeout);
}

async function waitForEnabled(locator, timeout = 30000) {
  const page = locator.page();
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    if (
      (await visible(locator)) &&
      (await locator.isEnabled().catch(() => false))
    ) {
      return;
    }
    await page.waitForTimeout(250);
  }
  const details = await locator
    .evaluate(element => ({
      outerHTML: element.outerHTML,
      disabled: element.hasAttribute('disabled'),
      ariaDisabled: element.getAttribute('aria-disabled'),
      className: element.getAttribute('class'),
    }))
    .catch(() => null);
  throw new Error(`等待控件可用超时: ${JSON.stringify(details)}`);
}

async function formDiagnostics(page) {
  return page.evaluate(() => {
    const visibleElements = selector =>
      [...document.querySelectorAll(selector)]
        .filter(element => {
          const style = window.getComputedStyle(element);
          return style.display !== 'none' && style.visibility !== 'hidden';
        })
        .slice(-8)
        .map(element => element.outerHTML.slice(0, 800));
    return {
      bodyText: document.body.innerText.slice(-3000),
      buttons: visibleElements('button'),
      loading: visibleElements(
        '.el-loading-mask, .el-loading-spinner, [class*="loading"], [aria-busy="true"]',
      ),
    };
  });
}

function isIdeaCreateResponse(response) {
  if (response.request().method() !== 'POST' || response.status() >= 400) {
    return false;
  }
  const pathname = new URL(response.url()).pathname;
  return /\/products\/[^/]+\/ideas$/.test(pathname);
}

function isIdeaListRefreshResponse(response) {
  if (response.status() >= 400 || !response.url().includes('/ideas/')) {
    return false;
  }
  return (
    response.request().method() === 'POST' &&
    response.url().includes('/ideas/fetch_common')
  );
}

function isProductCreateResponse(response) {
  const pathname = new URL(response.url()).pathname;
  return (
    response.request().method() === 'POST' && /\/products$/.test(pathname)
  );
}

function isKnownWorkspaceCounterFailure(item) {
  const endpoint = '/work_items/count_my_todo';

  if (
    item.type === 'api-response' &&
    item.status === 404 &&
    item.method === 'POST' &&
    item.url?.endsWith(endpoint)
  ) {
    return true;
  }

  return (
    item.type === 'console' &&
    (item.url?.endsWith(endpoint) ||
      item.recentRequests?.some(request => request.url?.endsWith(endpoint)))
  );
}

function isExpectedAuthenticationResponse(item, authenticated) {
  return (
    !authenticated &&
    item.status === 401 &&
    (item.url?.includes('/api/ibizmodeling__modeldesign/uaa/getbydcsystem/') ||
      item.url?.endsWith('/api/ibizmodeling__modeldesign/appdata'))
  );
}

function isKnownNonBlockingEvent(item) {
  if (isKnownWorkspaceCounterFailure(item)) return true;

  if (
    item.type === 'request-failed' &&
    item.url?.includes('/modeldesign/%3C?xml%20version=')
  ) {
    return true;
  }

  if (item.type !== 'console') return false;
  return [
    '[EN_US]语言未支持',
    '未支持的类型',
    '值项异常',
    '视图逻辑初始化参数',
    '编辑区域高度 < 300px',
    "Cannot read properties of null (reading 'getController')",
  ].some(pattern => item.message?.includes(pattern));
}

async function main() {
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({
    headless: process.env.SMOKE_HEADLESS !== 'false',
    executablePath: process.env.CHROME_PATH || undefined,
    args: ['--disable-gpu', '--disable-software-rasterizer', '--no-zygote'],
  });
  const context = await browser.newContext({
    viewport: {
      width: Number(process.env.SMOKE_VIEWPORT_WIDTH ?? 1440),
      height: Number(process.env.SMOKE_VIEWPORT_HEIGHT ?? 1000),
    },
  });
  const page = await context.newPage();
  const report = {
    target: cleanBaseUrl(target),
    startedAt: new Date().toISOString(),
    phases: [],
    apiResponses: [],
    expectedEvents: [],
    unexpectedEvents: [],
  };
  let authenticated = false;
  let currentPhase = 'bootstrap';
  const recentRequests = [];
  let sourceDiagnostics;
  try {
    sourceDiagnostics = await attachBrowserSourceDiagnostics(page);
    report.sourceDiagnostics = sourceDiagnostics.report;
  } catch (error) {
    report.sourceDiagnostics = { status: 'unavailable', error: error.message };
  }

  function eventContext() {
    return {
      phase: currentPhase,
      pageUrl: page.url(),
      recentRequests: recentRequests.slice(-8),
    };
  }

  page.on('response', response => {
    const url = response.url();
    if (!new URL(url).pathname.startsWith('/api/')) return;
    const item = {
      status: response.status(),
      method: response.request().method(),
      url,
    };
    report.apiResponses.push(item);
    recentRequests.push(item);
    if (recentRequests.length > 24) recentRequests.shift();
    if (
      response.status() >= 400 &&
      !isExpectedAuthenticationResponse(item, authenticated)
    ) {
      report.unexpectedEvents.push({
        type: 'api-response',
        ...item,
        ...eventContext(),
      });
    } else if (
      isExpectedAuthenticationResponse(item, authenticated)
    ) {
      report.expectedEvents.push({
        type: 'authentication-probe',
        ...item,
        ...eventContext(),
      });
    }
  });

  page.on('requestfailed', request => {
    report.unexpectedEvents.push({
      type: 'request-failed',
      method: request.method(),
      url: request.url(),
      error: request.failure()?.errorText ?? 'unknown',
      ...eventContext(),
    });
  });

  page.on('pageerror', error => {
    report.unexpectedEvents.push({
      type: 'page-error',
      message: error.stack || error.message,
      ...eventContext(),
    });
  });

  page.on('console', message => {
    if (message.type() !== 'error' && message.type() !== 'warning') return;
    const text = message.text();
    if (isExpectedAuthenticationConsole(message, authenticated)) {
      report.expectedEvents.push({
        type: 'authentication-probe-console',
        level: message.type(),
        message: text,
        url: message.location().url,
        ...eventContext(),
      });
    } else if (isExpectedAuthenticationNavigationAbort(text, authenticated)) {
      report.expectedEvents.push({
        type: 'authentication-navigation-abort',
        level: message.type(),
        message: text,
        url: message.location().url,
        ...eventContext(),
      });
    } else {
      report.unexpectedEvents.push({
        type: 'console',
        level: message.type(),
        message: text,
        url: message.location().url,
        ...eventContext(),
      });
    }
  });

  async function phase(name, callback) {
    const started = Date.now();
    currentPhase = name;
    try {
      await callback();
      report.phases.push({
        name,
        status: 'passed',
        elapsedMs: Date.now() - started,
        url: page.url(),
      });
      console.log(`[deployment-smoke] PASS ${name}`);
    } catch (error) {
      report.phases.push({
        name,
        status: 'failed',
        elapsedMs: Date.now() - started,
        url: page.url(),
        error: error instanceof Error ? error.message : String(error),
      });
      await page
        .screenshot({
          path: join(artifactDirectory, `${name}-failed.png`),
          fullPage: true,
        })
        .catch(() => {});
      throw error;
    }
  }

  await mkdir(artifactDirectory, { recursive: true });

  try {
    await phase('unauthenticated-entry', async () => {
      await page.goto(cleanBaseUrl(target), {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      });
      const loginButton = page.getByRole('button', { name: '登录' }).first();
      await loginButton.waitFor({ state: 'visible', timeout: 60000 });
      assert(
        await visible(loginButton),
        `未登录访问没有进入登录界面: ${page.url()}`,
      );
    });

    assert(
      username && password,
      '登录 smoke 需要 MODEL_DESIGN_USER 和 MODEL_DESIGN_PASSWORD 环境变量',
    );

    await phase('authenticated-shell', async () => {
      const inputs = page.locator('input:visible');
      await inputs.nth(1).waitFor({ state: 'visible', timeout: 60000 });
      assert((await inputs.count()) >= 2, '登录页缺少用户名或密码输入框');
      await inputs.nth(0).fill(username);
      await inputs.nth(1).fill(password);
      await page.getByRole('button', { name: '登录' }).click();
      authenticated = true;
      await waitForBodyText(page, '工作台', 60000);
      assert(
        (await page.title()).includes('PLM'),
        `登录后页面标题异常: ${await page.title()}`,
      );
    });

    const modules = [
      '工作台',
      '产品管理',
      '项目管理',
      '测试管理',
      '知识管理',
      '效能度量',
      '协作空间',
    ];

    await phase('module-navigation', async () => {
      for (const moduleName of modules) {
        const beforeFailures = report.unexpectedEvents.length;
        await clickExact(page, moduleName);
        await page.waitForTimeout(5000);
        let newFailures = report
          .unexpectedEvents.slice(beforeFailures)
          .filter(item => !isKnownNonBlockingEvent(item));
        if (newFailures.length > 0) {
          // 首次访问一个模块时，后端可能仍在懒加载实体模型；刷新一次可区分竞态和真实接口错误。
          await page.reload({ waitUntil: 'domcontentloaded' });
          await waitForBodyText(page, moduleName, 60000);
          await page.waitForTimeout(3000);
          newFailures = report
            .unexpectedEvents.slice(beforeFailures)
            .filter(item => !isKnownNonBlockingEvent(item));
        }
        assert(
          newFailures.length === 0,
          `${moduleName} 导航产生异常: ${JSON.stringify(newFailures)}`,
        );
      }
    });

    await phase('project-wizard', async () => {
      await clickExact(page, '项目管理');
      await page.waitForTimeout(5000);
      const createButton = page
        .getByRole('button', { name: /创建项目|新建项目|新建/ })
        .first();
      await createButton.waitFor({ state: 'visible', timeout: 30000 });
      await createButton.click();
      await waitForBodyText(page, '项目类型');

      const dialog = page.locator('[role="dialog"]:visible').last();
      const typeItems = dialog.locator('.ibiz-control-list-scroll-item');
      const scrumItem = typeItems.filter({ hasText: 'Scrum项目' }).first();
      const kanbanItem = typeItems.filter({ hasText: 'Kanban项目' }).first();
      const nextButton = page.getByRole('button', { name: '下一步' }).last();

      await scrumItem.waitFor({ state: 'visible', timeout: 30000 });
      assert(
        await scrumItem.evaluate(element =>
          element.classList.contains('is-active'),
        ),
        '项目向导默认项目类型不是 Scrum',
      );
      assert(await nextButton.isEnabled(), '项目向导默认状态下一步按钮不可用');
      await nextButton.click();
      await waitForBodyText(page, '项目信息');

      const previousButton = page
        .getByRole('button', { name: '上一步' })
        .last();
      await previousButton.click();
      await waitForBodyText(page, '项目类型');
      await kanbanItem.waitFor({ state: 'visible', timeout: 30000 });
      await kanbanItem.click();
      await page.waitForTimeout(500);
      assert(
        await kanbanItem.evaluate(element =>
          element.classList.contains('is-active'),
        ),
        '项目向导选择 Kanban 后未进入激活状态',
      );
      await nextButton.click();
      await waitForBodyText(page, '项目信息');
      await previousButton.click();
      await waitForBodyText(page, '项目类型');
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
      assert(
        !(await visible(page.locator('[role="dialog"]:visible').last())),
        '项目向导关闭后仍有可见弹窗遮挡页面',
      );
    });

    await phase('idea-create-and-refresh', async () => {
      const title = `smoke-${Date.now()}`;
      const productName = `smoke-${Date.now()}`;
      const productIdentifier = `SMOKE${Date.now().toString().slice(-8)}`;
      await clickExact(page, '产品管理');
      await page.waitForTimeout(5000);

      const productCreateButton = page
        .getByRole('button', { name: /新建产品|创建产品|新建/ })
        .first();
      await productCreateButton.waitFor({
        state: 'visible',
        timeout: 30000,
      });
      await productCreateButton.click();

      const productDialog = page.locator('[role="dialog"]:visible').last();
      await productDialog
        .locator('input[placeholder="输入产品名称"]')
        .fill(productName);
      await productDialog
        .locator('input[placeholder="大写字母和数字，15个字符范围内"]')
        .fill(productIdentifier);
      await page.getByRole('button', { name: '下一步' }).last().click();
      await waitForBodyText(page, '产品成员', 30000);

      const productResponsePromise = page.waitForResponse(
        isProductCreateResponse,
        { timeout: 60000 },
      );
      await page.getByRole('button', { name: '完成' }).last().click();
      const productResponse = await productResponsePromise;
      assert(
        productResponse.status() < 400,
        `产品创建请求失败: ${productResponse.status()} ${productResponse.url()}`,
      );

      const product = page.getByText(productName, { exact: true }).first();
      await product.waitFor({ state: 'visible', timeout: 30000 });
      await product.click();
      await page.waitForTimeout(5000);
      await clickExact(page, '需求');
      await page.waitForTimeout(5000);

      const createButton = page
        .getByRole('button', { name: /新建需求|创建需求|新建/ })
        .first();
      await createButton.waitFor({ state: 'visible', timeout: 30000 });
      await createButton.click();
      const titleInput = page.locator('textarea:visible').first();
      await titleInput.waitFor({ state: 'visible', timeout: 30000 });
      await titleInput.fill(title);

      const ideaRequestStart = report.apiResponses.length;
      const saveButton = page
        .getByRole('button', { name: /保存|确定|创建|提交/ })
        .last();
      try {
        await waitForEnabled(saveButton, 60000);
      } catch (error) {
        throw new Error(
          `${error.message}; 表单诊断: ${JSON.stringify(
            await formDiagnostics(page),
          )}`,
        );
      }

      const createResponsePromise = page.waitForResponse(isIdeaCreateResponse, {
        timeout: 60000,
      });
      await saveButton.click();
      const createResponse = await createResponsePromise;
      assert(
        createResponse.status() < 400,
        `需求创建请求失败: ${createResponse.status()} ${createResponse.url()}`,
      );

      const refreshResponsePromise = page.waitForResponse(
        isIdeaListRefreshResponse,
        { timeout: 60000 },
      );
      const refreshResponse = await refreshResponsePromise;
      assert(
        refreshResponse.status() < 400,
        `需求列表刷新请求失败: ${refreshResponse.status()} ${refreshResponse.url()}`,
      );
      await waitForBodyText(page, title, 30000);
      const body = await page.locator('body').innerText();
      assert(body.includes(title), `创建的需求没有出现在列表: ${title}`);

      const ideaResponses = report.apiResponses.slice(ideaRequestStart);
      assert(
        ideaResponses.some(item =>
          isIdeaCreateResponse({
            request: () => ({ method: () => item.method }),
            status: () => item.status,
            url: () => item.url,
          }),
        ),
        `没有观察到成功的需求创建请求: ${JSON.stringify(ideaResponses)}`,
      );
      assert(
        ideaResponses.some(item =>
          isIdeaListRefreshResponse({
            request: () => ({ method: () => item.method }),
            status: () => item.status,
            url: () => item.url,
          }),
        ),
        `没有观察到需求创建后的列表刷新请求: ${JSON.stringify(ideaResponses)}`,
      );
    });

    assert(
      report.unexpectedEvents.filter(item => !isKnownNonBlockingEvent(item))
        .length === 0,
      `发现未分类运行时异常: ${JSON.stringify(
        report.unexpectedEvents.filter(item => !isKnownNonBlockingEvent(item)),
        null,
        2,
      )}`,
    );
    report.status = 'passed';
  } catch (error) {
    report.status = 'failed';
    report.error = error instanceof Error ? error.message : String(error);
    throw error;
  } finally {
    currentPhase = 'finalize';
    await sourceDiagnostics?.close().catch(error => {
      report.sourceDiagnostics.closeError = error.message;
    });
    report.finishedAt = new Date().toISOString();
    await writeFile(
      join(artifactDirectory, 'report.json'),
      `${JSON.stringify(report, null, 2)}\n`,
    );
    await page
      .screenshot({
        path: join(artifactDirectory, 'final.png'),
        fullPage: true,
      })
      .catch(() => {});
    await browser.close();
    console.log(
      `[deployment-smoke] report: ${join(artifactDirectory, 'report.json')}`,
    );
  }
}

main().catch(error => {
  console.error(`[deployment-smoke] FAIL: ${error.message}`);
  process.exitCode = 1;
});
