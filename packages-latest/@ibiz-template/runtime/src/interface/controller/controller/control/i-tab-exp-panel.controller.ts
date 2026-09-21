import { ITabExpPanel } from '@ibiz/model-core';
import { ITabExpPanelEvent } from '../../event';
import { ITabExpPanelState } from '../../state';
import { IControlController } from './i-control.controller';
import { IApiTabExpPanelController } from '../../../api';
import { IViewController } from '../view';

/**
 * @description 分页导航面板控制器接口
 * @export
 * @interface ITabExpPanelController
 * @extends {IControlController<ITabExpPanel, ITabExpPanelState, ITabExpPanelEvent>}
 * @extends {IApiTabExpPanelController<ITabExpPanel, ITabExpPanelState>}
 */
export interface ITabExpPanelController
  extends IControlController<
      ITabExpPanel,
      ITabExpPanelState,
      ITabExpPanelEvent
    >,
    IApiTabExpPanelController<ITabExpPanel, ITabExpPanelState> {
  /**
   * @description 视图控制器
   * @type {IViewController}
   * @memberof ITabExpPanelController
   */
  view: IViewController;
}
