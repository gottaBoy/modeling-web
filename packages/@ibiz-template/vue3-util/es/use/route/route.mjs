import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import '../../util/index.mjs';
import { RouteListener } from '../../util/route/route-listener.mjs';

"use strict";
function useRouterQuery() {
  const route = useRoute();
  const { query } = route;
  return query;
}
function useRouteKey(originKey, route, routeKey) {
  if (!routeKey) {
    routeKey = ref("");
  }
  routeKey.value = originKey.value;
  const routeListener = new RouteListener(route);
  watch(originKey, (newVal, oldVal) => {
    if (newVal !== oldVal) {
      routeListener.nextChange(() => {
        routeKey.value = newVal;
      });
    }
  });
  return routeKey;
}

export { useRouteKey, useRouterQuery };
