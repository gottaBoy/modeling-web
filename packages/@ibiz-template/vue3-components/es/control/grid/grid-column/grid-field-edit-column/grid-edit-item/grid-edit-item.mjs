import { defineComponent, computed, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './grid-edit-item.css';

"use strict";
const IBizGridEditItem = /* @__PURE__ */ defineComponent({
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
    const ns = useNamespace("grid-edit-item");
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
    const showTooltip = computed(() => {
      return props.error;
    });
    const tooltipContent = computed(() => {
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
    return createVNode("div", {
      "class": [this.ns.b(), this.ns.is("error", !!this.error), this.showEditMask && this.ns.m("show-mask")],
      "onDblclick": this.onStopPropagation,
      "onClick": this.onClick
    }, [createVNode(resolveComponent("el-tooltip"), {
      "content": this.tooltipContent,
      "disabled": !this.showTooltip,
      "transfer": true,
      "popper-class": this.ns.e("tooltip-popper"),
      "placement": "top"
    }, {
      default: () => {
        var _a, _b;
        return [createVNode("div", {
          "class": this.ns.e("tooltip")
        }, [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)])];
      }
    })]);
  }
});

export { IBizGridEditItem, IBizGridEditItem as default };
