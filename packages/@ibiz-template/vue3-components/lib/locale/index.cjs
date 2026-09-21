'use strict';

var vueI18n = require('vue-i18n');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const i18n = vueI18n.createI18n({
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
    const lang = localStorage.getItem("language") || navigator.language || this.defaultLang;
    i18n.global.locale.value = lang;
    this.html.setAttribute("lang", lang);
    this.langMap.set("en", () => Promise.resolve().then(function () { return require('./en/index.cjs'); }));
    this.langMap.set("zh-CN", () => Promise.resolve().then(function () { return require('./zh-CN/index.cjs'); }));
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
      title: "\u63D0\u793A",
      desc: "\u5207\u6362\u8BED\u8A00\u9700\u8981\u5237\u65B0\u9875\u9762\uFF0C\u786E\u8BA4\u5207\u6362?"
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
    return i18n.global.t(
      tag,
      defaultMsg,
      options
    );
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

exports.IBizI18n = IBizI18n;
exports.i18n = i18n;
exports.iBizI18n = iBizI18n;
