import { IApiAppLoginViewState } from '../../../api';
import { IViewState } from './i-view.state';

/**
 * @description 应用登录视图UI状态
 * @export
 * @interface IAppLoginViewState
 * @extends {IViewState}
 * @extends {IApiAppLoginViewState}
 */
export interface IAppLoginViewState extends IViewState, IApiAppLoginViewState {}
