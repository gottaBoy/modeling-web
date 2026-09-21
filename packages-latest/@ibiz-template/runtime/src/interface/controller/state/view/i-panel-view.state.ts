import { IApiPanelViewState } from '../../../api';
import { IViewState } from './i-view.state';

/**
 * @description 实体面板视图UI状态
 * @export
 * @interface IPanelViewState
 * @extends {IViewState}
 * @extends {IApiPanelViewState}
 */
export interface IPanelViewState extends IViewState, IApiPanelViewState {}
