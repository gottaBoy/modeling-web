import { IApiFormDetailState } from './i-api-form-detail.state';
/**
 * @description 表单按钮状态
 * @export
 * @interface IApiFormButtonState
 * @extends {IApiFormDetailState}
 */
export interface IApiFormButtonState extends IApiFormDetailState {
  /**
   * @description 是否在加载中
   * @type {boolean}
   * @memberof IApiFormButtonState
   */
  loading: boolean;
}
