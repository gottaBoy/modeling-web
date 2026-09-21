import { IDEChart } from '@ibiz/model-core';
import { IChartEvent } from '../../event';
import { IChartState } from '../../state';
import { IMDControlController } from './i-md-control.controller';
import { IApiChartController } from '../../../api';
import { IViewController } from '../view';

/**
 * @description 图表部件控制器接口
 * @export
 * @interface IChartController
 * @extends {IMDControlController<IDEChart, IChartState, IChartEvent>}
 * @extends {IApiChartController<IDEChart, IChartState>}
 */
export interface IChartController
  extends IMDControlController<IDEChart, IChartState, IChartEvent>,
    IApiChartController<IDEChart, IChartState> {
  /**
   * @description 视图控制器
   * @type {IViewController}
   * @memberof IChartController
   */
  view: IViewController;
}
