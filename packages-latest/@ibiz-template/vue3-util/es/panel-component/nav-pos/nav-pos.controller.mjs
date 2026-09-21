import { PanelItemController, Modal, ViewMode, OpenAppViewCommand } from '@ibiz-template/runtime';
import { notNilEmpty } from 'qx-util';
import { mergeLeft } from 'ramda';
import { NavPosState } from './nav-pos.state.mjs';
import '../../util/index.mjs';
import { getNestedRoutePath } from '../../util/route/route.mjs';

"use strict";
const excludeKeys = ["is404", "isRoutePushed"];
class NavPosController extends PanelItemController {
  constructor() {
    super(...arguments);
    /**
     * @description 导航视图的模态操作对象
     * @exposedoc
     * @type {{ [key: string]: IModal }}
     * @memberof NavPosController
     */
    this.viewModals = {};
    /**
     * @description 关联部件标识集合，根据配置的REFCTRL参数指定关联部件，关联部件可控制导航视图
     * @exposedoc
     * @type {string[]}
     */
    this.refCtrlKeys = [];
    /**
     * @description 面板项参数
     * @exposedoc
     * @type {IData}
     * @memberof NavPosController
     */
    this.rawItemParams = {};
    /**
     * @description 是否忽略嵌入视图key，为true时嵌入视图组件不会绑定key
     * @exposedoc
     * @type {boolean}
     * @memberof NavPosController
     */
    this.ignoreEmbedKey = false;
  }
  /**
   * @description Route 对象
   * @type {RouteLocationNormalizedLoaded}
   * @memberof NavPosController
   */
  get route() {
    return this.router.currentRoute.value;
  }
  /**
   * @description 导航项是否缓存
   * @param {INavViewMsg} navViewMsg
   * @return {*}  {boolean}
   * @memberof NavPosController
   */
  getExpItemIsCache(navViewMsg) {
    if (this.rawItemParams.expcache === "CACHE") {
      return true;
    }
    if (this.rawItemParams.expcache === "NO_CACHE") {
      return false;
    }
    return navViewMsg.isCache;
  }
  /**
   * @description 设置 Router 对象
   * @param {Router} router
   * @memberof NavPosController
   */
  setRouter(router) {
    this.router = router;
  }
  async onInit() {
    var _a;
    await super.onInit();
    this.handleRawItemParams();
    if ((_a = this.model.rawItem) == null ? void 0 : _a.rawItemParams) {
      this.model.rawItem.rawItemParams.find((item) => {
        if (item.key === "REFCTRL" && item.value) {
          this.refCtrlKeys = item.value.split(";").map((str) => str.toLowerCase());
          return true;
        }
        return false;
      });
    }
    this.panel.evt.on("onControlEvent", (event) => {
      const isRefCtrl = this.refCtrlKeys.length === 0 || this.refCtrlKeys.includes(event.triggerControlName);
      if (isRefCtrl && event.triggerEventName === "onNavViewChange") {
        const triggerEvent = event.triggerEvent;
        this.openView(triggerEvent.navViewMsg);
      }
    });
    const expRoute = this.rawItemParams.expmode || this.panel.view.params.expmode;
    const ignoreEmbedKey = this.rawItemParams.ignoreembedkey || this.panel.view.params.ignoreembedkey || "";
    this.ignoreEmbedKey = Object.is(ignoreEmbedKey.toLowerCase(), "true");
    if (expRoute === "ROUTE" && this.routeDepth) {
      this.state.routeOpen = true;
    } else if (expRoute === "NO_ROUTE") {
      this.state.routeOpen = false;
    } else {
      this.state.routeOpen = !!this.routeDepth;
    }
    if (this.panel.view.params.expmode) {
      delete this.panel.view.params.expmode;
    }
  }
  /**
   * 创建导航占位状态对象
   *
   * @protected
   * @return {*}  {NavPosState}
   * @memberof NavPosController
   */
  createState() {
    var _a;
    return new NavPosState((_a = this.parent) == null ? void 0 : _a.state);
  }
  /**
   * @description 当前路由视图的层级
   * @exposedoc
   * @readonly
   * @type {(number | undefined)}
   * @memberof NavPosController
   */
  get routeDepth() {
    return this.panel.view.modal.routeDepth;
  }
  /**
   * 计算缓存 key 标识
   *
   * @author chitanda
   * @date 2023-12-03 13:12:25
   * @protected
   * @param {INavViewMsg} msg
   * @return {*}  {string}
   */
  calcCacheKey(msg) {
    if (msg) {
      return "".concat(msg.viewId, "___").concat(msg.key);
    }
    return "";
  }
  /**
   * 路由改变
   *
   * @memberof NavPosController
   */
  onRouteChange(route) {
    if (this.curNavViewMsg) {
      const cacheKey = this.calcCacheKey(this.curNavViewMsg);
      this.state.currentKey = cacheKey;
      this.state.navViewMsgs[cacheKey].fullPath = route.fullPath;
    }
  }
  /**
   * 设置导航视图信息
   *
   * @author zk
   * @date 2023-06-29 02:06:41
   * @param {INavViewMsg} navViewMsg 导航视图信息
   * @memberof NavPosController
   */
  setNavViewMsgs(navViewMsg) {
    navViewMsg.isRoutePushed = navViewMsg.isRoutePushed === true;
    const cacheKey = this.calcCacheKey(navViewMsg);
    if (this.state.navViewMsgs[cacheKey]) {
      mergeLeft(this.state.navViewMsgs[cacheKey], navViewMsg);
      excludeKeys.forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(navViewMsg, key)) {
          this.state.navViewMsgs[cacheKey][key] = void 0;
        }
      });
    } else {
      this.state.navViewMsgs[cacheKey] = navViewMsg;
      if (this.getExpItemIsCache(navViewMsg)) {
        this.state.cacheKeys.push(cacheKey);
      }
      this.viewModals[cacheKey] = new Modal({
        mode: this.routeDepth ? ViewMode.ROUTE : ViewMode.EMBED,
        routeDepth: this.routeDepth ? this.routeDepth + 1 : void 0,
        dismiss: () => {
          this.dismiss(cacheKey);
        }
      });
    }
    this.curNavViewMsg = this.state.navViewMsgs[cacheKey];
  }
  /**
   * 自身的dismiss相关操作
   *
   * @param {string} key
   * @memberof NavPosController
   */
  dismiss(key) {
    ibiz.log.debug(this.constructor.name, "dismiss", key);
  }
  /**
   * 监听视图创建
   *
   * @param {EventBase} event
   * @memberof NavPosController
   */
  onViewCreated(event) {
    this.panel.evt.emit("onPresetPanelItemEvent", {
      panelItemName: this.model.id,
      panelItemEventName: "onViewCreated",
      presetParams: event
    });
    ibiz.log.debug(this.constructor.name, "onViewCreated", event);
  }
  toBlankRoute() {
    const blankRoute = getNestedRoutePath(this.route, this.routeDepth);
    this.router.push(blankRoute);
  }
  /**
   * 打开视图
   *
   * @param {INavViewMsg} openViewMsg
   * @memberof NavPosController
   */
  openView(openViewMsg) {
    if (!openViewMsg.key) {
      this.state.currentKey = this.calcCacheKey(openViewMsg);
      if (this.routeDepth && this.state.routeOpen) {
        this.toBlankRoute();
      }
      return;
    }
    if (this.routeDepth && this.state.routeOpen) {
      this.openViewByPath(openViewMsg);
    } else {
      this.openViewByModel(openViewMsg);
    }
  }
  /**
   * 通过路由打开视图
   *
   * @param {INavViewMsg} openViewMsg
   * @memberof NavPosController
   */
  async openViewByPath(openViewMsg) {
    var _a, _b, _c, _d;
    const cacheKey = this.calcCacheKey(openViewMsg);
    this.setNavViewMsgs(openViewMsg);
    const isRoutePushed = openViewMsg.isRoutePushed === true;
    if (isRoutePushed) {
      this.state.currentKey = cacheKey;
      this.state.navViewMsgs[this.calcCacheKey(this.curNavViewMsg)].fullPath = this.route.fullPath;
      return;
    }
    if (openViewMsg.is404) {
      const selfPath = getNestedRoutePath(this.route, this.routeDepth, false);
      if ((_a = openViewMsg.modalOptions) == null ? void 0 : _a.replace) {
        this.router.replace("".concat(selfPath, "/error/404"));
      } else {
        this.router.push("".concat(selfPath, "/error/404"));
      }
      return;
    }
    if (cacheKey === this.state.currentKey && this.state.navViewMsgs[cacheKey].fullPath) {
      if ((_b = openViewMsg.modalOptions) == null ? void 0 : _b.replace) {
        this.router.replace(this.state.navViewMsgs[cacheKey].fullPath);
      } else {
        this.router.push(this.state.navViewMsgs[cacheKey].fullPath);
      }
      return;
    }
    if (
      // 如果启用缓存并且有之前存过的fullPath则push回fullPath。
      this.state.navViewMsgs[cacheKey].fullPath && this.getExpItemIsCache(openViewMsg)
    ) {
      if ((_c = openViewMsg.modalOptions) == null ? void 0 : _c.replace) {
        this.router.replace(this.state.navViewMsgs[cacheKey].fullPath);
      } else {
        this.router.push(this.state.navViewMsgs[cacheKey].fullPath);
      }
    } else {
      const tempContext = Object.assign(openViewMsg.context.clone(), {
        toRouteDepth: this.routeDepth + 1
      });
      if ((_d = this.rawItemParams) == null ? void 0 : _d.routeattributekeys) {
        tempContext.attributekeys = this.rawItemParams.routeattributekeys;
      }
      if (this.getExpItemIsCache(openViewMsg)) {
        this.state.cacheKeys.push(cacheKey);
      }
      if (openViewMsg.viewId) {
        this.state.isLoading = true;
        await ibiz.commands.execute(
          OpenAppViewCommand.TAG,
          openViewMsg.viewId,
          tempContext,
          openViewMsg.params,
          {
            openMode: "INDEXVIEWTAB",
            modalOption: {
              replace: !this.state.currentKey,
              ...openViewMsg.modalOptions
            }
          }
        );
        this.state.isLoading = false;
      }
    }
  }
  /**
   * 通过模型绘制视图
   *
   * @param {INavViewMsg} openViewMsg
   * @memberof NavPosController
   */
  openViewByModel(openViewMsg) {
    this.setNavViewMsgs(openViewMsg);
    this.state.currentKey = this.calcCacheKey(openViewMsg);
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
}

export { NavPosController };
