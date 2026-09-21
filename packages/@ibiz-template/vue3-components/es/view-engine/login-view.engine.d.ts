import { ViewController, ViewEngineBase, IAppLoginViewState, IAppLoginViewEvent } from '@ibiz-template/runtime';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { IAppView } from '@ibiz/model-core';
export declare class LoginViewEngine extends ViewEngineBase {
    /**
     * 路由对象
     *
     * @type {RouteLocationNormalizedLoaded}
     * @memberof LoginViewEngine
     */
    route: RouteLocationNormalizedLoaded;
    /**
     * 应用登录视图控制器
     *
     * @protected
     * @type {ViewController<
     *     IAppView,
     *     IAppLoginViewState,
     *     IAppLoginViewEvent
     *   >}
     * @memberof LoginViewEngine
     */
    protected view: ViewController<IAppView, IAppLoginViewState, IAppLoginViewEvent>;
    /**
     * 视图mounted生命周期执行逻辑
     *
     * @return {*}  {Promise<void>}
     * @memberof LoginViewEngine
     */
    onMounted(): Promise<void>;
    /**
     * 视图destroyed生命周期执行逻辑
     *
     * @return {*}  {Promise<void>}
     * @memberof LoginViewEngine
     */
    onDestroyed(): Promise<void>;
    call(key: string, args?: IData): Promise<IData | null | undefined>;
    login(args: IData): Promise<void>;
    cancelChanges(): Promise<void>;
    private enterKeyListener;
}
