'use strict';

var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');

"use strict";
function getAppIndexViewName(context) {
  const targetAppModel = ibiz.hub.getAppSourceModel(context.srfappid);
  if (targetAppModel.getDefaultPSAppIndexView) {
    const view = targetAppModel.getDefaultPSAppIndexView;
    const name = view.path.split("/").pop().replace(".json", "");
    return name;
  }
  return ibiz.hub.defaultAppIndexViewName;
}
function getIndexBreadcrumb(context) {
  const app = ibiz.hub.getApp(context.srfappid);
  const caption = app.model.caption;
  const indexViewName = getAppIndexViewName(context);
  return {
    viewName: indexViewName,
    fullPath: "/",
    type: "default",
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
function getViewInfoByViewStack(viewName, context) {
  if (viewName === runtime.RouteConst.ROUTE_MODAL_TAG) {
    return {
      viewName,
      fullPath: "",
      isModal: true
    };
  }
  const view = ibiz.appUtil.viewCacheCenter.get(viewName);
  const indexViewName = getAppIndexViewName(context);
  if (view) {
    let isEmbed = false;
    if (view.parentView && view.parentView.model.codeName !== indexViewName && view.parentView.model.viewType !== "APPINDEXVIEW") {
      isEmbed = true;
    }
    const data = view.state.srfactiveviewdata;
    const result = {
      viewName: view.model.codeName,
      caption: view.model.caption,
      isEmbed
    };
    if (data && data.srfkey) {
      Object.assign(result, { dataInfo: data.srfmajortext || "" });
    }
    return result;
  }
}
function getMenuTag(pathNodes) {
  var _a;
  if (pathNodes.length > 1) {
    return ((_a = pathNodes[1].params) == null ? void 0 : _a.srfmenuitem) || "";
  }
  return "";
}
async function getMenuItemByTag(tag, appMenu, context) {
  var _a;
  if (!tag) {
    return;
  }
  const menuItem = appMenu.allAppMenuItems.find((x) => x.id === tag);
  if (menuItem) {
    const app = ibiz.hub.getApp(context.srfappid);
    const appFunc = app.getAppFunc(menuItem.appFuncId);
    const viewName = ((_a = appFunc.appViewId) == null ? void 0 : _a.split(".").pop()) || "";
    const viewConfig = await ibiz.hub.config.view.get(viewName);
    return {
      tag,
      viewName,
      viewConfig,
      appFunc,
      menuItem
    };
  }
}

exports.getAppFuncByViewName = getAppFuncByViewName;
exports.getAppIndexViewName = getAppIndexViewName;
exports.getCurViewName = getCurViewName;
exports.getIndexBreadcrumb = getIndexBreadcrumb;
exports.getMenuItemByTag = getMenuItemByTag;
exports.getMenuItemsByAppFunc = getMenuItemsByAppFunc;
exports.getMenuTag = getMenuTag;
exports.getViewInfoByViewStack = getViewInfoByViewStack;
