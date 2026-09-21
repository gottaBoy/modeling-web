import { IDEViewPanel } from '@ibiz/model-core';
import { ControlController } from '../../common';
import {
  IViewController,
  IViewPanelController,
  IViewPanelEvent,
  IViewPanelState,
} from '../../../interface';

/**
 * @description 视图面板控制器
 * @export
 * @class ViewPanelController
 * @extends {ControlController<IDEViewPanel, IViewPanelState, IViewPanelEvent>}
 * @implements {IViewPanelController}
 */
export class ViewPanelController
  extends ControlController<IDEViewPanel, IViewPanelState, IViewPanelEvent>
  implements IViewPanelController
{
  /**
   * @description 嵌入视图控制器
   * @type {(IViewController | undefined)}
   * @memberof ViewPanelController
   */
  embedView: IViewController | undefined;

  /**
   * @description 设置嵌入视图
   * @param {IViewController} view 嵌入视图控制器
   * @memberof ViewPanelController
   */
  setEmbedView(view: IViewController): void {
    this.embedView = view;
  }
}
