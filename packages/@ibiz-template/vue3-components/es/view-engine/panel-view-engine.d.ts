import { ViewEngineBase, ViewController, IPanelController, IPanelViewEvent, IPanelViewState } from '@ibiz-template/runtime';
import { IAppView } from '@ibiz/model-core';
export declare class PanelViewEngine extends ViewEngineBase {
    /**
     * 视图控制器
     *
     * @protected
     * @type {ViewController<IAppView, IPanelViewState, IPanelViewEvent>}
     * @memberof PanelViewEngine
     */
    protected view: ViewController<IAppView, IPanelViewState, IPanelViewEvent>;
    onCreated(): Promise<void>;
    /**
     * 面板部件
     *
     * @readonly
     * @memberof PanelViewEngine
     */
    get panel(): IPanelController;
    onMounted(): Promise<void>;
}
