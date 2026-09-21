import { RouteLocationNormalizedLoaded as Route } from 'vue-router';
import { IViewConfig } from '@ibiz-template/runtime';
import { IRoutePath, IRouteViewData } from '../../interface';
/**
 * 路径字符串转换成路由路径对象
 *
 * @author lxm
 * @date 2022-08-18 11:08:08
 * @export
 * @param {string} pathStr 以/开头的路径，即router的path
 * @param {boolean} [isRouteModal=false]
 * @returns {*}  {IRoutePath}
 */
export declare function route2routePath(route: Route, isRouteModal?: boolean): IRoutePath;
/**
 * 路由路径对象转路径字符串
 *
 * @author lxm
 * @date 2022-08-18 13:08:57
 * @export
 * @param {IRoutePath} routePath 路由路径对象
 * @returns {*}  {string}
 */
export declare function routePath2string(routePath: IRoutePath): string;
/**
 * 获取自身的路由上下文，排除了部分不需要路由携带的参数
 *
 * @author lxm
 * @date 2023-03-14 02:07:41
 * @export
 * @param {IContext} context
 * @returns {*}  {IParams}
 */
export declare function getOwnRouteContext(context: IContext): IParams;
/**
 * 计算资源上下文时，需要排除自身实体codeName的视图（导航类视图和多数据视图）
 * @return {*}
 * @author: zhujiamin
 * @Date: 2023-02-20 15:45:46
 */
export declare const excludeViewTypes: string[];
/**
 * 计算资源路径,把首页后面的资源路径上下文算出来，并把第二层中对应的上下文删掉。
 * @author lxm
 * @date 2023-07-13 06:37:10
 * @export
 * @param {IRoutePath} routePath
 * @param {IContext} context
 * @param {string} appDataEntityId
 * @return {*}  {Promise<void>}
 */
export declare function calcResRoutePath(routePath: IRoutePath, context: IContext, appDataEntityId?: string, appId?: string): Promise<void>;
/**
 * 生成route路径
 *
 * @author lxm
 * @date 2022-08-17 21:08:00
 * @export
 * @param {IAppView} appView 视图模型
 * @param {Route} route 路由对象
 * @param {IContext} [context] 上下文对象
 * @param {(IParams | undefined)} [params] 视图参数
 * @returns {*}  {string}
 */
export declare function generateRoutePath(appView: IViewConfig, route: Route, context: IContext, params?: IParams): Promise<{
    path: string;
}>;
/**
 * 生成route路径
 *
 * @author lxm
 * @date 2022-08-17 21:08:00
 * @export
 * @param {IAppView} appView 视图模型
 * @param {Route} route 路由对象
 * @param {IContext} [context] 上下文对象
 * @param {(IParams | undefined)} [params] 视图参数
 * @returns {*}  {string}
 */
export declare function generateRoutePathByModal(appView: IViewConfig, route: Route, context: IContext, params?: IParams): Promise<{
    path: string;
}>;
/**
 * 解析路由获取对应视图数据
 *
 * @author lxm
 * @date 2022-08-17 22:08:51
 * @export
 * @param {Route} route 路由对象
 * @param {number} depth 层级
 * @param {boolean} [isRouteModal=false]
 * @returns {*}  {IRouteViewData}
 */
export declare function parseRouteViewData(route: Route, depth: number, isRouteModal?: boolean): Promise<IRouteViewData>;
/**
 * 获取指定层级的路由路径
 * @author lxm
 * @date 2023-06-21 06:08:32
 * @export
 * @param {Route} route
 * @param {number} depth
 * @return {*}  {string}
 */
export declare function getNestedRoutePath(route: Route, depth: number, noSrfNav?: boolean): string;
/**
 * 监听路由的变更，每次变更后都会触发回调
 * 回调函数提供根据视图层级计算好的唯一标识currentKey，只有变了视图才需要刷新
 * @author lxm
 * @date 2023-05-09 12:52:36
 * @param {(args: { currentKey: string; fullPath: string }) => void} callback
 * @param {number} depth
 */
export declare function onRouteChange(callback: (args: {
    currentKey: string;
    fullPath: string;
}) => void, depth: number): void;
//# sourceMappingURL=route.d.ts.map