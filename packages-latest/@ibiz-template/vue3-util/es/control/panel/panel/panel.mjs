import { isVNode, createVNode, resolveComponent, renderSlot, h, defineComponent, watch, reactive, inject, provide } from 'vue';
import { filterPresetAttrs, ScriptFactory, isDataContainer, PanelController } from '@ibiz-template/runtime';
import '../../../use/index.mjs';
import './panel.css';
import { useControlController } from '../../../use/control/use-control-controller/use-control-controller.mjs';
import { useNamespace } from '../../../use/namespace/namespace.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
function renderAttrs(model, controller) {
  const attrs = {};
  filterPresetAttrs(model.controlAttributes).forEach((item) => {
    if (item.attrName && item.attrValue) {
      attrs[item.attrName] = ScriptFactory.execSingleLine(item.attrValue, {
        ...controller.panel.getEventArgs(),
        data: controller.data
      });
    }
  });
  return attrs;
}
function renderPanelItem(panelItem, c, ins) {
  var _a, _b;
  if (panelItem.hidden) {
    return;
  }
  const {
    providers,
    panelItems
  } = c;
  const provider = providers[panelItem.id];
  if (!provider) {
    return createVNode("div", null, [ibiz.i18n.t("vue3Util.control.unsupportedPanel", {
      id: panelItem.id,
      itemType: panelItem.itemType
    })]);
  }
  const component = resolveComponent(provider.component);
  let children;
  if (panelItem.itemType === "CTRLPOS" && ins.$slots[panelItem.id]) {
    children = () => {
      return ins.$slots[panelItem.id]();
    };
  } else if (panelItem.itemType === "TABPANEL" && ((_a = panelItem.panelTabPages) == null ? void 0 : _a.length)) {
    children = () => {
      return panelItem.panelTabPages.map((child) => {
        return renderPanelItem(child, c, ins);
      });
    };
  } else if (isDataContainer(panelItem)) {
    children = void 0;
  } else if ((_b = panelItem.panelItems) == null ? void 0 : _b.length) {
    children = () => {
      return panelItem.panelItems.map((child) => {
        return renderPanelItem(child, c, ins);
      });
    };
  }
  let tempStyle = "";
  if (panelItem.cssStyle) {
    tempStyle = panelItem.cssStyle;
  }
  const panelItemC = panelItems[panelItem.id];
  const attrs = renderAttrs(panelItem, panelItemC);
  if (attrs.dynamicstyle) {
    if (typeof attrs.dynamicstyle === "object") {
      tempStyle += Object.entries(attrs.dynamicstyle).map(([key, value]) => {
        return "".concat(key, ":").concat(value, ";");
      }).join("");
    } else {
      tempStyle += attrs.dynamicstyle;
    }
    delete attrs.dynamicstyle;
  }
  if (ins == null ? void 0 : ins.$slots[panelItem.id]) {
    return renderSlot(ins.$slots, panelItem.id, {
      modelData: panelItem,
      controller: panelItemC,
      key: panelItem.id,
      style: tempStyle,
      attrs
    });
  }
  return h(component, {
    modelData: panelItem,
    controller: panelItemC,
    key: panelItem.id,
    style: tempStyle,
    attrs
  }, children);
}
const PanelControl = /* @__PURE__ */ defineComponent({
  name: "IBizPanelControl",
  props: {
    /**
     * @description 面板模型数据
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
     * @description 容器控制器,为上层部件控制器或视图控制器
     */
    container: {
      type: Object
    },
    /**
     * @description 视图布局面板数据
     */
    data: {
      type: Object
    },
    /**
     * @description 是否默认加载数据
     * @default true
     */
    loadDefault: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const c = useControlController((...args) => new PanelController(...args, props.container));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    watch(() => props.data, (newVal) => {
      if (newVal) {
        c.setInputData(newVal);
        c.load();
      }
    }, {
      immediate: true
    });
    c.evt.on("onCreated", () => {
      const keys = Object.keys(c.panelItems);
      keys.forEach((key) => {
        const panelItem = c.panelItems[key];
        panelItem.state = reactive(panelItem.state);
      });
    });
    const parentRenderPanelItem = inject("renderPanelItem");
    if (parentRenderPanelItem) {
      provide("renderPanelItem", parentRenderPanelItem);
    } else {
      provide("renderPanelItem", renderPanelItem);
    }
    return {
      c,
      ns
    };
  },
  render() {
    const {
      state,
      model
    } = this.c;
    return createVNode(resolveComponent("iBizControlBase"), {
      "controller": this.c
    }, {
      default: () => [createVNode(resolveComponent("iBizRow"), {
        "class": this.ns.b("content"),
        "layout": {
          layout: "FLEX"
        }
      }, {
        default: () => {
          var _a;
          return [state.isCreated && (this.$slots.default ? this.$slots.default({
            panelItems: this.c.panelItems
          }) : (_a = model.rootPanelItems) == null ? void 0 : _a.map((panelItem) => {
            let _slot;
            const subC = this.c.panelItems[panelItem.id];
            panelItem.layoutPos.layout = "FLEX";
            return createVNode(resolveComponent("iBizCol"), {
              "layoutPos": panelItem.layoutPos,
              "state": subC.state
            }, _isSlot(_slot = renderPanelItem(panelItem, this.c, this)) ? _slot : {
              default: () => [_slot]
            });
          }))];
        }
      })]
    });
  }
});

export { PanelControl };
