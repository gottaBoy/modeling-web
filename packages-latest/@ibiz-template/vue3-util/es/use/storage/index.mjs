import { useRouter } from 'vue-router';
import '../../util/index.mjs';
import { route2routePath, routePath2string } from '../../util/route/route.mjs';

"use strict";
function useLocalCacheKey(context, type, routeDepth, splitter = "@", noRouteTag = "") {
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
        routePath.pathNodes.forEach((pathNode) => {
          if (pathNode.context) {
            delete pathNode.context.srfnavctrlid;
          }
        });
        const url = routePath2string(routePath);
        return "".concat(type).concat(splitter).concat(userId).concat(splitter).concat(url);
      }
    }
    if (noRouteTag) {
      return "".concat(type).concat(splitter).concat(userId).concat(splitter).concat(noRouteTag);
    }
  };
}

export { useLocalCacheKey };
