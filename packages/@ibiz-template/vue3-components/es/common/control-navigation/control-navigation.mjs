import { defineComponent, ref, watch, onMounted, h, resolveComponent, createVNode } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { getNavigationProvider } from './provider/index.mjs';
import './control-navigation.css';

"use strict";
const IBizControlNavigation = /* @__PURE__ */ defineComponent({
  name: "IBizControlNavigation",
  props: {
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    var _a;
    const ns = useNamespace("control-navigation");
    const provider = getNavigationProvider(props.controller);
    const outerWrapper = ref(null);
    const {
      navViewPos,
      controlParam,
      navViewWidth,
      navViewHeight,
      navViewMinWidth,
      navViewMaxWidth,
      navViewMinHeight,
      navViewMaxHeight
    } = props.controller.model;
    const navStyle = {
      minWidth: navViewMinWidth ? navViewMinWidth > 0 ? "".concat(navViewMinWidth, "px") : navViewMinWidth : void 0,
      maxWidth: navViewMaxWidth ? navViewMaxWidth > 0 ? "".concat(navViewMaxWidth, "px") : navViewMaxWidth : void 0,
      minHeight: navViewMinHeight ? navViewMinHeight > 0 ? "".concat(navViewMinHeight, "px") : navViewMinHeight : void 0,
      maxHeight: navViewMaxHeight ? navViewMaxHeight > 0 ? "".concat(navViewMaxHeight, "px") : navViewMaxHeight : void 0
    };
    const navViewMsg = ref();
    const navRenderMode = ((_a = controlParam == null ? void 0 : controlParam.ctrlParams) == null ? void 0 : _a.navRenderMode) ? controlParam.ctrlParams.navRenderMode : "RELOAD";
    const splitValue = ref(0.5);
    const splitMode = ref(["BOTTOM", "ANY_BOTTOM"].includes(navViewPos) ? "vertical" : "horizontal");
    watch(() => provider.navViewMsg.value, (newVal, oldVal) => {
      if (navRenderMode === "REDRAW" || !newVal || oldVal && newVal.viewId !== oldVal.viewId) {
        navViewMsg.value = newVal;
      } else {
        navViewMsg.value = {
          context: newVal.context,
          params: newVal.params,
          viewId: newVal.viewId
        };
      }
    }, {
      deep: true,
      immediate: true
    });
    onMounted(() => {
      if (outerWrapper.value) {
        const offsetSize = splitMode.value === "horizontal" ? "offsetWidth" : "offsetHeight";
        const size = outerWrapper.value[offsetSize];
        const viewSize = splitMode.value === "horizontal" ? navViewWidth : navViewHeight;
        if (viewSize) {
          if (viewSize > 0 && viewSize < 1) {
            splitValue.value = 1 - viewSize;
          } else {
            splitValue.value = "".concat(size - viewSize, "px");
          }
        }
      }
    });
    const renderNavView = () => {
      if (navViewMsg.value) {
        if (!navViewMsg.value.viewId)
          return;
        return h(resolveComponent("IBizViewShell"), {
          ...navViewMsg.value,
          class: ns.e("nav-view")
        });
      }
    };
    return {
      ns,
      navStyle,
      provider,
      splitMode,
      splitValue,
      outerWrapper,
      renderNavView
    };
  },
  render() {
    var _a, _b, _c, _d, _e;
    const {
      state,
      model
    } = this.controller;
    return createVNode("div", {
      "ref": "outerWrapper",
      "class": [this.ns.b(), this.ns.e((_a = model.controlType) == null ? void 0 : _a.toLowerCase())]
    }, [state.enableNavView ? state.showNavView ? createVNode(resolveComponent("iBizNavSplit"), {
      "modelValue": this.splitValue,
      "onUpdate:modelValue": ($event) => this.splitValue = $event,
      "mode": this.splitMode,
      "min": this.splitMode === "horizontal" ? this.navStyle.minWidth : this.navStyle.minHeight,
      "max": this.splitMode === "horizontal" ? this.navStyle.maxWidth : this.navStyle.maxHeight
    }, {
      left: () => {
        var _a2, _b2;
        return (_b2 = (_a2 = this.$slots).default) == null ? void 0 : _b2.call(_a2);
      },
      right: () => this.renderNavView(),
      top: () => {
        var _a2, _b2;
        return (_b2 = (_a2 = this.$slots).default) == null ? void 0 : _b2.call(_a2);
      },
      bottom: () => this.renderNavView()
    }) : (_c = (_b = this.$slots).default) == null ? void 0 : _c.call(_b) : (_e = (_d = this.$slots).default) == null ? void 0 : _e.call(_d)]);
  }
});

export { IBizControlNavigation };
