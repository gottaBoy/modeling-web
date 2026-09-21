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
    const ns = vue3Util.useNamespace("grid-field-column");
    const zIndex = props.controller.grid.state.zIndex;
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
    const CustomHtml = vue.ref("");
    vue.watch(() => props.row, async () => {
      CustomHtml.value = await props.controller.getCustomHtml(props.row);
    }, {
      deep: true,
      immediate: true
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
      var _a;
      const {
        controlRenders = []
      } = props.controller.model;
      return (_a = controlRenders.find((renderItem) => renderItem.renderType === "LAYOUTPANEL")) == null ? void 0 : _a.layoutPanel;
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
      onCellClick,
      onTextClick,
      onInfoTextChange,
      onActionClick,
      CustomHtml,
      fieldValue,
      formatValue,
      percent,
      codeListValue,
      tooltip,
      zIndex,
      codeListItems,
      hiddenEmpty,
      findLayoutPanel,
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
      content = vue.createVNode("span", {
        "class": this.ns.e("script"),
        "innerHTML": this.CustomHtml
      }, null);
    } else if (panel) {
      content = vue.createVNode(vue.resolveComponent("iBizControlShell"), {
        "data": this.row.data,
        "modelData": panel,
        "context": c.context,
        "params": c.params
      }, null);
    } else if (c.codeList) {
      content = vue.createVNode(vue.resolveComponent("iBizCodeList"), {
        "class": this.ns.e("text"),
        "codeListItems": this.codeListItems,
        "codeList": c.codeList,
        "value": this.codeListValue,
        "onClick": this.onTextClick,
        "onInfoTextChange": this.onInfoTextChange,
        "title": core.showTitle(this.tooltip)
      }, null);
    } else {
      content = vue.createVNode("span", {
        "class": this.ns.e("text"),
        "title": core.showTitle(this.tooltip),
        "onClick": this.onTextClick
      }, [this.formatValue, this.hiddenEmpty && c.model.unitName, this.percent && "(".concat(this.percent, ")")]);
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
