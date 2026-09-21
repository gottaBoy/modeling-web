'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class NavPosState extends runtime.PanelItemState {
  constructor() {
    super(...arguments);
    /**
     * 是否启用缓存
     *
     * @type {boolean}
     * @memberof NavPosState
     */
    this.cache = true;
    /**
     * 是否是路由打开
     *
     * @author zk
     * @date 2023-09-26 04:09:23
     * @type {boolean}
     * @memberof NavPosState
     */
    this.routeOpen = true;
    /**
     * 当前导航视图标识
     * @author lxm
     * @date 2023-05-25 06:24:48
     * @type {string}
     */
    this.currentKey = "";
    /**
     * 缓存的视图标识
     * @author lxm
     * @date 2023-05-25 06:25:21
     * @type {string[]}
     */
    this.cacheKeys = ["RouterShell"];
    /**
     * 导航视图详细信息
     * @author lxm
     * @date 2023-05-25 07:07:05
     * @type {INavViewMsg[]}
     */
    this.navViewMsgs = {};
    /**
     * 视图是否正在加载
     *
     * @type {boolean}
     * @memberof NavPosState
     */
    this.isLoading = false;
  }
}

exports.NavPosState = NavPosState;
