'use strict';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AIButtonMenu {
  constructor() {
    /**
     *
     *
     * @type {string}
     * @memberof AIButtonMenu
     */
    __publicField(this, "title", "AI");
    /**
     *
     *
     * @type {string}
     * @memberof AIButtonMenu
     */
    __publicField(this, "iconSvg", '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"> <text x="0" y="13" font-size="16" fill="black">AI</text></svg>');
    /**
     *
     *
     * @type {string}
     * @memberof AIButtonMenu
     */
    __publicField(this, "tag", "button");
  }
  /**
   * 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
   *
   * @return {*}  {boolean}
   * @memberof AIButtonMenu
   */
  isActive() {
    return false;
  }
  /**
   * 获取菜单执行时的 value ，用不到则返回空 字符串或 false
   *
   * @return {*}  {(string | boolean)}
   * @memberof AIButtonMenu
   */
  getValue() {
    return "aichart";
  }
  /**
   * 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
   *
   * @return {*}  {boolean}
   * @memberof AIButtonMenu
   */
  isDisabled() {
    return false;
  }
  /**
   * 点击菜单时触发的函数
   *
   * @param {IDomEditor} editor
   * @memberof AIButtonMenu
   */
  exec(editor) {
    editor.emit("aiClick");
  }
}
const AIMenu = {
  key: "aichart",
  factory() {
    return new AIButtonMenu();
  }
};

exports.AIMenu = AIMenu;
