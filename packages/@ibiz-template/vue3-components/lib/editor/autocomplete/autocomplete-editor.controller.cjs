'use strict';

var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');
var ramda = require('ramda');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AutoCompleteEditorController extends runtime.EditorController {
  constructor() {
    super(...arguments);
    /**
     * 主键属性名称
     */
    __publicField(this, "keyName", "srfkey");
    /**
     * 主文本属性名称
     */
    __publicField(this, "textName", "srfmajortext");
    /**
     * 数据集codeName
     */
    __publicField(this, "interfaceName", "");
    /**
     * 自填模式sort排序
     */
    __publicField(this, "sort", "");
    /**
     * 实体自填模式模型
     */
    __publicField(this, "deACMode");
    /**
     * 自填数据项集合（已排除了value和text)
     */
    __publicField(this, "dataItems", []);
    /**
     * 自填列表项适配器
     *
     * @author zhanghengfeng
     * @date 2024-05-21 17:05:21
     * @type {IAcItemProvider}
     */
    __publicField(this, "acItemProvider");
    /**
     * 分组行为状态
     */
    __publicField(this, "groupActionState", new runtime.ButtonContainerState());
    /**
     * @description 自填模式行为行为组
     * @type {IAppDEUIActionGroupDetail[]}
     * @memberof AutoCompleteEditorController
     */
    __publicField(this, "actionDetails", []);
  }
  async onInit() {
    super.onInit();
    if (this.model.appDataEntityId) {
      if (this.model.appDEDataSetId) {
        this.interfaceName = this.model.appDEDataSetId;
      }
      if (this.model.appDEACModeId) {
        this.deACMode = await runtime.getDeACMode(
          this.model.appDEACModeId,
          this.model.appDataEntityId,
          this.context.srfappid
        );
        if (this.deACMode) {
          const { minorSortAppDEFieldId, minorSortDir } = this.deACMode;
          if (minorSortAppDEFieldId && minorSortDir) {
            this.sort = "".concat(minorSortAppDEFieldId.toLowerCase(), ",").concat(minorSortDir.toLowerCase());
          }
          if (this.deACMode.textAppDEFieldId) {
            this.textName = this.deACMode.textAppDEFieldId;
          }
          if (this.deACMode.valueAppDEFieldId) {
            this.keyName = this.deACMode.valueAppDEFieldId;
          }
          if (this.deACMode.deacmodeDataItems) {
            this.dataItems = [];
            this.deACMode.deacmodeDataItems.forEach(
              (dataItem) => {
                if (dataItem.id !== "value" && dataItem.id !== "text") {
                  this.dataItems.push(dataItem);
                }
              }
            );
          }
          if (this.deACMode.itemSysPFPluginId) {
            this.acItemProvider = await runtime.getAcItemProvider(this.deACMode);
          }
        }
      }
    }
    if (this.model.uiactionGroup) {
      this.actionDetails = this.model.uiactionGroup.uiactionGroupDetails || [];
      if (this.actionDetails.length > 0) {
        this.actionDetails.forEach((detail) => {
          const actionid = detail.uiactionId;
          if (actionid) {
            const buttonState = new runtime.UIActionButtonState(
              detail.id,
              this.context.srfappid,
              actionid
            );
            this.groupActionState.addState(detail.id, buttonState);
          }
        });
        await this.groupActionState.init();
        this.actionDetails.forEach((detail) => {
          if (detail.capLanguageRes && detail.capLanguageRes.lanResTag) {
            detail.caption = ibiz.i18n.t(
              detail.capLanguageRes.lanResTag,
              detail.caption
            );
          }
          if (detail.tooltipLanguageRes && detail.tooltipLanguageRes.lanResTag) {
            detail.tooltip = ibiz.i18n.t(
              detail.tooltipLanguageRes.lanResTag,
              detail.tooltip
            );
          }
        });
      }
    }
  }
  /**
   * 加载实体数据集数据
   *
   * @param {string} query 模糊匹配字符串
   * @param {IData} data 表单数据
   * @returns {*}  {Promise<IHttpResponse<IData[]>>}
   * @memberof AutoCompleteEditorController
   */
  async getServiceData(query, data) {
    const { context, params } = this.handlePublicParams(
      data,
      this.context,
      this.params
    );
    const fixedParams = {};
    if (this.sort && !Object.is(this.sort, "")) {
      Object.assign(fixedParams, { sort: this.sort });
    }
    if (query) {
      Object.assign(fixedParams, { query });
    }
    Object.assign(fixedParams, { size: 1e3 });
    const tempParams = ramda.mergeDeepLeft(params, fixedParams);
    if (this.interfaceName) {
      const app = ibiz.hub.getApp(this.context.srfappid);
      const res = await app.deService.exec(
        this.model.appDataEntityId,
        this.interfaceName,
        context,
        tempParams
      );
      return res;
    }
    throw new core.RuntimeModelError(
      this.model,
      ibiz.i18n.t("editor.common.entityConfigErr")
    );
  }
  /**
   * 计算回填数据
   *
   * @author lxm
   * @date 2022-10-24 16:10:24
   * @param {IData} data 选中数据
   * @returns {*}  {Promise<Array<{ id: string; value: any }>>}
   */
  async calcFillDataItems(data) {
    if (this.deACMode) {
      if (this.dataItems.length === 0) {
        return [];
      }
      const result = await Promise.all(
        this.dataItems.map((item) => {
          const value = data[item.appDEFieldId];
          if (item.format) {
          } else if (item.convertToCodeItemText && item.codeListId) {
          } else if (item.customCode) {
          }
          return { id: item.id, value };
        })
      );
      return result;
    }
    return [];
  }
  /**
   * @description 分组行为项点击
   * @param {IUIActionGroupDetail} detail
   * @param {MouseEvent} event
   * @return {*}  {Promise<void>}
   * @memberof AutoCompleteEditorController
   */
  async onActionClick(detail, data, event) {
    if (event) {
      event.stopPropagation();
    }
    const actionId = detail.uiactionId;
    await runtime.UIActionUtil.execAndResolved(
      actionId,
      {
        context: this.context,
        params: this.params,
        data: [data],
        view: this.view,
        event
      },
      detail.appId
    );
  }
}

exports.AutoCompleteEditorController = AutoCompleteEditorController;
