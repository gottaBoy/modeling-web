import { createVNode, defineComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './devtool-button.css';

"use strict";
const DevtoolButton = /* @__PURE__ */ defineComponent({
  name: "DevtoolButton",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  emits: ["click"],
  setup(props, {
    emit
  }) {
    const ns = useNamespace("devtool-button");
    const click = (event) => {
      event.stopPropagation();
      emit("click", event);
    };
    return {
      ns,
      click
    };
  },
  render() {
    var _a, _b;
    return createVNode("button", {
      "title": this.title ? this.title : void 0,
      "class": this.ns.b(),
      "onClick": (event) => this.click(event)
    }, [(_b = (_a = this.$slots).default) == null ? void 0 : _b.call(_a)]);
  }
});

export { DevtoolButton as default };
