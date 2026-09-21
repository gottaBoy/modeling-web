import { defineComponent, computed, createVNode } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { isObject } from 'lodash-es';

"use strict";
const AsyncActionResult = /* @__PURE__ */ defineComponent({
  name: "IBizAsyncActionResult",
  props: {
    asyncAction: {
      type: Object,
      required: true
    },
    modal: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("async-action-preview");
    const message = computed(() => {
      if (isObject(props.asyncAction.actionresult)) {
        return JSON.stringify(props.asyncAction.actionresult);
      }
      return "".concat(props.asyncAction.actionresult);
    });
    return {
      ns,
      message
    };
  },
  render() {
    return createVNode("div", {
      "class": [this.ns.b()]
    }, [this.message]);
  }
});

export { AsyncActionResult };
