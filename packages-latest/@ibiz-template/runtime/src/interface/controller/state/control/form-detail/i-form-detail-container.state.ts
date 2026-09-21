import { IApiFormDetailContainerState } from '../../../../api';
import { IFormDetailState } from './i-form-detail.state';

/**
 * @description 表单容器类型成员控制器状态
 * @export
 * @interface IFormDetailContainerState
 * @extends {IFormDetailState}
 * @extends {IApiFormDetailContainerState}
 */
export interface IFormDetailContainerState
  extends IFormDetailState,
    IApiFormDetailContainerState {}
