import { defineComponent, ref, toRaw, onUnmounted, watch, onActivated, onDeactivated, createVNode, Fragment, h, resolveComponent } from 'vue';
import { parseRouteViewData } from '@ibiz-template/vue3-util';
import { useRoute, useRouter } from 'vue-router';
import { Modal, ViewMode, RouteConst } from '@ibiz-template/runtime';
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
    const routeDepth = props.modal.routeDepth;
    onUnmounted(() => {
      destroyContext();
    });
    const calcViewData = async () => {
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
      routeDepth: routeDepth + 1
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
    if (!this.isLoaded) {
      return null;
    }
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
