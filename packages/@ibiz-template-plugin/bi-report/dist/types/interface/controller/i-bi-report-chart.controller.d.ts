import { IAppBIDrillDetailData } from '../common';
import { IBIReportChartState } from '../state';
/**
 * bi报表图表接口
 *
 * @author tony001
 * @date 2024-05-21 11:05:20
 * @export
 * @interface IBIReportChartController
 */
export interface IBIReportChartController {
    /**
     * 模式，设计态|呈现态
     *
     * @author tony001
     * @date 2024-06-06 00:06:20
     * @type {string}
     */
    mode: string;
    /**
     *初始化状态
     *
     * @type {IBIReportChartState}
     * @memberof IBIReportChartController
     */
    state: IBIReportChartState;
    /**
     * 上下文
     *
     * @type {IContext}
     * @memberof IBIReportChartController
     */
    context: IContext;
    /**
     * 视图参数
     *
     * @type {IParams}
     * @memberof IBIReportChartController
     */
    viewParams: IParams;
    /**
     * 图表控制器
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:23
     * @type {IData}
     */
    chartController?: IData;
    /**
     * 设置图表控制器
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:33
     * @param {IData} c
     */
    setChartController(c: IData): void;
    /**
     * 创建
     *
     * @author tony001
     * @date 2024-06-04 11:06:26
     */
    created(): Promise<void>;
    /**
     * 初始化状态
     *
     * @author tony001
     * @date 2024-06-05 14:06:38
     */
    initState(): void;
    /**
     * 销毁
     *
     * @author tony001
     * @date 2024-06-04 11:06:34
     */
    destroyed(): Promise<void>;
    /**
     * 加载
     *
     * @author tony001
     * @date 2024-06-20 14:06:14
     * @return {*}  {Promise<IData[]>}
     */
    load(): Promise<IData[]>;
    /**
     * 处理值变更
     *
     * @param {string} _name
     * @param {unknown} _value
     * @param {IData} _mergeParams
     * @return {*}  {Promise<void>}
     * @memberof IBIReportChartController
     */
    handleValueChange(_name: string, _value: unknown, _mergeParams: IData): Promise<void>;
    /**
     * 刷新数据
     *
     * @author tony001
     * @date 2024-06-20 11:06:03
     * @param {('UI' | 'ALL')} type 界面 | 数据和界面
     * @return {*}  {Promise<void>}
     */
    refresh(type: 'UI' | 'ALL'): Promise<void>;
    /**
     * 获取数据集
     *
     * @author tony001
     * @date 2024-06-06 01:06:58
     * @return {*}  {Promise<IData[]>}
     */
    fetchDataSource(): Promise<IData[]>;
    /**
     * 检查数据
     *
     * @return {*}  {Promise<boolean>}
     * @memberof IBIReportChartController
     */
    checkData(): Promise<boolean>;
    /**
     * 处理数据反查
     *
     * @author tony001
     * @date 2024-07-11 16:07:20
     * @param {IAppBIDrillDetailData} args
     * @return {*}  {Promise<void>}
     */
    handleDrillDetail(args: IAppBIDrillDetailData): Promise<void>;
}
