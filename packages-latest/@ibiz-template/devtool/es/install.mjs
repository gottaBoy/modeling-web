import { route2routePath } from '@ibiz-template/vue3-util';
import { IBizContext } from '@ibiz-template/core';
import { openRedirectView } from '@ibiz-template/runtime';
import { CenterController } from './controller/center.controller.mjs';
import { StyleDebugDockController } from './controller/style-debug-dock.controller.mjs';

"use strict";
function install() {
  const { ibiz: ibiz2 } = window;
  ibiz2.devTool = new CenterController();
  ibiz2.devTool.init();
  ibiz2.styleDebugDock = new StyleDebugDockController();
  ibiz2.styleDebugDock.init();
}
function updateDevToolConfig() {
  var _a;
  ibiz.devTool.updateConfig((_a = ibiz.appData) == null ? void 0 : _a.context);
}
function listenOpenDevTool(router) {
  const redirectDesignView = async (appContext, _context) => {
    var _a;
    if (_context.srfredirectview && _context.psappview) {
      const viewCodeName = _context.srfredirectview;
      const fullViewModel = await ibiz.hub.getAppView(viewCodeName);
      delete _context.srfredirectview;
      const parentContext = IBizContext.create({});
      if ((_a = ibiz.appData) == null ? void 0 : _a.context) {
        Object.assign(parentContext, ibiz.appData.context);
      }
      const context = IBizContext.create(_context, parentContext);
      if (appContext)
        Object.assign(context, appContext);
      if (!context.srfappid)
        Object.assign(context, { srfappid: fullViewModel.appId });
      return openRedirectView(
        fullViewModel,
        context,
        {},
        {}
      );
    }
  };
  router.isReady().then(async () => {
    const { appContext, pathNodes } = route2routePath(
      router.currentRoute.value
    );
    if (pathNodes && pathNodes.length > 0) {
      const firstPathNode = pathNodes[0];
      if (firstPathNode && firstPathNode.context) {
        redirectDesignView(appContext, firstPathNode.context);
      }
    }
  });
  window.addEventListener(
    "message",
    async (event) => {
      const data = event.data;
      if (data && data.type && data.type === "IBzOpenAppView" && data.context) {
        const { appContext } = route2routePath(
          router.currentRoute.value
        );
        redirectDesignView(appContext, data.context);
      }
    },
    false
  );
}

export { install, listenOpenDevTool, updateDevToolConfig };
