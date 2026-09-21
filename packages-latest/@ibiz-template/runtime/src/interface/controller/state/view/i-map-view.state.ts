import { IApiMapViewState } from '../../../api';
import { IMDViewState } from './i-md-view.state';

/**
 * @description 实体地图视图UI状态
 * @export
 * @interface IMapViewState
 * @extends {IMDViewState}
 * @extends {IApiMapViewState}
 */
export interface IMapViewState extends IMDViewState, IApiMapViewState {}
