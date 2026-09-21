import { IDEPickupViewPanel } from '@ibiz/model-core';
import { IPickupViewPanelEvent } from '../../event';
import { IPickupViewPanelState } from '../../state';
import { IControlController } from './i-control.controller';
import { IApiPickupViewPanelController } from '../../../api';
import { IViewController } from '../view';

/**
 * @description 选择视图面板控制器接口
 * @export
 * @interface IPickupViewPanelController
 * @extends {IControlController<IDEPickupViewPanel, IPickupViewPanelState, IPickupViewPanelEvent>}
 */
export interface IPickupViewPanelController
  extends IControlController<
      IDEPickupViewPanel,
      IPickupViewPanelState,
      IPickupViewPanelEvent
    >,
    IApiPickupViewPanelController<IDEPickupViewPanel, IPickupViewPanelState> {
  /**
   * @description 视图控制器
   * @type {ViewController}
   * @memberof IPickupViewPanelController
   */
  view: IViewController;
}
