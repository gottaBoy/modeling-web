'use strict';

var vue = require('vue');
var runtime = require('@ibiz-template/runtime');
var ramda = require('ramda');
var lodashEs = require('lodash-es');
require('./code-list.css');
require('../../use/index.cjs');
var namespace = require('../../use/namespace/namespace.cjs');

"use strict";
const IBizCodeList = /* @__PURE__ */ vue.defineComponent({
  name: "IBizCodeList",
  props: {
    codeListItems: {
      type: Array
    },
    codeList: {
      type: Object,
      required: true
    },
    value: {
      type: [String, Number]
    },
    convertToCodeItemText: {
      type: Boolean,
      default: true
    },
    valueFormat: {
      type: String
    },
    unitName: {
      type: String
    },
    showMode: {
      type: String,
      default: "DEFAULT"
    }
  },
  emits: {
    infoTextChange: (_text) => true
  },
  setup(props, {
    emit
  }) {
    var _a, _b;
    const ns = namespace.useNamespace("code-list");
    const items = vue.ref([]);
    const textSeparator = ((_a = props.codeList) == null ? void 0 : _a.textSeparator) || "\u3001";
    const valueSeparator = ((_b = props.codeList) == null ? void 0 : _b.valueSeparator) || ",";
    const currentMode = vue.computed(() => {
      if (props.codeList && props.codeList.orMode) {
        return props.codeList.orMode;
      }
      return "STR";
    });
    const calcOrMode = runtime.useCalcOrMode(currentMode.value);
    vue.watch(items, (newVal) => {
      let infoText = "";
      if (newVal.length > 0) {
        infoText = newVal.map((item) => item.text).join(textSeparator);
      }
      emit("infoTextChange", infoText);
    });
    const findCodeListItem = (codelist, value) => {
      if (codelist) {
        const {
          thresholdGroup
        } = props.codeList;
        if (thresholdGroup && lodashEs.isNumber(Number(value))) {
          const findItem2 = runtime.calcThresholdRange(codelist, Number(value));
          if (findItem2) {
            return findItem2;
          }
        }
        const findItem = codelist.find((item) => item.value == value);
        if (findItem) {
          return findItem;
        }
        for (let i = 0; i < codelist.length; i++) {
          const childrenItem = findCodeListItem(codelist[i].children, value);
          if (childrenItem) {
            return childrenItem;
          }
        }
      }
    };
    vue.watch([() => props.codeListItems, () => props.value], ([codeListItems, value], [_oldCodeListItems, _oldValue]) => {
      if (ramda.isNil(value) || value === "") {
        items.value = [];
      } else {
        let values = [];
        const {
          getSelectArray
        } = calcOrMode;
        const arr = getSelectArray(value, props.codeList, codeListItems, valueSeparator, props.codeList.codeItemValueNumber);
        if (arr) {
          values = arr;
        }
        items.value = values.map((val) => {
          const findItem = findCodeListItem(codeListItems, val);
          let codeValue = val;
          if (props.convertToCodeItemText && (findItem == null ? void 0 : findItem.text)) {
            codeValue = findItem.text;
          } else {
            const {
              valueFormat,
              unitName
            } = props;
            if (valueFormat) {
              codeValue = ibiz.util.text.format("".concat(codeValue), valueFormat);
            }
            if (unitName) {
              codeValue += unitName;
            }
          }
          return {
            text: codeValue,
            color: findItem == null ? void 0 : findItem.color,
            textCls: findItem == null ? void 0 : findItem.textCls,
            sysImage: findItem == null ? void 0 : findItem.sysImage
          };
        });
      }
    }, {
      immediate: true
    });
    const emptyText = props.codeList.emptyText === ibiz.i18n.t("vue3Util.common.undefined") || !props.codeList.emptyText ? ibiz.config.common.emptyText : props.codeList.emptyText;
    return {
      items,
      ns,
      emptyText,
      textSeparator
    };
  },
  render() {
    return vue.createVNode("span", {
      "class": this.ns.b()
    }, [this.items.length === 0 ? this.emptyText : this.items.map((item, index) => {
      return [index !== 0 ? this.textSeparator : null, vue.createVNode("span", {
        "class": [this.ns.e("item"), item.textCls ? item.textCls : null],
        "style": item.color ? this.ns.cssVarBlock({
          "item-color": "".concat(item.color)
        }) : null
      }, [this.showMode !== "TEXT" && item.sysImage && vue.createVNode(vue.resolveComponent("iBizIcon"), {
        "icon": item.sysImage
      }, null), this.showMode !== "ICON" && item.text])];
    })]);
  }
});

exports.IBizCodeList = IBizCodeList;
