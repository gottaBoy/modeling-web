import {
  IApiFormMDCtrlFormItem,
  IApiFormMDCtrlFormState,
} from '../../../../../interface';
import { FormMDCtrlState } from './form-mdctrl.state';

/**
 * @description 表单多数据部件表单状态
 * @export
 * @class FormMDCtrlFormState
 * @extends {FormMDCtrlState}
 * @implements {IApiFormMDCtrlFormState}
 */
export class FormMDCtrlFormState
  extends FormMDCtrlState
  implements IApiFormMDCtrlFormState
{
  /**
   * @description 表单绘制相关参数
   * @type {IApiFormMDCtrlFormItem[]}
   * @memberof FormMDCtrlFormState
   */
  items?: IApiFormMDCtrlFormItem[];
}
