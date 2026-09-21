import { IDEFormRawItem } from '@ibiz/model-core';
import { FormDetailController } from '../form-detail';
import { FormRawItemState } from './form-rawitem.state';
import { IApiFormRawItemController } from '../../../../../interface';
import { calcDynaClass } from '../../../../../model';

/**
 * @description 表单直接内容控制器
 * @export
 * @class FormRawItemController
 * @extends {FormDetailController<IDEFormRawItem>}
 * @implements {IApiFormRawItemController}
 */
export class FormRawItemController
  extends FormDetailController<IDEFormRawItem>
  implements IApiFormRawItemController
{
  declare state: FormRawItemState;

  protected createState(): FormRawItemState {
    return new FormRawItemState(this.parent?.state);
  }

  /**
   * @description 计算动态样式表
   * @protected
   * @param {IData} data
   * @memberof FormRawItemController
   */
  protected calcDynaClass(data: IData): void {
    super.calcDynaClass(data);
    if (this.model.rawItem?.dynaClass) {
      const dynaClass = calcDynaClass(this.model.rawItem.dynaClass, data);
      this.state.class.containerDyna = dynaClass;
    }
  }
}
