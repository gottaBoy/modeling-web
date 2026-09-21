import { IDEReportPanel } from '@ibiz/model-core';
import { IReportPanelEvent } from '../../event';
import { IReportPanelState } from '../../state';
import { IControlController } from './i-control.controller';
import { IApiReportPanelController } from '../../../api';
import { IViewController } from '../view';

/**
 * @description 报表部件控制器接口
 * @export
 * @interface IReportPanelController
 * @extends {IControlController<IDEReportPanel, IReportPanelState, IReportPanelEvent>}
 */
export interface IReportPanelController
  extends IControlController<
      IDEReportPanel,
      IReportPanelState,
      IReportPanelEvent
    >,
    IApiReportPanelController<IDEReportPanel, IReportPanelState> {
  /**
   * @description 视图控制器
   * @type {IViewController}
   * @memberof IReportPanelController
   */
  view: IViewController;
}
