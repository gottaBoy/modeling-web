import { createI18n } from 'vue-i18n';
import { isObject } from 'lodash-es';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const i18n = createI18n({
  legacy: false,
  locale: "zh-CN"
});
class IBizI18n {
  /**
   * Creates an instance of IBizI18n.
   * @author tony001
   * @date 2024-05-20 22:05:50
   */
  constructor() {
    /**
     * html元素
     *
     * @author tony001
     * @date 2024-05-20 22:05:58
     * @protected
     * @type {HTMLElement}
     */
    __publicField(this, "html");
    /**
     * 默认语言
     *
     * @author tony001
     * @date 2024-05-20 22:05:13
     * @protected
     * @type {string}
     */
    __publicField(this, "defaultLang");
    /**
     * 语言资源映射表
     *
     * @author tony001
     * @date 2024-05-20 22:05:38
     * @protected
     */
    __publicField(this, "langMap", /* @__PURE__ */ new Map());
    this.defaultLang = "zh-CN";
    this.html = document.querySelector("html");
    const rawLang = localStorage.getItem("language") || this.defaultLang;
    const lang = this.normalizeLang(rawLang);
    i18n.global.locale.value = lang;
    this.html.setAttribute("lang", lang);
    this.langMap.set("en", () => import('./en/index.mjs'));
    this.langMap.set("zh-CN", () => import('./zh-CN/index.mjs'));
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
  normalizeLang(lang) {
    if (!lang) {
      return this.defaultLang;
    }
    const tag = lang.replace(/_/g, "-");
    const lower = tag.toLowerCase();
    if (lower === "en" || lower.startsWith("en-")) {
      return "en";
    }
    if (lower === "zh" || lower.startsWith("zh-hans") || lower === "zh-cn" || lower === "zh-sg") {
      return "zh-CN";
    }
    if (lower.startsWith("zh-hant") || lower === "zh-tw" || lower === "zh-hk" || lower === "zh-mo") {
      return "zh-CN";
    }
    return tag;
  }
  /**
   * 初始化加载默认多语言文件
   *
   * @author chitanda
   * @date 2023-08-24 17:08:04
   * @return {*}  {Promise<void>}
   */
  async init() {
    const lang = i18n.global.locale.value;
    let p;
    if (this.langMap.has(lang)) {
      p = this.langMap.get(lang);
    } else {
      p = this.langMap.get(this.defaultLang);
    }
    const module = await p();
    i18n.global.setLocaleMessage(i18n.global.locale.value, module.default);
    await this.initThemeLocale();
  }
  /**
   * 初始化主题多语言
   */
  async initThemeLocale() {
    if (ibiz.env.isEnableMultiLan) {
      const lang = i18n.global.locale.value;
      const module = await import('@ibiz-template/web-theme');
      const m = module[lang.replace("-", "_").toUpperCase()];
      if (m && m.languageItems) {
        const items = m.languageItems || [];
        const data = {};
        items.forEach((item) => {
          data[item.lanResTag] = item.content;
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
  setLangConfigs(languages) {
    const keys = Object.keys(languages);
    keys.forEach((key) => {
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
  setLang(lang) {
    ibiz.confirm.warning({
      title: ibiz.i18n.t("app.tips"),
      desc: ibiz.i18n.t("app.changeLanguage")
    }).then((val) => {
      if (val) {
        localStorage.setItem("language", lang);
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
  getLang() {
    return this.html.getAttribute("lang") || this.defaultLang;
  }
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
  t(tag, defaultMsg, options) {
    const result = i18n.global.t(
      tag,
      defaultMsg,
      options
    );
    return result === tag && !isObject(defaultMsg) ? String(defaultMsg || "") : result;
  }
  /**
   * 合并语言资源
   * @param lang
   * @param data
   */
  mergeLocaleMessage(dataOrLang, data) {
    if (typeof dataOrLang === "string") {
      const lang = dataOrLang;
      i18n.global.mergeLocaleMessage(lang, data);
    } else {
      const langData = dataOrLang;
      if (langData && Object.keys(langData).length > 0) {
        Object.keys(langData).forEach((key) => {
          i18n.global.mergeLocaleMessage(key, langData[key]);
        });
      }
    }
  }
}
const iBizI18n = new IBizI18n();

export { IBizI18n, i18n, iBizI18n };
