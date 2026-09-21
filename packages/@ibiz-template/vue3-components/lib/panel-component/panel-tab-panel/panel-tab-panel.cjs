'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./panel-tab-panel.css');
var panelTabPanel_controller = require('./panel-tab-panel.controller.cjs');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const PanelTabPanel = /* @__PURE__ */ vue.defineComponent({
  name: "IBizPanelTabPanel",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: panelTabPanel_controller.PanelTabPanelController,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("panel-tab-panel");
    const {
      state
    } = props.controller;
    const classArr = vue.computed(() => {
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
    return vue.createVNode(vue.resolveComponent("el-tabs"), {
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
      return vue.createVNode(vue.resolveComponent("el-tab-pane"), {
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

exports.PanelTabPanel = PanelTabPanel;
