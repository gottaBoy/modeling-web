'use strict';

var vue = require('vue');
require('./view-layout-panel.css');
var runtime = require('@ibiz-template/runtime');
require('../../../use/index.cjs');
var useControlController = require('../../../use/control/use-control-controller/use-control-controller.cjs');
var namespace = require('../../../use/namespace/namespace.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
function renderAttrs(model, controller) {
  var _a;
  const attrs = {};
  (_a = model.controlAttributes) == null ? void 0 : _a.forEach((item) => {
    if (item.attrName && item.attrValue) {
      attrs[item.attrName] = runtime.ScriptFactory.execSingleLine(item.attrValue, {
        ...controller.panel.getEventArgs(),
        data: controller.data
      });
    }
  });
  return attrs;
}
const ViewLayoutPanelControl = /* @__PURE__ */ vue.defineComponent({
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
    const c = useControlController.useControlController((...args) => new runtime.ViewLayoutPanelController(...args, props.container));
    const ns = namespace.useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    vue.watch(() => props.data, (newVal) => {
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
        panelItem.state = vue.reactive(panelItem.state);
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
        return vue.createVNode("div", null, [ibiz.i18n.t("vue3Util.control.unsupportedPanel", {
          id: panelItem.id,
          itemType: panelItem.itemType
        })]);
      }
      if (panelItem.itemType !== "CTRLPOS" && slots[panelItem.id]) {
        return vue.renderSlot(slots, panelItem.id, {
          model: panelItem,
          data: c.data,
          value: c.data[panelItem.id]
        });
      }
      const component = vue.resolveComponent(provider.component);
      let children;
      if (panelItem.itemType === "CTRLPOS" && slots[panelItem.id]) {
        const panelItemC2 = panelItems[panelItem.id];
        if (panelItemC2.parent && runtime.isSimpleDataContainer(panelItemC2.parent.model)) {
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
      } else if (runtime.isDataContainer(panelItem)) {
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
      return vue.h(component, {
        modelData: panelItem,
        controller: panelItemC,
        key: panelItem.id,
        style: tempStyle,
        attrs: renderAttrs(panelItem, panelItemC)
      }, children);
    };
    vue.provide("renderPanelItem", renderPanelItem);
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
    return vue.createVNode(vue.resolveComponent("iBizControlBase"), {
      "controller": this.c
    }, {
      default: () => [vue.createVNode(vue.resolveComponent("iBizRow"), {
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
            return vue.createVNode(vue.resolveComponent("iBizCol"), {
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

exports.ViewLayoutPanelControl = ViewLayoutPanelControl;
