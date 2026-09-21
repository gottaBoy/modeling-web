'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./year-range-select.css');

"use strict";
var yearRangeSelect = /* @__PURE__ */ vue.defineComponent({
  name: "BIYearRangeSelect",
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  emits: ["change", "visibleChange"],
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("bi-year-range-select");
    const hoverItem = vue.ref();
    const visible = vue.ref(false);
    const leftYears = vue.ref([(/* @__PURE__ */ new Date()).getFullYear() - (/* @__PURE__ */ new Date()).getFullYear() % 10, (/* @__PURE__ */ new Date()).getFullYear() + (9 - (/* @__PURE__ */ new Date()).getFullYear() % 10)]);
    const rightYears = vue.ref([(/* @__PURE__ */ new Date()).getFullYear() + (10 - (/* @__PURE__ */ new Date()).getFullYear() % 10), (/* @__PURE__ */ new Date()).getFullYear() + (19 - (/* @__PURE__ */ new Date()).getFullYear() % 10)]);
    const years = vue.ref({
      start: void 0,
      end: void 0
    });
    const prevYears = vue.ref([]);
    const nextYears = vue.ref([]);
    const init = () => {
      leftYears.value = [(/* @__PURE__ */ new Date()).getFullYear() - (/* @__PURE__ */ new Date()).getFullYear() % 10, (/* @__PURE__ */ new Date()).getFullYear() + (9 - (/* @__PURE__ */ new Date()).getFullYear() % 10)];
      rightYears.value = [(/* @__PURE__ */ new Date()).getFullYear() + (10 - (/* @__PURE__ */ new Date()).getFullYear() % 10), (/* @__PURE__ */ new Date()).getFullYear() + (19 - (/* @__PURE__ */ new Date()).getFullYear() % 10)];
    };
    const computedBatchYears = (left, right) => {
      let value = left - 1;
      const tempYears = [];
      while (value <= right + 1) {
        tempYears.push(value);
        value += 1;
      }
      return tempYears;
    };
    prevYears.value = computedBatchYears(leftYears.value[0], leftYears.value[1]);
    nextYears.value = computedBatchYears(rightYears.value[0], rightYears.value[1]);
    vue.watch(() => props.value, (newVal) => {
      if (newVal && Array.isArray(newVal) && newVal.length > 0) {
        const start = Number(newVal[0]);
        const end = Number(newVal[1]);
        if (!Number.isNaN(start) && !Number.isNaN(end)) {
          leftYears.value = [start - start % 10, start + (9 - start % 10)];
          years.value.start = start;
          rightYears.value = [end - end % 10, end + (9 - end % 10)];
          years.value.end = end;
        }
      } else {
        init();
      }
    }, {
      immediate: true,
      deep: true
    });
    const onReduce = (tag) => {
      if (tag === "left") {
        leftYears.value[0] -= 10;
        leftYears.value[1] -= 10;
        prevYears.value = computedBatchYears(leftYears.value[0], leftYears.value[1]);
      } else {
        rightYears.value[0] -= 10;
        rightYears.value[1] -= 10;
        nextYears.value = computedBatchYears(rightYears.value[0], rightYears.value[1]);
      }
    };
    const onAdd = (tag) => {
      if (tag === "left") {
        leftYears.value[0] += 10;
        leftYears.value[1] += 10;
        prevYears.value = computedBatchYears(leftYears.value[0], leftYears.value[1]);
      } else {
        rightYears.value[0] += 10;
        rightYears.value[1] += 10;
        nextYears.value = computedBatchYears(rightYears.value[0], rightYears.value[1]);
      }
    };
    const renderLeftIcon = (tag) => {
      if (tag === "right" && leftYears.value && rightYears.value && leftYears.value.at(-1) === rightYears.value[0] - 1) {
        return vue.createVNode("div", null, null);
      }
      return vue.createVNode("svg", {
        "onClick": () => onReduce(tag),
        "viewBox": "0 0 16 16",
        "xmlns": "http://www.w3.org/2000/svg",
        "height": "1em",
        "width": "1em",
        "focusable": "false",
        "fill": "currentColor"
      }, [vue.createVNode("g", {
        "id": "aav1.icon\u56FE\u6807/5.navigation/angle-double-left",
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [vue.createVNode("path", {
        "d": "M7.984 7l4.75 4.762-.832.817-3.924-3.924-3.99 3.99-.825-.836L7.973 7l.005.006L7.984 7zm0-4l4.75 4.762-.832.817-3.924-3.924-3.99 3.99-.825-.836L7.973 3l.005.006L7.984 3z",
        "id": "aav\u5F62\u72B6\u7ED3\u5408",
        "transform": "rotate(-90 7.949 7.822)"
      }, null)])]);
    };
    const renderRightIcon = (tag) => {
      if (tag === "left" && leftYears.value && rightYears.value && leftYears.value.at(-1) === rightYears.value[0] - 1) {
        return vue.createVNode("div", null, null);
      }
      return vue.createVNode("svg", {
        "onClick": () => onAdd(tag),
        "viewBox": "0 0 16 16",
        "xmlns": "http://www.w3.org/2000/svg",
        "height": "1em",
        "width": "1em",
        "focusable": "false",
        "fill": "currentColor"
      }, [vue.createVNode("g", {
        "id": "aaw1.icon\u56FE\u6807/5.navigation/angle-double-right",
        "stroke-width": "1",
        "fill-rule": "evenodd"
      }, [vue.createVNode("path", {
        "d": "M7.984 7.3l4.75 4.762-.832.817-3.924-3.924-3.99 3.99-.825-.836L7.973 7.3l.005.006.006-.006zm0-4l4.75 4.762-.832.817-3.924-3.924-3.99 3.99-.825-.836L7.973 3.3l.005.006.006-.006z",
        "id": "aaw\u5F62\u72B6\u7ED3\u5408",
        "transform": "rotate(90 7.949 8.122)"
      }, null)])]);
    };
    const emitFunc = () => {
      var _a, _b;
      emit("change", [(_a = years.value.start) == null ? void 0 : _a.toString(), (_b = years.value.end) == null ? void 0 : _b.toString()]);
      visible.value = false;
    };
    const onItemClick = (year) => {
      if (years.value.start && years.value.end) {
        years.value.start = void 0;
        years.value.end = void 0;
      }
      if (!years.value.start) {
        years.value.start = year;
      } else {
        if (year >= years.value.start) {
          years.value.end = year;
        } else {
          const tempvalue = years.value.start;
          years.value.start = year;
          years.value.end = tempvalue;
        }
        emitFunc();
      }
    };
    const computedSelectArea = (year) => {
      if (years.value.start && years.value.end && year >= years.value.start && year <= years.value.end) {
        return true;
      }
      return false;
    };
    const computedHoverSelectArea = (year) => {
      if (years.value.start && !years.value.end && hoverItem.value) {
        let tempStart = years.value.start;
        let tempEnd = hoverItem.value;
        if (hoverItem.value < years.value.start) {
          tempEnd = years.value.start;
          tempStart = hoverItem.value;
        }
        if (year >= tempStart && year <= tempEnd) {
          return true;
        }
      }
      return false;
    };
    const computedSelected = (year) => {
      if (years.value.start === year || years.value.end === year) {
        return true;
      }
      return false;
    };
    const isCurYear = (year) => {
      return year === (/* @__PURE__ */ new Date()).getFullYear();
    };
    const onMouseHover = (year) => {
      hoverItem.value = year;
    };
    const onMouseleave = () => {
      hoverItem.value = null;
    };
    const renderSelect = () => {
      var _a, _b;
      return vue.createVNode("div", {
        "class": ns.e("date-panel")
      }, [vue.createVNode("div", {
        "class": ns.em("date-panel", "left")
      }, [vue.createVNode("div", {
        "class": ns.em("date-panel", "left-header")
      }, [renderLeftIcon("left"), vue.createVNode("span", null, [(_a = leftYears.value) == null ? void 0 : _a.join("-")]), renderRightIcon("left")]), vue.createVNode("div", {
        "class": ns.em("date-panel", "left-content")
      }, [prevYears.value.map((item) => {
        return vue.createVNode("div", {
          "class": [ns.em("date-panel", "left-item"), ns.is("selected", computedSelected(item)), ns.is("include", computedSelectArea(item)), ns.is("hover", hoverItem.value === item), ns.is("curyear", isCurYear(item)), ns.is("hoverinclude", computedHoverSelectArea(item))],
          "onClick": () => onItemClick(item),
          "onMouseenter": () => onMouseHover(item),
          "onMouseleave": () => onMouseleave()
        }, [item]);
      })])]), vue.createVNode("div", {
        "class": ns.em("date-panel", "right")
      }, [vue.createVNode("div", {
        "class": ns.em("date-panel", "right-header")
      }, [renderLeftIcon("right"), vue.createVNode("span", null, [(_b = rightYears.value) == null ? void 0 : _b.join("-")]), renderRightIcon("right")]), vue.createVNode("div", {
        "class": ns.em("date-panel", "right-content")
      }, [nextYears.value.map((item) => {
        return vue.createVNode("div", {
          "class": [ns.em("date-panel", "right-item"), ns.is("selected", computedSelected(item)), ns.is("include", computedSelectArea(item)), ns.is("hover", hoverItem.value === item), ns.is("curyear", isCurYear(item)), ns.is("hoverinclude", computedHoverSelectArea(item))],
          "onClick": () => onItemClick(item),
          "onMouseenter": () => onMouseHover(item),
          "onMouseleave": () => onMouseleave()
        }, [item]);
      })])])]);
    };
    const visibleChange = (tag) => {
      visible.value = tag;
      emit("visibleChange", tag);
    };
    const handleClose = () => {
      visible.value = true;
    };
    const handleOpen = () => {
      visible.value = true;
    };
    return {
      ns,
      visible,
      renderSelect,
      handleClose,
      handleOpen,
      visibleChange
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode(vue.resolveComponent("el-popover"), {
      "visible": this.visible,
      "onUpdate:visible": ($event) => this.visible = $event,
      "trigger": "click",
      "width": 600,
      "placement": "top",
      "onAfterEnter": () => this.visibleChange(true),
      "onAfterLeave": () => this.visibleChange(false)
    }, {
      default: () => {
        return this.renderSelect();
      },
      reference: () => {
        return vue.createVNode("div", null, null);
      }
    })]);
  }
});

exports.default = yearRangeSelect;
