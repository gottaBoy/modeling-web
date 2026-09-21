import { IApiFormTabPageState } from '../../../state';
import { IApiFormDetailController } from './i-api-form-detail.controller';
/**
 * @description 表单分页部件分页控制器
 * @export
 * @interface IApiFormTabPageController
 * @extends {IApiFormDetailController}
 */
export interface IApiFormTabPageController extends IApiFormDetailController {
  /**
   * @description 表单分页部件分页状态
   * @type {IApiFormTabPageState}
   * @memberof IApiFormTabPageController
   */
  state: IApiFormTabPageState;

  /**
   * @description 是否激活的分页
   * @type {boolean}
   * @memberof IApiFormTabPageController
   */
  readonly isActive: boolean;
}
