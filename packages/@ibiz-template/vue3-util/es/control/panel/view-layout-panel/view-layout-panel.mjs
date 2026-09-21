import { isVNode, defineComponent, watch, reactive, createVNode, renderSlot, resolveComponent, h, provide } from 'vue';
import './view-layout-panel.css';
import { ScriptFactory, ViewLayoutPanelController, isSimpleDataContainer, isDataContainer } from '@ibiz-template/runtime';
import '../../../use/index.mjs';
import { useControlController } from '../../../use/control/use-control-controller/use-control-controller.mjs';
import { useNamespace } from '../../../use/namespace/namespace.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
function renderAttrs(model, controller) {
  var _a;
  const attrs = {};
  (_a = model.controlAttributes) == null ? void 0 : _a.forEach((item) => {
    if (item.attrName && item.attrValue) {
      attrs[item.attrName] = ScriptFactory.execSingleLine(item.attrValue, {
        ...controller.panel.getEventArgs(),
        data: controller.data
      });
    }
  });
  return attrs;
}
const ViewLayoutPanelControl = /* @__PURE__ */ defineComponent({
  name: "IBizViewLayoutPanelControl",
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
    container: {
      type: Object
    },
    data: Object
  },
  setup(props, {
    slots
  }) {
    const c = useControlController((...args) => new ViewLayoutPanelController(...args, props.container));
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
    const renderPanelItem = (panelItem, options) => {
      var _a, _b;
      if (panelItem.hidden) {
        return null;
      }
      const {
        providers,
        panelItems
      } = options || c;
      const provider = providers[panelItem.id];
      if (!provider) {
        return createVNode("div", null, [ibiz.i18n.t("vue3Util.control.unsupportedPanel", {
          id: panelItem.id,
          itemType: panelItem.itemType
        })]);
      }
      if (panelItem.itemType !== "CTRLPOS" && slots[panelItem.id]) {
        return renderSlot(slots, panelItem.id, {
          model: panelItem,
          data: c.data,
          value: c.data[panelItem.id]
        });
      }
      const component = resolveComponent(provider.component);
      let children;
      if (panelItem.itemType === "CTRLPOS" && slots[panelItem.id]) {
        const panelItemC2 = panelItems[panelItem.id];
        if (panelItemC2.parent && isSimpleDataContainer(panelItemC2.parent.model)) {
          children = () => {
            return slots[panelItem.id]({
              isSimple: true,
              data: panelItemC2.data
            });
          };
        } else {
          children = () => slots[panelItem.id]();
        }
      } else if (panelItem.itemType === "TABPANEL" && ((_a = panelItem.panelTabPages) == null ? void 0 : _a.length)) {
        children = () => {
          return panelItem.panelTabPages.map((child) => {
            return renderPanelItem(child, options);
          });
        };
      } else if (isDataContainer(panelItem)) {
        children = void 0;
      } else if ((_b = panelItem.panelItems) == null ? void 0 : _b.length) {
        children = () => {
          return panelItem.panelItems.map((child) => {
            return renderPanelItem(child, options);
          });
        };
      }
      let tempStyle = "";
      if (panelItem.cssStyle) {
        tempStyle = panelItem.cssStyle;
      }
      const panelItemC = panelItems[panelItem.id];
      return h(component, {
        modelData: panelItem,
        controller: panelItemC,
        key: panelItem.id,
        style: tempStyle,
        attrs: renderAttrs(panelItem, panelItemC)
      }, children);
    };
    provide("renderPanelItem", renderPanelItem);
    return {
      c,
      ns,
      renderPanelItem
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
            }, _isSlot(_slot = this.renderPanelItem(panelItem)) ? _slot : {
              default: () => [_slot]
            });
          }))];
        }
      })]
    });
  }
});

export { ViewLayoutPanelControl };
