import { IApiDRTabPagesState, IApiDRTabState } from '../../../api';
import { IControlState } from './i-control.state';

/**
 * @description 数据关系分页UI状态接口
 * @export
 * @interface IDRTabState
 * @extends {IControlState}
 * @extends {IApiDRTabState}
 */
export interface IDRTabState extends IControlState, IApiDRTabState {}

/**
 * @description 关系分页状态接口
 * @export
 * @interface IDRTabPagesState
 * @extends {IApiDRTabPagesState}
 */
export interface IDRTabPagesState extends IApiDRTabPagesState {}
