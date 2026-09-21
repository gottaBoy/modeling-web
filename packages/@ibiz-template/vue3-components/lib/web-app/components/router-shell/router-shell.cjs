'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var vueRouter = require('vue-router');
var runtime = require('@ibiz-template/runtime');
var core = require('@ibiz-template/core');
var ramda = require('ramda');

"use strict";
const RouterShell = /* @__PURE__ */ vue.defineComponent({
  name: "RouterShell",
  props: {
    modal: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = vueRouter.useRoute();
    const router = vueRouter.useRouter();
    const viewData = vue.ref({});
    const isLoaded = vue.ref(false);
    const isActivated = vue.ref(true);
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
    vue.onUnmounted(() => {
      destroyContext();
    });
    const calcViewData = async () => {
      try {
        const _viewData = await vue3Util.parseRouteViewData(route, routeDepth);
        const _context = core.IBizContext.create(_viewData.context);
        viewData.value = {
          ..._viewData,
          context: _context
        };
        isLoaded.value = true;
      } catch (error) {
        router.push({
          name: "errorView".concat(routeDepth),
          params: {
            code: "404"
          }
        });
      }
    };
    calcViewData();
    vue.watch(() => route.params.view1, () => {
      if (routeDepth === 1) {
        destroyContext();
        calcViewData();
      }
    });
    const routeModal = new runtime.Modal({
      mode: runtime.ViewMode.ROUTE,
      routeDepth: routeDepth + 1
    });
    vue.onActivated(() => {
      isActivated.value = true;
    });
    vue.onDeactivated(() => {
      isActivated.value = false;
    });
    return {
      routeModal,
      route,
      viewData,
      isLoaded,
      isActivated
    };
  },
  render() {
    if (!this.isLoaded) {
      return null;
    }
    const {
      context,
      params,
      srfnav,
      viewConfig
    } = this.viewData;
    const props = ramda.mergeDeepLeft({
      ...this.$props,
      ...this.$attrs,
      context,
      params,
      viewId: viewConfig.id,
      key: viewConfig.codeName
    }, {
      state: {
        srfnav
      }
    });
    return vue.createVNode(vue.Fragment, null, [vue.h(vue.resolveComponent("IBizViewShell"), props, this.$slots), this.isActivated && vue.createVNode(vue.resolveComponent("router-view"), {
      "key": viewConfig.codeName,
      "name": runtime.RouteConst.ROUTE_MODAL_TAG,
      "modal": this.routeModal
    }, null)]);
  }
});

exports.RouterShell = RouterShell;
