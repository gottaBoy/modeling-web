'use strict';

var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');

"use strict";
function getIndexBreadcrumb(context) {
  const app = ibiz.hub.getApp(context.srfappid);
  const caption = app.model.caption;
  return {
    viewName: ibiz.hub.defaultAppIndexViewName,
    fullPath: "/",
    caption
  };
}
function getAppFuncByViewName(name, appid) {
  const app = ibiz.hub.getApp(appid);
  const appFuncs = app.model.appFuncs || [];
  const item = appFuncs.find((func) => {
    const { appViewId = "" } = func;
    const viewName = appViewId.split(".").pop();
    return (viewName == null ? void 0 : viewName.toLowerCase()) === name.toLowerCase();
  });
  return item;
}
function getMenuItemsByAppFunc(func, appMenuItems) {
  const result = [];
  const findMenuItem = (menuItems) => {
    return menuItems.find((item) => {
      if (item.appFuncId && item.appFuncId === func.id) {
        result.unshift(item);
        return true;
      }
      if (item.appMenuItems && item.appMenuItems.length > 0) {
        const menuItem = findMenuItem(item.appMenuItems);
        if (menuItem) {
          result.unshift(item);
          return true;
        }
      }
      return false;
    });
  };
  findMenuItem(appMenuItems);
  return result;
}
function getCurViewName(router) {
  var _a;
  const { currentRoute } = router;
  const routePath = vue3Util.route2routePath(currentRoute.value);
  return ((_a = routePath.pathNodes.pop()) == null ? void 0 : _a.viewName) || "";
}
function getViewInfoByViewStack(viewName) {
  if (viewName === runtime.RouteConst.ROUTE_MODAL_TAG) {
    return {
      viewName,
      fullPath: "",
      isModal: true
    };
  }
  const view = ibiz.util.viewStack.getViewByCodeName(viewName);
  if (view) {
    let isEmbed = false;
    if (view.parentView && view.parentView.model.codeName !== ibiz.hub.defaultAppIndexViewName) {
      isEmbed = true;
    }
    return {
      viewName: view.model.codeName,
      caption: view.model.caption,
      isEmbed
    };
  }
}

exports.getAppFuncByViewName = getAppFuncByViewName;
exports.getCurViewName = getCurViewName;
exports.getIndexBreadcrumb = getIndexBreadcrumb;
exports.getMenuItemsByAppFunc = getMenuItemsByAppFunc;
exports.getViewInfoByViewStack = getViewInfoByViewStack;
