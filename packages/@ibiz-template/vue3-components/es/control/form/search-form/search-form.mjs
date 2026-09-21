import { defineComponent, reactive, createVNode, resolveComponent } from 'vue';
import { SearchFormController } from '@ibiz-template/runtime';
import { useControlController, useNamespace } from '@ibiz-template/vue3-util';
import './search-form.css';

"use strict";
const SearchFormControl = /* @__PURE__ */ defineComponent({
  name: "IBizSearchFormControl",
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
    isSimple: {
      type: Boolean,
      required: false
    },
    loadDefault: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const c = useControlController((...args) => new SearchFormController(...args));
    const ns = useNamespace("control-".concat(c.model.controlType.toLowerCase()));
    c.evt.on("onCreated", () => {
      const keys = Object.keys(c.details);
      keys.forEach((key) => {
        const detail = c.details[key];
        detail.state = reactive(detail.state);
      });
    });
    return {
      c,
      ns
    };
  },
  render() {
    const {
      state
    } = this.c;
    if (!state.isCreated) {
      return;
    }
    return createVNode(resolveComponent("iBizFormControl"), {
      "class": [this.ns.b()],
      "controller": this.c,
      "onKeyup": (e) => this.c.onKeyUp(e)
    }, {
      ...this.$slots
    });
  }
});

export { SearchFormControl };
