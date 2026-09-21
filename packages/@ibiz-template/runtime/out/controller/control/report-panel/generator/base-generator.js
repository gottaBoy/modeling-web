/**
 * 报表生成器基类
 *
 * @export
 * @class ReportPanelBaseGenerator
 */
export class ReportPanelBaseGenerator {
    /**
     * Creates an instance of ReportPanelBaseGenerator.
     * @param {IDEReportPanel} model
     * @memberof ReportPanelBaseGenerator
     */
    constructor(model, reportPanel) {
        /**
         * 配置
         *
         * @type {IData}
         * @memberof ReportPanelBaseGenerator
         */
        this.config = {};
        this.model = model;
        this.reportPanel = reportPanel;
    }
    /**
     * 初始化配置
     *
     * @author tony001
     * @date 2024-06-26 16:06:01
     */
    async initConfig() { }
    /**
     * 初始化
     *
     * @param {IData} args
     * @memberof ReportPanelBaseGenerator
     */
    init(args) {
        this.protoRef = args;
    }
    /**
     * 加载
     *
     * @param {IData} data
     * @return {*}  {Promise<IData>}
     * @memberof ReportPanelBaseGenerator
     */
    load(data = {}) {
        return Promise.resolve(data);
    }
}
