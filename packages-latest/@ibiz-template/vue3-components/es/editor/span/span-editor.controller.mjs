import { CodeListEditorController, OpenAppViewCommand } from '@ibiz-template/runtime';
import { IBizContext, RuntimeModelError } from '@ibiz-template/core';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class SpanEditorController extends CodeListEditorController {
  constructor() {
    super(...arguments);
    /**
     *值项
     */
    __publicField(this, "valueItem", "");
    /**
     * 无值隐藏单位
     *
     * @type {boolean}
     * @memberof SpanEditorController
     */
    __publicField(this, "emptyHiddenUnit", true);
    /**
     * 代码表模型
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-05-24 10:55:50
     */
    __publicField(this, "codeList");
  }
  async onInit() {
    var _a, _b;
    super.onInit();
    if ((_b = (_a = this.model) == null ? void 0 : _a.editorItems) == null ? void 0 : _b[0]) {
      this.valueItem = this.model.editorItems[0].id;
    }
    if (this.model.appCodeListId) {
      const app = await ibiz.hub.getApp(this.context.srfappid);
      this.codeList = app.codeList.getCodeList(this.model.appCodeListId);
    }
    if (this.extraParams) {
      this.emptyHiddenUnit = this.extraParams.emptyHiddenUnit;
    }
  }
  /**
   * 打开数据链接视图
   */
  async openLinkView(data) {
    const tempContext = this.context.deepClone();
    if (data[this.valueItem]) {
      tempContext.srfkey = data[this.valueItem];
    }
    const { context, params } = this.handlePublicParams(
      data,
      IBizContext.create(tempContext),
      this.params
    );
    const { linkAppViewId } = this.model;
    if (!linkAppViewId) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t("editor.common.linkViewConfigErr")
      );
    }
    return ibiz.commands.execute(
      OpenAppViewCommand.TAG,
      linkAppViewId,
      context,
      params
    );
  }
}

export { SpanEditorController };
