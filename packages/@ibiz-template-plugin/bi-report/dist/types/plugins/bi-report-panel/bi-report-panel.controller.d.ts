import { IDEToolbar } from '@ibiz/model-core';
import { PanelItemController } from '@ibiz-template/runtime';
export declare class BIReportPanelController extends PanelItemController {
    /**
     * BI报表配置
     *
     * @author zhanghengfeng
     * @date 2024-07-02 14:07:34
     * @type {IData}
     */
    config: IData;
    /**
     * 上下文
     *
     * @author zhanghengfeng
     * @date 2024-07-02 14:07:53
     * @type {IContext}
     */
    context: IContext;
    /**
     * BI报表key
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:45
     * @type {string}
     */
    reportKey: string;
    /**
     * @description 指标工具栏
     * @type {(IDEToolbar | null)}
     * @memberof BIReportPanelController
     */
    measureToolbar: IDEToolbar | null;
    /**
     * @description 维度工具栏
     * @type {(IDEToolbar | null)}
     * @memberof BIReportPanelController
     */
    dimensionToolbar: IDEToolbar | null;
    /**
     * 初始化BI报表key
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:16
     */
    initReportKey(): void;
    /**
     * @description 初始化维度指标工具栏
     * @memberof BIReportPanelController
     */
    initToolbar(): void;
    /**
     * 初始化
     *
     * @author zhanghengfeng
     * @date 2024-07-03 20:07:40
     * @return {*}  {Promise<void>}
     */
    onInit(): Promise<void>;
}
