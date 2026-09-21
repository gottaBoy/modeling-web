import { IApiFormMDCtrlState } from './i-api-form-mdctrl.state';
import { IApiFormMDCtrlFormItem } from '../../../common';
/**
 * @description 表单多数据部件表单样式状态
 * @export
 * @interface IApiFormMDCtrlFormState
 * @extends {IApiFormMDCtrlState}
 */
export interface IApiFormMDCtrlFormState extends IApiFormMDCtrlState {
  /**
   * @description 表单绘制相关参数
   * @type {IApiFormMDCtrlFormItem[]}
   * @memberof IApiFormMDCtrlFormState
   */
  items?: IApiFormMDCtrlFormItem[];
}
