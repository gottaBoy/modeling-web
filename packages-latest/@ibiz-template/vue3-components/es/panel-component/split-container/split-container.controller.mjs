import { PanelContainerController } from '@ibiz-template/runtime';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class SplitContainerController extends PanelContainerController {
  constructor() {
    super(...arguments);
    /**
     * @description 分割面板模式
     * @exposedoc
     * @author zhanghengfeng
     * @date 2023-08-22 17:08:24
     * @type {('horizontal' | 'vertical')}
     */
    __publicField(this, "splitMode", "horizontal");
    /**
     * @description 默认分割值
     * @exposedoc
     * @author zhanghengfeng
     * @date 2023-08-22 17:08:38
     * @type {(number | string)}
     */
    __publicField(this, "splitValue", 0.5);
    /**
     * @description 面板隐藏前分割值
     * @author zhanghengfeng
     * @date 2023-10-08 17:10:58
     * @type {(number | string | null)}
     */
    __publicField(this, "lastSplitValue", null);
  }
  /**
   * 初始化默认分割值
   *
   * @author zhanghengfeng
   * @date 2023-08-22 17:08:13
   * @param {number} value
   * @param {string} mode
   */
  initSplitValue(value, mode) {
    if (mode === "PX") {
      this.splitValue = "".concat(value, "px");
    }
    if (mode === "PERCENTAGE") {
      this.splitValue = value / 100;
    }
    this.state.splitValue = this.splitValue;
  }
  async onInit() {
    await super.onInit();
    const { predefinedType, panelItems } = this.model;
    this.splitMode = predefinedType === "CONTAINER_V_SPLIT" ? "vertical" : "horizontal";
    if (Array.isArray(panelItems) && panelItems.length) {
      const panelItem = panelItems[0];
      const layoutPos = panelItem.layoutPos;
      if (layoutPos) {
        if (this.splitMode === "horizontal") {
          const { width, widthMode } = layoutPos;
          if (width != null && widthMode != null) {
            this.initSplitValue(width, widthMode);
          }
        }
        if (this.splitMode === "vertical") {
          const { height, heightMode } = layoutPos;
          if (height != null && heightMode != null) {
            this.initSplitValue(height, heightMode);
          }
        }
      }
    }
  }
  /**
   * @description 隐藏面板，left：左侧面板隐藏，right：右侧面板隐藏，top：上方面板隐藏，bottom：底部面板隐藏
   * @exposedoc
   * @author zhanghengfeng
   * @date 2023-10-08 17:10:35
   * @param {('left' | 'right' | 'top' | 'bottom')} position
   */
  hiddenPanel(position) {
    if (!this.state.isHiddenTrigger)
      this.lastSplitValue = this.state.splitValue;
    if (position === "left" || position === "top") {
      this.state.splitValue = 0;
    }
    if (position === "right" || position === "bottom") {
      this.state.splitValue = 1;
    }
    this.state.isHiddenTrigger = true;
  }
  /**
   * @description 显示面板，恢复上一次的分割比例
   * @exposedoc
   * @author zhanghengfeng
   * @date 2023-10-08 17:10:31
   */
  showPanel() {
    if (this.lastSplitValue != null) {
      this.state.splitValue = this.lastSplitValue;
      this.state.isHiddenTrigger = false;
      this.lastSplitValue = null;
    }
  }
}

export { SplitContainerController };
