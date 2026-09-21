import { IApiMDCustomViewState } from '../../../api';
import { IViewState } from './i-view.state';

/**
 * @description 实体多数据自定义视图
 * @export
 * @interface IMDCustomViewState
 * @extends {IViewState}
 * @extends {IApiMDCustomViewState}
 */
export interface IMDCustomViewState extends IViewState, IApiMDCustomViewState {}
