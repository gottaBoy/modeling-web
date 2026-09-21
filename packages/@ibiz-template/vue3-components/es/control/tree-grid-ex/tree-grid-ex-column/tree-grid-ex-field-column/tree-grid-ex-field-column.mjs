import { defineComponent, computed, ref, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { TreeGridExFieldColumnController, TreeGridExRowState } from '@ibiz-template/runtime';
import { isNotNil } from 'ramda';
import './tree-grid-ex-field-column.css';
import { showTitle } from '@ibiz-template/core';

"use strict";
const TreeGridExFieldColumn = /* @__PURE__ */ defineComponent({
  name: "IBizTreeGridExFieldColumn",
  props: {
    controller: {
      type: TreeGridExFieldColumnController,
      required: true
    },
    row: {
      type: TreeGridExRowState,
      required: true
    }
  },
  setup(props) {
    const ns = useNamespace("tree-grid-ex-field-column");
    const fieldValue = computed(() => {
      if (props.row.data._nodeType !== "DE" && props.controller.isFirstShowColumn) {
        return props.row.data._text;
      }
      return props.row.data[props.controller.name];
    });
    const nodeColumn = computed(() => {
      return props.controller.nodeColumnControllerMap.get(props.row.data._nodeId);
    });
    const codeListText = ref("");
    const onInfoTextChange = (text) => {
      codeListText.value = text;
    };
    const showText = computed(() => {
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
    const tooltip = computed(() => {
      if (props.controller.treeGrid.overflowMode === "ellipsis" && isNotNil(fieldValue.value) && fieldValue.value !== "") {
        return showText.value;
      }
      return void 0;
    });
    const clickable = computed(() => {
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
      nodeColumn,
      fieldValue,
      showText,
      clickable,
      tooltip,
      onInfoTextChange,
      onTextClick,
      onActionClick
    };
  },
  render() {
    var _a, _b, _c, _d;
    let content = null;
    if ((_a = this.nodeColumn) == null ? void 0 : _a.nodeEditItem) {
      content = createVNode(resolveComponent("iBizTreeGridExEditColumn"), {
        "controller": this.nodeColumn,
        "row": this.row
      }, null);
    } else if ((_b = this.nodeColumn) == null ? void 0 : _b.codeList) {
      content = createVNode(resolveComponent("iBizCodeList"), {
        "class": this.ns.e("text"),
        "codeListItems": this.nodeColumn.codeListItems,
        "codeList": this.nodeColumn.codeList,
        "value": this.fieldValue,
        "onClick": this.onTextClick,
        "onInfoTextChange": this.onInfoTextChange,
        "title": showTitle(this.tooltip)
      }, null);
    } else {
      content = createVNode("span", {
        "class": this.ns.e("text"),
        "title": showTitle(this.tooltip),
        "onClick": this.onTextClick
      }, [this.showText]);
    }
    let actions;
    if (this.$slots.actions) {
      actions = this.$slots.actions();
    } else if (this.row.columnActionsStates[this.controller.name]) {
      actions = createVNode(resolveComponent("iBizActionToolbar"), {
        "class": this.ns.e("toolbar"),
        "action-details": (_c = this.nodeColumn) == null ? void 0 : _c.nodeColumn.deuiactionGroup.uiactionGroupDetails,
        "actions-state": this.row.columnActionsStates[this.controller.name],
        "groupLevelKeys": [50, 100],
        "onActionClick": this.onActionClick
      }, null);
    }
    return createVNode("div", {
      "class": [this.ns.b(), this.clickable && this.ns.m("clickable"), this.ns.m(this.controller.treeGrid.overflowMode), (_d = this.controller.model.cellSysCss) == null ? void 0 : _d.cssName, this.ns.is("has-action", !!actions)]
    }, [createVNode("div", {
      "class": this.ns.b("text-container")
    }, [content]), createVNode("div", {
      "class": this.ns.b("toolbar-container")
    }, [actions])]);
  }
});

export { TreeGridExFieldColumn, TreeGridExFieldColumn as default };
