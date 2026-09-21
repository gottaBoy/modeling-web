import { ViewController, ViewEngineBase, IChartExpBarController, IChartExpViewEvent, IChartExpViewState } from '@ibiz-template/runtime';
import { IAppDEChartExplorerView } from '@ibiz/model-core';
export declare class ChartExpViewEngine extends ViewEngineBase {
    /**
     * 图表导航视图控制器
     *
     * @protected
     * @type {ViewController<
     *     IAppDEChartExplorerView,
     *     IChartExpViewState,
     *     IChartExpViewEvent
     *   >}
     * @memberof ChartExpViewEngine
     */
    protected view: ViewController<IAppDEChartExplorerView, IChartExpViewState, IChartExpViewEvent>;
    /**
     * 图表导航栏
     *
     * @readonly
     * @memberof ChartExpViewEngine
     */
    get chartExpBar(): IChartExpBarController;
    onCreated(): Promise<void>;
}
