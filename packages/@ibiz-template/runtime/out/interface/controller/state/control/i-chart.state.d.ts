import { IMDControlState } from './i-md-control.state';
/**
 * 图表部件状态
 * @author lxm
 * @date 2023-05-22 02:18:43
 * @export
 * @interface IChartState
 * @extends {IMDControlState}
 */
export interface IChartState extends IMDControlState {
    /**
     * 开启图表表格时的表格头
     *
     * @type {IData[]}
     * @memberof IChartState
     */
    gridHeaders: IData[];
    /**
     * 开启图表表格时表格的数据
     *
     * @type {IData[]}
     * @memberof IChartState
     */
    gridData: IData[];
    /**
     * 是否开启图表表格
     *
     * @type {boolean}
     * @memberof IChartState
     */
    showGrid: boolean;
    /**
     *表格所在方位
     *
     * @type {string}
     * @memberof IChartState
     */
    gridPosition: string;
}
/**
 * 图表数据格式
 *
 */
export interface IChartData {
    /**
     * 序列模型id
     *
     */
    _seriesModelId?: string;
    /**
     * 分组名称
     *
     */
    _groupName?: string;
    /**
     * 分类值
     *
     */
    _catalog?: string;
}
//# sourceMappingURL=i-chart.state.d.ts.map