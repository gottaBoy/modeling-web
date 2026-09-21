'use strict';

var vueRouter = require('vue-router');
var vue = require('vue');
require('../../util/index.cjs');
var routeListener = require('../../util/route/route-listener.cjs');

"use strict";
function useRouterQuery() {
  const route = vueRouter.useRoute();
  const { query } = route;
  return query;
}
function useRouteKey(originKey, route, routeKey) {
  if (!routeKey) {
    routeKey = vue.ref("");
  }
  routeKey.value = originKey.value;
  const routeListener$1 = new routeListener.RouteListener(route);
  vue.watch(originKey, (newVal, oldVal) => {
    if (newVal !== oldVal) {
      routeListener$1.nextChange(() => {
        routeKey.value = newVal;
      });
    }
  });
  return routeKey;
}

exports.useRouteKey = useRouteKey;
exports.useRouterQuery = useRouterQuery;
