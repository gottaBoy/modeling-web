import { IApiPortalViewState } from '../../../api';
import { IViewState } from './i-view.state';

/**
 * @description 实体看板视图UI状态
 * @export
 * @interface IPortalViewState
 * @extends {IViewState}
 * @extends {IApiPortalViewState}
 */
export interface IPortalViewState extends IViewState, IApiPortalViewState {}
