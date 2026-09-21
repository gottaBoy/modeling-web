import { inject, createVNode, defineComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './devtool-select-option.css';

"use strict";
const OptionComponent = /* @__PURE__ */ defineComponent({
  props: {
    label: {
      type: String
    },
    value: {
      type: String
    }
  },
  setup(props) {
    const ns = useNamespace("devtool-select-option");
    const select = inject("select");
    const clickItem = (event) => {
      event.stopPropagation();
      select.curValue.value = props.value;
      select.curLabel.value = props.label;
      select.showOption();
    };
    return {
      ns,
      clickItem
    };
  },
  render() {
    return createVNode("div", {
      "id": "option",
      "class": this.ns.b()
    }, [createVNode("div", {
      "class": this.ns.e("content"),
      "onClick": (event) => this.clickItem(event)
    }, [this.label])]);
  }
});

export { OptionComponent, OptionComponent as default };
