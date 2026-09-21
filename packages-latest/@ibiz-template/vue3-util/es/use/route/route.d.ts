import { RouteLocationNormalizedLoaded } from 'vue-router';
import { Ref } from 'vue';
/**
 * 获取路由查询参数
 *
 * @author chitanda
 * @date 2022-08-15 15:08:28
 * @export
 * @return {*}  {IParams}
 */
export declare function useRouterQuery(): IParams;
/**
 * 监听普通的key变更，在路由下次更新后再改变赋给新的RouteKey
 * 第一次默认值会直接赋给routeKey
 *
 * @export
 * @param {Ref<string>} originKey 监听的原始Ref
 * @param {RouteLocationNormalizedLoaded} route 路由
 * @param {Ref<string>} [routeKey] 预先提供的转换后的Ref
 * @returns {*}  {Ref<string>}
 */
export declare function useRouteKey(originKey: Ref<string>, route: RouteLocationNormalizedLoaded, routeKey?: Ref<string>): Ref<string>;
//# sourceMappingURL=route.d.ts.map