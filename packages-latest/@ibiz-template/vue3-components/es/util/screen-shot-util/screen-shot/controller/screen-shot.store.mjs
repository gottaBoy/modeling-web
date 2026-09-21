import { ref } from 'vue';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ScreenShotStore {
  constructor() {
    /**
     * @description 画布元素
     * @type {(Ref<HTMLCanvasElement | undefined>)}
     * @memberof ScreenShotStore
     */
    __publicField(this, "canvasElement", ref(void 0));
    /**
     * @description 文本输入框颜色
     * @type {(Ref<HTMLCanvasElement | undefined>)}
     * @memberof ScreenShotStore
     */
    __publicField(this, "textInputElement", ref(void 0));
    /**
     * @description 加载状态
     * @type {Ref<boolean>}
     * @memberof ScreenShotStore
     */
    __publicField(this, "isLoading", ref(false));
    /**
     * @description 文本状态
     * @type {Ref<boolean>}
     * @memberof ScreenShotStore
     */
    __publicField(this, "textStatus", ref(false));
    /**
     * @description 工具栏状态
     * @type {Ref<boolean>}
     * @memberof ScreenShotStore
     */
    __publicField(this, "toolbarStatus", ref(false));
    /**
     * @description 当前工具名称
     * @type {Ref<boolean>}
     * @memberof ScreenShotStore
     */
    __publicField(this, "toolbarName", ref());
    /**
     * @description 历史
     * @type {Ref<{ data: ImageData }[]>}
     * @memberof ScreenShotStore
     */
    __publicField(this, "history", ref([]));
  }
}

export { ScreenShotStore };
