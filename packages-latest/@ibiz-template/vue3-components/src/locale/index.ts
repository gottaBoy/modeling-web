import { createI18n } from 'vue-i18n';
import { I18n } from '@ibiz-template/core';
import { isObject } from 'lodash-es';

const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
});

export class IBizI18n implements I18n {
  /**
   * html元素
   *
   * @author tony001
   * @date 2024-05-20 22:05:58
   * @protected
   * @type {HTMLElement}
   */
  protected html: HTMLElement;

  /**
   * 默认语言
   *
   * @author tony001
   * @date 2024-05-20 22:05:13
   * @protected
   * @type {string}
   */
  protected defaultLang: string;

  /**
   * 语言资源映射表
   *
   * @author tony001
   * @date 2024-05-20 22:05:38
   * @protected
   */
  protected langMap: Map<string, () => Promise<IData>> = new Map();

  /**
   * Creates an instance of IBizI18n.
   * @author tony001
   * @date 2024-05-20 22:05:50
   */
  constructor() {
    this.defaultLang = 'zh-CN';
    this.html = document.querySelector('html')!;
    const rawLang = localStorage.getItem('language') || this.defaultLang;
    const lang = this.normalizeLang(rawLang);
    i18n.global.locale.value = lang;
    this.html.setAttribute('lang', lang);
    // 设置默认支持的多语言
    this.langMap.set('en', () => import('./en/index'));
    this.langMap.set('zh-CN', () => import('./zh-CN/index'));
  }

  /**
   * 归一化语言标识，兼容不同操作系统/浏览器返回的格式差异
   * 例如：en-US/en_US -> en，zh-Hans-CN/zh_CN -> zh-CN，zh-Hant-* -> zh-CN
   *
   * @author tony001
   * @date 2026-06-02
   * @protected
   * @param {string} lang
   * @return {*}  {string}
   */
  protected normalizeLang(lang: string): string {
    if (!lang) {
      return this.defaultLang;
    }
    // 统一分隔符为 -
    const tag = lang.replace(/_/g, '-');
    const lower = tag.toLowerCase();
    // 英文：en、en-US、en-GB 等
    if (lower === 'en' || lower.startsWith('en-')) {
      return 'en';
    }
    // 中文简体：zh、zh-cn、zh-hans、zh-hans-cn、zh-sg 等
    if (
      lower === 'zh' ||
      lower.startsWith('zh-hans') ||
      lower === 'zh-cn' ||
      lower === 'zh-sg'
    ) {
      return 'zh-CN';
    }
    // 中文繁体：zh-hant、zh-tw、zh-hk、zh-mo 等
    // 当前仅支持 zh-CN，繁体统一 fallback 至简体，待支持繁体资源包后需调整
    if (
      lower.startsWith('zh-hant') ||
      lower === 'zh-tw' ||
      lower === 'zh-hk' ||
      lower === 'zh-mo'
    ) {
      return 'zh-CN';
    }

    // 其他语言暂不做处理，直接使用原始值
    return tag;
  }

  /**
   * 初始化加载默认多语言文件
   *
   * @author chitanda
   * @date 2023-08-24 17:08:04
   * @return {*}  {Promise<void>}
   */
  async init(): Promise<void> {
    const lang = i18n.global.locale.value;
    let p: () => Promise<IData>;
    if (this.langMap.has(lang)) {
      p = this.langMap.get(lang)!;
    } else {
      p = this.langMap.get(this.defaultLang)!;
    }
    const module = await p();
    i18n.global.setLocaleMessage(i18n.global.locale.value, module.default);
    await this.initThemeLocale();
  }

  /**
   * 初始化主题多语言
   */
  private async initThemeLocale(): Promise<void> {
    if (ibiz.env.isEnableMultiLan) {
      const lang = i18n.global.locale.value;
      const module = await import('@ibiz-template/web-theme');
      const m = module[lang.replace('-', '_').toUpperCase()];
      if (m && m.languageItems) {
        const items = m.languageItems || [];
        const data: IData = {};
        items.forEach((item: IData) => {
          data[item.lanResTag!] = item.content;
        });
        ibiz.i18n.mergeLocaleMessage(lang, data);
      }
    }
  }

  /**
   * 设置异步加载的多语言模块
   *
   * @author chitanda
   * @date 2023-08-24 23:08:01
   * @param {Record<string, () => Promise<IData>>} languages
   */
  setLangConfigs(languages: Record<string, () => Promise<IData>>): void {
    const keys = Object.keys(languages);
    keys.forEach(key => {
      this.langMap.set(key, languages[key]);
    });
  }

  /**
   * 设置语言
   *
   * @author chitanda
   * @date 2023-08-24 16:08:42
   * @param {string} lang
   */
  setLang(lang: string): void {
    ibiz.confirm
      .warning({
        title: ibiz.i18n.t('app.tips'),
        desc: ibiz.i18n.t('app.changeLanguage'),
      })
      .then((val: boolean) => {
        if (val) {
          localStorage.setItem('language', lang);
          window.location.reload();
        }
      });
  }

  /**
   * 获取语言
   *
   * @author tony001
   * @date 2024-05-20 22:05:05
   * @return {*}  {string}
   */
  getLang(): string {
    return this.html.getAttribute('lang') || this.defaultLang;
  }

  /**
   * 格式化
   *
   * @author tony001
   * @date 2024-05-20 22:05:00
   * @param {string} tag
   * @param {(IParams | undefined)} [options]
   * @return {*}  {string}
   */
  t(tag: string, options?: IParams | undefined): string;

  /**
   * 格式化
   *
   * @author tony001
   * @date 2024-05-20 22:05:05
   * @param {string} tag
   * @param {(string | undefined)} [defaultMsg]
   * @param {IParams} [options]
   * @return {*}  {string}
   */
  t(tag: string, defaultMsg?: string | undefined, options?: IParams): string;

  /**
   * 格式化
   *
   * @author tony001
   * @date 2024-05-20 22:05:44
   * @param {unknown} tag
   * @param {unknown} [defaultMsg]
   * @param {unknown} [options]
   * @return {*}  {string}
   */
  t(tag: unknown, defaultMsg?: unknown, options?: unknown): string {
    const result = i18n!.global.t(
      tag as string,
      defaultMsg as string,
      options as IParams,
    );
    // 如果返回的还是 tag 本身，说明没找到翻译
    return result === tag && !isObject(defaultMsg)
      ? String(defaultMsg || '')
      : result;
  }

  /**
   * 合并语言资源
   *
   * @author tony001
   * @date 2024-05-20 22:05:01
   * @param {IParams} data
   */
  mergeLocaleMessage(data: IParams): void;

  /**
   * 合并指定语言资源
   *
   * @author tony001
   * @date 2024-05-20 22:05:21
   * @param {string} lang
   * @param {IParams} data
   */
  mergeLocaleMessage(lang: string, data: IParams): void;

  /**
   * 合并语言资源
   * @param lang
   * @param data
   */
  mergeLocaleMessage(dataOrLang: IParams | string, data?: IParams): void {
    if (typeof dataOrLang === 'string') {
      const lang = dataOrLang;
      i18n.global.mergeLocaleMessage(lang, data);
    } else {
      const langData = dataOrLang;
      if (langData && Object.keys(langData).length > 0) {
        Object.keys(langData).forEach(key => {
          i18n.global.mergeLocaleMessage(key, langData[key]);
        });
      }
    }
  }
}

const iBizI18n = new IBizI18n();

export { i18n, iBizI18n };
