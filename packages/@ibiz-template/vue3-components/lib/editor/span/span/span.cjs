'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./span.css');
var ramda = require('ramda');
var core = require('@ibiz-template/core');
var dayjs = require('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat');

"use strict";
dayjs.extend(customParseFormat);
function isValidDateFormat(dateStr, format) {
  if (dateStr === format) {
    return false;
  }
  return dayjs(dateStr, format, true).isValid();
}
const IBizSpan = /* @__PURE__ */ vue.defineComponent({
  name: "IBizSpan",
  props: vue3Util.getSpanProps(),
  setup(props, {
    emit
  }) {
    var _a;
    const ns = vue3Util.useNamespace("span");
    const c = props.controller;
    const text = vue.ref("");
    const codeList = c.codeList;
    const {
      valueFormat,
      dataType,
      unitName
    } = c.parent;
    const spanTitle = vue.ref("");
    const textSeparator = c.model.textSeparator || ((_a = c.editorParams) == null ? void 0 : _a.TEXTSEPARATOR) || ",";
    vue.watch(() => props.value, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        if (ramda.isNil(newVal)) {
          text.value = "";
          return;
        }
        if (c.model.valueType === "SIMPLES") {
          text.value = newVal.join(textSeparator);
        } else if (c.model.valueType === "OBJECT") {
          text.value = newVal[c.model.objectNameField ? c.model.objectNameField : "srfmajortext"];
        } else if (c.model.valueType === "OBJECTS") {
          const tempValue = [];
          newVal.forEach((_item) => {
            tempValue.push(_item[c.model.objectNameField ? c.model.objectNameField : "srfmajortext"]);
          });
          text.value = tempValue.join(textSeparator);
        } else if (c.model.editorType === "ADDRESSPICKUP") {
          try {
            const tempValue = [];
            const items2 = JSON.parse(newVal);
            items2.forEach((_item) => {
              tempValue.push(_item[c.model.objectNameField ? c.model.objectNameField : "srfmajortext"]);
            });
            text.value = tempValue.join(textSeparator);
          } catch (error) {
            ibiz.log.error("\u6807\u7B7E\u5730\u5740\u9009\u62E9\u5668\u7684\u503C\u4E0D\u7B26\u5408JSON\u683C\u5F0F".concat(newVal));
          }
        } else if (valueFormat) {
          try {
            if (dataType != null && core.DataTypes.isDate(dataType)) {
              text.value = dayjs(newVal).format(valueFormat);
            } else {
              const tempVal = dayjs(newVal).format(valueFormat);
              if (isValidDateFormat(tempVal, valueFormat)) {
                text.value = tempVal;
              } else if (!Number.isNaN(Number(newVal)) && Number.isFinite(Number(newVal))) {
                text.value = "".concat(ibiz.util.text.format(Number(newVal), valueFormat));
              } else {
                text.value = ibiz.util.text.format("".concat(newVal), valueFormat);
              }
            }
          } catch (error) {
            text.value = "".concat(newVal);
            ibiz.log.error("".concat(newVal, " \u503C\u683C\u5F0F\u5316\u9519\u8BEF"));
          }
        } else if (core.isEmoji("".concat(newVal))) {
          text.value = core.base64ToStr("".concat(newVal));
        } else {
          text.value = "".concat(newVal);
        }
        if (unitName) {
          if (c.emptyHiddenUnit) {
            if (text.value) {
              text.value += unitName;
            }
          } else {
            text.value += unitName;
          }
        }
      }
    }, {
      immediate: true
    });
    const items = vue.ref([]);
    if (codeList) {
      vue.watch(() => props.data, (newVal) => {
        c.loadCodeList(newVal).then((_codeList) => {
          items.value = _codeList;
        });
      }, {
        immediate: true,
        deep: true
      });
    }
    const fn = (data) => {
      if (data) {
        items.value = data;
      }
    };
    vue3Util.useCodeListListen(c.model.appCodeListId, c.context.srfappid, fn);
    const {
      componentRef: editorRef
    } = vue3Util.useFocusAndBlur(() => emit("focus"), () => emit("blur"));
    const showFormDefaultContent = vue.computed(() => {
      if (props.controlParams && props.controlParams.editmode === "hover" && !props.readonly) {
        return true;
      }
      return false;
    });
    return {
      ns,
      c,
      text,
      editorRef,
      items,
      valueFormat,
      unitName,
      showFormDefaultContent,
      spanTitle
    };
  },
  render() {
    let content = null;
    if (this.c.codeList) {
      if (this.c.codeList.thresholdGroup) {
        content = this.items.length > 0 && vue.createVNode(vue.resolveComponent("iBizCodeList"), {
          "class": this.ns.e("code-list"),
          "codeListItems": this.items,
          "codeList": this.c.codeList,
          "value": this.value,
          "valueFormat": this.valueFormat,
          "unitName": this.unitName,
          "convertToCodeItemText": this.c.convertToCodeItemText
        }, null);
      } else {
        content = this.items.length > 0 && vue.createVNode(vue.resolveComponent("iBizCodeList"), {
          "class": this.ns.e("code-list"),
          "codeListItems": this.items,
          "codeList": this.c.codeList,
          "value": this.text
        }, null);
      }
    } else if (this.text) {
      content = this.text;
      this.spanTitle = this.text;
    } else {
      content = ibiz.config.common.emptyText;
    }
    const isEllipsis = this.c.editorParams.overflowMode === "ellipsis" || this.c.model.wrapMode === "NOWRAP";
    return vue.createVNode("span", {
      "class": [this.ns.b(), this.readonly ? this.ns.m("readonly") : "", this.ns.is("show-default", this.showFormDefaultContent), this.ns.is("is-ellipsis", isEllipsis)],
      "ref": "editorRef",
      "title": core.showTitle(this.spanTitle)
    }, [content]);
  }
});

exports.IBizSpan = IBizSpan;
