import { IApiChartData, IApiChartState } from '../../../api';
import { IMDControlState } from './i-md-control.state';
/**
 * @description 图表部件状态接口
 * @export
 * @interface IChartState
 * @extends {IMDControlState}
 * @extends {IApiChartState}
 */
export interface IChartState extends IMDControlState, IApiChartState {
    /**
     * @description 图表配置是否已就绪
     * @type {boolean}
     * @memberof IChartState
     */
    optionsReady: boolean;
}
/**
 * @description 图表数据格式接口
 * @export
 * @interface IChartData
 * @extends {IApiChartData}
 */
export interface IChartData extends IApiChartData {
}
//# sourceMappingURL=i-chart.state.d.ts.map