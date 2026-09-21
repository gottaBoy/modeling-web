import { IViewLayoutPanel } from '@ibiz/model-core';
import { IViewLayoutPanelEvent } from '../../event';
import { IViewLayoutPanelState } from '../../state';
import { IPanelController } from './i-panel.controller';
import { IApiViewLayoutPanelController } from '../../../api';
import { IController } from '../i.controller';
import { IPanelItemController } from './panel-item';
import { IViewController } from '../view';

/**
 * @description 视图布局面板控制器
 * @export
 * @interface IViewLayoutPanelController
 * @extends {IPanelController<IViewLayoutPanel, IViewLayoutPanelState, IViewLayoutPanelEvent>}
 * @extends {IApiViewLayoutPanelController}
 */
export interface IViewLayoutPanelController
  extends IPanelController<
      IViewLayoutPanel,
      IViewLayoutPanelState,
      IViewLayoutPanelEvent
    >,
    IApiViewLayoutPanelController<IViewLayoutPanel, IViewLayoutPanelState> {
  /**
   * @description 当前上下文环境的视图控制器
   * @type {IViewController}
   * @memberof IControlController
   */
  view: IViewController;

  /**
   * @description 容器控制器（可能是视图控制器，也可能是部件控制器）
   * @type {IController}
   * @memberof IPanelController
   */
  container?: IController;

  /**
   * @description 所有面板成员的控制器
   * @type {{ [key: string]: IPanelItemController }}
   * @memberof IViewLayoutPanelController
   */
  panelItems: { [key: string]: IPanelItemController };
}
