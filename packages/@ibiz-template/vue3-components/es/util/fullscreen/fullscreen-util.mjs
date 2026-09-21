import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import { defaultNamespace } from '../../node_modules/.pnpm/@ibiz-template_core@0.7.38-alpha.57_axios@1.7.7_lodash-es@4.17.21_qs@6.13.0_qx-util@0.4.8_ramda@0.29.1/node_modules/@ibiz-template/core/out/utils/namespace/namespace.mjs';
import { IBizFullscreenToolbar } from '../../common/fullscreen-toolbar/fullscreen-toolbar.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class FullscreenUtil {
  /**
   * Creates an instance of FullscreenUtil.
   * @memberof FullscreenUtil
   */
  constructor() {
    /**
     * 全屏样式
     * @author fzh
     * @date 2024-07-15 19:39:40
     */
    __publicField(this, "FullscreenClass", "");
  }
  /**
   *是否全屏状态
   *
   * @readonly
   * @memberof FullscreenUtil
   */
  get isFullScreen() {
    return !!document.fullscreenElement;
  }
  /**
   * 指定元素全屏
   * @author fzh
   * @date 2024-07-09 19:39:40
   */
  openElementFullscreen(div, data) {
    if (!this.FullscreenClass && data) {
      if (data.class) {
        this.FullscreenClass = data.class;
      }
    }
    if (!document.fullscreenElement && div) {
      div.requestFullscreen();
      if (this.FullscreenClass) {
        div.classList.toggle(this.FullscreenClass);
      }
      div.style.background = "var(--".concat(defaultNamespace, "-color-bg-1)");
      const content = document.createElement("div");
      content.id = "fullscreen";
      content.style.position = "absolute";
      content.style.bottom = "20px";
      content.style.left = "45%";
      div.appendChild(content);
      const app = createApp(IBizFullscreenToolbar);
      app.use(ElementPlus);
      app.mount(content);
    }
  }
  /**
   * 页面退出全屏
   * @author fzh
   * @date 2024-07-09 19:39:40
   */
  closeElementFullscreen() {
    document.exitFullscreen();
  }
}

export { FullscreenUtil };
