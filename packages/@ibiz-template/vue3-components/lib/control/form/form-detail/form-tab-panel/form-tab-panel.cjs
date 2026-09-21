'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./form-tab-panel.css');
var runtime = require('@ibiz-template/runtime');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const FormTabPanel = /* @__PURE__ */ vue.defineComponent({
  name: "IBizFormTabPanel",
  props: {
    modelData: {
      type: Object,
      required: true
    },
    controller: {
      type: runtime.FormTabPanelController,
      required: true
    }
  },
  setup(props, {
    slots
  }) {
    const ns = vue3Util.useNamespace("form-tab-panel");
    vue3Util.useController(props.controller);
    let counter = null;
    const counterData = vue.reactive({});
    const counterRefId = vue.ref("");
    const onTabClick = (tabIns, event) => {
      props.controller.onTabChange(tabIns.props.name);
      const pageC = props.controller.form.details[tabIns.props.name];
      if (pageC) {
        pageC.onClick(event);
      }
    };
    const fn = (data) => {
      counterData.value = data;
    };
    vue.onMounted(() => {
      var _a, _b;
      const defaultSlots = ((_a = slots.default) == null ? void 0 : _a.call(slots)) || [];
      for (let i = 0; i < defaultSlots.length; i++) {
        const slot = defaultSlots[i];
        const pagePropsC = (_b = slot.props) == null ? void 0 : _b.controller;
        if (pagePropsC && pagePropsC.model && pagePropsC.model.appCounterRefId) {
          counterRefId.value = pagePropsC.model.appCounterRefId;
          break;
        }
      }
      if (counterRefId.value) {
        counter = props.controller.getCounter(counterRefId.value);
        if (counter) {
          counter.onChange(fn);
        }
      }
    });
    vue.onUnmounted(() => {
      counter == null ? void 0 : counter.offChange(fn);
    });
    return {
      ns,
      onTabClick,
      counterData
    };
  },
  render() {
    var _a, _b;
    let _slot2;
    const defaultSlots = ((_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)) || [];
    const renderItemText = (c) => {
      return vue.createVNode("span", {
        "class": [this.ns.b("tab-item-content"), ...c.labelClass]
      }, [c.model.sysImage && vue.createVNode(vue.resolveComponent("iBizIcon"), {
        "icon": c.model.sysImage
      }, null), c.model.showCaption && c.model.caption]);
    };
    return vue.createVNode(vue.resolveComponent("el-tabs"), {
      "class": [this.ns.b(), this.ns.m(this.modelData.codeName), this.modelData.detailStyle ? this.ns.m(this.modelData.detailStyle.toLowerCase()) : "", ...this.controller.containerClass],
      "model-value": this.controller.state.activeTab,
      "onTabClick": this.onTabClick
    }, _isSlot(_slot2 = defaultSlots.map((slot) => {
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
      }, {
        default: () => slot,
        label: () => {
          let _slot;
          const value = c.model.counterId ? this.counterData.value[c.model.counterId] : void 0;
          return c.model.counterId ? vue.createVNode(vue.resolveComponent("el-badge"), {
            "class": [this.ns.e("badge"), this.ns.is("no-counter", !value && value !== 0 || c.model.counterMode === 1 && value <= 0)],
            "value": value,
            "hidden": !value && value !== 0 || c.model.counterMode === 1 && value <= 0
          }, _isSlot(_slot = renderItemText(c)) ? _slot : {
            default: () => [_slot]
          }) : renderItemText(c);
        }
      });
    })) ? _slot2 : {
      default: () => [_slot2]
    });
  }
});

exports.FormTabPanel = FormTabPanel;
exports.default = FormTabPanel;
