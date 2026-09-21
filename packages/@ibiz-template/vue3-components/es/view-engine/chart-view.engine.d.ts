import { ViewController, IChartViewEvent, IChartViewState, MDViewEngine, IChartController } from '@ibiz-template/runtime';
import { IAppDEChartView } from '@ibiz/model-core';
export declare class ChartViewEngine extends MDViewEngine {
    protected view: ViewController<IAppDEChartView, IChartViewState, IChartViewEvent>;
    /**
     * 多数据部件名称
     * @author lxm
     * @date 2023-06-07 09:17:19
     * @readonly
     * @type {string}
     */
    get xdataControlName(): string;
    get chart(): IChartController;
    onCreated(): Promise<void>;
}
