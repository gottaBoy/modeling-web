'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class CustomViewEngine extends runtime.ViewEngineBase {
  /**
   * 执行视图预置界面行为能力
   *
   * @param {string} key
   * @param {*} args
   * @return {*}  {(Promise<IData | null | undefined>)}
   * @memberof CustomViewEngine
   */
  async call(key, args) {
    var _a;
    if (key === runtime.SysUIActionTag.REFRESH) {
      await ((_a = this.viewLayoutPanel) == null ? void 0 : _a.load());
      return null;
    }
    return super.call(key, args);
  }
}

exports.CustomViewEngine = CustomViewEngine;
