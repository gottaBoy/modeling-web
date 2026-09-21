'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./tab-exp-panel.css');
var runtime = require('@ibiz-template/runtime');
var vueRouter = require('vue-router');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const TabExpPanelControl = /* @__PURE__ */ vue.defineComponent({
  name: "IBizTabExpPanelControl",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    context: {
      type: Object,
      required: true
    },
    params: {
      type: Object,
      default: () => ({})
    },
    provider: {
      type: Object
    },
    defaultTabName: {
      type: String,
      required: false
    }
  },
  setup() {
    var _a;
    const c = vue3Util.useControlController((...args) => new runtime.TabExpPanelController(...args));
    const ns = vue3Util.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const handleTabChange = () => {
      c.handleTabChange();
    };
    const tabPosition = ((_a = c.view.model.tabLayout) == null ? void 0 : _a.toLowerCase()) || "top";
    const route = vueRouter.useRoute();
    let expViewRoutePath = "";
    if (c.routeDepth) {
      expViewRoutePath = vue3Util.getNestedRoutePath(route, c.routeDepth);
    }
    vue.watch(() => route.fullPath, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        const depth = c.routeDepth;
        if (depth) {
          const currentRoutePath = vue3Util.getNestedRoutePath(route, c.routeDepth);
          if (currentRoutePath === expViewRoutePath) {
            const routePath = vue3Util.route2routePath(route);
            const {
              srfnav
            } = routePath.pathNodes[depth - 1];
            if (srfnav && c.state.activeName && c.state.activeName !== srfnav) {
              c.state.activeName = srfnav;
              c.handleTabChange();
            }
          }
        }
      }
    }, {
      immediate: true
    });
    return {
      c,
      ns,
      tabPosition,
      handleTabChange
    };
  },
  render() {
    let _slot;
    const {
      isCreated,
      tabPages
    } = this.c.state;
    return vue.createVNode(vue.resolveComponent("iBizControlBase"), {
      "controller": this.c
    }, {
      default: () => [isCreated && vue.createVNode(vue.resolveComponent("el-tabs"), {
        "modelValue": this.c.state.activeName,
        "onUpdate:modelValue": ($event) => this.c.state.activeName = $event,
        "tabPosition": this.tabPosition,
        "onTabChange": this.handleTabChange
      }, _isSlot(_slot = tabPages.map((tab) => {
        return vue.createVNode(vue.resolveComponent("el-tab-pane"), {
          "class": [this.ns.e("tab-item")],
          "label": tab.caption,
          "name": tab.tabTag
        }, {
          label: () => {
            return vue.createVNode("span", {
              "class": [...tab.class]
            }, [this.c.isShowIcon && vue.createVNode(vue.resolveComponent("iBizIcon"), {
              "icon": tab.sysImage
            }, null), this.c.isShowCaption && tab.caption]);
          }
        });
      })) ? _slot : {
        default: () => [_slot]
      })]
    });
  }
});

exports.TabExpPanelControl = TabExpPanelControl;
