import { IDEViewPanel } from '@ibiz/model-core';
import { IControlController } from './i-control.controller';
import { IViewPanelState } from '../../state';
import { IViewPanelEvent } from '../../event';
import { IApiViewPanelController } from '../../../api';
import { IViewController } from '../view';

/**
 * @description 视图面板控制器
 * @export
 * @interface IViewPanelController
 * @extends {IControlController<IDEViewPanel, IViewPanelState, IViewPanelEvent>}
 * @extends {IApiViewPanelController<IDEViewPanel, IViewPanelState>}
 */
export interface IViewPanelController
  extends IControlController<IDEViewPanel, IViewPanelState, IViewPanelEvent>,
    IApiViewPanelController<IDEViewPanel, IViewPanelState> {
  /**
   * @description 视图控制器
   * @type {IViewController}
   * @memberof IViewPanelController
   */
  view: IViewController;
}
