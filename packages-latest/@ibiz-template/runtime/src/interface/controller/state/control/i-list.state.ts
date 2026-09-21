import { IApiListState } from '../../../api';
import { IMDControlState } from './i-md-control.state';

/**
 * @description 列表部件状态接口
 * @export
 * @interface IListState
 * @extends {IMDControlState}
 * @extends {IApiListState}
 */
export interface IListState extends IMDControlState, IApiListState {}
