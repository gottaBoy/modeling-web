import { ViewEngineBase, SysUIActionTag } from '@ibiz-template/runtime';

"use strict";
class CustomViewEngine extends ViewEngineBase {
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
    if (key === SysUIActionTag.REFRESH) {
      await ((_a = this.viewLayoutPanel) == null ? void 0 : _a.load());
      return null;
    }
    return super.call(key, args);
  }
}

export { CustomViewEngine };
