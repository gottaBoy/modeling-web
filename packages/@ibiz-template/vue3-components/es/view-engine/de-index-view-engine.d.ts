import { ViewController, IDEIndexViewState, IDEIndexViewEvent, IDRBarController, EventBase } from '@ibiz-template/runtime';
import { IAppDEIndexView } from '@ibiz/model-core';
import { EditViewEngine } from './edit-view.engine';
export declare class DEIndexViewEngine extends EditViewEngine {
    /**
     * 视图控制器
     *
     * @protected
     * @type {ViewController<IAppView, IAppDEIndexViewState, IAppDEIndexViewEvent>}
     * @memberof DEIndexViewEngine
     */
    protected view: ViewController<IAppDEIndexView, IDEIndexViewState, IDEIndexViewEvent>;
    /**
     * 数据关系栏
     *
     * @author lxm
     * @date 2023-12-11 11:41:07
     * @readonly
     * @type {IDRBarController}
     */
    get drbar(): IDRBarController;
    /**
     * 当前路由视图的层级
     *
     * @author zk
     * @date 2023-07-11 10:07:20
     * @readonly
     * @type {(number | undefined)}
     * @memberof ExpBarControlController
     */
    get routeDepth(): number | undefined;
    onCreated(): Promise<void>;
    /**
     * @description 监控form事件
     * @param {EventBase} event
     * @memberof DEIndexViewEngine
     */
    formDataStateChange(event: EventBase): void;
}
