import { IApiChartExpBarState } from '../../../api';
import { IExpBarControlState } from './i-exp-bar-control.state';

/**
 * @description 图表导航栏部件状态接口
 * @export
 * @interface IChartExpBarState
 * @extends {IExpBarControlState}
 * @extends {IApiChartExpBarState}
 */
export interface IChartExpBarState
  extends IExpBarControlState,
    IApiChartExpBarState {}
