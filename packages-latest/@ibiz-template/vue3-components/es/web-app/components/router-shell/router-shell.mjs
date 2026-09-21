import { defineComponent, createVNode, Fragment, h, resolveComponent, ref, toRaw, onUnmounted, watch, onActivated, onDeactivated } from 'vue';
import { parseRouteViewData } from '@ibiz-template/vue3-util';
import { useRoute, useRouter } from 'vue-router';
import { RouteConst, Modal, ViewMode } from '@ibiz-template/runtime';
import { IBizContext } from '@ibiz-template/core';
import { mergeDeepLeft } from 'ramda';

"use strict";
const RouterShell = /* @__PURE__ */ defineComponent({
  name: "RouterShell",
  props: {
    modal: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    var _a;
    const route = useRoute();
    const router = useRouter();
    const viewData = ref({});
    const isLoaded = ref(false);
    const isActivated = ref(true);
    const destroyContext = () => {
      if (viewData.value.context) {
        const {
          context
        } = toRaw(viewData.value);
        if (context)
          context.destroy();
      }
    };
    const routeDepth = (_a = props.modal) == null ? void 0 : _a.routeDepth;
    onUnmounted(() => {
      destroyContext();
    });
    const calcViewData = async () => {
      if (!routeDepth)
        return;
      try {
        const _viewData = await parseRouteViewData(route, routeDepth);
        const _context = IBizContext.create(_viewData.context);
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
    watch(() => route.params.view1, () => {
      if (routeDepth === 1) {
        destroyContext();
        calcViewData();
      }
    });
    const routeModal = new Modal({
      mode: ViewMode.ROUTE,
      routeDepth: (routeDepth || 0) + 1
    });
    onActivated(() => {
      isActivated.value = true;
    });
    onDeactivated(() => {
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
    if (!this.isLoaded)
      return null;
    const {
      context,
      params,
      srfnav,
      viewConfig
    } = this.viewData;
    const props = mergeDeepLeft({
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
    return createVNode(Fragment, null, [h(resolveComponent("IBizViewShell"), props, this.$slots), this.isActivated && createVNode(resolveComponent("router-view"), {
      "key": viewConfig.codeName,
      "name": RouteConst.ROUTE_MODAL_TAG,
      "modal": this.routeModal
    }, null)]);
  }
});

export { RouterShell };
