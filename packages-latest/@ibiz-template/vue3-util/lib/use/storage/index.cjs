'use strict';

var vueRouter = require('vue-router');
require('../../util/index.cjs');
var route = require('../../util/route/route.cjs');

"use strict";
function useLocalCacheKey(context, type, routeDepth, splitter = "@", noRouteTag = "") {
  const router = vueRouter.useRouter();
  return () => {
    if (!router) {
      return;
    }
    const userId = context.srfuserid;
    routeDepth = context.srfdefaulttoroutedepth || routeDepth;
    if (routeDepth) {
      const routePath = route.route2routePath(router.currentRoute.value);
      if (userId && routePath.pathNodes[routeDepth - 2]) {
        routePath.pathNodes = routePath.pathNodes.slice(0, routeDepth - 1);
        routePath.pathNodes.forEach((pathNode) => {
          if (pathNode.context) {
            delete pathNode.context.srfnavctrlid;
          }
        });
        const url = route.routePath2string(routePath);
        return "".concat(type).concat(splitter).concat(userId).concat(splitter).concat(url);
      }
    }
    if (noRouteTag) {
      return "".concat(type).concat(splitter).concat(userId).concat(splitter).concat(noRouteTag);
    }
  };
}

exports.useLocalCacheKey = useLocalCacheKey;
