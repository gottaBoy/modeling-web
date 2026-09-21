'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./grid-ua-column.css');
var runtime = require('@ibiz-template/runtime');

"use strict";
const GridUAColumn = /* @__PURE__ */ vue.defineComponent({
  name: "IBizGridUAColumn",
  props: {
    controller: {
      type: runtime.GridUAColumnController,
      required: true
    },
    row: {
      type: runtime.GridRowState,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("grid-ua-column");
    const {
      semanticClass,
      semanticStyle
    } = vue3Util.useSemanticNode(props.controller.grid);
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
    var _a, _b, _c;
    return vue.createVNode("div", {
      "class": [this.ns.b(), (_a = this.controller.model.cellSysCss) == null ? void 0 : _a.cssName, this.semanticClass("uacolumn", {
        column: this.controller
      })],
      "style": this.semanticStyle("uacolumn", {
        column: this.controller
      })
    }, [((_c = (_b = this.controller.model.deuiactionGroup) == null ? void 0 : _b.uiactionGroupDetails) == null ? void 0 : _c.length) && vue.createVNode(vue.resolveComponent("iBizActionToolbar"), {
      "zIndex": this.controller.grid.state.zIndex,
      "onDblclick": this.onStopPropagation,
      "onClick": this.onStopPropagation,
      "action-details": this.controller.model.deuiactionGroup.uiactionGroupDetails,
      "actions-state": this.row.uaColStates[this.controller.model.codeName],
      "onActionClick": this.onActionClick
    }, null)]);
  }
});

exports.GridUAColumn = GridUAColumn;
exports.default = GridUAColumn;
