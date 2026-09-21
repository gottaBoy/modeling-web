'use strict';

var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');
var multiDataContainerItem_controller = require('./multi-data-container-item.controller.cjs');
var multiDataContainer_state = require('./multi-data-container.state.cjs');

"use strict";
class MultiDataContainerController extends runtime.PanelContainerController {
  constructor() {
    super(...arguments);
    /**
     * @description 是否为数据容器
     * @exposedoc
     * @memberof MultiDataContainerController
     */
    this.isDataContainer = true;
    /**
     * @description 数据项的控制器
     * @exposedoc
     * @type {MultiDataContainerItemController[]}
     */
    this.dataItems = [];
    /**
     * @description 所有面板成员的适配器
     * @type {{ [key: string]: IPanelItemProvider }}
     */
    this.providers = {};
  }
  /**
   * @description 多项数据容器，根据数据模式
   * @exposedoc
   * @readonly
   * @type {IData}
   */
  get data() {
    return this.state.items;
  }
  createState() {
    var _a;
    return new multiDataContainer_state.MultiDataContainerState((_a = this.parent) == null ? void 0 : _a.state);
  }
  async onInit() {
    await super.onInit();
    await this.initPanelItemProviders();
  }
  /**
   * 面板状态变更通知
   * @param {PanelNotifyState} _state
   * @return {*}  {Promise<void>}
   */
  async panelStateNotify(_state) {
    super.panelStateNotify(_state);
    if (_state === runtime.PanelNotifyState.LOAD) {
      this.initContainerData();
    }
  }
  /**
   * 初始化面板成员控制器
   *
   * @author lxm
   * @date 2022-08-24 21:08:48
   * @protected
   */
  async initPanelItemProviders(panelItems = this.model.panelItems) {
    if (!panelItems) {
      return;
    }
    await Promise.all(
      panelItems.map(async (panelItem) => {
        var _a, _b;
        const panelItemProvider = await runtime.getPanelItemProvider(
          panelItem,
          this.panel.model,
          this.panel.view.model
        );
        if (!panelItemProvider) {
          return;
        }
        this.providers[panelItem.id] = panelItemProvider;
        if (((_a = panelItem.panelItems) == null ? void 0 : _a.length) && !runtime.isDataContainer(panelItem)) {
          await this.initPanelItemProviders(
            panelItem.panelItems
          );
        }
        if ((_b = panelItem.panelTabPages) == null ? void 0 : _b.length) {
          await this.initPanelItemProviders(
            panelItem.panelTabPages
          );
        }
      })
    );
  }
  /**
   * 计算导航参数
   *
   * @author tony001
   * @date 2024-07-30 18:07:36
   * @protected
   * @return {*}  {IData}
   */
  computeNavParams() {
    const parentData = this.dataParent.data || {};
    const { navigateContexts, navigateParams } = this.model;
    const context = this.panel.context.clone();
    Object.assign(
      context,
      runtime.convertNavData(
        navigateContexts,
        parentData,
        this.panel.context,
        this.panel.params
      )
    );
    const params = runtime.convertNavData(
      navigateParams,
      parentData,
      this.panel.context,
      this.panel.params
    );
    Object.assign(params, this.panel.params);
    return { context, params };
  }
  /**
   * 根据来源类型初始化容器数据
   * @author lxm
   * @date 2023-08-04 03:05:59
   * @protected
   */
  async initContainerData() {
    const { dataSourceType, dataName, scriptCode, showBusyIndicator } = this.model;
    try {
      if (showBusyIndicator)
        this.startLoading();
      switch (dataSourceType) {
        case "DEACTION":
        case "DEDATASET":
          await this.setDataByDeMethod();
          break;
        case "APPGLOBALPARAM":
          this.setDataByAppGlobalParam();
          break;
        case "DELOGIC":
          await this.setDataByDeLogic();
          break;
        case "TOPVIEWSESSIONPARAM": {
          if (!dataName) {
            throw new core.RuntimeModelError(
              this.model,
              ibiz.i18n.t("vue3Util.panelComponent.noConfiguardDataObject")
            );
          }
          this.bindViewData(this.panel.getTopView(), dataName);
          break;
        }
        case "VIEWSESSIONPARAM": {
          if (!dataName) {
            throw new core.RuntimeModelError(
              this.model,
              ibiz.i18n.t("vue3Util.panelComponent.noConfiguardDataObject")
            );
          }
          this.bindViewData(this.panel.view, dataName);
          break;
        }
        case "ACTIVEDATAPARAM": {
          if (!dataName) {
            throw new core.RuntimeModelError(
              this.model,
              ibiz.i18n.t("vue3Util.panelComponent.noConfiguardDataObject")
            );
          }
          await this.setData(this.dataParent.data[dataName]);
          break;
        }
        case "CUSTOM": {
          if (!scriptCode) {
            throw new core.RuntimeModelError(
              this.model,
              ibiz.i18n.t("vue3Util.panelComponent.noConfiguredScript")
            );
          }
          const computeData = runtime.ScriptFactory.execScriptFn(
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
          await this.setData(computeData);
          break;
        }
        default:
          throw new core.ModelError(
            this.model,
            ibiz.i18n.t("vue3Util.panelComponent.noSupportedDataSourceType", {
              dataSourceType
            })
          );
      }
    } finally {
      if (showBusyIndicator)
        this.endLoading();
    }
  }
  /**
   * 面板状态变更通知
   *
   * @author lxm
   * @date 2022-09-20 18:09:07
   */
  childrenStateNotify(state) {
    this.dataItems.forEach((dataItem) => {
      dataItem.panelStateNotify(state);
    });
  }
  /**
   * 值校验
   *
   * @return {*}  {Promise<boolean>}
   * @memberof MultiDataContainerController
   */
  async validate() {
    const values = await Promise.all(
      this.dataItems.map((item) => item.validate())
    );
    return values.every((value) => value);
  }
  /**
   * @description 设置数据集合
   * @exposedoc
   * @author lxm
   * @date 2023-09-05 05:42:09
   * @param {IData[]} items
   */
  async setData(items) {
    const fields = runtime.getAllPanelField(this.model);
    const _items = items.map((item) => new runtime.PanelData(fields, item));
    this.dataItems = _items.map((item) => {
      return new multiDataContainerItem_controller.MultiDataContainerItemController(
        this.model,
        this.panel,
        this,
        item
      );
    });
    if (this.dataItems.length) {
      await Promise.all(
        this.dataItems.map((controller) => {
          return controller.init();
        })
      );
    }
    this.state.items = _items;
    this.childrenStateNotify(runtime.PanelNotifyState.LOAD);
    this.panel.evt.emit("onPanelDataContainerEvent", {
      panelDataContainerName: this.model.id,
      panelDataContainerEventName: runtime.PanelDataContainerEventName.onLoadSuccess,
      data: [this.data]
    });
  }
  /**
   * 通过实体设置视图逻辑
   * @author lxm
   * @date 2023-08-04 03:00:31
   * @protected
   * @return {*}  {Promise<void>}
   */
  async setDataByDeLogic() {
    const { appDataEntityId, appDELogicId } = this.model;
    if (!appDELogicId) {
      throw new core.RuntimeModelError(
        this.model,
        ibiz.i18n.t("vue3Util.panelComponent.noConfiguredEntityLogic")
      );
    }
    if (!appDataEntityId) {
      throw new core.RuntimeModelError(
        this.model,
        ibiz.i18n.t("vue3Util.panelComponent.noConfiguredEntity")
      );
    }
    const { context, params } = this.computeNavParams();
    const data = await runtime.execDELogicById(
      appDELogicId,
      appDataEntityId,
      context,
      this.panel.data,
      params
    );
    if (!data) {
      throw new core.RuntimeError(
        ibiz.i18n.t("vue3Util.panelComponent.noReturnValue", { appDELogicId })
      );
    }
    this.setData(data);
  }
  /**
   * 设置全局变量为当前容器数据
   * @author lxm
   * @date 2023-08-04 01:55:07
   * @protected
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
   * @author lxm
   * @date 2023-08-04 11:47:17
   * @protected
   * @return {*}  {Promise<void>}
   */
  async setDataByDeMethod() {
    const { appDEMethodId, appDataEntityId } = this.model;
    if (!appDEMethodId) {
      throw new core.RuntimeModelError(
        this.model,
        ibiz.i18n.t("vue3Util.panelComponent.noConfiguerdEntityBehanior")
      );
    }
    if (!appDataEntityId) {
      throw new core.RuntimeModelError(
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
   * @author lxm
   * @date 2023-07-14 02:03:56
   * @protected
   * @param {IViewController} view 绑定视图控制器
   * @param {string} dataName 变量名称
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
  /**
   * @description 销毁
   * @memberof MultiDataContainerController
   */
  destroy() {
    super.destroy();
    this.dataItems.forEach((item) => {
      item.destroy();
    });
  }
}

exports.MultiDataContainerController = MultiDataContainerController;
