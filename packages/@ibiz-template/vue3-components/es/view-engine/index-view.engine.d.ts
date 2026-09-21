import { IViewController, ViewEngineBase, IIndexViewState, IViewEvent, IAppMenuController } from '@ibiz-template/runtime';
import { IAppIndexView } from '@ibiz/model-core';
import { RouteLocationNormalizedLoaded } from 'vue-router';
export declare class IndexViewEngine extends ViewEngineBase {
    protected view: IViewController<IAppIndexView, IIndexViewState, IViewEvent>;
    get appmenu(): IAppMenuController;
    /**
     * 启用折叠
     * @author lxm
     * @date 2023-10-18 12:09:36
     * @readonly
     * @type {boolean}
     */
    get enableCollapse(): boolean;
    /**
     * @description 路由对象
     * @type {RouteLocationNormalizedLoaded}
     * @memberof IndexViewEngine
     */
    route: RouteLocationNormalizedLoaded;
    initViewState(): void;
    onCreated(): Promise<void>;
    onMounted(): Promise<void>;
    call(key: string, _args: any): Promise<IData | null | undefined>;
    /**
     * 切换首页视图的折叠
     * @author lxm
     * @date 2023-10-17 05:31:37
     * @protected
     */
    protected toggleCollapse(): void;
    protected calcViewHeaderVisible(): boolean;
}
