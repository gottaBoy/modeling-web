import { ModelError, RuntimeModelError, RuntimeError } from '@ibiz-template/core';
import { PanelItemController, PanelNotifyState, getPanelItemProvider, isDataContainer, convertNavData, ScriptFactory, execDELogicById } from '@ibiz-template/runtime';
import { MultiDataContainerRawState } from './multi-data-container-raw.state.mjs';

"use strict";
class MultiDataContainerRawController extends PanelItemController {
  constructor() {
    super(...arguments);
    this.isDataContainer = true;
    /**
     * @description 面板子项的控制器
     * @type {{ [key: string]: IPanelItemController }}
     * @memberof MultiDataContainerRawController
     */
    this.panelItems = {};
    /**
     * 所有面板成员的适配器
     *
     * @type {{ [key: string]: IPanelItemProvider }}
     * @memberof MultiDataContainerRawController
     */
    this.providers = {};
  }
  /**
   * 多项数据容器，根据数据模式
   *
   * @readonly
   * @type {IData}
   * @memberof MultiDataContainerRawController
   */
  get data() {
    return this.state.items;
  }
  createState() {
    var _a;
    return new MultiDataContainerRawState((_a = this.parent) == null ? void 0 : _a.state);
  }
  async onInit() {
    await super.onInit();
    await this.initPanelItemControllers();
  }
  /**
   * 面板状态变更通知
   *
   * @param {PanelNotifyState} _state
   * @return {*}  {Promise<void>}
   * @memberof MultiDataContainerRawController
   */
  async panelStateNotify(_state) {
    super.panelStateNotify(_state);
    if (_state === PanelNotifyState.LOAD) {
      this.initContainerData();
    }
  }
  /**
   *  初始化面板子项控制器
   *
   * @protected
   * @param {(IPanelItem[] | undefined)} [panelItems=this.model.panelItems]
   * @param {IPanelController} [panel=this.panel]
   * @param {(IPanelItemContainerController | undefined)} [parent=this]
   * @return {*}  {Promise<void>}
   * @memberof MultiDataContainerRawController
   */
  async initPanelItemControllers(panelItems = this.model.panelItems, panel = this.panel, parent = this) {
    if (!panelItems) {
      return;
    }
    await Promise.all(
      panelItems.map(async (panelItem) => {
        var _a, _b;
        const panelItemProvider = await getPanelItemProvider(
          panelItem,
          panel.model,
          panel.view.model
        );
        if (!panelItemProvider) {
          return;
        }
        this.providers[panelItem.id] = panelItemProvider;
        const panelItemController = await panelItemProvider.createController(
          panelItem,
          panel,
          parent
        );
        this.panelItems[panelItem.id] = panelItemController;
        if (((_a = panelItem.panelItems) == null ? void 0 : _a.length) && !isDataContainer(panelItem)) {
          await this.initPanelItemControllers(
            panelItem.panelItems,
            panel,
            panelItemController
          );
        }
        if ((_b = panelItem.panelTabPages) == null ? void 0 : _b.length) {
          await this.initPanelItemControllers(
            panelItem.panelTabPages,
            panel,
            panelItemController
          );
        }
      })
    );
  }
  /**
   * 计算导航参数
   *
   * @protected
   * @return {*}  {IData}
   * @memberof MultiDataContainerRawController
   */
  computeNavParams() {
    const { navigateContexts, navigateParams } = this.model;
    const context = this.panel.context.clone();
    Object.assign(
      context,
      convertNavData(navigateContexts, this.panel.params, this.panel.context)
    );
    const params = convertNavData(
      navigateParams,
      this.panel.params,
      this.panel.context
    );
    Object.assign(params, this.panel.params);
    return { context, params };
  }
  /**
   * 根据来源类型初始化容器数据
   *
   * @protected
   * @memberof MultiDataContainerRawController
   */
  initContainerData() {
    const { dataSourceType, dataName, scriptCode } = this.model;
    switch (dataSourceType) {
      case "DEACTION":
      case "DEDATASET":
        this.setDataByDeMethod();
        break;
      case "APPGLOBALPARAM":
        this.setDataByAppGlobalParam();
        break;
      case "DELOGIC":
        this.setDataByDeLogic();
        break;
      case "TOPVIEWSESSIONPARAM": {
        if (!dataName) {
          throw new RuntimeModelError(
            this.model,
            ibiz.i18n.t("vue3Util.panelComponent.noConfiguardDataObject")
          );
        }
        this.bindViewData(this.panel.getTopView(), dataName);
        break;
      }
      case "VIEWSESSIONPARAM": {
        if (!dataName) {
          throw new RuntimeModelError(
            this.model,
            ibiz.i18n.t("vue3Util.panelComponent.noConfiguardDataObject")
          );
        }
        this.bindViewData(this.panel.view, dataName);
        break;
      }
      case "ACTIVEDATAPARAM": {
        if (!dataName) {
          throw new RuntimeModelError(
            this.model,
            ibiz.i18n.t("vue3Util.panelComponent.noConfiguardDataObject")
          );
        }
        this.setData(this.dataParent.data[dataName]);
        break;
      }
      case "CUSTOM": {
        if (!scriptCode) {
          throw new RuntimeModelError(
            this.model,
            ibiz.i18n.t("vue3Util.panelComponent.noConfiguredScript")
          );
        }
        const computeData = ScriptFactory.execScriptFn(
          {
            ...this.panel.getEventArgs(),
            data: this.dataParent.data
          },
          scriptCode,
          {
            isAsync: false,
            singleRowReturn: true
          }
        );
        this.setData(computeData);
        break;
      }
      default:
        throw new ModelError(
          this.model,
          ibiz.i18n.t("vue3Util.panelComponent.noSupportedDataSourceType", {
            dataSourceType
          })
        );
    }
  }
  /**
   * 面板状态变更通知
   *
   * @param {PanelNotifyState} state
   * @memberof MultiDataContainerRawController
   */
  childrenStateNotify(state) {
    Object.values(this.panelItems).forEach((panelItem) => {
      panelItem.panelStateNotify(state);
    });
  }
  /**
   * 设置数据集合
   *
   * @param {IData[]} items
   * @return {*}  {Promise<void>}
   * @memberof MultiDataContainerRawController
   */
  async setData(items) {
    var _a, _b;
    (_b = (_a = this.data).destroy) == null ? void 0 : _b.call(_a);
    this.state.items = items;
    this.childrenStateNotify(PanelNotifyState.LOAD);
  }
  /**
   * 通过实体设置视图逻辑
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof MultiDataContainerRawController
   */
  async setDataByDeLogic() {
    const { appDataEntityId, appDELogicId } = this.model;
    if (!appDELogicId) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t("vue3Util.panelComponent.noConfiguredEntityLogic")
      );
    }
    if (!appDataEntityId) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t("vue3Util.panelComponent.noConfiguredEntity")
      );
    }
    const { context, params } = this.computeNavParams();
    const data = await execDELogicById(
      appDELogicId,
      appDataEntityId,
      context,
      this.panel.data,
      params
    );
    if (!data) {
      throw new RuntimeError(
        ibiz.i18n.t("vue3Util.panelComponent.noReturnValue", { appDELogicId })
      );
    }
    this.setData(data);
  }
  /**
   * 设置全局变量为当前容器数据
   *
   * @protected
   * @memberof MultiDataContainerRawController
   */
  setDataByAppGlobalParam() {
    const { dataName } = this.model;
    const originData = dataName ? ibiz.appData[dataName] : ibiz.appData;
    if (originData) {
      this.setData(originData);
    } else {
      ibiz.log.error(
        ibiz.i18n.t("vue3Util.panelComponent.noAttribute", { dataName })
      );
    }
  }
  /**
   * 请求实体行为并把返回值设置为当前容器的数据
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof MultiDataContainerRawController
   */
  async setDataByDeMethod() {
    const { appDEMethodId, appDataEntityId } = this.model;
    if (!appDEMethodId) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t("vue3Util.panelComponent.noConfiguerdEntityBehanior")
      );
    }
    if (!appDataEntityId) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t("vue3Util.panelComponent.noConfiguredEntity")
      );
    }
    const app = ibiz.hub.getApp(this.panel.context.srfappid);
    const { context, params } = this.computeNavParams();
    const res = await app.deService.exec(
      appDataEntityId,
      appDEMethodId,
      context,
      void 0,
      params
    );
    if (res.ok && res.data) {
      this.setData(res.data);
    }
  }
  /**
   * 绑定指定视图会话的变量
   *
   * @protected
   * @param {IViewController} view 绑定视图控制器
   * @param {string} dataName 变量名称
   * @return {*}  {void}
   * @memberof MultiDataContainerRawController
   */
  bindViewData(view, dataName) {
    if (!Object.prototype.hasOwnProperty.call(view.state, dataName)) {
      ibiz.log.error(
        ibiz.i18n.t("vue3Util.panelComponent.sessionView", { dataName })
      );
      return;
    }
    const updateData = () => {
      const originData = view.state[dataName];
      if (originData) {
        this.setData(originData);
      } else {
        ibiz.log.error(
          ibiz.i18n.t("vue3Util.panelComponent.viewStateAttribute", {
            dataName
          })
        );
      }
    };
    updateData();
    view.evt.on("onDataChange", () => {
      updateData();
    });
  }
  setDataValue(_name, _value) {
    throw new Error(ibiz.i18n.t("vue3Util.panelComponent.noImplementMethod"));
  }
  destroy() {
    var _a, _b;
    super.destroy();
    (_b = (_a = this.data).destroy) == null ? void 0 : _b.call(_a);
    Object.values(this.panelItems).forEach((item) => {
      var _a2;
      (_a2 = item.destroy) == null ? void 0 : _a2.call(item);
    });
  }
}

export { MultiDataContainerRawController };
