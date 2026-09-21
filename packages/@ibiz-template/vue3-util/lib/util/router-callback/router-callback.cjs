'use strict';

var routerCallbackItem = require('./router-callback-item.cjs');

"use strict";
class RouterCallback {
  constructor() {
    /**
     * 回调实例
     *
     * @author chitanda
     * @date 2023-07-13 20:07:12
     * @protected
     * @type {Map<string, RouterCallbackItem>}
     */
    this.map = /* @__PURE__ */ new Map();
  }
  /**
   * 打开视图
   *
   * @author chitanda
   * @date 2023-07-13 20:07:13
   * @param {Router} router
   * @param {string} path
   * @return {*}  {Promise<IModalData>}
   */
  async open(router, path, modalOptions = {}) {
    const from = router.currentRoute.value.fullPath;
    if (modalOptions.replace) {
      router.replace({ path });
    } else {
      router.push({ path });
    }
    const to = path;
    if (this.map.has(to)) {
      const item2 = this.map.get(to);
      return item2.onWillDismiss();
    }
    const item = new routerCallbackItem.RouterCallbackItem(from, to);
    this.map.set(to, item);
    this.scheduledDestruction(item);
    return item.onWillDismiss();
  }
  /**
   * 关闭视图回调
   *
   * @author chitanda
   * @date 2023-07-13 20:07:38
   * @param {string} toFullPath
   * @param {IModalData} modal
   */
  close(toFullPath, modal) {
    const item = this.map.get(toFullPath);
    if (item) {
      window.clearTimeout(item.timeout);
      item.timeout = void 0;
      item.close(modal);
      this.map.delete(toFullPath);
    }
  }
  /**
   * 激活回调
   *
   * @author chitanda
   * @date 2023-07-13 21:07:03
   * @param {string} toFullPath
   */
  active(toFullPath) {
    const item = this.map.get(toFullPath);
    if (item) {
      window.clearTimeout(item.timeout);
      item.timeout = void 0;
      item.active();
    }
  }
  /**
   * 十分钟内未激活的视图回调会被清除
   *
   * @author chitanda
   * @date 2023-07-13 21:07:57
   * @protected
   * @param {RouterCallbackItem} item
   */
  scheduledDestruction(item) {
    item.timeout = window.setTimeout(
      () => {
        item.timeout = void 0;
        item.destroy();
        this.map.delete(item.to);
      },
      10 * 60 * 1e3
    );
  }
}
const routerCallback = new RouterCallback();

exports.RouterCallback = RouterCallback;
exports.routerCallback = routerCallback;
