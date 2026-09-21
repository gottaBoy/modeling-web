import { IApiFormMDCtrlRepeaterController } from '../../../../api';
import { IFormMDCtrlController } from './i-form-mdctrl.controller';

/**
 * @description 表单多数据部件(重复器)控制器
 * @export
 * @interface IFormMDCtrlRepeaterController
 * @extends {IFormMDCtrlController}
 */
export interface IFormMDCtrlRepeaterController
  extends IFormMDCtrlController,
    IApiFormMDCtrlRepeaterController {}
