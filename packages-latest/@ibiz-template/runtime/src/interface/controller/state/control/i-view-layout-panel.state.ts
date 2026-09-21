import { IApiViewLayoutPanelState } from '../../../api';
import { IPanelState } from './i-panel.state';
/**
 * @description 视图布局UI状态
 * @export
 * @interface IViewLayoutPanelState
 * @extends {IPanelState}
 * @extends {IApiViewLayoutPanelState}
 */
export interface IViewLayoutPanelState
  extends IPanelState,
    IApiViewLayoutPanelState {}
