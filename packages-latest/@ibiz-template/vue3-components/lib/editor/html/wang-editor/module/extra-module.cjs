'use strict';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ExtraButtonMenu {
  constructor(model) {
    /**
     *
     *
     * @type {string}
     * @memberof ExtraButtonMenu
     */
    __publicField(this, "title", "\u81EA\u5B9A\u4E49");
    /**
     *
     *
     * @type {string}
     * @memberof ExtraButtonMenu
     */
    __publicField(this, "iconSvg", '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fit="" height="1em" width="1em" preserveAspectRatio="xMidYMid meet" focusable="false"><g id="aucaction/plus-circle-fill" stroke-width="1" fill-rule="evenodd"><path d="M8 16A8 8 0 118 0a8 8 0 010 16zm-.6-8.6H4v1.2h3.4V12h1.2V8.6H12V7.4H8.6V4H7.4v3.4z" id="auc\u5F62\u72B6\u7ED3\u5408"></path></g></svg>');
    /**
     * @description 模型
     * @type {IData}
     * @memberof ExtraButtonMenu
     */
    __publicField(this, "model");
    /**
     *
     *
     * @type {string}
     * @memberof ExtraButtonMenu
     */
    __publicField(this, "tag", "button");
    this.model = model;
    this.title = model.caption;
    if (model.sysImage) {
      this.iconSvg = model.sysImage.rawContent;
    }
  }
  /**
   * 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
   *
   * @return {*}  {boolean}
   * @memberof ExtraButtonMenu
   */
  isActive() {
    return false;
  }
  /**
   * 获取菜单执行时的 value ，用不到则返回空 字符串或 false
   *
   * @return {*}  {(string | boolean)}
   * @memberof ExtraButtonMenu
   */
  getValue() {
    return "custom";
  }
  /**
   * 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
   *
   * @return {*}  {boolean}
   * @memberof ExtraButtonMenu
   */
  isDisabled() {
    return false;
  }
  /**
   * 点击菜单时触发的函数
   *
   * @param {IDomEditor} editor
   * @memberof ExtraButtonMenu
   */
  exec(editor) {
    editor.emit("customAction", this.model);
  }
}

exports.ExtraButtonMenu = ExtraButtonMenu;
