import { IApiMDControlGroupState, IApiMDControlState } from '../../../api';
import { IButtonContainerState } from '../../common';
import { IControlState } from './i-control.state';
/**
 * @description 多数据部件UI状态
 * @export
 * @interface IMDControlState
 * @extends {IControlState}
 * @extends {IApiMDControlState}
 */
export interface IMDControlState extends IControlState, IApiMDControlState {}
/**
 * @description 分组UI数据接口
 * @export
 * @interface IMDControlGroupState
 * @extends {IApiMDControlGroupState}
 */
export interface IMDControlGroupState extends IApiMDControlGroupState {
  /**
   * @description 分组界面行为组状态
   * @type {IButtonContainerState}
   * @memberof IMDControlGroupState
   */
  groupActionGroupState?: IButtonContainerState;
}
