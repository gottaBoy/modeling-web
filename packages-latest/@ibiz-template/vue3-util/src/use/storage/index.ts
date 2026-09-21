import { useRouter } from 'vue-router';
import { route2routePath, routePath2string } from '../../util';

/**
 * @description 获取本地缓存key函数
 * @export
 * @param {IContext} context
 * @param {string} type
 * @param {number} [routeDepth]
 * @param {string} [splitter='@']
 * @param {string} [noRouteTag='']
 * @returns {*}  {(() => string | undefined)}
 */
export function useLocalCacheKey(
  context: IContext,
  type: string,
  routeDepth?: number,
  splitter: string = '@',
  noRouteTag: string = '',
): () => string | undefined {
  const router = useRouter();
  return () => {
    if (!router) {
      return;
    }
    const userId = context.srfuserid;
    routeDepth = context.srfdefaulttoroutedepth || routeDepth;
    if (routeDepth) {
      const routePath = route2routePath(router.currentRoute.value);
      if (userId && routePath.pathNodes[routeDepth - 2]) {
        routePath.pathNodes = routePath.pathNodes.slice(0, routeDepth - 1);
        routePath.pathNodes.forEach(pathNode => {
          if (pathNode.context) {
            delete pathNode.context.srfnavctrlid;
          }
        });
        const url = routePath2string(routePath);
        return `${type}${splitter}${userId}${splitter}${url}`;
      }
    }
    // 修复非路由情况搜索栏部件启用缓存时构建缓存key异常
    if (noRouteTag) {
      return `${type}${splitter}${userId}${splitter}${noRouteTag}`;
    }
  };
}
