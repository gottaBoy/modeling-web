'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var index = require('./provider/index.cjs');
require('./control-navigation.css');

"use strict";
const IBizControlNavigation = /* @__PURE__ */ vue.defineComponent({
  name: "IBizControlNavigation",
  props: {
    controller: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    var _a;
    const ns = vue3Util.useNamespace("control-navigation");
    const provider = index.getNavigationProvider(props.controller);
    const outerWrapper = vue.ref(null);
    const isEmbedCtrlNav = vue.ref(false);
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
    const navViewMsg = vue.ref();
    const navRenderMode = ((_a = controlParam == null ? void 0 : controlParam.ctrlParams) == null ? void 0 : _a.navRenderMode) ? controlParam.ctrlParams.navRenderMode : "RELOAD";
    const splitValue = vue.ref(0.5);
    const splitMode = vue.ref(["BOTTOM", "ANY_BOTTOM"].includes(navViewPos) ? "vertical" : "horizontal");
    const style = vue.computed(() => {
      const {
        controlType,
        height
      } = props.controller.model;
      if (controlType === "MAP" && splitMode.value === "vertical")
        return {
          height: "".concat(height ? height + (navViewMaxHeight || navViewHeight || 400) : 1e3, "px")
        };
      return void 0;
    });
    vue.watch(() => provider.navViewMsg.value, async (newVal, oldVal) => {
      if (navRenderMode === "REDRAW" || !newVal || oldVal && newVal.viewId !== oldVal.viewId) {
        navViewMsg.value = newVal;
      } else {
        const viewModel = await ibiz.hub.getAppView(newVal.viewId);
        if (viewModel && viewModel.viewType === "DEREDIRECTVIEW") {
          isEmbedCtrlNav.value = true;
        }
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
    vue.onMounted(() => {
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
      var _a2;
      if (!((_a2 = navViewMsg.value) == null ? void 0 : _a2.viewId))
        return;
      return vue.h(vue.resolveComponent("IBizViewShell"), {
        ...navViewMsg.value,
        isEmbedCtrlNav: isEmbedCtrlNav.value,
        class: ns.e("nav-view")
      });
    };
    return {
      ns,
      style,
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
    return vue.createVNode("div", {
      "ref": "outerWrapper",
      "style": this.style,
      "class": [this.ns.b(), this.ns.e((_a = model.controlType) == null ? void 0 : _a.toLowerCase())]
    }, [state.enableNavView ? state.showNavView ? vue.createVNode(vue.resolveComponent("iBizNavSplit"), {
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

exports.IBizControlNavigation = IBizControlNavigation;
