import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';
import { ref, Ref, watch } from 'vue';
import { RouteListener } from '../../util';

/**
 * 获取路由查询参数
 *
 * @author chitanda
 * @date 2022-08-15 15:08:28
 * @export
 * @return {*}  {IParams}
 */
export function useRouterQuery(): IParams {
  const route = useRoute();
  const { query } = route;
  return query;
}

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
export function useRouteKey(
  originKey: Ref<string>,
  route: RouteLocationNormalizedLoaded,
  routeKey?: Ref<string>,
): Ref<string> {
  if (!routeKey) {
    routeKey = ref('');
  }
  routeKey.value = originKey.value;
  const routeListener = new RouteListener(route);
  watch(originKey, (newVal, oldVal) => {
    if (newVal !== oldVal) {
      routeListener.nextChange(() => {
        routeKey!.value = newVal;
      });
    }
  });
  return routeKey;
}
