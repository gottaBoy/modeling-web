import {
  IApiFormDetailContainerController,
  IApiFormDetailContainerState,
} from '../../../../api';
import { IFormDetailController } from './i-form-detail.controller';

/**
 * @description 表单容器类型成员控制器接口
 * @export
 * @interface IFormDetailContainerController
 * @extends {IFormDetailController}
 */
export interface IFormDetailContainerController
  extends IFormDetailController,
    IApiFormDetailContainerController {
  /**
   * @description 表单容器类型成员控制器状态
   * @type {IApiFormDetailContainerState}
   * @memberof IFormDetailContainerController
   */
  state: IApiFormDetailContainerState;
}
