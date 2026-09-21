'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class PanelRawItemController extends runtime.PanelItemController {
  /**
   * 父容器数据对象数据
   * @author lxm
   * @date 2023-07-15 01:33:58
   * @readonly
   * @type {IData}
   */
  get data() {
    return this.dataParent.data;
  }
  /**
   * 初始化
   *
   * @author lxm
   * @date 2022-08-24 20:08:42
   * @protected
   * @returns {*}  {Promise<void>}
   */
  async onInit() {
    await super.onInit();
  }
}

exports.PanelRawItemController = PanelRawItemController;
