import { isVNode, defineComponent, watch, createVNode, resolveComponent } from 'vue';
import { useControlController, useNamespace, getNestedRoutePath, route2routePath } from '@ibiz-template/vue3-util';
import './tab-exp-panel.css';
import { TabExpPanelController } from '@ibiz-template/runtime';
import { useRoute } from 'vue-router';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const TabExpPanelControl = /* @__PURE__ */ defineComponent({
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
    const c = useControlController((...args) => new TabExpPanelController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const handleTabChange = () => {
      c.handleTabChange();
    };
    const tabPosition = ((_a = c.view.model.tabLayout) == null ? void 0 : _a.toLowerCase()) || "top";
    const route = useRoute();
    let expViewRoutePath = "";
    if (c.routeDepth) {
      expViewRoutePath = getNestedRoutePath(route, c.routeDepth);
    }
    watch(() => route.fullPath, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        const depth = c.routeDepth;
        if (depth) {
          const currentRoutePath = getNestedRoutePath(route, c.routeDepth);
          if (currentRoutePath === expViewRoutePath) {
            const routePath = route2routePath(route);
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
    return createVNode(resolveComponent("iBizControlBase"), {
      "controller": this.c
    }, {
      default: () => [isCreated && createVNode(resolveComponent("el-tabs"), {
        "modelValue": this.c.state.activeName,
        "onUpdate:modelValue": ($event) => this.c.state.activeName = $event,
        "tabPosition": this.tabPosition,
        "onTabChange": this.handleTabChange
      }, _isSlot(_slot = tabPages.map((tab) => {
        return createVNode(resolveComponent("el-tab-pane"), {
          "class": [this.ns.e("tab-item")],
          "label": tab.caption,
          "name": tab.tabTag
        }, {
          label: () => {
            return createVNode("span", {
              "class": [...tab.class]
            }, [this.c.isShowIcon && createVNode(resolveComponent("iBizIcon"), {
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

export { TabExpPanelControl };
