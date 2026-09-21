'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var icon = require('../../icon.cjs');
require('./ai-tool-call-item.css');

"use strict";
const AIToolCallItem = /* @__PURE__ */ vue.defineComponent({
  props: {
    toolCall: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("ai-tool-call-item");
    const isExpanded = vue.ref(false);
    const handleExpandChange = () => {
      isExpanded.value = !isExpanded.value;
    };
    const onCopy = (event) => {
      event.stopPropagation();
      ibiz.util.text.copy(JSON.stringify(props.toolCall, void 0, 2));
      ibiz.message.success(ibiz.i18n.t("util.inlineAiUtil.copy"));
    };
    const formatValue = (value) => {
      if (typeof value === "string") {
        if (value.includes("Failed") || value.includes("Error") || value.includes("ERR_")) {
          return '<span class="'.concat(ns.e("error"), '">"').concat(value, '"</span>');
        }
        return '<span class="'.concat(ns.e("string"), '">"').concat(value, '"</span>');
      }
      if (typeof value === "number") {
        return '<span class="'.concat(ns.e("number"), '">').concat(value, "</span>");
      }
      if (typeof value === "boolean") {
        return '<span class="'.concat(ns.e("boolean"), '">').concat(value, "</span>");
      }
      if (value === null) {
        return '<span class="'.concat(ns.e("null"), '">null</span>');
      }
      return "";
    };
    const formatJSON = (data, indentLevel = 0) => {
      const indent = "  ".repeat(indentLevel);
      const lines2 = [];
      if (Array.isArray(data)) {
        if (data.length === 0) {
          return ["".concat(indent, '<span class="').concat(ns.e("array"), '">[]</span>')];
        }
        lines2.push("".concat(indent, '<span class="').concat(ns.e("array"), '">[</span>'));
        data.forEach((item, index) => {
          const itemLines = formatJSON(item, indentLevel + 1);
          const comma = index < data.length - 1 ? "," : "";
          if (typeof item === "object" && item !== null) {
            lines2.push(...itemLines.slice(0, -1));
            lines2.push("".concat(itemLines[itemLines.length - 1]).concat(comma));
          } else {
            lines2.push("".concat(itemLines[0]).concat(comma));
          }
        });
        lines2.push("".concat(indent, '<span class="').concat(ns.e("array"), '">]</span>'));
      } else if (typeof data === "object" && data !== null) {
        const keys = Object.keys(data);
        if (keys.length === 0) {
          return ["".concat(indent, '<span class="').concat(ns.e("property"), '">{}</span>')];
        }
        lines2.push("".concat(indent, '<span class="').concat(ns.e("property"), '">{</span>'));
        keys.forEach((key, index) => {
          const value = data[key];
          const comma = index < keys.length - 1 ? "," : "";
          const keyElement = '<span class="'.concat(ns.e("json-key"), '">"').concat(key, '":</span>');
          if (typeof value === "object" && value !== null) {
            const valueLines = formatJSON(value, indentLevel + 1);
            lines2.push("".concat(indent, "  ").concat(keyElement, " ").concat(valueLines[0].trim()));
            if (valueLines.length > 1) {
              lines2.push(...valueLines.slice(1, -1));
              lines2.push("".concat(valueLines[valueLines.length - 1]).concat(comma));
            }
          } else {
            const valueElement = formatValue(value);
            lines2.push("".concat(indent, "  ").concat(keyElement, " ").concat(valueElement).concat(comma));
          }
        });
        lines2.push("".concat(indent, '<span class="').concat(ns.e("property"), '">}</span>'));
      } else {
        lines2.push("".concat(indent).concat(formatValue(data)));
      }
      return lines2;
    };
    const lines = vue.ref([]);
    const onInit = () => {
      const items = formatJSON(props.toolCall, 0);
      lines.value = items.map((item, index) => '<span class="'.concat(ns.em("code-line", "line-number"), '">').concat(index + 1, "</span>").concat(item));
    };
    vue.onMounted(() => {
      onInit();
    });
    return {
      ns,
      lines,
      isExpanded,
      onCopy,
      handleExpandChange
    };
  },
  render() {
    var _a;
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode("div", {
      "class": this.ns.e("header"),
      "onClick": this.handleExpandChange
    }, [vue.createVNode("div", {
      "class": this.ns.e("header-left")
    }, [vue.createVNode("div", {
      "class": this.ns.em("header-left", "caption")
    }, [this.toolCall.name]), vue.createVNode("div", {
      "class": this.ns.em("header-left", "desc")
    }, [(_a = this.toolCall.parameters) == null ? void 0 : _a.desc])]), vue.createVNode("div", {
      "class": this.ns.e("header-right")
    }, [this.toolCall.error && vue.createVNode("div", {
      "class": this.ns.em("header-right", "error")
    }, [vue.createVNode("span", {
      "class": this.ns.em("header-right", "error-text")
    }, [ibiz.i18n.t("util.inlineAiUtil.error")]), vue.createVNode("div", {
      "class": this.ns.em("header-right", "icon")
    }, [icon.ErrorIcon])]), vue.createVNode("div", {
      "onClick": this.onCopy,
      "class": this.ns.em("header-right", "icon")
    }, [icon.CopyIcon]), vue.createVNode("div", {
      "class": this.ns.em("header-right", "icon")
    }, [this.isExpanded ? icon.DownIcon : icon.RightIcon])])]), this.isExpanded && vue.createVNode("div", {
      "class": this.ns.e("content")
    }, [this.lines.map((line) => {
      return vue.createVNode("div", {
        "class": this.ns.e("code-line"),
        "innerHTML": line
      }, null);
    })])]);
  }
});

exports.AIToolCallItem = AIToolCallItem;
