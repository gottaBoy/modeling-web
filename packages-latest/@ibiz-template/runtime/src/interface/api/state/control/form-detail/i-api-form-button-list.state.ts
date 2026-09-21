import { IApiButtonContainerState } from '../../common';
import { IApiFormDetailState } from './i-api-form-detail.state';
/**
 * @description 表单按钮组状态
 * @export
 * @interface IApiFormButtonListState
 * @extends {IApiFormDetailState}
 */
export interface IApiFormButtonListState extends IApiFormDetailState {
  /**
   * @description 按钮组状态
   * @type {IApiButtonContainerState}
   * @memberof IApiFormButtonListState
   */
  buttonsState: IApiButtonContainerState;
}
