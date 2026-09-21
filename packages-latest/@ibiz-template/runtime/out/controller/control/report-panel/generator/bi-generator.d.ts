import { ConverterBase } from './bi-converter/base';
import { ReportPanelBaseGenerator } from './base-generator';
/**
 * @description BI报表生成器
 * @export
 * @class BIReportPanelGenerator
 * @extends {ReportPanelBaseGenerator}
 */
export declare class BIReportPanelGenerator extends ReportPanelBaseGenerator {
    /**
     * @description 转换器
     * @type {BaseConverter}
     * @memberof BIReportPanelGenerator
     */
    converter?: ConverterBase;
    /**
     * @description 初始化配置
     * @returns {*}  {Promise<void>}
     * @memberof BIReportPanelGenerator
     */
    initConfig(): Promise<void>;
    /**
     * @description 初始化转换器
     * @private
     * @memberof BIReportPanelGenerator
     */
    private initConverter;
    /**
     * @description 生成
     * @param {IData[]} items
     * @returns {*}  {({
     *         model: IModel;
     *         options: IData;
     *         data: IData[];
     *       }
     *     | undefined)}
     * @memberof BIReportPanelGenerator
     */
    generate(items: IData[]): {
        model: IModel;
        options: IData;
        data: IData[];
    } | undefined;
}
//# sourceMappingURL=bi-generator.d.ts.map