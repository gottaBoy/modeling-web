import { IApiFormDetailState } from './i-api-form-detail.state';

/**
 * @description 表单容器类型成员控制器状态
 * @export
 * @interface IApiFormDetailContainerState
 * @extends {IApiFormDetailState}
 */
export interface IApiFormDetailContainerState extends IApiFormDetailState {
  /**
   * @description 是否显示更多内容
   * @type {boolean}
   * @memberof IApiFormDetailContainerState
   */
  isShowMore?: boolean;
}
