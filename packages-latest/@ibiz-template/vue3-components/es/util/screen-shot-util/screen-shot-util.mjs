import { createApp } from 'vue';
import './screen-shot/index.mjs';
import { ScreenShot } from './screen-shot/components/screen-shot/screen-shot.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ScreenShotUtil {
  /**
   * Creates an instance of ScreenShotUtil.
   * @memberof ScreenShotUtil
   */
  constructor() {
    __publicField(this, "currentApp", null);
    __publicField(this, "container", null);
  }
  /**
   * @description 销毁组件实例
   * @private
   * @memberof ScreenShotUtil
   */
  destroyComponent() {
    if (this.currentApp && this.container) {
      this.currentApp.unmount();
      this.currentApp = null;
    }
    if (this.container && document.body.contains(this.container)) {
      document.body.removeChild(this.container);
      this.container = null;
    }
  }
  /**
   * @description 开始截图
   * @param {HTMLElement} element 需要截图的元素
   * @param {{ container?: HTMLElement; itemClassName?: string }} opts 如果需针对dom内部滚动容器截图，则需配置：滚动容器，滚动容器项类名，用以排除非可视区元素
   * @returns {*}  {(Promise<string | undefined>)} 图片(png格式) base64 字符串
   * @memberof ScreenShotUtil
   */
  async onScreenShot(element, opts) {
    this.destroyComponent();
    const { container, itemClassName } = opts;
    return new Promise((resolve) => {
      this.container = document.createElement("div");
      document.body.appendChild(this.container);
      this.currentApp = createApp(ScreenShot, {
        element,
        container,
        itemClassName,
        onComplete: (base64) => {
          this.destroyComponent();
          resolve(base64);
        },
        onCancel: () => {
          this.destroyComponent();
          resolve(void 0);
        }
      });
      this.currentApp.mount(this.container);
    });
  }
}

export { ScreenShotUtil };
