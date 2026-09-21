'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class NavPosState extends runtime.PanelItemState {
  constructor() {
    super(...arguments);
    /**
     * @description 是否启用缓存
     * @exposedoc
     * @type {boolean}
     * @memberof NavPosState
     */
    this.cache = true;
    /**
     * @description 是否是路由打开
     * @exposedoc
     * @type {boolean}
     * @memberof NavPosState
     */
    this.routeOpen = true;
    /**
     * @description 当前导航视图标识
     * @exposedoc
     * @type {string}
     */
    this.currentKey = "";
    /**
     * @description 缓存的视图标识
     * @exposedoc
     * @type {string[]}
     */
    this.cacheKeys = ["RouterShell"];
    /**
     * @description 导航视图详细信息
     * @exposedoc
     * @type {INavViewMsg[]}
     */
    this.navViewMsgs = {};
    /**
     * @description 视图是否正在加载
     * @exposedoc
     * @type {boolean}
     * @memberof NavPosState
     */
    this.isLoading = false;
  }
}

exports.NavPosState = NavPosState;
