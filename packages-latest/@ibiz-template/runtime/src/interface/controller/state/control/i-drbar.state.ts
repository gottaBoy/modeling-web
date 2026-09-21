import { IApiDRBarItemsState, IApiDRBarState } from '../../../api';
import { IControlState } from './i-control.state';

/**
 * @description 数据关系栏UI状态接口
 * @export
 * @interface IDRBarState
 * @extends {IControlState}
 */
export interface IDRBarState extends IControlState, IApiDRBarState {}

/**
 * @description 关系项状态接口
 * @export
 * @interface IDRBarItemsState
 * @extends {IApiDRBarItemsState}
 */
export interface IDRBarItemsState extends IApiDRBarItemsState {}
