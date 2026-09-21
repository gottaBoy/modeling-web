import { PanelItemController, calcDynaClass } from '@ibiz-template/runtime';

"use strict";
class PanelRawItemController extends PanelItemController {
  /**
   * @description 父容器数据对象数据
   * @exposedoc
   * @readonly
   * @type {IData}
   * @memberof PanelRawItemController
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
  /**
   * @description 计算动态样式表
   * @protected
   * @param {IData} data
   * @memberof PanelRawItemController
   */
  calcDynaClass(data) {
    var _a, _b;
    if (this.model.dynaClass || ((_a = this.model.rawItem) == null ? void 0 : _a.dynaClass)) {
      const dynaClass = this.model.dynaClass ? calcDynaClass(this.model.dynaClass, data) : [];
      const dynaClass2 = ((_b = this.model.rawItem) == null ? void 0 : _b.dynaClass) ? calcDynaClass(this.model.rawItem.dynaClass, data) : [];
      this.state.class.containerDyna = [...dynaClass, ...dynaClass2];
    }
    if (this.model.labelDynaClass) {
      const dynaClass = calcDynaClass(this.model.labelDynaClass, data);
      this.state.class.labelDyna = dynaClass;
    }
  }
}

export { PanelRawItemController };
