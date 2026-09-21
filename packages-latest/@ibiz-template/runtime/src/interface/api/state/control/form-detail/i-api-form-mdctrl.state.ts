import { IApiButtonContainerState } from '../../common';
import { IApiFormDetailState } from './i-api-form-detail.state';
/**
 * @description 表单多数据部件状态（除多数据部件表单样式以外）
 * @export
 * @interface IApiFormMDCtrlState
 * @extends {IApiFormDetailState}
 */
export interface IApiFormMDCtrlState extends IApiFormDetailState {
  /**
   * @description 界面行为组状态
   * @type {(IApiButtonContainerState | null)}
   * @memberof IApiFormMDCtrlState
   */
  actionGroupState: IApiButtonContainerState | null;
}
