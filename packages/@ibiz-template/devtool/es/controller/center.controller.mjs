import { reactive, createApp, toRaw } from 'vue';
import { createUUID } from 'qx-util';
import '../components/index.mjs';
import { DevToolConfig } from './dev-tool-config.mjs';
import { IndexPage } from '../components/index-page/index-page.mjs';
import { ViewModelViewer } from '../components/view-model-viewer/view-model-viewer.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class CenterController {
  constructor() {
    /**
     * 配置对象
     * @author lxm
     * @date 2024-01-19 04:49:30
     */
    __publicField(this, "config", new DevToolConfig());
    /**
     * 用户配置对象
     * @author lxm
     * @date 2024-01-19 05:46:29
     */
    __publicField(this, "userConfig");
    /**
     * 根组件dom元素
     * @author lxm
     * @date 2024-02-19 09:36:34
     * @type {HTMLElement}
     */
    __publicField(this, "rootElement");
    /**
     * 视图模型气泡
     * @author lxm
     * @date 2024-02-19 10:01:51
     * @type {IData}
     */
    __publicField(this, "viewModelPopover");
    /**
     * UI响应式状态对象
     * @author lxm
     * @date 2024-01-19 05:18:10
     * @type {ICenterControllerState}
     */
    __publicField(this, "state", reactive({
      isShow: false,
      viewListRefreshKey: createUUID(),
      selectedViewId: null,
      hoverViewId: null
    }));
    /**
     * 已打开的配置平台标签页
     * @author lxm
     * @date 2024-01-29 03:49:08
     * @protected
     * @type {Window}
     */
    __publicField(this, "studioWindow", null);
  }
  /**
   * 当前激活的视图控制器集合
   * @author lxm
   * @date 2024-01-22 11:15:58
   * @readonly
   * @type {IViewController[]}
   */
  get activeViews() {
    return ibiz.util.viewStack.getActives();
  }
  /**
   * 初始化
   * @author lxm
   * @date 2024-01-19 11:09:19
   */
  init() {
    this.loadUserConfig();
    this.mount();
    this.listenKeyDown();
    this.listenViewStack();
  }
  /**
   * 加载用户存储在浏览嘁的配置文件，并跟默认配置合并
   * @author lxm
   * @date 2024-01-19 04:51:57
   */
  loadUserConfig() {
    const str = localStorage.getItem(this.config.configStorageKey);
    if (str) {
      this.userConfig = JSON.parse(str);
      Object.assign(this.config, this.userConfig);
    } else if (ibiz.env.devtoolConfig) {
      Object.assign(this.config, ibiz.env.devtoolConfig);
    }
  }
  /**
   * 挂载到页面
   * @author lxm
   * @date 2024-01-19 11:10:35
   */
  mount() {
    const container = document.createElement("div");
    container.id = this.config.containerId;
    document.body.append(container);
    const app = createApp(IndexPage, {
      center: this
    });
    app.mount(container);
    this.updateRootClass();
  }
  /**
   * 监听事件
   * @author lxm
   * @date 2024-01-19 04:45:24
   */
  listenKeyDown() {
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.code === this.config.triggerButtonCode) {
        this.triggerVisible();
      }
    });
  }
  /**
   * 监听视图堆栈变更
   * @author lxm
   * @date 2024-01-22 11:29:18
   */
  listenViewStack() {
    ibiz.util.viewStack.evt.on("change", (_msg) => {
      this.state.viewListRefreshKey = createUUID();
    });
  }
  /**
   * 切换显示与否
   * @author lxm
   * @date 2024-01-29 07:38:35
   * @param {boolean} [visible]
   */
  async triggerVisible(visible) {
    if (visible === void 0) {
      this.state.isShow = !this.state.isShow;
    } else {
      this.state.isShow = visible;
    }
    await this.updateRootClass();
  }
  /**
   * 更新body元素的类名，工具消失时关闭视图模型气泡
   * @author lxm
   * @date 2024-01-22 04:19:52
   * @protected
   */
  async updateRootClass() {
    if (this.state.isShow) {
      document.body.classList.add("devtool-enable");
    } else {
      await this.closeViewModelPopover();
      document.body.classList.remove("devtool-enable");
    }
  }
  /**
   * 关闭视图模型气泡
   * @return {*}
   * @author: zhujiamin
   * @Date: 2024-02-20 10:50:47
   */
  async closeViewModelPopover() {
    if (this.viewModelPopover) {
      await this.viewModelPopover.dismiss();
      this.viewModelPopover = void 0;
    }
  }
  /**
   * 更新用户配置文件
   * @author lxm
   * @date 2024-01-19 05:49:55
   * @param {Partial<IDevToolConfig>} config
   */
  updateUserConfig(config) {
    if (!this.userConfig) {
      this.userConfig = {};
    }
    Object.assign(this.userConfig, config);
    localStorage.setItem(
      this.config.configStorageKey,
      JSON.stringify(this.userConfig)
    );
    Object.assign(this.config, this.userConfig);
  }
  /**
   * 拷贝视图的代码名称到剪贴板
   * @author lxm
   * @date 2024-01-22 01:44:54
   * @param {IViewController} view
   */
  copyCodeName(view) {
    const result = ibiz.util.text.copy(view.model.codeName);
    if (result) {
      ibiz.message.success("\u62F7\u8D1D\u4EE3\u7801\u540D\u79F0\u6210\u529F!");
    } else {
      ibiz.message.error("\u62F7\u8D1D\u4EE3\u7801\u540D\u79F0\u5931\u8D25\uFF0C\u6D4F\u89C8\u5668copy\u64CD\u4F5C\u4E0D\u88AB\u652F\u6301\u6216\u672A\u88AB\u542F\u7528!");
    }
  }
  /**
   * 打开指定视图的配置平台地址
   * @author lxm
   * @date 2024-01-22 01:47:00
   * @param {IViewController} view
   */
  openStudioUrl(view) {
    if (!this.config.studioBaseUrl) {
      ibiz.message.error("\u8BF7\u5148\u914D\u7F6Estudio\u7684\u57FA\u7840\u8DEF\u5F84");
      return;
    }
    const viewId = view.model.modelId;
    if (!viewId) {
      ibiz.message.error("\u8BF7\u83B7\u53D6\u4E0D\u5230\u89C6\u56FE\u6A21\u578B\u7684\u4E3B\u952E");
      return;
    }
    const url = new URL(this.config.studioBaseUrl);
    const { origin, pathname, hash } = url;
    if (this.studioWindow && !this.studioWindow.closed) {
      if (this.config.v9Mode) {
        this.studioWindow.postMessage(
          {
            type: "IBzOpenAppView",
            context: {
              psappview: viewId,
              srfredirectview: "psappviewsettingredirectview"
            }
          },
          "*"
        );
      } else {
        this.studioWindow.postMessage(
          {
            type: "IBzOpenAppView",
            context: {
              psctrlid: viewId
            }
          },
          "*"
        );
      }
      this.studioWindow.focus();
    } else if (this.config.v9Mode) {
      const openUrl = "".concat(origin).concat(pathname).concat(hash, "srfredirectview=psappviewsettingredirectview;psappview=").concat(viewId);
      this.studioWindow = window.open(openUrl, "_blank");
    } else {
      const paramStr = "?mode=redirect_appview&psctrlid=".concat(viewId);
      const openUrl = "".concat(origin).concat(pathname).concat(paramStr).concat(hash);
      this.studioWindow = window.open(openUrl, "_blank");
    }
  }
  /**
   * 选中视图控制器
   * @author lxm
   * @date 2024-01-22 04:32:49
   * @param {IViewController} [view] 不给参数就是设置为空
   * @return {*}  {void}
   */
  selectView(view) {
    if (this.state.selectedViewId === (view == null ? void 0 : view.id)) {
      return;
    }
    if (this.state.selectedViewId) {
      const lastEl = document.getElementById(this.state.selectedViewId);
      if (lastEl) {
        lastEl.classList.remove("devtool-selected-view");
      }
    }
    if (view) {
      const currentEl = document.getElementById(view.id);
      if (currentEl) {
        currentEl.classList.add("devtool-selected-view");
      }
      this.state.selectedViewId = view.id;
    } else {
      this.state.selectedViewId = null;
    }
  }
  /**
   * 悬浮视图控制器
   * @author lxm
   * @date 2024-01-22 04:32:49
   * @param {IViewController} [view] 不给参数就是设置为空
   * @return {*}  {void}
   */
  hoverView(view) {
    if (this.state.hoverViewId === (view == null ? void 0 : view.id)) {
      return;
    }
    if (this.state.hoverViewId) {
      const lastEl = document.getElementById(this.state.hoverViewId);
      if (lastEl) {
        lastEl.classList.remove("devtool-hover-view");
      }
    }
    if (view) {
      const currentEl = document.getElementById(view.id);
      if (currentEl) {
        currentEl.classList.add("devtool-hover-view");
      }
      this.state.hoverViewId = view.id;
    } else {
      this.state.hoverViewId = null;
    }
  }
  /**
   * 浏览视图模型
   * @author lxm
   * @date 2024-01-22 06:33:54
   * @param {IViewController} [view]
   */
  async skimViewModel(view) {
    console.log("\u89C6\u56FEdsl\u6A21\u578B\uFF1A", toRaw(view.model));
    if (this.viewModelPopover) {
      await this.viewModelPopover.dismiss();
    }
    this.viewModelPopover = ibiz.overlay.createPopover(
      ViewModelViewer,
      { view: view.model, center: this },
      { placement: "left-start", autoClose: true }
    );
    this.viewModelPopover.present(this.rootElement);
    await this.viewModelPopover.onWillDismiss();
    this.viewModelPopover = void 0;
  }
  /**
   * 浏览界面作用域下的临时数据
   * @author lxm
   * @date 2024-01-22 06:37:15
   * @param {IViewController} view
   */
  async skimTempData(view) {
    const app = ibiz.hub.getApp(view.context.srfappid);
    const map = app.deService.cache.get(
      view.context.srfsessionid
    );
    if (!map) {
      console.log("\u6CA1\u6709\u7F13\u5B58\u6570\u636E");
      return;
    }
    map.forEach((service) => {
      console.group("".concat(service.model.codeName, "\u5B9E\u4F53\u7684\u7F13\u5B58\u6570\u636E"));
      console.log(service.local.cacheMap);
      console.groupEnd();
    });
  }
}

export { CenterController };
