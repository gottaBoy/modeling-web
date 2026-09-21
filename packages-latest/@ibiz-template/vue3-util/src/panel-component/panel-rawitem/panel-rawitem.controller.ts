import { IPanelRawItem } from '@ibiz/model-core';
import { calcDynaClass, PanelItemController } from '@ibiz-template/runtime';

/**
 * @description 面板直接内容控制器
 * @class PanelRawItemController
 * @extends {PanelItemController<IPanelRawItem>}
 */
export class PanelRawItemController extends PanelItemController<IPanelRawItem> {
  /**
   * @description 父容器数据对象数据
   * @exposedoc
   * @readonly
   * @type {IData}
   * @memberof PanelRawItemController
   */
  get data(): IData {
    return this.dataParent.data!;
  }

  /**
   * 初始化
   *
   * @author lxm
   * @date 2022-08-24 20:08:42
   * @protected
   * @returns {*}  {Promise<void>}
   */
  protected async onInit(): Promise<void> {
    await super.onInit();
  }

  /**
   * @description 计算动态样式表
   * @protected
   * @param {IData} data
   * @memberof PanelRawItemController
   */
  protected calcDynaClass(data: IData): void {
    if (this.model.dynaClass || this.model.rawItem?.dynaClass) {
      const dynaClass = this.model.dynaClass
        ? calcDynaClass(this.model.dynaClass, data)
        : [];
      const dynaClass2 = this.model.rawItem?.dynaClass
        ? calcDynaClass(this.model.rawItem.dynaClass, data)
        : [];
      this.state.class.containerDyna = [...dynaClass, ...dynaClass2];
    }
    if (this.model.labelDynaClass) {
      const dynaClass = calcDynaClass(this.model.labelDynaClass, data);
      this.state.class.labelDyna = dynaClass;
    }
  }
}
