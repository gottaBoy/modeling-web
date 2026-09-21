import { IApiFormPageState } from '../../../state';
import { IApiFormGroupPanelController } from './i-api-form-group-panel.controller';
/**
 * @description 表单分页控制器
 * @export
 * @interface IApiFormPageController
 * @extends {IApiFormGroupPanelController}
 */
export interface IApiFormPageController extends IApiFormGroupPanelController {
  /**
   * @description 表单分页状态
   * @type {IApiFormPageState}
   * @memberof IApiFormPageController
   */
  state: IApiFormPageState;
}
