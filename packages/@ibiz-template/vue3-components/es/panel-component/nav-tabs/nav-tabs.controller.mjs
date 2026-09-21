import { PanelItemController } from '@ibiz-template/runtime';
import { reject, isNil } from 'ramda';
import { nextTick } from 'vue';
import { NavTabsState } from './nav-tabs.state.mjs';

"use strict";
class NavTabsController extends PanelItemController {
  createState() {
    var _a;
    return new NavTabsState((_a = this.parent) == null ? void 0 : _a.state);
  }
  /**
   * 当前视图的路由层级，非路由模式不存在。
   * @author lxm
   * @date 2023-05-09 12:46:26
   * @readonly
   */
  get routeDepth() {
    return this.panel.view.modal.routeDepth;
  }
  /**
   * 导航占位控制器
   * @author lxm
   * @date 2023-05-09 02:35:48
   * @readonly
   * @type {(NavPosIndexController | undefined)}
   */
  get navPos() {
    return this.panel.panelItems.nav_pos_index;
  }
  /**
   * 获取tabItem
   * @author lxm
   * @date 2023-05-09 02:04:11
   * @param {string} key
   * @return {*}
   */
  findTabItem(key) {
    return this.state.tabItems.find((item) => item.key === key);
  }
  /**
   * 点击处理
   * @author lxm
   * @date 2023-05-25 01:31:04
   * @param {string} key
   */
  onTabClick(key) {
    var _a;
    (_a = this.navPos) == null ? void 0 : _a.changeView(key);
  }
  /**
   * 更新视图信息
   * @author lxm
   * @date 2023-05-09 01:40:34
   * @param {string} key
   * @param {{ caption?: string; dataInfo?: string; sysImage?: ISysImage }} info
   */
  updateViewInfo(key, info) {
    const findItem = this.findTabItem(key);
    if (findItem) {
      Object.assign(findItem, reject(isNil, info));
      this.refreshItemUI(key);
    } else {
      this.state.tabItems.push({ key, ...info });
      this.state.activeTab = this.state.currentKey;
    }
  }
  /**
   * 删除某个key对应的数据
   * 仅处理组件自身维护的数据
   * @author lxm
   * @date 2023-05-25 03:18:20
   * @param {string} key
   */
  removeCache(key) {
    const findIndex = this.state.tabItems.findIndex((item) => item.key === key);
    if (findIndex !== -1) {
      this.state.tabItems.splice(findIndex, 1);
    }
  }
  /**
   * 删除分页
   * @author lxm
   * @date 2023-05-09 02:08:46
   * @param {string} key
   */
  onTabRemove(key) {
    var _a;
    (_a = this.navPos) == null ? void 0 : _a.closeViewByKeys([key]);
  }
  /**
   * 删除其他所有的标签页
   * @author lxm
   * @date 2023-05-09 02:19:55
   */
  removeOther() {
    var _a;
    const currentKey = this.state.currentKey;
    const removeKeys = [];
    this.state.tabItems.forEach((item) => {
      if (item.key !== currentKey) {
        removeKeys.push(item.key);
      }
    });
    if (removeKeys.length > 0) {
      (_a = this.navPos) == null ? void 0 : _a.closeViewByKeys(removeKeys);
    }
  }
  /**
   * 删除所有的标签页
   * @author lxm
   * @date 2023-05-09 02:50:01
   */
  removeAll() {
    var _a;
    const removeKeys = this.state.tabItems.map((item) => item.key);
    if (removeKeys.length > 0) {
      (_a = this.navPos) == null ? void 0 : _a.closeViewByKeys(removeKeys);
    }
  }
  /**
   * 刷新项（解决主信息更新之后界面ui未刷新）
   *
   * @author tony001
   * @date 2024-06-28 08:06:11
   */
  refreshItemUI(key) {
    const tempItem = {
      key: "exampleItem",
      caption: ""
    };
    this.state.tabItems.push(tempItem);
    this.state.activeTab = tempItem.key;
    nextTick(() => {
      this.state.tabItems.pop();
      this.state.activeTab = key;
    });
  }
}

export { NavTabsController };
