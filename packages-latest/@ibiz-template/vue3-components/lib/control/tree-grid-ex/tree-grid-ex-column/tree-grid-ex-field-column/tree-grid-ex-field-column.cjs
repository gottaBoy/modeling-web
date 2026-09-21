'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var ramda = require('ramda');
require('./tree-grid-ex-field-column.css');
var core = require('@ibiz-template/core');

"use strict";
const TreeGridExFieldColumn = /* @__PURE__ */ vue.defineComponent({
  name: "IBizTreeGridExFieldColumn",
  props: {
    controller: {
      type: runtime.TreeGridExFieldColumnController,
      required: true
    },
    row: {
      type: runtime.TreeGridExRowState,
      required: true
    },
    nowrap: {
      type: Boolean
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("tree-grid-ex-field-column");
    const zIndex = props.controller.treeGrid.state.zIndex;
    const fieldValue = vue.computed(() => {
      if (props.row.data._nodeType !== "DE" && props.controller.isFirstShowColumn) {
        return props.row.data._text;
      }
      return props.row.data[props.controller.name];
    });
    const nodeColumn = vue.computed(() => {
      return props.controller.nodeColumnControllerMap.get(props.row.data._nodeId);
    });
    const codeListText = vue.ref("");
    const onInfoTextChange = (text) => {
      codeListText.value = text;
    };
    const showText = vue.computed(() => {
      var _a, _b;
      const nodeColumnC = nodeColumn.value;
      if (nodeColumnC) {
        if (nodeColumnC.nodeEditItem) {
          return void 0;
        }
        if (nodeColumnC.codeList) {
          return codeListText.value;
        }
        let text = nodeColumnC.formatValue(fieldValue.value);
        if (props.controller.treeGrid.emptyHiddenUnit) {
          if (text) {
            text += nodeColumnC.unitName || ((_a = nodeColumnC.nodeColumn) == null ? void 0 : _a.unitName) || "";
          }
        } else {
          text += nodeColumnC.unitName || ((_b = nodeColumnC.nodeColumn) == null ? void 0 : _b.unitName) || "";
        }
        return text;
      }
      return fieldValue.value;
    });
    const tooltip = vue.computed(() => {
      if (props.nowrap === true || props.controller.treeGrid.overflowMode === "ellipsis" && ramda.isNotNil(fieldValue.value) && fieldValue.value !== "") {
        return showText.value;
      }
      return void 0;
    });
    const clickable = vue.computed(() => {
      return fieldValue.value && nodeColumn.value && (nodeColumn.value.isLinkColumn || nodeColumn.value.hasClickAction);
    });
    const onTextClick = (event) => {
      var _a;
      (_a = nodeColumn.value) == null ? void 0 : _a.onTextClick(props.row, event);
    };
    const onActionClick = async (detail, event) => {
      var _a;
      await ((_a = nodeColumn.value) == null ? void 0 : _a.onActionClick(detail, props.row, event));
    };
    return {
      ns,
      zIndex,
      tooltip,
      showText,
      clickable,
      nodeColumn,
      fieldValue,
      onTextClick,
      onActionClick,
      onInfoTextChange
    };
  },
  render() {
    var _a, _b, _c, _d;
    let content = null;
    if ((_a = this.nodeColumn) == null ? void 0 : _a.nodeEditItem) {
      content = vue.createVNode(vue.resolveComponent("iBizTreeGridExEditColumn"), {
        "controller": this.nodeColumn,
        "row": this.row
      }, null);
    } else if ((_b = this.nodeColumn) == null ? void 0 : _b.codeList) {
      content = vue.createVNode(vue.resolveComponent("iBizCodeList"), {
        "class": this.ns.e("text"),
        "codeListItems": this.nodeColumn.codeListItems,
        "codeList": this.nodeColumn.codeList,
        "value": this.fieldValue,
        "onClick": this.onTextClick,
        "onInfoTextChange": this.onInfoTextChange,
        "title": core.showTitle(this.tooltip)
      }, null);
    } else {
      content = vue.createVNode("span", {
        "class": this.ns.e("text"),
        "title": core.showTitle(this.tooltip),
        "onClick": this.onTextClick
      }, [this.showText]);
    }
    let actions;
    if (this.$slots.actions) {
      actions = this.$slots.actions();
    } else if (this.row.columnActionsStates[this.controller.name]) {
      actions = vue.createVNode(vue.resolveComponent("iBizActionToolbar"), {
        "zIndex": this.zIndex,
        "class": this.ns.e("toolbar"),
        "action-details": (_c = this.nodeColumn) == null ? void 0 : _c.nodeColumn.deuiactionGroup.uiactionGroupDetails,
        "actions-state": this.row.columnActionsStates[this.controller.name],
        "groupLevelKeys": [50, 100],
        "nowrap": this.nowrap,
        "onActionClick": this.onActionClick
      }, null);
    }
    return vue.createVNode("div", {
      "class": [this.ns.b(), this.clickable && this.ns.m("clickable"), this.ns.m(this.controller.treeGrid.overflowMode), (_d = this.controller.model.cellSysCss) == null ? void 0 : _d.cssName, this.ns.is("has-action", !!actions)]
    }, [vue.createVNode("div", {
      "class": this.ns.b("text-container")
    }, [content]), vue.createVNode("div", {
      "class": this.ns.b("toolbar-container")
    }, [actions])]);
  }
});

exports.TreeGridExFieldColumn = TreeGridExFieldColumn;
exports.default = TreeGridExFieldColumn;
