'use strict';

var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');
var lodashEs = require('lodash-es');
var ramda = require('ramda');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PickerEditorController extends runtime.EditorController {
  constructor() {
    super(...arguments);
    /**
     * 是否多选
     */
    __publicField(this, "multiple", false);
    /**
     *选择视图相关参数
     */
    __publicField(this, "pickupView", null);
    /**
     *链接视图相关参数
     */
    __publicField(this, "linkView", null);
    /**
     *值项
     */
    __publicField(this, "valueItem", "");
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
     * 不支持AC（根据编辑器类型得）
     */
    __publicField(this, "noAC", false);
    /**
     * 不支持按钮（根据编辑器类型得）
     */
    __publicField(this, "noButton", false);
    /**
     * 实体自填模式模型
     */
    __publicField(this, "deACMode");
    /**
     * 自填数据项集合（已排除了value和text)
     */
    __publicField(this, "dataItems", []);
    // 对象标识属性
    __publicField(this, "objectIdField", "");
    // 对象名称属性
    __publicField(this, "objectNameField", "");
    // 对象值属性
    __publicField(this, "objectValueField", "");
    /**
     * 自填列表项适配器
     *
     * @author zhanghengfeng
     * @date 2024-05-21 17:05:50
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
     * @memberof PickerEditorController
     */
    __publicField(this, "actionDetails", []);
    /**
     * 当前页
     *
     * @type {number}
     * @default 1
     * @memberof PickerEditorController
     */
    __publicField(this, "curPage", 1);
    /**
     * 总条数
     *
     * @type {number}
     * @default 0
     * @memberof PickerEditorController
     */
    __publicField(this, "total", 0);
    /**
     * 总页数
     *
     * @type {number}
     * @memberof PickerEditorController
     */
    __publicField(this, "totalPages");
    /**
     * 自填模式分页大小
     *
     * @type {number}
     * @memberof PickerEditorController
     */
    __publicField(this, "pagingSize");
    /**
     * 自填模式分页模式配置：0：不分页，1：分页栏，2：滚动加载，3：加载更多
     *
     * @type {number}
     * @memberof PickerEditorController
     */
    __publicField(this, "pagingMode");
  }
  /**
   * 是否懒加载
   *
   * @readonly
   * @type {boolean}
   * @memberof PickerEditorController
   */
  get isLazyLoad() {
    return lodashEs.isNumber(this.pagingMode) && this.pagingMode !== 0;
  }
  /**
   * 是否显示加载更多
   *
   * @readonly
   * @type {boolean}
   * @memberof PickerEditorController
   */
  get isShowLoadMore() {
    return !!(this.isLazyLoad && this.pagingMode === 3 && this.totalPages && this.curPage < this.totalPages);
  }
  async onInit() {
    var _a, _b, _c, _d;
    super.onInit();
    this.initParams();
    this.valueItem = ((_a = this.model.valueItemName) == null ? void 0 : _a.toLowerCase()) || "";
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
          const {
            minorSortAppDEFieldId,
            minorSortDir,
            pagingMode,
            pagingSize
          } = this.deACMode;
          this.pagingMode = pagingMode;
          this.pagingSize = pagingSize;
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
    const embedViewEditors = [
      "PICKEREX_DROPDOWNVIEW",
      "PICKEREX_DROPDOWNVIEW_LINK",
      "PICKUPVIEW",
      "MOBPICKER_DROPDOWNVIEW"
    ];
    if (this.model.editorType && embedViewEditors.includes(this.model.editorType)) {
      this.initPickupViewParams();
    }
    this.objectIdField = (_b = this.model.objectIdField) == null ? void 0 : _b.toLowerCase();
    this.objectNameField = (_c = this.model.objectNameField) == null ? void 0 : _c.toLowerCase();
    this.objectValueField = (_d = this.model.objectValueField) == null ? void 0 : _d.toLowerCase();
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
   * 初始化noAc和noButton
   */
  initParams() {
    switch (this.model.editorType) {
      case "PICKEREX_NOAC":
      case "PICKEREX_NOAC_LINK":
        this.noAC = true;
        break;
      case "PICKEREX_NOBUTTON":
        this.noButton = true;
        break;
      default:
        this.noButton = false;
        this.noAC = false;
    }
  }
  /**
   * 初始化选择视图相关参数
   */
  async initPickupViewParams() {
    if (this.model.pickupAppViewId) {
      this.pickupView = await ibiz.hub.config.view.get(
        this.model.pickupAppViewId
      );
    }
  }
  /**
   * 初始化链接视图相关参数
   */
  async initLinkViewParams() {
    if (this.model.linkAppViewId) {
      this.linkView = await ibiz.hub.config.view.get(this.model.linkAppViewId);
    }
  }
  /**
   * 加载实体数据集数据
   *
   * @param {string} query 模糊匹配字符串
   * @param {IData} data 表单数据
   * @returns {*}  {Promise<IHttpResponse<IData[]>>}
   * @memberof PickerEditorController
   */
  async getServiceData(query, data, options) {
    const { context, params } = this.handlePublicParams(
      data,
      this.context,
      this.params
    );
    const fixedParams = {};
    if (ibiz.config.pickerdefaultsort) {
      Object.assign(fixedParams, { sort: ibiz.config.pickerdefaultsort });
    }
    if (this.sort && !Object.is(this.sort, "")) {
      Object.assign(fixedParams, { sort: this.sort });
    }
    if (query) {
      Object.assign(fixedParams, { query });
    }
    Object.assign(fixedParams, { size: 1e3 });
    if (this.isLazyLoad) {
      const isLoadMore = (options == null ? void 0 : options.isLoadMore) === true;
      if (isLoadMore) {
        this.curPage += 1;
      } else {
        this.curPage = 1;
      }
    }
    if (this.isLazyLoad && this.pagingSize) {
      Object.assign(fixedParams, {
        size: this.pagingSize,
        page: this.curPage - 1
      });
    }
    const tempParams = ramda.mergeDeepLeft(params, fixedParams);
    if (this.interfaceName) {
      const app = ibiz.hub.getApp(this.context.srfappid);
      const res = await app.deService.exec(
        this.model.appDataEntityId,
        this.interfaceName,
        context,
        tempParams
      );
      if (res.headers) {
        if (res.headers["x-total"]) {
          this.total = Number(res.headers["x-total"]);
        }
        if (res.headers["x-total-pages"]) {
          this.totalPages = Number(res.headers["x-total-pages"]);
        }
      }
      return res;
    }
    throw new core.RuntimeModelError(
      this.model,
      ibiz.i18n.t("editor.common.entityConfigErr")
    );
  }
  /**
   * 打开数据选择视图
   *
   * @param {IData} data 数据对象
   * @param {IData[]} selectedData 选中项集合
   * @returns {*}  {(Promise<IData[] | undefined>)}
   * @memberof PickerEditorController
   */
  async openPickUpView(data, selectedData) {
    await this.initPickupViewParams();
    const { context, params } = this.handlePublicParams(
      data,
      this.context,
      this.params
    );
    if (selectedData) {
      params.selecteddata = selectedData;
    }
    if (!this.pickupView) {
      throw new core.RuntimeModelError(
        this.model,
        ibiz.i18n.t("editor.common.selectViewConfigErr")
      );
    }
    const res = await ibiz.commands.execute(
      runtime.OpenAppViewCommand.TAG,
      this.pickupView.id,
      context,
      { checkstrictly: true, ...params },
      { openMode: "POPUPMODAL" }
    );
    if (res && res.ok && res.data) {
      return res.data;
    }
    ibiz.log.debug("\u6A21\u6001\u53D6\u6D88\u6216\u5173\u95ED\u5F02\u5E38", res);
  }
  /**
   * 打开数据链接视图
   */
  async openLinkView(data) {
    const tempContext = this.context.clone();
    if (data[this.valueItem]) {
      tempContext.srfkey = data[this.valueItem];
    }
    const { context, params } = this.handlePublicParams(
      data,
      tempContext,
      this.params
    );
    const { linkAppViewId } = this.model;
    if (!linkAppViewId) {
      throw new core.RuntimeModelError(
        this.model,
        ibiz.i18n.t("editor.common.linkViewConfigErr")
      );
    }
    return ibiz.commands.execute(
      runtime.OpenAppViewCommand.TAG,
      linkAppViewId,
      context,
      params
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
   * 处理对象数据类型抛值
   * @param {IData} select
   * @return {*}
   * @author: zhujiamin
   * @Date: 2023-08-22 15:58:56
   */
  handleObjectParams(select) {
    const object = {};
    if (this.objectIdField) {
      Object.assign(object, {
        [this.objectIdField]: select[this.keyName]
      });
    }
    if (this.objectNameField) {
      Object.assign(object, {
        [this.objectNameField]: select[this.textName]
      });
    }
    if (this.objectValueField) {
      const data = {
        ...select
      };
      delete data.srfkey;
      delete data.srfmajortext;
      Object.assign(object, {
        [this.objectValueField]: data
      });
    }
    if (select.srfnodeid) {
      Object.assign(object, {
        srfnodeid: select.srfnodeid
      });
    }
    return object;
  }
  /**
   * @description 分组行为项点击
   * @param {IUIActionGroupDetail} detail
   * @param {MouseEvent} event
   * @return {*}  {Promise<void>}
   * @memberof PickerEditorController
   */
  async onActionClick(detail, data, event) {
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

exports.PickerEditorController = PickerEditorController;
