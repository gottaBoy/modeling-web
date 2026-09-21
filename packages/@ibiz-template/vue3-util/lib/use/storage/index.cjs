'use strict';

var vueRouter = require('vue-router');
require('../../util/index.cjs');
var route = require('../../util/route/route.cjs');

"use strict";
function useLocalCacheKey(context, type, routeDepth, splitter = "@") {
  const router = vueRouter.useRouter();
  return () => {
    if (!router) {
      return;
    }
    const userId = context.srfuserid;
    const routePath = route.route2routePath(router.currentRoute.value);
    routeDepth = context.srfdefaulttoroutedepth || routeDepth;
    if (userId && routeDepth && routePath.pathNodes[routeDepth - 2]) {
      routePath.pathNodes = routePath.pathNodes.slice(0, routeDepth - 1);
      routePath.pathNodes.forEach((pathNode) => {
        if (pathNode.context) {
          delete pathNode.context.srfnavctrlid;
        }
      });
      const url = route.routePath2string(routePath);
      return "".concat(type).concat(splitter).concat(userId).concat(splitter).concat(url);
    }
  };
}

exports.useLocalCacheKey = useLocalCacheKey;
