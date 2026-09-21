'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./tree-grid-ex-ua-column.css');
var runtime = require('@ibiz-template/runtime');

"use strict";
const TreeGridExUAColumn = /* @__PURE__ */ vue.defineComponent({
  name: "IBizTreeGridExUAColumn",
  props: {
    controller: {
      type: runtime.TreeGridExUAColumnController,
      required: true
    },
    row: {
      type: runtime.TreeGridExRowState,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("tree-grid-ex-ua-column");
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
    var _a, _b;
    const uiactionGroup = this.controller.getUIActionGroup(this.row);
    return vue.createVNode("div", {
      "class": [this.ns.b(), (_a = this.controller.model.cellSysCss) == null ? void 0 : _a.cssName],
      "onDblclick": this.onStopPropagation,
      "onClick": this.onStopPropagation
    }, [((_b = uiactionGroup == null ? void 0 : uiactionGroup.uiactionGroupDetails) == null ? void 0 : _b.length) && vue.createVNode(vue.resolveComponent("iBizActionToolbar"), {
      "action-details": uiactionGroup.uiactionGroupDetails,
      "actions-state": this.row.columnActionsStates[this.controller.model.codeName],
      "onActionClick": this.onActionClick
    }, null)]);
  }
});

exports.TreeGridExUAColumn = TreeGridExUAColumn;
exports.default = TreeGridExUAColumn;
