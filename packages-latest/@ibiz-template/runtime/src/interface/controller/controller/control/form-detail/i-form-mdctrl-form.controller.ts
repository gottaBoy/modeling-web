import {
  IApiFormMDCtrlFormController,
  IApiFormMDCtrlFormState,
} from '../../../../api';
import { IFormMDCtrlController } from './i-form-mdctrl.controller';

/**
 * @description 表单多数据表单控制器接口
 * @export
 * @interface IFormMDCtrlFormController
 * @extends {IFormMDCtrlController}
 */
export interface IFormMDCtrlFormController
  extends IFormMDCtrlController,
    IApiFormMDCtrlFormController {
  /**
   * @description 表单多数据表单状态
   * @type {IApiFormMDCtrlFormState}
   * @memberof IFormMDCtrlFormController
   */
  state: IApiFormMDCtrlFormState;
}
