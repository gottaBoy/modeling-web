'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./grid-edit-item.css');

"use strict";
const IBizGridEditItem = /* @__PURE__ */ vue.defineComponent({
  name: "IBizGridEditItem",
  props: {
    required: {
      type: Boolean,
      default: false
    },
    showEditMask: {
      type: Boolean,
      default: false
    },
    stopPropagation: {
      type: Boolean,
      default: false
    },
    error: {
      type: String
    }
  },
  emits: {
    maskClick: (_event) => true
  },
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("grid-edit-item");
    const onStopPropagation = (e) => {
      if (props.stopPropagation) {
        e.stopPropagation();
      }
    };
    const onClick = (e) => {
      if (props.stopPropagation) {
        e.stopPropagation();
      }
      if (props.showEditMask) {
        emit("maskClick", e);
      }
    };
    const showTooltip = vue.computed(() => {
      return props.error;
    });
    const tooltipContent = vue.computed(() => {
      return props.error;
    });
    return {
      ns,
      tooltipContent,
      showTooltip,
      onClick,
      onStopPropagation
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.ns.is("error", !!this.error), this.showEditMask && this.ns.m("show-mask")],
      "onDblclick": this.onStopPropagation,
      "onClick": this.onClick
    }, [vue.createVNode(vue.resolveComponent("el-tooltip"), {
      "content": this.tooltipContent,
      "disabled": !this.showTooltip,
      "transfer": true,
      "popper-class": this.ns.e("tooltip-popper"),
      "placement": "top"
    }, {
      default: () => {
        var _a, _b;
        return [vue.createVNode("div", {
          "class": this.ns.e("tooltip")
        }, [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)])];
      }
    })]);
  }
});

exports.IBizGridEditItem = IBizGridEditItem;
exports.default = IBizGridEditItem;
