'use strict';

var vue = require('vue');
require('../../use/index.cjs');
var multiDataContainerRaw_controller = require('./multi-data-container-raw.controller.cjs');
require('./multi-data-container-raw.css');
var namespace = require('../../use/namespace/namespace.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const MultiDataContainerRaw = /* @__PURE__ */ vue.defineComponent({
  name: "IBizMultiDataContainerRaw",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: multiDataContainerRaw_controller.MultiDataContainerRawController,
      required: true
    }
  },
  setup(props) {
    const ns = namespace.useNamespace("multi-data-container-raw");
    const {
      id
    } = props.modelData;
    vue.watch(() => props.controller.state.items, () => {
      const keys = Object.keys(props.controller.panelItems);
      keys.forEach((key) => {
        const panelItem = props.controller.panelItems[key];
        panelItem.state = vue.reactive(panelItem.state);
      });
    }, {
      immediate: true,
      deep: true
    });
    const renderPanelItem = vue.inject("renderPanelItem");
    const classArr = vue.computed(() => {
      const result = [ns.b(), ns.m(id), ...props.controller.containerClass];
      return result;
    });
    return {
      ns,
      classArr,
      renderPanelItem
    };
  },
  render() {
    let content;
    if (this.$slots.default) {
      content = this.$slots.default();
    } else {
      content = vue.createVNode(vue.resolveComponent("iBizRow"), {
        "class": this.ns.b("content"),
        "layout": this.modelData.layout
      }, {
        default: () => {
          var _a;
          return [(_a = this.modelData.panelItems) == null ? void 0 : _a.map((panelItem) => {
            let _slot;
            const childController = this.controller.panelItems[panelItem.id];
            return vue.createVNode(vue.resolveComponent("iBizCol"), {
              "layoutPos": panelItem.layoutPos,
              "state": childController.state
            }, _isSlot(_slot = this.renderPanelItem(panelItem, {
              providers: this.controller.providers,
              panelItems: this.controller.panelItems
            })) ? _slot : {
              default: () => [_slot]
            });
          })];
        }
      });
    }
    return vue.createVNode("div", {
      "class": this.classArr
    }, [content]);
  }
});

exports.MultiDataContainerRaw = MultiDataContainerRaw;
