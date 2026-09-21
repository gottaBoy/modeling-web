'use strict';

var qxUtil = require('qx-util');
var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var ramda = require('ramda');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class DRTabController extends runtime.ControlController {
  constructor() {
    super(...arguments);
    /**
     * 计数器对象
     * @author lxm
     * @date 2024-01-18 05:12:35
     * @type {AppCounter}
     */
    __publicField(this, "counter");
    /**
     * @description 启用缓存
     * @type {boolean}
     * @memberof DRTabController
     */
    __publicField(this, "srfCachePos", false);
    /**
     * @description 缓存标记
     * @type {string}
     * @memberof DRTabController
     */
    __publicField(this, "srfCacheKeyTempl", "");
    /**
     * @description 显示位置
     * @type {(string | undefined)}
     * @memberof DRTabController
     */
    __publicField(this, "tabPosition");
    /**
     * Router 对象
     *
     * @type {Router}
     * @memberof DRTabController
     */
    __publicField(this, "router");
  }
  /**
   * 导航占位控制器
   *
   * @readonly
   * @memberof DRTabController
   */
  get navPos() {
    var _a;
    return (_a = this.view.layoutPanel) == null ? void 0 : _a.panelItems.nav_pos;
  }
  /**
   * 表单部件
   *
   * @readonly
   * @memberof DRTabController
   */
  get form() {
    var _a;
    return (_a = this.view) == null ? void 0 : _a.getController("form");
  }
  /**
   * 路由层级
   *
   * @readonly
   * @type {(number | undefined)}
   * @memberof DRTabController
   */
  get routeDepth() {
    return this.view.modal.routeDepth;
  }
  /**
   * @description 选中缓存标识
   * @readonly
   * @type {string}
   * @memberof DRTabController
   */
  get storageTag() {
    if (this.srfCacheKeyTempl) {
      return this.srfCacheKeyTempl;
    }
    const userId = this.context.srfuserid;
    return "".concat(userId, "_").concat(this.view.model.codeName, "_").concat(this.model.codeName);
  }
  /**
   * @description 是否启用折叠
   * @readonly
   * @type {boolean}
   * @memberof DRTabController
   */
  get enableCollapse() {
    return this.controlParams.enablecollapse === "true";
  }
  /**
   * 是否启用锚点栏
   *
   * @readonly
   * @type {boolean}
   * @memberof DRTabController
   */
  get enableAnchor() {
    if (this.controlParams.enablenavbar) {
      return this.controlParams.enablenavbar === "true";
    }
    return ibiz.config.drtab.enableNavbar;
  }
  /**
   * 导航栏位置
   *
   * @readonly
   * @type {string}
   * @memberof DRTabController
   */
  get navbarpos() {
    var _a;
    return ((_a = this.controlParams.navbarpos) == null ? void 0 : _a.toLowerCase()) || ibiz.config.drtab.navbarPos.toLowerCase();
  }
  /**
   * 导航栏宽度
   *
   * @readonly
   * @type {string}
   * @memberof DRTabController
   */
  get navbarwidth() {
    return this.controlParams.navbarwidth || ibiz.config.drtab.navbarWidth;
  }
  /**
   * 设置 Router 对象
   *
   * @param {Router} router
   * @memberof DRTabController
   */
  setRouter(router) {
    this.router = router;
  }
  /**
   * 获取数据
   *
   * @return {*}  {IData[]}
   * @memberof DRTabController
   */
  getData() {
    var _a;
    return ((_a = this.form) == null ? void 0 : _a.getData()) || [{}];
  }
  /**
   * 初始化state的属性
   *
   * @protected
   * @memberof DRTabController
   */
  initState() {
    super.initState();
    this.state.drTabPages = [];
    this.state.showMore = false;
    this.state.expandedKeys = [];
    this.state.expViewParams = {};
    this.state.hideEditItem = !!this.model.hideEditItem;
  }
  /**
   * 创建完成
   *
   * @return {*}  {Promise<void>}
   * @memberof DRTabController
   */
  async onCreated() {
    var _a;
    this.tabPosition = (_a = this.view.model.tabLayout) == null ? void 0 : _a.toLowerCase();
    await super.onCreated();
    await this.initCounter();
    this.srfCacheKeyTempl = this.controlParams.srfcachekeytempl || "";
    if (this.controlParams.showmore) {
      this.state.showMore = this.controlParams.showmore === "true";
    }
    if (this.controlParams.srfcachepos) {
      this.srfCachePos = this.controlParams.srfcachepos.toLowerCase() === "true";
    }
  }
  /**
   * 通过计数器数据，计算项状态
   *
   * @author zhanghengfeng
   * @date 2024-05-16 17:05:01
   */
  calcItemStateByCounter() {
    if (!this.state.activated)
      return;
    this.state.drTabPages.forEach((item) => {
      const visible = runtime.calcItemVisibleByCounter(item, this.counter);
      if (visible !== void 0) {
        item.hidden = !visible;
      }
    });
    if (this.state.activeName) {
      const { visible, defaultVisibleItem } = this.getItemVisibleState(
        this.state.activeName
      );
      if (!visible && defaultVisibleItem) {
        this.state.activeName = defaultVisibleItem.tag;
        this.handleTabChange();
      }
    }
  }
  /**
   * 获取对应项的显示状态
   *
   * @author zhanghengfeng
   * @date 2024-05-16 17:05:18
   * @param {string} key
   * @return {*}  {{
   *     visible: boolean;
   *     defaultVisibleItem?: IDRTabPagesState;
   *   }}
   */
  getItemVisibleState(key) {
    let visible = true;
    let defaultVisibleItem;
    this.state.drTabPages.forEach((item) => {
      if (!defaultVisibleItem && !item.hidden) {
        defaultVisibleItem = item;
      }
      if (item.tag === key) {
        visible = !item.hidden;
      }
    });
    return {
      visible,
      defaultVisibleItem
    };
  }
  /**
   * 计算项权限
   *
   * @author zhanghengfeng
   * @date 2024-05-16 17:05:40
   * @param {IDRTabPagesState} item
   * @return {*}  {Promise<void>}
   */
  async calcPermitted(item) {
    var _a;
    let permitted = true;
    const data = ((_a = this.getData()) == null ? void 0 : _a.length) ? this.getData()[0] : void 0;
    const visible = await runtime.calcItemVisible(
      item,
      this.context,
      this.params,
      this.model.appDataEntityId,
      this.model.appId,
      data
    );
    if (visible !== void 0) {
      permitted = visible;
    }
    item.hidden = !permitted;
  }
  /**
   * 计算项状态
   *
   * @author zhanghengfeng
   * @date 2024-05-16 17:05:05
   * @return {*}  {Promise<void>}
   */
  async calcDrTabPagesState() {
    await Promise.all(
      this.state.drTabPages.map(async (item) => {
        await this.calcPermitted(item);
      })
    );
    this.calcItemStateByCounter();
    this.state.isCalculatedPermission = true;
  }
  /**
   * 加载完成
   *
   * @return {*}  {Promise<void>}
   * @memberof DRTabController
   */
  async onMounted() {
    await super.onMounted();
    if (this.form) {
      this.form.evt.on("onLoadSuccess", async (event) => {
        const data = event.data[0];
        this.view.state.srfactiveviewdata = data;
        if (Object.prototype.hasOwnProperty.call(data, "srfreadonly")) {
          if (data.srfreadonly) {
            this.view.context.srfreadonly = true;
          } else if (ramda.isNil(this.view.context.srfreadonly)) {
            this.view.context.srfreadonly = false;
          }
        }
        await this.calcDrTabPagesState();
        this.handleFormChange();
        this.doDefaultSelect();
      });
      this.form.evt.on("onLoadDraftSuccess", () => {
        this.handleFormChange();
      });
      this.form.evt.on("onSaveSuccess", () => {
        this.handleFormChange();
      });
    }
    this.initDRTabPages();
    if (!this.form) {
      await this.calcDrTabPagesState();
    }
    if (this.form && this.form.state.isLoaded) {
      this.doDefaultSelect();
    }
  }
  /**
   * @description 处理第一次的默认选中
   * @memberof DRTabController
   */
  doDefaultSelect() {
    var _a;
    const viewForm = (_a = this.view.layoutPanel) == null ? void 0 : _a.panelItems.view_form;
    if (viewForm) {
      viewForm.state.visible = false;
      viewForm.state.keepAlive = false;
    }
    if (!this.state.hideEditItem && this.state.activeName === this.model.uniqueTag) {
      this.setVisible("form");
    }
  }
  /**
   * 处理表单数据变更
   *
   * @memberof DRTabController
   */
  handleFormChange() {
    const disabled = this.getData()[0].srfuf !== runtime.Srfuf.UPDATE;
    this.setDRTabPagesState(this.state.drTabPages, disabled);
  }
  /**
   * 设置关系分页状态
   *
   * @param {IDRTabPagesState[]} drTabPages 关系分页
   * @param {boolean} disabled 禁用状态
   * @memberof DRTabController
   */
  setDRTabPagesState(drTabPages, disabled) {
    drTabPages.forEach((item) => {
      if (item.tag !== this.model.uniqueTag) {
        item.disabled = disabled;
      }
    });
  }
  /**
   * 初始化关系分页数据
   *
   * @memberof DRTabController
   */
  initDRTabPages() {
    const { uniqueTag, dedrtabPages, editItemCaption, editItemSysImage } = this.model;
    const drTabPages = [];
    if (!this.state.hideEditItem) {
      drTabPages.push({
        caption: editItemCaption,
        tag: uniqueTag,
        hidden: !!this.state.hideEditItem,
        disabled: false,
        sysImage: editItemSysImage,
        fullPath: this.routeDepth ? vue3Util.getNestedRoutePath(this.router.currentRoute.value, this.routeDepth) : ""
      });
    }
    dedrtabPages == null ? void 0 : dedrtabPages.forEach((item) => {
      const {
        enableMode,
        dataAccessAction,
        testAppDELogicId,
        testScriptCode,
        counterMode
      } = item;
      const drTabPage = {
        tag: item.id,
        caption: item.caption,
        sysImage: item.sysImage,
        hidden: false,
        disabled: false,
        counterId: item.counterId,
        dataAccessAction,
        enableMode,
        testAppDELogicId,
        testScriptCode,
        counterMode
      };
      if (this.tabPosition === "flow_noheader" || this.tabPosition === "flow") {
        const { context, params } = this.prepareParams(item);
        Object.assign(drTabPage, {
          context,
          params
        });
      }
      drTabPages.push(drTabPage);
    });
    this.state.drTabPages = drTabPages;
    this.state.defaultName = drTabPages[0].tag;
    if (this.view.state.srfnav) {
      this.state.activeName = this.view.state.srfnav;
    } else {
      this.state.activeName = drTabPages[0].tag;
      if (this.srfCachePos && localStorage.getItem(this.storageTag)) {
        const activeName = localStorage.getItem(this.storageTag);
        this.state.activeName = activeName;
      }
    }
    if (this.enableCollapse)
      this.state.expandedKeys = this.state.drTabPages.map((tab) => tab.tag);
    const isRoutePushed = !!this.routeDepth && runtime.hasSubRoute(this.routeDepth);
    this.handleTabChange(isRoutePushed);
  }
  /**
   * 处理分页改变
   *
   * @author lxm
   * @date 2023-12-21 05:31:59
   * @param {boolean} [isRoutePushed=false] 是否是路由已经跳转过了
   */
  handleTabChange(isRoutePushed = false) {
    var _a;
    const { activeName } = this.state;
    const drBarItem = (_a = this.model.dedrtabPages) == null ? void 0 : _a.find(
      (item) => item.id === activeName
    );
    if (this.srfCachePos && activeName) {
      localStorage.setItem("".concat(this.storageTag), activeName);
    }
    if (drBarItem) {
      this.setVisible("navPos");
      this.openNavPosView(drBarItem, isRoutePushed);
    } else {
      this.setVisible("form");
      if (this.routeDepth && this.state.drTabPages[0]) {
        this.router.push(this.state.drTabPages[0].fullPath);
      }
    }
  }
  /**
   * 设置显示状态
   *
   * @param {('form' | 'navPos')} ctrlName 显示的部件名称
   * @memberof DRTabController
   */
  setVisible(ctrlName) {
    var _a;
    if (this.state.hideEditItem) {
      return;
    }
    const viewForm = (_a = this.view.layoutPanel) == null ? void 0 : _a.panelItems.view_form;
    if (ctrlName === "form") {
      if (viewForm) {
        viewForm.state.visible = true;
        viewForm.state.keepAlive = true;
      }
      if (this.navPos) {
        this.navPos.state.visible = false;
        this.navPos.state.keepAlive = true;
      }
    } else {
      if (viewForm) {
        viewForm.state.visible = false;
        viewForm.state.keepAlive = true;
      }
      if (this.navPos) {
        this.navPos.state.visible = true;
        this.navPos.state.keepAlive = true;
      }
    }
  }
  /**
   * 准备参数
   *
   * @param {IDEDRCtrlItem} drTabPage 关系分页
   * @return {*}
   * @memberof DRTabController
   */
  prepareParams(drTabPage) {
    const { navigateContexts, navigateParams } = drTabPage;
    const model = {
      navContexts: navigateContexts,
      navParams: navigateParams
    };
    const originParams = {
      context: this.context,
      params: this.params,
      data: this.getData()[0]
    };
    const { resultContext, resultParams } = runtime.calcNavParams(model, originParams);
    const context = Object.assign(this.context.clone(), resultContext, {
      currentSrfNav: drTabPage.id
    });
    const params = {
      ...this.params,
      ...resultParams,
      ...this.state.expViewParams
    };
    return { context, params };
  }
  /**
   * 打开导航占位视图
   *
   * @author lxm
   * @date 2023-12-21 05:40:07
   * @param {IDEDRCtrlItem} drTabPage
   * @param {boolean} [isRoutePushed=false]
   * @return {*}  {Promise<void>}
   */
  async openNavPosView(drTabPage, isRoutePushed = false, navViewKey) {
    var _a;
    const { context, params } = this.prepareParams(drTabPage);
    if (!drTabPage.appViewId)
      return;
    (_a = this.navPos) == null ? void 0 : _a.openView({
      key: navViewKey || drTabPage.id,
      context,
      params,
      viewId: drTabPage.appViewId,
      isRoutePushed
    });
  }
  /**
   * 初始化计数器
   * @author lxm
   * @date 2024-01-18 05:12:02
   * @protected
   * @return {*}  {Promise<void>}
   */
  async initCounter() {
    if (this.state.isCounterDisabled)
      return;
    const { appCounterRefs } = this.model;
    const appCounterRef = appCounterRefs == null ? void 0 : appCounterRefs[0];
    if (appCounterRef) {
      this.counter = await runtime.CounterService.getCounterByRef(
        appCounterRef,
        this.context,
        { ...this.params }
      );
      this.calcItemStateByCounter = this.calcItemStateByCounter.bind(this);
      this.counter.onChange(this.calcItemStateByCounter);
    }
  }
  /**
   * 刷新
   *
   * @author tony001
   * @date 2024-10-21 11:10:10
   * @return {*}  {Promise<void>}
   */
  async refresh() {
    var _a;
    if (this.tabPosition === "flow_noheader" || this.tabPosition === "flow") {
      this.state.drTabPages.forEach((tabPageState) => {
        var _a2;
        const dedrtabPage = (_a2 = this.model.dedrtabPages) == null ? void 0 : _a2.find(
          (item) => item.id === tabPageState.tag
        );
        if (dedrtabPage) {
          const { context, params } = this.prepareParams(dedrtabPage);
          tabPageState.context = context;
          tabPageState.params = params;
        }
      });
      return;
    }
    const { activeName } = this.state;
    const drBarItem = (_a = this.model.dedrtabPages) == null ? void 0 : _a.find(
      (item) => item.id === activeName
    );
    if (drBarItem) {
      this.setVisible("navPos");
      this.openNavPosView(drBarItem, false, qxUtil.createUUID());
    } else {
      this.setVisible("form");
      if (this.routeDepth && this.state.drTabPages[0]) {
        this.router.push(this.state.drTabPages[0].fullPath);
      }
    }
  }
  /**
   * 监听组件销毁
   *
   * @author zhanghengfeng
   * @date 2024-04-10 19:04:40
   * @protected
   * @return {*}  {Promise<void>}
   */
  async onDestroyed() {
    await super.onDestroyed();
    if (this.counter) {
      this.counter.offChange(this.calcItemStateByCounter);
      this.counter.destroy();
    }
  }
  /**
   * @description 设置激活项
   * @param {string} name
   * @memberof DRTabController
   */
  setActive(name) {
    this.state.activeName = name;
    this.handleTabChange();
  }
  /**
   * @description 转换各类多语言
   * @protected
   * @memberof DRTabController
   */
  convertMultipleLanguages() {
    const { editItemCapLanguageRes, dedrtabPages } = this.model;
    if (editItemCapLanguageRes && editItemCapLanguageRes.lanResTag)
      this.model.editItemCaption = ibiz.i18n.t(
        editItemCapLanguageRes.lanResTag,
        this.model.editItemCaption
      );
    dedrtabPages == null ? void 0 : dedrtabPages.forEach((page) => {
      if (page.capLanguageRes && page.capLanguageRes.lanResTag)
        page.caption = ibiz.i18n.t(page.capLanguageRes.lanResTag, page.caption);
    });
  }
  /**
   * @description 折叠改变
   * @param {string} id
   * @memberof DRTabController
   */
  onCollapseChange(id) {
    const index = this.state.expandedKeys.findIndex((key) => key === id);
    if (index > -1) {
      this.state.expandedKeys.splice(index, 1);
    } else {
      this.state.expandedKeys.push(id);
    }
  }
}

exports.DRTabController = DRTabController;
