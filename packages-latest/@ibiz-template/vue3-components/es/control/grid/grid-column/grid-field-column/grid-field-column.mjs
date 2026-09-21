import { defineComponent, createVNode, resolveComponent, withDirectives, resolveDirective, computed, ref } from 'vue';
import { renderTooltip, useNamespace, computedAsync, useCodeListListen } from '@ibiz-template/vue3-util';
import { ValueExUtil, GridRowState, GridFieldColumnController } from '@ibiz-template/runtime';
import { isNotNil } from 'ramda';
import { showTitle } from '@ibiz-template/core';
import './grid-field-column.css';

"use strict";
const GridFieldColumn = /* @__PURE__ */ defineComponent({
  name: "IBizGridFieldColumn",
  props: {
    controller: {
      type: GridFieldColumnController,
      required: true
    },
    row: {
      type: GridRowState,
      required: true
    }
  },
  setup(props) {
    var _a;
    const ns = useNamespace("grid-field-column");
    const zIndex = props.controller.grid.state.zIndex;
    const columnType = (_a = props.controller.model.userParam) == null ? void 0 : _a.columntype;
    const onCellClick = (event) => {
      if (props.controller.hasAction) {
        event.stopPropagation();
        props.controller.triggerAction(props.row, event);
      }
    };
    const onTextClick = (event) => {
      if (props.controller.isLinkColumn) {
        event.stopPropagation();
        props.controller.openLinkView(props.row, event);
      }
    };
    const CustomHtml = computedAsync(async () => {
      const html = await props.controller.getCustomHtml(props.row);
      return html;
    });
    const fieldValue = computed(() => props.row.data[props.controller.fieldName]);
    const formatValue = computed(() => props.controller.formatValue(fieldValue.value));
    const percent = computed(() => {
      const {
        grid,
        fieldName
      } = props.controller;
      if (!grid.percentkeys.includes(fieldName)) {
        return "";
      }
      const value = Number(fieldValue.value);
      if (!Number.isNaN(value)) {
        const {
          totalResult = {}
        } = grid.state;
        const total = totalResult[fieldName];
        if (total && !Number.isNaN(total)) {
          return ibiz.util.text.format("".concat(value / total), "0.##%");
        }
      }
      return "";
    });
    const hiddenEmpty = computed(() => {
      if (fieldValue.value) {
        if (props.controller.grid.emptyHiddenUnit) {
          if (formatValue.value) {
            return true;
          }
          return false;
        }
        return true;
      }
      return false;
    });
    const codeListValue = computed(() => ValueExUtil.toText(props.controller.model, fieldValue.value));
    const codeListText = ref("");
    const onInfoTextChange = (text) => {
      codeListText.value = text;
    };
    const tooltip = computed(() => {
      if (props.controller.grid.overflowMode === "ellipsis" && isNotNil(fieldValue.value) && fieldValue.value !== "") {
        return props.controller.codeList ? codeListText.value : formatValue.value + (props.controller.model.unitName || "");
      }
      return void 0;
    });
    const onActionClick = (detail, event) => {
      return props.controller.onActionClick(detail, props.row, event);
    };
    const codeListItems = ref([]);
    if (props.controller.codeList) {
      codeListItems.value = props.controller.codeListItems;
    }
    const fn = (data) => {
      if (data)
        codeListItems.value = data;
    };
    useCodeListListen(props.controller.model.appCodeListId, props.controller.context.srfappid, fn);
    const findLayoutPanel = () => {
      var _a2;
      const {
        controlRenders = [],
        id
      } = props.controller.model;
      return (_a2 = controlRenders.find((renderItem) => renderItem.renderType === "LAYOUTPANEL" && !["".concat(id == null ? void 0 : id.toLowerCase(), "_tooltip"), "".concat(id == null ? void 0 : id.toLowerCase(), "_edit_tooltip")].includes(renderItem.id))) == null ? void 0 : _a2.layoutPanel;
    };
    const renderPanelItemLayout = (item, modelData) => {
      const {
        context,
        params
      } = props.controller;
      return createVNode(resolveComponent("iBizControlShell"), {
        "data": item,
        "modelData": modelData,
        "context": context,
        "params": params
      }, null);
    };
    return {
      ns,
      zIndex,
      percent,
      tooltip,
      CustomHtml,
      fieldValue,
      columnType,
      formatValue,
      hiddenEmpty,
      codeListValue,
      codeListItems,
      onCellClick,
      onTextClick,
      onActionClick,
      findLayoutPanel,
      onInfoTextChange,
      renderPanelItemLayout
    };
  },
  render() {
    var _a;
    const c = this.controller;
    const actionToolbar = c.model.deuiactionGroup ? createVNode(resolveComponent("iBizActionToolbar"), {
      "class": this.ns.e("toolbar"),
      "action-details": c.model.deuiactionGroup.uiactionGroupDetails,
      "actions-state": this.row.uiActionGroupStates[this.controller.model.codeName],
      "groupLevelKeys": [50, 100],
      "actionCallBack": this.onActionClick,
      "zIndex": this.zIndex
    }, null) : null;
    let content = null;
    const panel = this.findLayoutPanel();
    if (c.isCustomCode) {
      content = withDirectives(createVNode("span", {
        "class": this.ns.e("script"),
        "innerHTML": this.CustomHtml
      }, null), [[resolveDirective("tooltip"), renderTooltip(this.row.data, c.model, c.grid)]]);
    } else if (panel) {
      content = withDirectives(createVNode(resolveComponent("iBizControlShell"), {
        "data": this.row.data,
        "modelData": panel,
        "context": c.context,
        "params": c.params
      }, null), [[resolveDirective("tooltip"), renderTooltip(this.row.data, c.model, c.grid)]]);
    } else if (c.codeList) {
      content = withDirectives(createVNode(resolveComponent("iBizCodeList"), {
        "class": this.ns.e("text"),
        "codeListItems": this.codeListItems,
        "codeList": c.codeList,
        "value": this.codeListValue,
        "onClick": this.onTextClick,
        "onInfoTextChange": this.onInfoTextChange,
        "title": showTitle(this.tooltip)
      }, null), [[resolveDirective("tooltip"), renderTooltip(this.row.data, c.model, c.grid)]]);
    } else if (this.columnType === "attachment") {
      content = withDirectives(createVNode(resolveComponent("iBizAttachmentColumn"), {
        "data": this.row.data,
        "value": this.fieldValue,
        "controller": this.controller
      }, null), [[resolveDirective("tooltip"), renderTooltip(this.row.data, c.model, c.grid)]]);
    } else {
      content = withDirectives(createVNode("span", {
        "class": this.ns.e("text"),
        "onClick": this.onTextClick,
        "title": showTitle(this.tooltip)
      }, [this.formatValue, this.hiddenEmpty && c.model.unitName, this.percent && "(".concat(this.percent, ")")]), [[resolveDirective("tooltip"), renderTooltip(this.row.data, c.model, c.grid)]]);
    }
    return createVNode("div", {
      "class": [this.ns.b(), c.clickable(this.row) && this.ns.m("clickable"), this.ns.m(this.controller.grid.overflowMode), (_a = this.controller.model.cellSysCss) == null ? void 0 : _a.cssName, this.ns.is("has-action", !!c.model.deuiactionGroup)],
      "onClick": this.onCellClick
    }, [c.model.deuiactionGroup ? [createVNode("div", {
      "class": this.ns.b("text-container")
    }, [content]), createVNode("div", {
      "class": this.ns.b("toolbar-container")
    }, [actionToolbar])] : content]);
  }
});

export { GridFieldColumn, GridFieldColumn as default };
