import { defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './grid-ua-column.css';
import { GridUAColumnController, GridRowState } from '@ibiz-template/runtime';

"use strict";
const GridUAColumn = /* @__PURE__ */ defineComponent({
  name: "IBizGridUAColumn",
  props: {
    controller: {
      type: GridUAColumnController,
      required: true
    },
    row: {
      type: GridRowState,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("grid-ua-column");
    const onStopPropagation = (e) => {
      e.stopPropagation();
    };
    const onActionClick = async (detail, event) => {
      await props.controller.onActionClick(detail, props.row, event);
    };
    return {
      ns,
      onStopPropagation,
      onActionClick
    };
  },
  render() {
    var _a, _b, _c;
    return createVNode("div", {
      "class": [this.ns.b(), (_a = this.controller.model.cellSysCss) == null ? void 0 : _a.cssName]
    }, [((_c = (_b = this.controller.model.deuiactionGroup) == null ? void 0 : _b.uiactionGroupDetails) == null ? void 0 : _c.length) && createVNode(resolveComponent("iBizActionToolbar"), {
      "onDblclick": this.onStopPropagation,
      "onClick": this.onStopPropagation,
      "action-details": this.controller.model.deuiactionGroup.uiactionGroupDetails,
      "actions-state": this.row.uaColStates[this.controller.model.codeName],
      "onActionClick": this.onActionClick
    }, null)]);
  }
});

export { GridUAColumn, GridUAColumn as default };
