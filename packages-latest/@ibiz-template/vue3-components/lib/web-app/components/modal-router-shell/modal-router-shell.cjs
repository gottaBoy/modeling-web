'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var vueRouter = require('vue-router');
var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');
var ramda = require('ramda');
var qs = require('qs');
require('../../../view/index.cjs');
var _404View = require('../../../view/404-view/404-view.cjs');

"use strict";
const ModalRouterShell = /* @__PURE__ */ vue.defineComponent({
  name: "ModalRouterShell",
  props: {
    modal: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const routeObj = vueRouter.useRoute();
    const router = vueRouter.useRouter();
    const isDestroyed = vue.ref(false);
    const viewData = vue.ref({});
    const pathHistory = [];
    const destroyContext = () => {
      if (viewData.value.context) {
        const {
          context
        } = vue.toRaw(viewData.value);
        if (context)
          context.destroy();
      }
    };
    const routeDepth = props.modal.routeDepth;
    let overlay = null;
    vue.onUnmounted(() => {
      isDestroyed.value = true;
      if (overlay) {
        overlay.dismiss();
        overlay = null;
      }
      destroyContext();
    });
    const openView = async (route) => {
      var _a;
      viewData.value = await vue3Util.parseRouteViewData(route, routeDepth, true);
      if (isDestroyed.value) {
        return;
      }
      if (!(viewData.value.context instanceof core.IBizContext)) {
        viewData.value.context = core.IBizContext.create(viewData.value.context);
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
        if (!ramda.isEmpty(params)) {
          if (viewData.value.params) {
            Object.assign(viewData.value.params, params);
          } else {
            viewData.value.params = params;
          }
        }
      }
      if (!viewData.value.context) {
        const _context = core.IBizContext.create({});
        viewData.value.context = _context;
      }
      let appView = viewData.value.viewConfig;
      let component;
      try {
        if (!appView) {
          appView = await ibiz.hub.config.view.get(appViewId);
        }
        component = vue3Util.createOverlayView({
          context: viewData.value.context,
          params: viewData.value.params,
          viewId: appView.id
        });
      } catch (error) {
        component = _404View.View404;
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
          const index = path.indexOf("/".concat(runtime.RouteConst.ROUTE_MODAL_TAG, "/"));
          router.replace(path.substring(0, index));
        }
        vue3Util.routerCallback.close(router.currentRoute.value.fullPath, result || {
          ok: false
        });
      }
    };
    vueRouter.onBeforeRouteUpdate((to, from) => {
      if (!isDestroyed.value && pathHistory.length > 0 && pathHistory.indexOf(from.fullPath) !== -1 && pathHistory.indexOf(to.fullPath) === -1) {
        const pathNodes = vue3Util.route2routePath(to).pathNodes;
        const lastNode = pathNodes[pathNodes.length - 1];
        if (lastNode && lastNode.viewName === runtime.RouteConst.ROUTE_MODAL_TAG) {
          openView(to);
        }
      }
    });
    openView(routeObj);
    return {};
  },
  render() {
    return vue.createVNode("div", {
      "style": "position: absolute;width: 0;height: 0;"
    }, null);
  }
});

exports.ModalRouterShell = ModalRouterShell;
