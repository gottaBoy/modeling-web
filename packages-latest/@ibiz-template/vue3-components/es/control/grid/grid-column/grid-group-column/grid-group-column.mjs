import { defineComponent, createVNode } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { GridRowState, GridGroupColumnController } from '@ibiz-template/runtime';

"use strict";
const GridGroupColumn = /* @__PURE__ */ defineComponent({
  name: "IBizGridGroupColumn",
  props: {
    controller: {
      type: GridGroupColumnController,
      required: true
    },
    row: {
      type: GridRowState,
      required: true
    }
  },
  setup() {
    const ns = useNamespace("grid-group-column");
    return {
      ns
    };
  },
  render() {
    return createVNode("div", {
      "class": [this.ns.b()]
    }, null);
  }
});

export { GridGroupColumn, GridGroupColumn as default };
