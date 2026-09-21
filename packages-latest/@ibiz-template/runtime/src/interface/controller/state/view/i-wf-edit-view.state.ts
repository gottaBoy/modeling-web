import { IApiWFEditViewState } from '../../../api';
import { IViewState } from './i-view.state';

/**
 * @description 实体工作流编辑视图UI状态
 * @export
 * @interface IWFEditViewState
 * @extends {IViewState}
 * @extends {IApiWFEditViewState}
 */
export interface IWFEditViewState extends IViewState, IApiWFEditViewState {}
