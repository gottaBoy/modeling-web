import { PanelItemController } from '@ibiz-template/runtime';
import { notNilEmpty, createUUID } from 'qx-util';
import { CoopPosState } from './coop-pos.state.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class CoopPosController extends PanelItemController {
  constructor() {
    super(...arguments);
    /**
     *云系统操作者
     *
     * @memberof CoopPosController
     */
    __publicField(this, "operator", []);
    /**
     * @description 自定义补充参数
     * @type {IData}
     * @exposedoc
     * @memberof CoopPosController
     */
    __publicField(this, "rawItemParams", {});
    /**
     * @description 显示模式
     * @type {('avatar' | 'default')}
     * @exposedoc
     * @memberof CoopPosController
     */
    __publicField(this, "showMode", "default");
    /**
     * 是否启用无权限
     *
     * @type {boolean}
     * @memberof CoopPosController
     */
    __publicField(this, "enableNoAccess", false);
    /**
     * @description 是否启用全局下载地址前缀
     * @type {boolean}
     * @memberof CoopPosController
     */
    __publicField(this, "globalDownloadPrifix", false);
    /**
     * 消息模式映射
     * - 视图打开数据模式映射消息类型
     * @protected
     * @type {Map<string, string>}
     * @memberof CoopPosController
     */
    __publicField(this, "messageModeMap", /* @__PURE__ */ new Map([
      ["OPENDATA", "VIEW"],
      ["EDITDATA", "EDIT"],
      ["NOTICERELOAD", "UPDATE"]
    ]));
  }
  createState() {
    var _a;
    return new CoopPosState((_a = this.parent) == null ? void 0 : _a.state);
  }
  async onInit() {
    await super.onInit();
    this.handleRawItemParams();
    this.showMode = this.rawItemParams.showmode;
    this.enableNoAccess = this.rawItemParams.enablenoaccess === "true";
    if (this.rawItemParams.globaldownloadprifix) {
      this.globalDownloadPrifix = this.rawItemParams.globaldownloadprifix === "true";
    } else {
      this.globalDownloadPrifix = ibiz.config.common.globalDownloadPrifix;
    }
    await this.getOperator();
  }
  /**
   * @description 处理自定义补充参数
   * @protected
   * @memberof CoopPosController
   */
  handleRawItemParams() {
    var _a;
    let params = {};
    const rawItemParams = (_a = this.model.rawItem) == null ? void 0 : _a.rawItemParams;
    if (notNilEmpty(rawItemParams)) {
      params = rawItemParams.reduce((param, item) => {
        param[item.key.toLowerCase()] = item.value;
        return param;
      }, {});
    }
    Object.assign(this.rawItemParams, params);
  }
  /**
   * 初始化消息模式
   *
   * @param {string[]} modes 【标记数据打开模式】：OPENDATA：登记打开数据、 EDITDATA：登记更新数据、 DISPLAYOPPERSON：显示操作人员、 NOTICERELOAD：提示刷新数据
   * @memberof CoopPosController
   */
  initMessageModes(modes) {
    if (modes.includes("DISPLAYOPPERSON")) {
      if (modes.length === 1) {
        this.state.messageModes = ["VIEW", "EDIT", "UPDATE"];
      } else {
        this.state.messageModes = modes.map(
          (item) => this.messageModeMap.get(item) || item
        );
      }
      const username = this.panel.context.srfusername;
      this.state.messageMap.set(username, { username });
    }
  }
  /**
   * 更新消息
   * @param {IAlertParams} params Alert提示参数
   * @memberof CoopPosController
   */
  updateMessage(params) {
    this.state.key = createUUID();
    const { data } = params;
    if (data.action === "CLOSE") {
      this.state.messageMap.delete(data.username);
    } else {
      this.state.messageMap.set(data.username, data);
    }
    this.state.alertParams = params;
  }
  /**
   * @description 获取云系统操作者代码表
   * @return {*}  {Promise<void>}
   * @memberof CoopPosController
   */
  async getOperator() {
    if (this.showMode === "avatar") {
      const app = await ibiz.hub.getApp(this.panel.context.srfappid);
      this.operator = await app.codeList.get(
        "SysOperator",
        this.panel.context,
        this.panel.params
      );
    }
  }
  /**
   * @description 根据名称获取图标
   * @param {string} name
   * @return {*}  {string}
   * @memberof CoopPosController
   */
  getIconUrlByName(name) {
    var _a;
    let result = "";
    const item = this.operator.find((x) => x.text === name);
    if (item) {
      result = ((_a = item.data) == null ? void 0 : _a.iconurl) || "";
    }
    return result;
  }
  /**
   * @description 获取头像下载地址
   * @param {string} url
   * @return {*}  {string}
   * @memberof CoopPosController
   */
  getDownloadUrl(url) {
    if (!url) {
      return "";
    }
    const urlConfig = JSON.parse(url);
    if (urlConfig.length === 0) {
      return "";
    }
    const { downloadUrl } = ibiz.util.file.calcFileUpDownUrl(
      this.panel.context,
      this.panel.params,
      {},
      {
        enableNoAccess: this.enableNoAccess,
        globalDownloadPrifix: this.globalDownloadPrifix
      }
    );
    return downloadUrl.replace("%fileId%", urlConfig[0].id);
  }
}

export { CoopPosController };
