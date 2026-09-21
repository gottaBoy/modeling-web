import { IDEReportPanel } from '@ibiz/model-core';
import { IApiReportPanelGenerator, IReportPanelController } from '../../../../interface';
/**
 * 报表生成器基类
 *
 * @export
 * @class ReportPanelBaseGenerator
 * @implements {IApiReportPanelGenerator}
 */
export declare class ReportPanelBaseGenerator implements IApiReportPanelGenerator {
    /**
     * 报表面板模型
     *
     * @protected
     * @type {IDEReportPanel}
     * @memberof ReportPanelBaseGenerator
     */
    protected model: IDEReportPanel;
    /**
     * 报表控制器
     *
     * @author tony001
     * @date 2024-06-20 15:06:54
     * @protected
     * @type {IReportPanelController}
     */
    protected reportPanel: IReportPanelController;
    /**
     * 原始控制器引用
     *
     * @protected
     * @type {(IData | undefined)}
     * @memberof ReportPanelBaseGenerator
     */
    protoRef: IData | undefined;
    /**
     * @description 报表类型
     * @type {string}
     * @memberof ReportPanelBaseGenerator
     */
    reportType?: string;
    /**
     * 配置
     *
     * @type {IData}
     * @memberof ReportPanelBaseGenerator
     */
    config: IData;
    /**
     * Creates an instance of ReportPanelBaseGenerator.
     * @param {IDEReportPanel} model
     * @memberof ReportPanelBaseGenerator
     */
    constructor(model: IDEReportPanel, reportPanel: IReportPanelController);
    /**
     * 初始化配置
     *
     * @author tony001
     * @date 2024-06-26 16:06:01
     */
    initConfig(): Promise<void>;
    /**
     * 初始化
     *
     * @param {IData} args
     * @memberof ReportPanelBaseGenerator
     */
    init(args: IData): void;
    /**
     * 加载
     *
     * @param {IData} data
     * @return {*}  {Promise<IData>}
     * @memberof ReportPanelBaseGenerator
     */
    load(data?: IData): Promise<IData>;
    /**
     * @description 生成
     * @param {IData[]} _items
     * @returns {*}  {({ model: IModel; options: IData; data: IData[] } | undefined)}
     * @memberof ReportPanelBaseGenerator
     */
    generate(_items: IData[]): {
        model: IModel;
        options: IData;
        data: IData[];
    } | undefined;
}
//# sourceMappingURL=base-generator.d.ts.map