import { IApiFormMDCtrlController, IApiFormMDCtrlState } from '../../../../api';
import { IFormDetailController } from './i-form-detail.controller';

/**
 * @description 表单多数据部件控制器接口
 * @export
 * @interface IFormMDCtrlController
 * @extends {IFormDetailController}
 */
export interface IFormMDCtrlController
  extends IFormDetailController,
    IApiFormMDCtrlController {
  /**
   * @description 表单多数据部件状态
   * @type {IApiFormMDCtrlState}
   * @memberof IFormMDCtrlController
   */
  state: IApiFormMDCtrlState;
}
