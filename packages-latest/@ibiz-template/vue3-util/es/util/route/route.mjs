import { notNilEmpty } from 'qx-util';
import { RuntimeError } from '@ibiz-template/core';
import qs from 'qs';
import { useRoute } from 'vue-router';
import { watch } from 'vue';
import { RouteConst, ViewType, getMatchResPath, calcDeCodeNameById } from '@ibiz-template/runtime';
import { isNotNil, isNil } from 'ramda';

"use strict";
function route2routePath(route, isRouteModal = false) {
  const depth = route.matched.length;
  let path = route.path;
  if (isRouteModal) {
    path = path.replace(new RegExp("/".concat(RouteConst.ROUTE_MODAL_TAG), "g"), "");
  }
  const items = path.split("/");
  const pathNodes = [];
  for (let index = 1; index <= depth; index++) {
    const viewName = items[index * 2];
    const paramsStr = route.params["params".concat(index)];
    let params;
    let context;
    let srfnav;
    if (!paramsStr || paramsStr === ibiz.env.routePlaceholder) {
      params = void 0;
    } else {
      params = qs.parse(paramsStr, {
        strictNullHandling: true,
        delimiter: ";",
        depth: 8
      });
    }
    if (params) {
      if (index === 1) {
        context = params;
        params = void 0;
      } else {
        if (params.srfnavctx) {
          context = JSON.parse(params.srfnavctx);
          delete params.srfnavctx;
        }
        if (params.srfnav) {
          srfnav = params.srfnav;
          delete params.srfnav;
        }
      }
    }
    pathNodes.push({ viewName, context, params, srfnav });
  }
  let appContext;
  if (route.params.appContext && route.params.appContext !== ibiz.env.routePlaceholder) {
    appContext = qs.parse(route.params.appContext, {
      strictNullHandling: true,
      delimiter: ";"
    });
  }
  return { appContext, pathNodes };
}
function routePath2string(routePath) {
  let pathStr = "";
  if (routePath.appContext) {
    pathStr += "/".concat(qs.stringify(routePath.appContext, {
      delimiter: ";",
      strictNullHandling: true
    }));
  } else {
    pathStr += "/".concat(ibiz.env.routePlaceholder);
  }
  routePath.pathNodes.forEach((pathNode, index) => {
    pathStr += "/".concat(pathNode.viewName, "/");
    let routeParams = {};
    if (index === 0) {
      if (notNilEmpty(pathNode.context)) {
        routeParams = pathNode.context;
      }
    } else {
      routeParams = notNilEmpty(pathNode.params) ? pathNode.params : {};
      if (notNilEmpty(pathNode.context)) {
        const objStr = JSON.stringify(pathNode.context);
        if (objStr !== "{}") {
          routeParams.srfnavctx = encodeURIComponent(objStr);
        }
      }
      if (pathNode.srfnav) {
        routeParams.srfnav = pathNode.srfnav;
      }
    }
    const paramsStr = qs.stringify(routeParams, {
      delimiter: ";",
      strictNullHandling: true,
      skipNulls: true
    });
    if (notNilEmpty(paramsStr)) {
      pathStr += paramsStr;
    } else {
      pathStr += ibiz.env.routePlaceholder;
    }
  });
  return pathStr;
}
function getOwnRouteContext(context) {
  const ownContext = context.getOwnContext();
  const excludeKeys = [
    "srfsessionid",
    "srfappid",
    "currentSrfNav",
    "toRouteDepth"
  ];
  if (ownContext.attributekeys) {
    const attributeKeys = ownContext.attributekeys.split("|");
    if (attributeKeys && attributeKeys.length > 0) {
      attributeKeys.forEach((key) => {
        if (isNotNil(context[key])) {
          ownContext[key] = context[key];
        }
      });
    }
    delete ownContext.attributekeys;
  }
  let srfKeepNull = false;
  if (Object.prototype.hasOwnProperty.call(ownContext, "srfkeepnull")) {
    srfKeepNull = ownContext.srfkeepnull === true || ownContext.srfkeepnull === "true";
    delete ownContext.srfkeepnull;
  }
  Object.keys(ownContext).forEach((key) => {
    if (excludeKeys.includes(key) || !srfKeepNull && isNil(ownContext[key])) {
      delete ownContext[key];
    }
  });
  return ownContext;
}
function attachPresetParams(context, pathNodes) {
  let index = -1;
  if (pathNodes && pathNodes.length > 0) {
    index = pathNodes.findIndex((pathNode) => {
      var _a;
      return ((_a = pathNode.context) == null ? void 0 : _a.srfreadonly) === true;
    });
  }
  if (context.srfreadonly && !context.getOwnContext().srfreadonly && index === -1) {
    context.srfreadonly = true;
  }
}
const excludeViewTypes = [
  ViewType.DE_GRID_VIEW,
  ViewType.DE_GRID_EXP_VIEW,
  ViewType.DE_LIST_VIEW,
  ViewType.DE_LIST_EXP_VIEW,
  ViewType.DE_DATA_VIEW,
  ViewType.DE_DATAVIEW_EXP_VIEW,
  ViewType.DE_CALENDAR_VIEW,
  ViewType.DE_CALENDAR_EXP_VIEW,
  ViewType.DE_CHART_VIEW,
  ViewType.DE_CHART_EXP_VIEW,
  ViewType.DE_KANBAN_VIEW
];
async function calcResRoutePath(routePath, context, appDataEntityId, appId) {
  if (!appDataEntityId) {
    routePath.pathNodes[0].context = void 0;
  } else {
    const entity = await ibiz.hub.getAppDataEntity(appDataEntityId, appId);
    let match = getMatchResPath(context, entity);
    if (!match) {
      match = { path: "", keys: [entity.codeName.toLowerCase()] };
    }
    if (match) {
      const currentContext = routePath.pathNodes[1].context;
      const resContext = {};
      match.keys.forEach((key) => {
        if (context && Object.prototype.hasOwnProperty.call(context, key)) {
          resContext[key] = context[key];
          if (currentContext) {
            delete currentContext[key];
          }
        }
      });
      routePath.pathNodes[0].context = resContext;
    }
  }
}
async function generateRoutePath(appView, route, context, params) {
  var _a;
  const routePath = route2routePath(route);
  let depth = Number(context.srfdefaulttoroutedepth || 2);
  if (context.toRouteDepth) {
    depth = context.toRouteDepth;
    context.toRouteDepth = void 0;
  } else if (ibiz.env.isMob) {
    if (ibiz.env.mobMenuShowMode === "DEFAULT") {
      routePath.pathNodes[0] = {
        viewName: "home"
      };
    }
  }
  let srfmenuitem = params == null ? void 0 : params.srfmenuitem;
  if (!srfmenuitem && routePath.pathNodes.length > 1) {
    srfmenuitem = (_a = routePath.pathNodes[1].params) == null ? void 0 : _a.srfmenuitem;
  }
  routePath.pathNodes.splice(depth - 1, routePath.pathNodes.length - depth + 1);
  if (context.currentSrfNav) {
    const currentNode = routePath.pathNodes[routePath.pathNodes.length - 1];
    currentNode.params = currentNode.params || {};
    currentNode.srfnav = context.currentSrfNav;
    context.currentSrfNav = void 0;
  }
  attachPresetParams(context, routePath.pathNodes);
  if (route.fullPath.startsWith("/appredirectview")) {
    if (params == null ? void 0 : params.srfindexname) {
      routePath.pathNodes[0].viewName = params.srfindexname;
      delete params.srfindexname;
    } else {
      routePath.pathNodes[0].viewName = "index";
    }
  }
  routePath.pathNodes.push({
    viewName: appView.codeName.toLowerCase(),
    context: getOwnRouteContext(context),
    params
  });
  if (depth === 2) {
    await calcResRoutePath(
      routePath,
      context,
      appView.appDataEntityId,
      appView.appId
    );
    if (excludeViewTypes.includes(appView.viewType)) {
      const deName = calcDeCodeNameById(appView.appDataEntityId);
      delete routePath.pathNodes[0].context[deName];
    }
  }
  if (srfmenuitem && routePath.pathNodes.length > 1) {
    const tempParams = routePath.pathNodes[1].params || {};
    routePath.pathNodes[1].params = { ...tempParams, srfmenuitem };
  }
  return { path: routePath2string(routePath) };
}
async function generateRoutePathByModal(appView, route, context, params) {
  const routePath = route2routePath(route);
  const findIndex = routePath.pathNodes.findIndex(
    (item) => item.viewName === RouteConst.ROUTE_MODAL_TAG
  );
  if (findIndex !== -1) {
    routePath.pathNodes = routePath.pathNodes.slice(0, findIndex);
  }
  if (context.currentSrfNav) {
    const currentNode = routePath.pathNodes[routePath.pathNodes.length - 1];
    currentNode.params = currentNode.params || {};
    currentNode.srfnav = context.currentSrfNav;
    context.currentSrfNav = void 0;
  }
  attachPresetParams(context, routePath.pathNodes);
  routePath.pathNodes.push({
    viewName: "".concat(RouteConst.ROUTE_MODAL_TAG, "/").concat(appView.codeName.toLowerCase()),
    context: getOwnRouteContext(context),
    params
  });
  return { path: routePath2string(routePath) };
}
async function parseRouteViewData(route, depth, isRouteModal = false) {
  var _a;
  const routePath = route2routePath(route, isRouteModal);
  let viewCodeName = routePath.pathNodes[depth - 1].viewName;
  if (!viewCodeName) {
    throw new RuntimeError(
      ibiz.i18n.t("vue3Util.util.viewIdentifiers", { depth })
    );
  }
  if (viewCodeName === RouteConst.ROUTE_MODAL_TAG) {
    viewCodeName = routePath.pathNodes[depth].viewName;
  }
  if (viewCodeName === "index") {
    viewCodeName = ibiz.hub.defaultAppIndexViewName;
  }
  const viewConfig = await ibiz.hub.config.view.get(viewCodeName);
  if (!viewConfig) {
    throw new RuntimeError(
      ibiz.i18n.t("vue3Util.util.noFoundView", { viewCodeName })
    );
  }
  const context = {};
  if ((_a = ibiz.appData) == null ? void 0 : _a.context) {
    Object.assign(context, ibiz.appData.context);
  }
  if (routePath.appContext) {
    Object.assign(context, routePath.appContext);
  }
  if (depth !== 1) {
    for (let index = 0; index < depth; index++) {
      const pathNode = routePath.pathNodes[index];
      if (notNilEmpty(pathNode.context)) {
        Object.assign(context, pathNode.context);
      }
      if (index === depth - 1 && (!pathNode.context || isNil(pathNode.context.srfnavctrlid))) {
        delete context.srfnavctrlid;
      }
    }
  }
  const { params, srfnav } = routePath.pathNodes[depth - 1];
  return {
    viewConfig,
    context,
    params,
    srfnav
  };
}
function getNestedRoutePath(route, depth, noSrfNav = true) {
  if (route.matched.length < depth) {
    return "";
  }
  if (route.matched.length === depth && route.name) {
    return route.path;
  }
  const routePath = route2routePath(route);
  if (routePath.pathNodes.length < depth) {
    return route.path;
  }
  if (routePath.pathNodes.length > depth) {
    routePath.pathNodes = routePath.pathNodes.slice(0, depth);
  }
  const pathNode = routePath.pathNodes[depth - 1];
  if (noSrfNav) {
    delete pathNode.srfnav;
  }
  if (!ibiz.env.isMob && pathNode.context) {
    delete pathNode.context.srfnavctrlid;
  }
  return routePath2string(routePath);
}
function onRouteChange(callback, depth) {
  const route = useRoute();
  if (!route) {
    throw new RuntimeError(ibiz.i18n.t("vue3Util.util.routeCorrectly"));
  }
  watch(
    // fix: odoo脚本触发路径query变更未触发路由变更事件
    () => route == null ? void 0 : route.fullPath,
    () => {
      const currentKey = getNestedRoutePath(route, depth);
      callback({ currentKey, fullPath: route.fullPath });
    },
    { immediate: true }
  );
}

export { calcResRoutePath, excludeViewTypes, generateRoutePath, generateRoutePathByModal, getNestedRoutePath, getOwnRouteContext, onRouteChange, parseRouteViewData, route2routePath, routePath2string };
