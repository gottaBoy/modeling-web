import { defineComponent, createVNode, resolveComponent } from 'vue';
import { useNamespace, useSemanticNode } from '@ibiz-template/vue3-util';
import './tree-grid-ex-ua-column.css';
import { TreeGridExRowState, TreeGridExUAColumnController } from '@ibiz-template/runtime';

"use strict";
const TreeGridExUAColumn = /* @__PURE__ */ defineComponent({
  name: "IBizTreeGridExUAColumn",
  props: {
    controller: {
      type: TreeGridExUAColumnController,
      required: true
    },
    row: {
      type: TreeGridExRowState,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("tree-grid-ex-ua-column");
    const {
      semanticClass,
      semanticStyle
    } = useSemanticNode(props.controller.treeGrid);
    const onStopPropagation = (e) => {
      e.stopPropagation();
    };
    const onActionClick = async (detail, event) => {
      await props.controller.onActionClick(detail, props.row, event);
    };
    return {
      ns,
      onStopPropagation,
      onActionClick,
      semanticClass,
      semanticStyle
    };
  },
  render() {
    var _a, _b;
    const uiactionGroup = this.controller.getUIActionGroup(this.row);
    return createVNode("div", {
      "class": [this.ns.b(), (_a = this.controller.model.cellSysCss) == null ? void 0 : _a.cssName, this.semanticClass("uacolumn", {
        column: this.controller
      })],
      "style": this.semanticStyle("uacolumn", {
        column: this.controller
      }),
      "onDblclick": this.onStopPropagation,
      "onClick": this.onStopPropagation
    }, [((_b = uiactionGroup == null ? void 0 : uiactionGroup.uiactionGroupDetails) == null ? void 0 : _b.length) && createVNode(resolveComponent("iBizActionToolbar"), {
      "zIndex": this.controller.treeGrid.state.zIndex,
      "action-details": uiactionGroup.uiactionGroupDetails,
      "actions-state": this.row.columnActionsStates[this.controller.model.codeName],
      "onActionClick": this.onActionClick
    }, null)]);
  }
});

export { TreeGridExUAColumn, TreeGridExUAColumn as default };
