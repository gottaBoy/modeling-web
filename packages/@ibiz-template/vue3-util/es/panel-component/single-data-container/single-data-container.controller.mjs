import { ModelError, RuntimeModelError, RuntimeError } from '@ibiz-template/core';
import { PanelItemController, PanelNotifyState, getPanelItemProvider, isDataContainer, convertNavData, ScriptFactory, getAllPanelField, PanelData, execDELogicById } from '@ibiz-template/runtime';
import { SingleDataContainerState } from './single-data-container.state.mjs';

"use strict";
class SingleDataContainerController extends PanelItemController {
  constructor() {
    super(...arguments);
    this.isDataContainer = true;
    /**
     * 所有面板成员的控制器
     *
     * @author lxm
     * @date 2022-08-24 20:08:07
     * @type {{ [key: string]: IPanelItemController }}
     */
    this.panelItems = {};
    /**
     * 所有面板成员的适配器
     *
     * @author lxm
     * @date 2022-08-24 20:08:07
     * @type {{ [key: string]: IPanelItemProvider }}
     */
    this.providers = {};
  }
  /**
   * 单项数据容器，根据数据模式
   * @author lxm
   * @date 2023-07-14 10:59:02
   * @readonly
   * @type {IData}
   */
  get data() {
    return this.state.data;
  }
  createState() {
    var _a;
    return new SingleDataContainerState((_a = this.parent) == null ? void 0 : _a.state);
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
   * @memberof SingleDataContainerController
   */
  async panelStateNotify(_state) {
    super.panelStateNotify(_state);
    if (_state === PanelNotifyState.LOAD) {
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
   * @author tony001
   * @date 2024-07-30 18:07:52
   * @protected
   * @return {*}  {IData}
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
   * @author lxm
   * @date 2023-08-04 03:05:59
   * @protected
   */
  initContainerData() {
    const { dataSourceType, dataName, dataRegionType, scriptCode } = this.model;
    if (dataRegionType === "LOGINFORM") {
      this.setLoginForm();
      return;
    }
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
   * @author lxm
   * @date 2022-09-20 18:09:07
   */
  childrenStateNotify(state) {
    Object.values(this.panelItems).forEach((panelItem) => {
      panelItem.panelStateNotify(state);
    });
  }
  /**
   * 设置数据
   * @author lxm
   * @date 2023-09-05 05:42:09
   * @param {IData[]} items
   */
  async setData(data) {
    var _a, _b;
    const fields = getAllPanelField(this.model);
    const fieldKeys = fields.map((item) => item.id);
    const panelData = new PanelData(fields, data);
    panelData._evt.on("change", (key) => {
      if (fieldKeys.includes(key)) {
        this.childDataChangeNotify([key]);
      }
    });
    (_b = (_a = this.data).destroy) == null ? void 0 : _b.call(_a);
    this.state.data = panelData;
    this.childrenStateNotify(PanelNotifyState.LOAD);
  }
  /**
   * 设置登录表单数据
   *
   * @protected
   * @memberof SingleDataContainerController
   */
  setLoginForm() {
    this.setData({});
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
  /**
   * 通知所有子面板成员面板操作过程中的数据变更
   *
   * @author lxm
   * @date 2022-09-20 18:09:40
   * @param {string[]} names
   */
  childDataChangeNotify(names) {
    Object.values(this.panelItems).forEach((panelItem) => {
      panelItem.dataChangeNotify(names);
    });
  }
  /**
   * 设置面板数据的值
   *
   * @param {string} name 要设置的数据的属性名称
   * @param {unknown} value 要设置的值
   */
  async setDataValue(name, value) {
    if (Object.prototype.hasOwnProperty.call(this.state.data, name) && this.state.data[name] === value) {
      return;
    }
    this.state.data[name] = value;
  }
  destroy() {
    var _a, _b;
    super.destroy();
    (_b = (_a = this.data).destroy) == null ? void 0 : _b.call(_a);
    Object.values(this.panelItems).forEach((item) => {
      item.destroy();
    });
  }
}

export { SingleDataContainerController };
