import { isVNode, defineComponent, computed, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './panel-tab-panel.css';
import { PanelTabPanelController } from './panel-tab-panel.controller.mjs';

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const PanelTabPanel = /* @__PURE__ */ defineComponent({
  name: "IBizPanelTabPanel",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: PanelTabPanelController,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("panel-tab-panel");
    const {
      state
    } = props.controller;
    const classArr = computed(() => {
      const {
        id
      } = props.modelData;
      const result = [ns.b(), ns.m(id)];
      result.push(...props.controller.containerClass);
      return result;
    });
    const onTabClick = (tabIns, event) => {
      props.controller.onTabChange(tabIns.props.name);
    };
    return {
      ns,
      state,
      classArr,
      onTabClick
    };
  },
  render() {
    var _a, _b;
    let _slot;
    if (!this.controller.state.visible) {
      return;
    }
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    return createVNode(resolveComponent("el-tabs"), {
      "class": [this.ns.b(), this.ns.m(this.modelData.codeName), ...this.controller.containerClass],
      "model-value": this.state.activeTab,
      "onTabClick": this.onTabClick
    }, _isSlot(_slot = defaultSlots.map((slot) => {
      const props = slot.props;
      if (!props || !props.controller) {
        return slot;
      }
      const c = props.controller;
      if (!c.state.visible && !c.state.keepAlive) {
        return null;
      }
      return createVNode(resolveComponent("el-tab-pane"), {
        "class": this.ns.b("tab-item"),
        "label": c.model.caption,
        "name": c.model.id,
        "lazy": true
      }, _isSlot(slot) ? slot : {
        default: () => [slot]
      });
    })) ? _slot : {
      default: () => [_slot]
    });
  }
});

export { PanelTabPanel };
