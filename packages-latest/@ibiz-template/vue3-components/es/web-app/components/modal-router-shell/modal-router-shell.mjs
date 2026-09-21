import { defineComponent, createVNode, ref, toRaw, onUnmounted } from 'vue';
import { parseRouteViewData, createOverlayView, routerCallback, route2routePath } from '@ibiz-template/vue3-util';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import { IBizContext } from '@ibiz-template/core';
import { RouteConst } from '@ibiz-template/runtime';
import { isEmpty } from 'ramda';
import qs from 'qs';
import '../../../view/index.mjs';
import { View404 } from '../../../view/404-view/404-view.mjs';

"use strict";
const ModalRouterShell = /* @__PURE__ */ defineComponent({
  name: "ModalRouterShell",
  props: {
    modal: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const routeObj = useRoute();
    const router = useRouter();
    const isDestroyed = ref(false);
    const viewData = ref({});
    const pathHistory = [];
    const destroyContext = () => {
      if (viewData.value.context) {
        const {
          context
        } = toRaw(viewData.value);
        if (context)
          context.destroy();
      }
    };
    const routeDepth = props.modal.routeDepth;
    let overlay = null;
    onUnmounted(() => {
      isDestroyed.value = true;
      if (overlay) {
        overlay.dismiss();
        overlay = null;
      }
      destroyContext();
    });
    const openView = async (route) => {
      var _a;
      viewData.value = await parseRouteViewData(route, routeDepth, true);
      if (isDestroyed.value) {
        return;
      }
      if (!(viewData.value.context instanceof IBizContext)) {
        viewData.value.context = IBizContext.create(viewData.value.context);
      }
      const appViewId = route.params.modalView;
      const paramsStr = route.params.modalParams;
      if (paramsStr && paramsStr !== "-") {
        const params = qs.parse(paramsStr, {
          strictNullHandling: true,
          delimiter: ";"
        });
        if (params.srfnavctx) {
          const srfnavctx = JSON.parse(decodeURIComponent(params.srfnavctx));
          Object.assign(viewData.value.context, srfnavctx);
          delete params.srfnavctx;
        }
        if (params.srfnav) {
          viewData.value.srfnav = params.srfnav;
          delete params.srfnav;
        }
        if (!isEmpty(params)) {
          if (viewData.value.params) {
            Object.assign(viewData.value.params, params);
          } else {
            viewData.value.params = params;
          }
        }
      }
      if (!viewData.value.context) {
        const _context = IBizContext.create({});
        viewData.value.context = _context;
      }
      let appView = viewData.value.viewConfig;
      let component;
      try {
        if (!appView) {
          appView = await ibiz.hub.config.view.get(appViewId);
        }
        component = createOverlayView({
          context: viewData.value.context,
          params: viewData.value.params,
          viewId: appView.id
        });
      } catch (error) {
        component = View404;
      }
      const opts = {
        width: (appView == null ? void 0 : appView.width) || "80%",
        height: (appView == null ? void 0 : appView.height) || "80%",
        footerHide: true,
        isRouteModal: true
      };
      overlay = ibiz.overlay.createModal(component, void 0, opts);
      overlay.present();
      pathHistory.push(route.fullPath);
      const result = await overlay.onWillDismiss();
      overlay = null;
      if (isDestroyed.value === false) {
        const historyIndex = pathHistory.indexOf(route.fullPath);
        if (historyIndex !== -1) {
          pathHistory.splice(historyIndex, 1);
        }
        if ((_a = window.history.state) == null ? void 0 : _a.back) {
          router.back();
        } else {
          const path = route.path;
          const index = path.indexOf("/".concat(RouteConst.ROUTE_MODAL_TAG, "/"));
          router.replace(path.substring(0, index));
        }
        routerCallback.close(router.currentRoute.value.fullPath, result || {
          ok: false
        });
      }
    };
    onBeforeRouteUpdate((to, from) => {
      if (!isDestroyed.value && pathHistory.length > 0 && pathHistory.indexOf(from.fullPath) !== -1 && pathHistory.indexOf(to.fullPath) === -1) {
        const pathNodes = route2routePath(to).pathNodes;
        const lastNode = pathNodes[pathNodes.length - 1];
        if (lastNode && lastNode.viewName === RouteConst.ROUTE_MODAL_TAG) {
          openView(to);
        }
      }
    });
    openView(routeObj);
    return {};
  },
  render() {
    return createVNode("div", {
      "style": "position: absolute;width: 0;height: 0;"
    }, null);
  }
});

export { ModalRouterShell };
