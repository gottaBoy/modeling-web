import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { launchChromium } from '../../../scripts/browser-launch.mjs';

const workspace = new URL('../../../', import.meta.url).pathname;
const require = createRequire(resolve(workspace, 'modelingweb/app/package.json'));
const browserRequire = createRequire(resolve(workspace, 'ibiz-app-hub/package.json'));
const globalTheme = require.resolve('@ibiz-template/theme/style/global.scss');
const hostRoot = resolve(workspace,
  'ibiz-app-hub/components/ibiz-next-vue3/src/panel-component/app-extend-menu');
const hostStyles = await Promise.all([
  'extend-menu-base/extend-button-menu/extend-button-menu.scss',
  'extend-menu-base/common-extend-menu/common-extend-menu.scss',
  'bottom-side-menu/bottom-side-menu.scss',
].map(path => fs.readFile(resolve(hostRoot, path), 'utf8')));
const hostCss = require('sass').compileString(
  `@import "${globalTheme}";\n${hostStyles.join('\n')}`,
  { loadPaths: [dirname(globalTheme)], logger: { warn() {}, debug() {} } },
).css;
const elementCss = await fs.readFile(require.resolve('element-plus/dist/index.css'), 'utf8');
const candidateCss = await fs.readFile(resolve(workspace,
  'modelingweb/local-plugins/design-index/src/style.css'), 'utf8');

test('all four real host bottom-button labels fit without hiding commands on mobile', async t => {
  const browser = await launchChromium(browserRequire('playwright').chromium, { args: ['--no-sandbox'] });
  t.after(() => browser.close());
  for (const language of ['zh-CN', 'en-US']) for (const width of [360, 390, 767, 1440]) {
    await t.test(`${language}/${width}`, async () => {
      const context = await browser.newContext({ viewport: { width, height: 844 }, locale: language });
      try {
        const page = await context.newPage();
        const labels = language === 'zh-CN'
          ? ['DSL构建', '打开DSL模型粘贴板', 'DEBUG栏', '控制台']
          : ['Build DSL', 'Open DSL Model Clipboard', 'Debug', 'Console'];
        const items = labels.map((label, index) =>
          `<div class="ibiz-extend-menu-button__content--item ibiz-extend-menu-button__content--menuitem">
            <div class="ibiz-extend-menu-button__content--item-container">
              <button class="el-button ibiz-extend-menu-button__menuitem" index="${index}">
                <span><i class="ibiz-extend-menu-button__icon">+</i><span class="ibiz-extend-menu-button__caption">${label}</span></span>
              </button>
            </div>
          </div>`).join('');
        await page.setContent(`<!doctype html><html><head><style>${elementCss}\n${hostCss}
          html,body{margin:0;width:100%;height:100%}
          footer{position:fixed;bottom:0;width:100%;height:50px;display:flex;justify-content:flex-end}
          </style></head><body class="aibiz-design-index"><footer>
          <div class="ibiz-bottom-side-menu"><div class="ibiz-common-extend-menu">
            <div class="ibiz-extend-menu-button is-flex is-bottom is-horizontal">
              <div class="el-row ibiz-extend-menu-button__content is-horizontal is-bottom">${items}</div>
            </div>
          </div></div></footer></body></html>`);
        const measure = () => page.locator('button').evaluateAll(buttons => buttons.map(button => {
          const rect = button.getBoundingClientRect();
          const caption = button.querySelector('.ibiz-extend-menu-button__caption');
          const icon = button.querySelector('i');
          const iconRect = icon.getBoundingClientRect();
          const iconStyle = getComputedStyle(icon);
          const range = document.createRange();
          range.selectNodeContents(caption);
          return {
            text: button.textContent.trim().replace(/^\+\s*/, ''), width: rect.width,
            bounds: { x: rect.x, y: rect.y, right: rect.right, bottom: rect.bottom },
            layout: { padding: getComputedStyle(button).padding, font: getComputedStyle(button).fontSize,
              iconWidth: getComputedStyle(button.querySelector('i')).width,
              captionWidth: getComputedStyle(caption).width, captionMargin: getComputedStyle(caption).margin,
              spanWidth: getComputedStyle(button.firstElementChild).width },
            labelBounds: [...range.getClientRects()].map(line =>
              ({ x: line.x, y: line.y, right: line.right, bottom: line.bottom })),
            inside: rect.left >= 0 && rect.top >= 0 && rect.right <= innerWidth && rect.bottom <= innerHeight,
            labelInside: [...range.getClientRects()].every(line =>
              line.left >= rect.left && line.right <= rect.right &&
              line.top >= rect.top && line.bottom <= rect.bottom),
            iconVisible: iconRect.width > 0 && iconRect.height > 0 &&
              iconStyle.visibility === 'visible' && iconStyle.display !== 'none' &&
              iconRect.left >= rect.left && iconRect.right <= rect.right &&
              iconRect.top >= rect.top && iconRect.bottom <= rect.bottom,
          };
        }));
        const original = await measure();
        if (width < 768) assert.ok(original.some(button => !button.inside),
          'The real host 200px minimum must reproduce the mobile defect');
        await page.addStyleTag({ content: candidateCss });
        await page.evaluate(async () => {
          document.body.getBoundingClientRect();
          await Promise.all(document.getAnimations().map(animation => animation.finished));
        });
        const current = await measure();
        assert.deepEqual(current.map(button => button.text), labels);
        assert.ok(current.every(button => button.inside && button.labelInside && button.iconVisible),
          JSON.stringify(current));
        if (width >= 768) assert.deepEqual(current, original,
          'The mobile-only override must preserve desktop geometry');
      } finally { await context.close(); }
    });
  }
});
