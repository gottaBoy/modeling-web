import { IApiFormDetailContainerState } from '../../../state';
import { IApiFormDetailController } from './i-api-form-detail.controller';

/**
 * @description 表单容器类型成员控制器
 * @export
 * @interface IApiFormDetailContainerController
 * @extends {IApiFormDetailController}
 */
export interface IApiFormDetailContainerController
  extends IApiFormDetailController {
  /**
   * @description 表单容器类型成员控制器状态
   * @type {IApiFormDetailContainerState}
   * @memberof IApiFormDetailContainerController
   */
  state: IApiFormDetailContainerState;
}
