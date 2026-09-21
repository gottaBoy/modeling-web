import { PanelItemController } from '@ibiz-template/runtime';
import { PanelAppTitleState } from './panel-app-title.state.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PanelAppTitleController extends PanelItemController {
  constructor() {
    super(...arguments);
    /**
     * 分隔符，用于分割收缩与未收缩的标题
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-10-18 18:24:06
     */
    __publicField(this, "captionSplit", "|");
    /**
     * @description 自定义补充参数
     * @type {IData}
     * @memberof PanelAppTitleController
     */
    __publicField(this, "rawItemParams", {});
  }
  createState() {
    var _a;
    return new PanelAppTitleState((_a = this.parent) == null ? void 0 : _a.state);
  }
  /**
   * 初始化
   *
   * @return {*}  {Promise<void>}
   * @memberof PanelAppTitleController
   */
  async onInit() {
    await super.onInit();
    this.handleRawItemParams();
    if (this.panel.view.model.viewType !== "APPINDEXVIEW") {
      const viewModel = this.panel.view.model;
      const app = ibiz.hub.getApp(viewModel.appId);
      if (app) {
        this.state.caption = ibiz.env.AppTitle || app.model.caption || "";
      }
      return;
    }
    const indexViewModel = this.panel.view.model;
    if (indexViewModel.title && !document.title) {
      document.title = indexViewModel.title;
    }
    if (this.model.sysImage && this.model.sysImage.rawContent) {
      this.state.icon = this.model.sysImage.rawContent;
    } else if (indexViewModel.appIconPath) {
      this.state.icon = indexViewModel.appIconPath;
    }
    if (indexViewModel.appIconPath2) {
      this.state.icon2 = indexViewModel.appIconPath2;
    }
    if (indexViewModel.caption) {
      this.state.caption = indexViewModel.caption.split(this.captionSplit)[0];
      this.state.caption2 = indexViewModel.caption.split(this.captionSplit)[1] || indexViewModel.caption.split(this.captionSplit)[0];
    }
    if (indexViewModel.subCaption) {
      this.state.subCaption = indexViewModel.subCaption.split(
        this.captionSplit
      )[0];
      this.state.subCaption2 = indexViewModel.subCaption.split(this.captionSplit)[1] || indexViewModel.subCaption.split(this.captionSplit)[0];
    }
    if (this.state.icon.endsWith(".svg") || this.state.icon2.endsWith(".svg")) {
      this.state.isSvg = true;
    }
    if (ibiz.env.AppTitle)
      this.state.caption = ibiz.env.AppTitle;
  }
  /**
   * 处理自定义补充参数 [{key:'name',value:'data'}] => {name:'data'}
   *
   * @author zk
   * @date 2023-09-27 03:09:55
   * @protected
   * @memberof NavPosController
   */
  handleRawItemParams() {
    var _a;
    const rawItemParams = (_a = this.model.rawItem) == null ? void 0 : _a.rawItemParams;
    if (Array.isArray(rawItemParams)) {
      rawItemParams.forEach((item) => {
        const key = item.key;
        const value = item.value;
        if (key && value) {
          this.rawItemParams[key.toLowerCase()] = value;
        }
      });
    }
  }
}

export { PanelAppTitleController };
