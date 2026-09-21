import { IAppBICubeData, IAppBICubeDimensionData, IAppBICubeMeasureData } from '../common';
import { IBIReportChartController } from './i-bi-report-chart.controller';
/**
 * bi报表设计器接口
 *
 * @author tony001
 * @date 2024-05-21 11:05:20
 * @export
 * @interface IBIReportDesignController
 */
export interface IBIReportDesignController {
    /**
     * 创建
     *
     * @author tony001
     * @date 2024-05-21 16:05:27
     */
    created(): Promise<void>;
    /**
     * 初始化状态
     *
     * @author tony001
     * @date 2024-06-05 14:06:17
     */
    initState(): void;
    /**
     * 销毁
     *
     * @author tony001
     * @date 2024-05-21 16:05:59
     */
    destroyed(): Promise<void>;
    /**
     * 获取立方体数据
     *
     * @author tony001
     * @date 2024-06-05 15:06:11
     * @return {*}  {Promise<IAppBICubeData[]>}
     */
    fetchCube(): Promise<IAppBICubeData[]>;
    /**
     * 获取立方体指标数据
     *
     * @param {string} cubeid
     * @return {*}  {Promise<IAppBICubeMeasureData[]>}
     * @memberof IBIReportDesignController
     */
    fetchCubeMeasure(cubeid: string): Promise<IAppBICubeMeasureData[]>;
    /**
     * 获取立方体维度数据
     *
     * @param {string} cubeid
     * @return {*}  {Promise<IAppBICubeDimensionData[]>}
     * @memberof IBIReportDesignController
     */
    fetchCubeDimension(cubeid: string): Promise<IAppBICubeDimensionData[]>;
    /**
     * 刷新立方体子数据（指标或者维度）
     *
     * @param {('measure' | 'dimension')} type
     * @return {*}  {Promise<void>}
     * @memberof IBIReportDesignController
     */
    refreshCubeDetails(type: 'measure' | 'dimension'): Promise<void>;
    /**
     * 切换报表体系
     *
     * @author tony001
     * @date 2024-06-04 18:06:20
     * @return {*}  {Promise<void>}
     */
    switchScheme(tag: string): Promise<void>;
    /**
     * 切换立方体
     *
     * @author tony001
     * @date 2024-05-21 16:05:27
     * @param {string} tag
     */
    switchCube(tag: string): Promise<void>;
    /**
     * 切换报表类型
     *
     * @author tony001
     * @date 2024-05-21 16:05:59
     * @param {string} tag
     */
    switchReportType(tag: string): Promise<void>;
    /**
     * 设置报表图表控制器
     *
     * @author tony001
     * @date 2024-06-04 23:06:18
     * @param {(IBIReportChartController | undefined)} reportChart
     * @return {*}  {Promise<void>}
     */
    setReportChart(reportChart: IBIReportChartController | undefined): Promise<void>;
    /**
     * 关闭设计界面
     *
     * @author tony001
     * @date 2024-06-20 13:06:52
     * @return {*}  {Promise<void>}
     */
    close(): Promise<void>;
    /**
     * 保存
     *
     * @author tony001
     * @date 2024-06-20 13:06:59
     * @return {*}  {Promise<void>}
     */
    save(): Promise<void>;
    /**
     * 取消保存
     *
     * @author tony001
     * @date 2024-06-20 13:06:30
     * @return {*}  {Promise<void>}
     */
    cancel(): Promise<void>;
}
