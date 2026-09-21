import { isVNode, defineComponent, reactive, inject, computed, createVNode, resolveComponent } from 'vue';
import '../../use/index.mjs';
import { SingleDataContainerController } from './single-data-container.controller.mjs';
import './single-data-container.css';
import { useNamespace } from '../../use/namespace/namespace.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const SingleDataContainer = /* @__PURE__ */ defineComponent({
  name: "IBizSingleDataContainer",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: SingleDataContainerController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("single-data-container");
    const {
      id
    } = props.modelData;
    const keys = Object.keys(props.controller.panelItems);
    keys.forEach((key) => {
      const panelItem = props.controller.panelItems[key];
      panelItem.state = reactive(panelItem.state);
    });
    const renderPanelItem = inject("renderPanelItem");
    const classArr = computed(() => {
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
      content = createVNode(resolveComponent("iBizRow"), {
        "class": this.ns.b("content"),
        "layout": this.modelData.layout
      }, {
        default: () => {
          var _a;
          return [(_a = this.modelData.panelItems) == null ? void 0 : _a.map((panelItem) => {
            let _slot;
            const childController = this.controller.panelItems[panelItem.id];
            return createVNode(resolveComponent("iBizCol"), {
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
    return createVNode("div", {
      "class": this.classArr
    }, [content]);
  }
});

export { SingleDataContainer };
