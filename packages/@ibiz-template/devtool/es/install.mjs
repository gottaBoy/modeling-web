import { route2routePath } from '@ibiz-template/vue3-util';
import { IBizContext } from '@ibiz-template/core';
import { openRedirectView } from '@ibiz-template/runtime';
import { CenterController } from './controller/center.controller.mjs';

"use strict";
function install() {
  const { ibiz: ibiz2 } = window;
  ibiz2.devTool = new CenterController();
  ibiz2.devTool.init();
}
function listenOpenDevTool(router) {
  const redirectDesignView = async (appContext, _context) => {
    var _a;
    if (_context.srfredirectview && _context.psappview) {
      const viewCodeName = _context.srfredirectview;
      const fullViewModel = await ibiz.hub.getAppView(viewCodeName);
      delete _context.srfredirectview;
      const context = IBizContext.create(_context);
      if ((_a = ibiz.appData) == null ? void 0 : _a.context) {
        Object.assign(context, ibiz.appData.context);
      }
      if (appContext) {
        Object.assign(context, appContext);
      }
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
      console.log(data);
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

export { install, listenOpenDevTool };
