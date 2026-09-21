import { isVNode, defineComponent, createVNode, resolveComponent, watch } from 'vue';
import { useControlController, useNamespace, useSemanticNode, getNestedRoutePath, route2routePath } from '@ibiz-template/vue3-util';
import { TabExpPanelController } from '@ibiz-template/runtime';
import { useRoute } from 'vue-router';
import { isNil } from 'ramda';
import './tab-exp-panel.css';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const TabExpPanelControl = /* @__PURE__ */ defineComponent({
  name: "IBizTabExpPanelControl",
  props: {
    /**
     * @description 分页面板模型数据
     */
    modelData: {
      type: Object,
      required: true
    },
    /**
     * @description 应用上下文对象
     */
    context: {
      type: Object,
      required: true
    },
    /**
     * @description 视图参数对象
     * @default {}
     */
    params: {
      type: Object,
      default: () => ({})
    },
    /**
     * @description 部件适配器
     */
    provider: {
      type: Object
    },
    /**
     * @description 默认打开分页名称
     */
    defaultTabName: {
      type: String,
      required: false
    }
  },
  setup() {
    var _a;
    const c = useControlController((...args) => new TabExpPanelController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(c);
    const handleTabChange = () => {
      c.handleTabChange();
    };
    const tabPosition = ((_a = c.view.model.tabLayout) == null ? void 0 : _a.toLowerCase()) || "top";
    const route = useRoute();
    let expViewRoutePath = "";
    if (c.routeDepth) {
      expViewRoutePath = getNestedRoutePath(route, c.routeDepth);
    }
    watch(() => route == null ? void 0 : route.fullPath, (newVal, oldVal) => {
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
      semanticClass,
      semanticStyle,
      handleTabChange
    };
  },
  render() {
    let _slot;
    const {
      isCreated,
      tabPages,
      counterData
    } = this.c.state;
    return createVNode(resolveComponent("iBizControlBase"), {
      "controller": this.c,
      "class": this.semanticClass("root"),
      "style": this.semanticStyle("root")
    }, {
      default: () => [isCreated && createVNode(resolveComponent("el-tabs"), {
        "class": [this.ns.e("tabs"), this.semanticClass("content")],
        "style": this.semanticStyle("content"),
        "modelValue": this.c.state.activeName,
        "onUpdate:modelValue": ($event) => this.c.state.activeName = $event,
        "tabPosition": this.tabPosition,
        "onTabChange": this.handleTabChange
      }, _isSlot(_slot = tabPages.map((tab) => {
        const counterNum = tab.counterId ? counterData[tab.counterId] : void 0;
        return createVNode(resolveComponent("el-tab-pane"), {
          "class": this.ns.e("tab-item"),
          "label": tab.caption,
          "name": tab.tabTag
        }, {
          label: () => {
            return createVNode("span", {
              "class": [...tab.class, this.ns.e("item"), this.semanticClass("item", {
                item: tab
              })],
              "style": this.semanticStyle("item", {
                item: tab
              })
            }, [this.c.isShowIcon && createVNode(resolveComponent("iBizIcon"), {
              "icon": tab.sysImage,
              "style": this.semanticStyle("item.icon", {
                item: tab
              }),
              "class": [this.ns.em("item", "icon"), this.semanticClass("item.icon", {
                item: tab
              })]
            }, null), createVNode("span", {
              "class": [this.ns.em("item", "caption"), this.semanticClass("item.caption", {
                item: tab
              })],
              "style": this.semanticStyle("item.caption", {
                item: tab
              })
            }, [this.c.isShowCaption && tab.caption]), !isNil(counterNum) && createVNode(resolveComponent("iBizBadge"), {
              "class": [this.ns.e("counter"), this.semanticClass("item.counter", {
                item: tab,
                counter: counterData
              })],
              "style": this.semanticStyle("item.counter", {
                item: tab,
                counter: counterData
              }),
              "value": counterNum
            }, null)]);
          }
        });
      })) ? _slot : {
        default: () => [_slot]
      })]
    });
  }
});

export { TabExpPanelControl };
