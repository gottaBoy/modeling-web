'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var ramda = require('ramda');
var core = require('@ibiz-template/core');
require('./grid-field-column.css');

"use strict";
const GridFieldColumn = /* @__PURE__ */ vue.defineComponent({
  name: "IBizGridFieldColumn",
  props: {
    controller: {
      type: runtime.GridFieldColumnController,
      required: true
    },
    row: {
      type: runtime.GridRowState,
      required: true
    }
  },
  setup(props) {
    var _a;
    const ns = vue3Util.useNamespace("grid-field-column");
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
    const CustomHtml = vue3Util.computedAsync(async () => {
      const html = await props.controller.getCustomHtml(props.row);
      return html;
    });
    const fieldValue = vue.computed(() => props.row.data[props.controller.fieldName]);
    const formatValue = vue.computed(() => props.controller.formatValue(fieldValue.value));
    const percent = vue.computed(() => {
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
    const hiddenEmpty = vue.computed(() => {
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
    const codeListValue = vue.computed(() => runtime.ValueExUtil.toText(props.controller.model, fieldValue.value));
    const codeListText = vue.ref("");
    const onInfoTextChange = (text) => {
      codeListText.value = text;
    };
    const tooltip = vue.computed(() => {
      if (props.controller.grid.overflowMode === "ellipsis" && ramda.isNotNil(fieldValue.value) && fieldValue.value !== "") {
        return props.controller.codeList ? codeListText.value : formatValue.value + (props.controller.model.unitName || "");
      }
      return void 0;
    });
    const onActionClick = (detail, event) => {
      return props.controller.onActionClick(detail, props.row, event);
    };
    const codeListItems = vue.ref([]);
    if (props.controller.codeList) {
      codeListItems.value = props.controller.codeListItems;
    }
    const fn = (data) => {
      if (data)
        codeListItems.value = data;
    };
    vue3Util.useCodeListListen(props.controller.model.appCodeListId, props.controller.context.srfappid, fn);
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
      return vue.createVNode(vue.resolveComponent("iBizControlShell"), {
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
    const actionToolbar = c.model.deuiactionGroup ? vue.createVNode(vue.resolveComponent("iBizActionToolbar"), {
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
      content = vue.withDirectives(vue.createVNode("span", {
        "class": this.ns.e("script"),
        "innerHTML": this.CustomHtml
      }, null), [[vue.resolveDirective("tooltip"), vue3Util.renderTooltip(this.row.data, c.model, c.grid)]]);
    } else if (panel) {
      content = vue.withDirectives(vue.createVNode(vue.resolveComponent("iBizControlShell"), {
        "data": this.row.data,
        "modelData": panel,
        "context": c.context,
        "params": c.params
      }, null), [[vue.resolveDirective("tooltip"), vue3Util.renderTooltip(this.row.data, c.model, c.grid)]]);
    } else if (c.codeList) {
      content = vue.withDirectives(vue.createVNode(vue.resolveComponent("iBizCodeList"), {
        "class": this.ns.e("text"),
        "codeListItems": this.codeListItems,
        "codeList": c.codeList,
        "value": this.codeListValue,
        "onClick": this.onTextClick,
        "onInfoTextChange": this.onInfoTextChange,
        "title": core.showTitle(this.tooltip)
      }, null), [[vue.resolveDirective("tooltip"), vue3Util.renderTooltip(this.row.data, c.model, c.grid)]]);
    } else if (this.columnType === "attachment") {
      content = vue.withDirectives(vue.createVNode(vue.resolveComponent("iBizAttachmentColumn"), {
        "data": this.row.data,
        "value": this.fieldValue,
        "controller": this.controller
      }, null), [[vue.resolveDirective("tooltip"), vue3Util.renderTooltip(this.row.data, c.model, c.grid)]]);
    } else {
      content = vue.withDirectives(vue.createVNode("span", {
        "class": this.ns.e("text"),
        "onClick": this.onTextClick,
        "title": core.showTitle(this.tooltip)
      }, [this.formatValue, this.hiddenEmpty && c.model.unitName, this.percent && "(".concat(this.percent, ")")]), [[vue.resolveDirective("tooltip"), vue3Util.renderTooltip(this.row.data, c.model, c.grid)]]);
    }
    return vue.createVNode("div", {
      "class": [this.ns.b(), c.clickable(this.row) && this.ns.m("clickable"), this.ns.m(this.controller.grid.overflowMode), (_a = this.controller.model.cellSysCss) == null ? void 0 : _a.cssName, this.ns.is("has-action", !!c.model.deuiactionGroup)],
      "onClick": this.onCellClick
    }, [c.model.deuiactionGroup ? [vue.createVNode("div", {
      "class": this.ns.b("text-container")
    }, [content]), vue.createVNode("div", {
      "class": this.ns.b("toolbar-container")
    }, [actionToolbar])] : content]);
  }
});

exports.GridFieldColumn = GridFieldColumn;
exports.default = GridFieldColumn;
