import { IDEChart } from '@ibiz/model-core';
import type { EChartsOption, EChartsType } from 'echarts';
import { ChartOptionsGenerator } from './generator/chart-options-generator';
import { ChartService } from './chart.service';
import { IChartController, IChartEvent, IChartState, MDCtrlLoadParams } from '../../../interface';
import { MDControlController } from '../../common';
import { ControllerEvent } from '../../utils';
export declare class ChartController extends MDControlController<IDEChart, IChartState, IChartEvent> implements IChartController {
    service: ChartService;
    protected get _evt(): ControllerEvent<IChartEvent>;
    /**
     * echarts对象
     * @author lxm
     * @date 2023-06-07 09:36:58
     * @type {EChartsType}
     */
    chart?: EChartsType;
    /**
     * 图表选项生成器
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-11-23 14:07:39
     */
    generator: ChartOptionsGenerator;
    /**
     * 最终使用的echarts配置
     * @author lxm
     * @date 2023-06-07 09:51:09
     * @type {EChartsOption}
     */
    options?: EChartsOption;
    /**
     * 图表tooltip的默认状态
     *
     * @memberof ChartController
     */
    tooltipState: boolean;
    protected initState(): void;
    protected onCreated(): Promise<void>;
    afterLoad(args: MDCtrlLoadParams, items: IData[]): Promise<IData[]>;
    /**
     * 改变tooltip的显示状态
     *
     * @param {boolean} [tag=true]
     * @memberof ChartController
     */
    changeTooltipState(tag?: boolean): void;
    /**
     * 计算当前点击序列的模型
     *
     * @param {IData} arg
     * @memberof ChartController
     */
    computedClickSerieModel(arg: IData): IData | undefined;
    /**
     * 计算查看明细参数
     *
     * @param {IData} arg
     * @return {*}
     * @memberof ChartController
     */
    computedDrillDetailParam(arg: IData): IData;
    /**
     * 解析表格相关参数
     *
     * @memberof ChartController
     */
    parseGridParam(): void;
    /**
     * 计算总数
     *
     * @param {string} valueField
     * @return {*}
     * @memberof ChartController
     */
    computeTotal(valueField: string): number;
    /**
     * 处理单序列时的表格数据
     * 图表单序列时，首先获取配置的分类属性和值属性的title,构建表头，内置支持百分比列
     * 然后遍历图表默认分出来的分组数据去生成表格的数据
     *
     * @memberof ChartController
     */
    handleSingleSerieGridData(): void;
    /**
     * 处理多序列时的表格数据
     * 图表多序列时，首先去遍历序列，然后获取每个序列的分类属性和值属性以及已经分好的分组数据，
     * 查找当前的表格头数组中是否存在当前的分类或者值属性组成的项，如果没有就将当前分类或者值属性添加到表格头数组中，以序列作为表格列
     * 同理，循环当前序列的分组数据，并根据当前分组属性的值生成表格数据，如果在表格数据中已经存在具有相同分组属性值，则把当前序列的当前分组属性对应的值属性
     * 添加到表格数据中对应的项里
     *
     * @memberof ChartController
     */
    handleMultipleSerieGridData(): void;
    /**
     * 计算表格数据
     *
     * @memberof ChartController
     */
    computeGridData(): void;
    /**
     * 初始化echarts对象
     * @author lxm
     * @date 2023-06-07 09:37:05
     * @param {HTMLElement} dom
     */
    initChart(chart: EChartsType): void;
    /**
     * 根据数据计算最终的options
     * 并刷新echarts
     * @author lxm
     * @date 2023-06-07 09:58:00
     * @param {IData[]} [data=this.state.items]
     */
    calcOptions(data?: IData[]): Promise<void>;
    /**
     * 更新echart图表
     * @author lxm
     * @date 2023-06-07 10:03:48
     */
    updateChart(): Promise<void>;
    /**
     * 刷新图表的大小
     * @author lxm
     * @date 2023-06-09 09:37:25
     */
    resizeChart(): void;
    protected onDestroyed(): Promise<void>;
}
//# sourceMappingURL=chart.controller.d.ts.map