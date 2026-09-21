import { ControlController, Srfuf, calcItemVisibleByCounter, calcItemVisible, calcNavParams, hasSubRoute, CounterService } from '@ibiz-template/runtime';
import { isNil } from 'ramda';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class DRBarController extends ControlController {
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
   * @memberof DRBarController
   */
  get navPos() {
    var _a;
    return (_a = this.view.layoutPanel) == null ? void 0 : _a.panelItems.nav_pos;
  }
  /**
   * 导航视图容器控制器
   * @return {*}
   * @author: zhujiamin
   * @Date: 2024-01-25 16:03:00
   */
  get viewNavPos() {
    var _a;
    return (_a = this.view.layoutPanel) == null ? void 0 : _a.panelItems.view_nav_pos;
  }
  /**
   * 表单部件
   *
   * @readonly
   * @memberof DRBarController
   */
  get form() {
    var _a;
    return (_a = this.view) == null ? void 0 : _a.getController("form");
  }
  /**
   * 是否是新建
   * @author lxm
   * @date 2023-12-11 06:32:04
   * @readonly
   * @type {boolean}
   */
  get isCreate() {
    return this.getData()[0].srfuf !== Srfuf.UPDATE;
  }
  /**
   * 获取数据
   *
   * @return {*}  {IData[]}
   * @memberof DRBarController
   */
  getData() {
    var _a;
    return ((_a = this.form) == null ? void 0 : _a.getData()) || [{}];
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
   * 路由层级
   *
   * @readonly
   * @type {(number | undefined)}
   * @memberof DRBarController
   */
  get routeDepth() {
    return this.view.modal.routeDepth;
  }
  /**
   * 初始化state的属性
   *
   * @protected
   * @memberof DRBarController
   */
  initState() {
    super.initState();
    this.state.drBarItems = [];
    this.state.srfnav = "";
    this.state.selectedItem = "";
    this.state.hideEditItem = !!this.model.hideEditItem;
  }
  /**
   * 创建完成
   *
   * @return {*}  {Promise<void>}
   * @memberof DRBarController
   */
  async onCreated() {
    await super.onCreated();
    this.initDRBarItems();
    await this.initCounter();
  }
  /**
   * 通过计数器数据，计算项状态
   *
   * @author zhanghengfeng
   * @date 2024-05-16 18:05:14
   * @param {IData} [_data]
   * @param {boolean} [reset=true]
   */
  calcItemStateByCounter(_data, reset = true) {
    if (!this.state.activated)
      return;
    this.state.drBarItems.forEach((item) => {
      var _a;
      if ((_a = item.children) == null ? void 0 : _a.length) {
        item.children.forEach((childItem) => {
          const visible = calcItemVisibleByCounter(childItem, this.counter);
          if (visible !== void 0) {
            childItem.visible = visible;
          }
        });
        item.visible = item.children.some((childItem) => childItem.visible);
      } else {
        const visible = calcItemVisibleByCounter(item, this.counter);
        if (visible !== void 0) {
          item.visible = visible;
        }
      }
    });
    if (this.state.selectedItem && reset) {
      const { visible, defaultVisibleItem } = this.getItemVisibleState(
        this.state.selectedItem
      );
      if (!visible && defaultVisibleItem) {
        this.handleSelectChange(defaultVisibleItem.tag);
      }
    }
  }
  /**
   * 获取对应项的显示状态
   *
   * @author zhanghengfeng
   * @date 2024-05-16 17:05:15
   * @param {string} key
   * @return {*}  {{
   *     visible: boolean;
   *     defaultVisibleItem?: IDRBarItemsState;
   *   }}
   */
  getItemVisibleState(key) {
    let visible = true;
    let defaultVisibleItem;
    this.state.drBarItems.forEach((item) => {
      if (item.children) {
        if (!defaultVisibleItem) {
          defaultVisibleItem = item.children.find((child) => child.visible);
        }
        const drBarItem = item.children.find((child) => child.tag === key);
        if (drBarItem) {
          visible = !!drBarItem.visible;
        }
      } else {
        if (!defaultVisibleItem && item.visible) {
          defaultVisibleItem = item;
        }
        if (item.tag === key) {
          visible = !!item.visible;
        }
      }
    });
    return {
      visible,
      defaultVisibleItem
    };
  }
  /**
   * 计算关系界面组权限
   *
   * @param {IDRBarItemsState} item 关系组成员
   * @memberof DRBarController
   */
  async calcPermitted(item) {
    var _a;
    let permitted = true;
    const data = ((_a = this.getData()) == null ? void 0 : _a.length) ? this.getData()[0] : void 0;
    const visible = await calcItemVisible(
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
    item.visible = permitted;
  }
  /**
   * 计算是否展示
   *
   * @param {IData} item 关系组成员
   * @memberof DRBarController
   */
  async calcDrBarItemsState() {
    await Promise.all(
      this.state.drBarItems.map(async (item) => {
        var _a;
        if ((_a = item.children) == null ? void 0 : _a.length) {
          await Promise.all(
            item.children.map(async (childItem) => {
              await this.calcPermitted(childItem);
            })
          );
          item.visible = item.children.some((childItem) => childItem.visible);
        } else {
          await this.calcPermitted(item);
        }
      })
    );
    this.calcItemStateByCounter({}, false);
    this.state.isCalculatedPermission = true;
  }
  /**
   * 加载完成
   *
   * @return {*}  {Promise<void>}
   * @memberof DRBarController
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
          } else if (isNil(this.view.context.srfreadonly)) {
            this.view.context.srfreadonly = false;
          }
        }
        await this.calcDrBarItemsState();
        this.handleFormChange();
        this.doDefaultSelect();
      });
      this.form.evt.on("onLoadDraftSuccess", () => {
        this.handleFormChange();
      });
      this.form.evt.on("onSaveSuccess", () => {
        this.handleFormChange();
      });
    } else {
      await this.calcDrBarItemsState();
    }
    if (this.form && this.form.state.isLoaded) {
      this.doDefaultSelect();
    }
  }
  /**
   * 处理表单数据变更
   *
   * @memberof DRBarController
   */
  handleFormChange() {
    const disabled = this.isCreate;
    this.setDRBarItemsState(this.state.drBarItems, disabled);
  }
  /**
   * 设置关系项状态
   *
   * @param {IDRBarItemsState[]} drBarItems 关系项
   * @param {boolean} disabled 禁用状态
   * @memberof DRBarController
   */
  setDRBarItemsState(drBarItems, disabled) {
    drBarItems.forEach((item) => {
      if (item.tag !== this.model.uniqueTag) {
        item.disabled = disabled;
      }
      if (item.children) {
        this.setDRBarItemsState(item.children, disabled);
      }
    });
  }
  /**
   * 初始化关系项数据
   *
   * @memberof DRBarController
   */
  initDRBarItems() {
    var _a;
    const { dedrctrlItems, dedrbarGroups } = this.model;
    const drBarItems = [];
    if (!this.state.hideEditItem) {
      const { uniqueTag, editItemCaption, editItemSysImage } = this.model;
      drBarItems.push({
        tag: uniqueTag,
        caption: editItemCaption,
        disabled: false,
        sysImage: editItemSysImage,
        fullPath: (_a = this.router) == null ? void 0 : _a.currentRoute.value.fullPath
      });
      this.state.defaultItem = uniqueTag;
      this.state.selectedItem = drBarItems[0].tag;
    }
    const getItemState = (item) => {
      const { enableMode, testAppDELogicId, testScriptCode, counterMode } = item;
      return {
        tag: item.id,
        caption: item.caption,
        sysImage: item.sysImage,
        disabled: false,
        counterId: item.counterId,
        visible: false,
        // 默认不显示
        dataAccessAction: item.dataAccessAction || void 0,
        enableMode,
        testAppDELogicId,
        testScriptCode,
        counterMode
      };
    };
    if (dedrbarGroups && dedrctrlItems) {
      if (dedrbarGroups.length === 1) {
        dedrctrlItems.forEach((item) => {
          drBarItems.push(getItemState(item));
        });
      } else {
        dedrbarGroups.forEach((group) => {
          var _a2;
          const groupItems = dedrctrlItems.filter(
            (item) => item.dedrbarGroupId === group.id
          );
          if (groupItems.length > 1 || ((_a2 = this.controlParams) == null ? void 0 : _a2.singleitemgroup) === "true" && groupItems.length === 1) {
            drBarItems.push({
              tag: group.id,
              caption: group.caption,
              sysImage: group.sysImage,
              visible: false,
              // 默认不显示
              children: groupItems.map((item) => getItemState(item))
            });
          } else if (groupItems.length === 1) {
            drBarItems.push(getItemState(groupItems[0]));
          }
        });
      }
    }
    this.state.drBarItems = drBarItems;
  }
  /**
   * 处理选中改变
   *
   * @param {string} key
   * @memberof DRBarController
   */
  handleSelectChange(key = this.state.selectedItem || this.state.defaultItem, isRoutePushed = false) {
    var _a, _b;
    if (this.state.selectedItem === key)
      return;
    const drBarItem = (_a = this.model.dedrctrlItems) == null ? void 0 : _a.find((item) => item.id === key);
    if (drBarItem) {
      this.setVisible("navPos");
      this.openNavPosView(drBarItem, isRoutePushed);
    } else {
      this.setVisible("form");
      if (this.routeDepth && ((_b = this.state.drBarItems[0]) == null ? void 0 : _b.fullPath))
        this.router.push(this.state.drBarItems[0].fullPath);
    }
    this.state.selectedItem = key;
  }
  /**
   * 设置显示状态
   *
   * @param {('form' | 'navPos')} ctrlName 显示的部件名称
   * @memberof DRBarController
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
      if (this.viewNavPos) {
        this.viewNavPos.state.visible = false;
        this.viewNavPos.state.keepAlive = true;
      }
    } else {
      if (viewForm) {
        viewForm.state.visible = false;
        viewForm.state.keepAlive = true;
      }
      if (this.viewNavPos) {
        this.viewNavPos.state.visible = true;
        this.viewNavPos.state.keepAlive = true;
      }
    }
  }
  /**
   * @description 获取数据关系项
   * @param {string} tag
   * @param {IDRBarItemsState[]} [items=this.state.drBarItems]
   * @returns {*}  {(IDRBarItemsState | undefined)}
   * @memberof DRBarController
   */
  getDrBarItem(tag, items = this.state.drBarItems) {
    for (const item of items) {
      if (item.tag === tag)
        return item;
      if (item.children) {
        const found = this.getDrBarItem(tag, item.children);
        if (found)
          return found;
      }
    }
  }
  /**
   * 准备参数
   *
   * @param {IDEDRBarItem} drBarItem 关系项
   * @return {*}
   * @memberof DRBarController
   */
  prepareParams(drBarItem) {
    const { navigateContexts, navigateParams } = drBarItem;
    const model = {
      navContexts: navigateContexts,
      navParams: navigateParams
    };
    const originParams = {
      context: this.context,
      params: this.params,
      data: this.getData()[0]
    };
    const { resultContext, resultParams } = calcNavParams(model, originParams);
    const context = Object.assign(this.context.clone(), resultContext);
    const params = { ...this.params, ...resultParams };
    return { context, params };
  }
  /**
   * 打开导航占位视图
   *
   * @param {IDEDRBarItem} drBarItem 关系项
   * @memberof DRBarController
   */
  async openNavPosView(drBarItem, isRoutePushed = false) {
    var _a;
    if (!drBarItem.appViewId)
      return;
    const { context, params } = this.prepareParams(drBarItem);
    context.currentSrfNav = drBarItem.id;
    this.state.srfnav = drBarItem.id;
    (_a = this.navPos) == null ? void 0 : _a.openView({
      key: drBarItem.id,
      context,
      params,
      viewId: drBarItem.appViewId,
      isRoutePushed
    });
  }
  /**
   * 处理第一次的默认选中
   * @author lxm
   * @date 2023-12-11 05:38:30
   * @return {*}  {void}
   */
  doDefaultSelect() {
    var _a, _b;
    const viewForm = (_a = this.view.layoutPanel) == null ? void 0 : _a.panelItems.view_form;
    if (viewForm) {
      viewForm.state.visible = false;
      viewForm.state.keepAlive = false;
    }
    if (!this.state.hideEditItem && !this.state.srfnav) {
      this.setVisible("form");
      return;
    }
    if (this.isCreate) {
      this.state.defaultItem = this.model.uniqueTag;
      return;
    }
    const { drBarItems } = this.state;
    let key = ((_b = drBarItems[0].children) == null ? void 0 : _b[0].tag) || drBarItems[0].tag;
    if (this.routeDepth && this.state.srfnav) {
      key = this.state.srfnav;
    }
    if (key) {
      const isRoutePushed = !!this.routeDepth && hasSubRoute(this.routeDepth);
      const { visible, defaultVisibleItem } = this.getItemVisibleState(key);
      if (!visible && defaultVisibleItem) {
        key = defaultVisibleItem.tag;
        this.handleSelectChange(key);
      } else {
        this.handleSelectChange(key, isRoutePushed);
      }
      this.state.defaultItem = key;
    }
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
      this.counter = await CounterService.getCounterByRef(
        appCounterRef,
        this.context,
        { ...this.params }
      );
      this.calcItemStateByCounter = this.calcItemStateByCounter.bind(this);
      this.counter.onChange(this.calcItemStateByCounter);
    }
  }
  /**
   * 监听组件销毁
   *
   * @author zhanghengfeng
   * @date 2024-04-10 19:04:43
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
   * @memberof DRBarController
   */
  setActive(name) {
    this.handleSelectChange(name);
  }
  /**
   * @description 转换各类多语言
   * @protected
   * @memberof DRBarController
   */
  convertMultipleLanguages() {
    const { editItemCapLanguageRes, dedrctrlItems, dedrbarGroups } = this.model;
    if (editItemCapLanguageRes && editItemCapLanguageRes.lanResTag)
      this.model.editItemCaption = ibiz.i18n.t(
        editItemCapLanguageRes.lanResTag,
        this.model.editItemCaption
      );
    dedrbarGroups == null ? void 0 : dedrbarGroups.forEach((group) => {
      if (group.capLanguageRes && group.capLanguageRes.lanResTag)
        group.caption = ibiz.i18n.t(
          group.capLanguageRes.lanResTag,
          group.caption
        );
    });
    dedrctrlItems == null ? void 0 : dedrctrlItems.forEach((item) => {
      if (item.capLanguageRes && item.capLanguageRes.lanResTag)
        item.caption = ibiz.i18n.t(item.capLanguageRes.lanResTag, item.caption);
    });
  }
}

export { DRBarController };
