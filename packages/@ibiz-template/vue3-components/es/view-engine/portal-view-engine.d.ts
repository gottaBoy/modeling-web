import { ViewController, IPortalViewState, IPortalViewEvent, IDashboardController, DEMainViewEngine } from '@ibiz-template/runtime';
import { IAppView } from '@ibiz/model-core';
export declare class PortalViewEngine extends DEMainViewEngine {
    /**
     * 视图控制器
     *
     * @protected
     * @type {ViewController<IAppView, IAppPortalViewState, IAppPortalViewEvent>}
     * @memberof PortalViewEngine
     */
    protected view: ViewController<IAppView, IPortalViewState, IPortalViewEvent>;
    /**
     * 视图created生命周期执行逻辑
     *
     * @return {*}  {Promise<void>}
     * @memberof PortalViewEngine
     */
    onCreated(): Promise<void>;
    /**
     * 数据看板部件
     *
     * @readonly
     * @memberof PortalViewEngine
     */
    get dashboard(): IDashboardController;
    /**
     * 视图刷新
     *
     * @return {*}  {Promise<void>}
     * @memberof PortalViewEngine
     */
    refresh(): Promise<void>;
    /**
     * 执行视图预置界面行为能力
     *
     * @param {string} key
     * @param {*} args
     * @return {*}  {(Promise<IData | null | undefined>)}
     * @memberof PortalViewEngine
     */
    call(key: string, args: any): Promise<IData | null | undefined>;
    onMounted(): Promise<void>;
    /**
     * 执行标记数据行为
     *
     * @memberof PortalViewEngine
     */
    doMarkDataAction(): void;
}
