'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./bi-number-report.css');

"use strict";
const IBizBINumberReport = /* @__PURE__ */ vue.defineComponent({
  name: "IBizBINumberReport",
  props: {
    model: {
      type: Object,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const ns = vue3Util.useNamespace("bi-number-report");
    const uiState = vue.ref({
      visible: false,
      // 查看明细是否显示
      yoy: 0,
      // 同比差异值,年与年比较
      qoq: 0,
      // 环比差异值,月与月比较
      currentTotal: 0,
      // 当前总数
      yoyTotal: 0,
      // 同比总数
      qoqTotal: 0
      // 环比总数
    });
    const handleCompareData = () => {
      var _a, _b;
      const codeName = (_b = (_a = props.model.measure) == null ? void 0 : _a.measureTag) == null ? void 0 : _b.toLowerCase();
      if (codeName) {
        props.data.forEach((item) => {
          if (item && item.srfperiodtype === "PoP1") {
            uiState.value.qoqTotal = Number.isNaN(Number(item[codeName])) ? 0 : Number(item[codeName]);
          } else if (item && item.srfperiodtype === "YoY1") {
            uiState.value.yoyTotal = Number.isNaN(Number(item[codeName])) ? 0 : Number(item[codeName]);
          } else if (item && item[codeName]) {
            uiState.value.currentTotal = Number.isNaN(Number(item[codeName])) ? 0 : Number(item[codeName]);
          }
        });
        uiState.value.qoq = uiState.value.currentTotal - uiState.value.qoqTotal;
        uiState.value.yoy = uiState.value.currentTotal - uiState.value.yoyTotal;
      }
    };
    handleCompareData();
    const style = vue.computed(() => {
      const tempStyle = {};
      const {
        number_fontstyle,
        number_fontsize,
        number_fontcolor
      } = props.model;
      if (number_fontstyle) {
        if (number_fontstyle.includes("bold")) {
          tempStyle.fontWeight = "bold";
        } else {
          tempStyle.fontStyle = number_fontstyle;
        }
      }
      if (number_fontsize)
        tempStyle.fontSize = "".concat(number_fontsize, "px");
      if (number_fontcolor)
        tempStyle.color = number_fontcolor;
      return tempStyle;
    });
    const handleFormat = (value) => {
      var _a;
      const format = (_a = props.model.measure) == null ? void 0 : _a.jsonFormat;
      if (format)
        return ibiz.util.text.format(String(value), format);
      return value;
    };
    const renderUpIcon = () => {
      return vue.createVNode("svg", {
        "viewBox": "0 0 16 16",
        "xmlns": "http://www.w3.org/2000/svg",
        "height": "1em",
        "width": "1em",
        "focusable": "false",
        "fill": "currentColor",
        "style": "transform: rotate(180deg);"
      }, [vue.createVNode("g", {
        "id": "aft1.Base\u57FA\u7840/1.icon\u56FE\u6807/5.navigation/caret-down",
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [vue.createVNode("path", {
        "d": "M5.02 8.233l5.952-5.952a.6.6 0 0 1 1.025.424v5.952a.6.6 0 0 1-.6.6H5.445a.6.6 0 0 1-.424-1.024z",
        "id": "aft\u8DEF\u5F84",
        "transform": "rotate(45 7.997 5.257)"
      }, null)])]);
    };
    const renderDownIcon = () => {
      return vue.createVNode("svg", {
        "viewBox": "0 0 16 16",
        "xmlns": "http://www.w3.org/2000/svg",
        "height": "1em",
        "width": "1em",
        "focusable": "false",
        "fill": "currentColor"
      }, [vue.createVNode("g", {
        "id": "aft1.Base\u57FA\u7840/1.icon\u56FE\u6807/5.navigation/caret-down",
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [vue.createVNode("path", {
        "d": "M5.02 8.233l5.952-5.952a.6.6 0 0 1 1.025.424v5.952a.6.6 0 0 1-.6.6H5.445a.6.6 0 0 1-.424-1.024z",
        "id": "aft\u8DEF\u5F84",
        "transform": "rotate(45 7.997 5.257)"
      }, null)])]);
    };
    const renderUpDownResult = (baseValue, targetValue) => {
      if (baseValue === 0) {
        if (targetValue === 0) {
          return vue.createVNode("span", null, [vue.createTextVNode("-")]);
        }
        return vue.createVNode("div", {
          "class": ns.e("up")
        }, [renderUpIcon(), vue.createVNode("span", null, [vue.createTextVNode("100%")])]);
      }
      const temp = targetValue - baseValue;
      const percentage = (Math.abs(temp) / baseValue * 100).toFixed(0);
      if (temp < 0) {
        return vue.createVNode("div", {
          "class": ns.e("down")
        }, [renderDownIcon(), vue.createVNode("span", null, [percentage, vue.createTextVNode("%")])]);
      }
      if (temp === 0) {
        return vue.createVNode("span", null, [vue.createTextVNode("-")]);
      }
      return vue.createVNode("div", {
        "class": ns.e("up")
      }, [renderUpIcon(), vue.createVNode("span", null, [percentage, vue.createTextVNode("%")])]);
    };
    return {
      ns,
      style,
      uiState,
      handleFormat,
      renderUpDownResult
    };
  },
  render() {
    var _a, _b, _c, _d;
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode("div", {
      "class": this.ns.e("content")
    }, [vue.createVNode("div", {
      "class": this.ns.em("content", "number")
    }, [vue.createVNode("span", {
      "class": this.ns.em("content", "number-text"),
      "style": this.style
    }, [this.handleFormat(this.uiState.currentTotal)])]), vue.createVNode("div", {
      "class": this.ns.em("content", "compare")
    }, [this.model.number_yoy_show === 1 && vue.createVNode("div", {
      "class": this.ns.em("content", "yoy")
    }, [vue.createVNode("div", {
      "class": this.ns.em("content", "compare-number")
    }, [vue.createVNode("span", null, [vue.createTextVNode("\u540C\u6BD4")]), vue.createVNode("span", {
      "class": [this.ns.em("content", "yoy-yoyTotal"), this.ns.is("show", (_a = this.model.number_yoy_value) == null ? void 0 : _a.includes("orgin"))]
    }, [this.uiState.yoyTotal]), vue.createVNode("span", {
      "class": [this.ns.em("content", "yoy-value"), this.ns.is("show", (_b = this.model.number_yoy_value) == null ? void 0 : _b.includes("difference"))]
    }, [vue.createTextVNode("("), this.uiState.yoy > 0 ? "+" : "", this.uiState.yoy, vue.createTextVNode(")")])]), vue.createVNode("div", {
      "class": this.ns.em("content", "icon")
    }, [this.renderUpDownResult(this.uiState.yoyTotal, this.uiState.currentTotal)])]), this.model.number_qoq_show === 1 && vue.createVNode("div", {
      "class": this.ns.em("content", "qoq")
    }, [vue.createVNode("div", {
      "class": this.ns.em("content", "compare-number")
    }, [vue.createVNode("span", null, [vue.createTextVNode("\u73AF\u6BD4")]), vue.createVNode("span", {
      "class": [this.ns.em("content", "qoq-qoqTotal"), this.ns.is("show", (_c = this.model.number_qoq_value) == null ? void 0 : _c.includes("orgin"))]
    }, [this.uiState.qoqTotal]), vue.createVNode("span", {
      "class": [this.ns.em("content", "qoq-value"), this.ns.is("show", (_d = this.model.number_qoq_value) == null ? void 0 : _d.includes("difference"))]
    }, [vue.createTextVNode("("), this.uiState.qoq > 0 ? "+" : "", this.uiState.qoq, vue.createTextVNode(")")])]), vue.createVNode("div", {
      "class": this.ns.em("content", "icon")
    }, [this.renderUpDownResult(this.uiState.qoqTotal, this.uiState.currentTotal)])])])])]);
  }
});

exports.IBizBINumberReport = IBizBINumberReport;
