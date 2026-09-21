import { IAppBIReport } from '@ibiz/model-core';
import { ChartType } from './chart-type';
/**
 * 图表配置数据
 *
 * @author tony001
 * @date 2024-06-12 13:06:16
 * @export
 * @interface IReportChartDesign
 */
export interface IChartConfig {
    /**
     * 报表标识
     *
     * @author tony001
     * @date 2024-06-12 14:06:48
     * @type {string}
     */
    reportTag: string;
    /**
     * 选中图表类型
     *
     * @author tony001
     * @date 2024-06-12 14:06:15
     * @type {ChartType}
     */
    selectChartType: ChartType;
    /**
     * 选中报表体系标识
     *
     * @author tony001
     * @date 2024-06-12 13:06:38
     * @type {string}
     */
    selectedSchemeId?: string;
    /**
     * 选中立方体数据
     *
     * @author tony001
     * @date 2024-06-12 14:06:02
     * @type {string}
     */
    selectCubeId?: string;
    /**
     * 图表相关参数
     *
     * @author tony001
     * @date 2024-06-12 14:06:27
     * @type {IData}
     */
    propertyData?: IData;
    /**
     * 缓存值（前一个类型图表缓存数据）
     *
     * @author tony001
     * @date 2024-06-20 15:06:43
     * @type {IData}
     */
    cacheData?: IData;
}
/**
 * 图表元数据
 *
 * @author tony001
 * @date 2024-06-05 23:06:39
 * @export
 * @interface IChartMeta
 */
export interface IChartMeta {
    /**
     * 模式，设计态|呈现态
     *
     * @author tony001
     * @date 2024-06-05 23:06:18
     * @type {('DESIGN' | 'CONTENT')}
     */
    mode: 'DESIGN' | 'CONTENT';
    /**
     * 应用上下文
     *
     * @author tony001
     * @date 2024-06-12 15:06:20
     * @type {IContext}
     */
    context: IContext;
    /**
     * 视图参数
     *
     * @author tony001
     * @date 2024-06-12 15:06:30
     * @type {IParams}
     */
    viewParams: IParams;
    /**
     * 配置
     *
     * @author tony001
     * @date 2024-06-12 15:06:47
     * @type {IAppBIReport}
     */
    config: IAppBIReport;
}
/**
 * 图表默认配置
 *
 * @export
 * @interface IChartDefaultConfig
 */
export interface IChartDefaultConfig {
    chartConfig: IData;
    chartModel?: IData;
    chartDefaultValue: IData;
}
