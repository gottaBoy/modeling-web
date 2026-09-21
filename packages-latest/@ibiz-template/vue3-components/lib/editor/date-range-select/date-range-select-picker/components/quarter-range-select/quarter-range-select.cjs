'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('./quarter-range-select.css');

"use strict";
var quarterRangeSelect = /* @__PURE__ */ vue.defineComponent({
  name: "BIQuarterRangeSelect",
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
    const ns = vue3Util.useNamespace("bi-quarter-range-select");
    const leftYear = vue.ref();
    const rightYear = vue.ref();
    const startQuarter = vue.ref();
    const endQuarter = vue.ref();
    const hoverItem = vue.ref();
    const visible = vue.ref(false);
    const quarterItems = ["Q1", "Q2", "Q3", "Q4"];
    const computedDate = (year, index, mode) => {
      let month = index * 3;
      if (mode === "START") {
        month -= 2;
      }
      const tempDate = new Date("".concat(year, "-").concat(month));
      if (mode === "START") {
        tempDate.setDate(1);
        tempDate.setHours(0, 0, 0, 0);
      } else {
        const big = [1, 3, 5, 7, 8, 10, 12];
        if (big.includes(month)) {
          tempDate.setDate(31);
        } else {
          tempDate.setDate(30);
        }
        tempDate.setHours(23, 59, 59, 0);
      }
      return tempDate;
    };
    const init = () => {
      leftYear.value = (/* @__PURE__ */ new Date()).getFullYear();
      rightYear.value = (/* @__PURE__ */ new Date()).getFullYear() + 1;
      startQuarter.value = null;
      endQuarter.value = null;
    };
    vue.watch(() => props.value, (newVal) => {
      if (newVal && Array.isArray(newVal) && newVal.length > 0) {
        const startDate = new Date(newVal[0]);
        const endDate = new Date(newVal[1]);
        leftYear.value = startDate.getFullYear();
        const tempEnd = endDate.getFullYear();
        if (leftYear.value === tempEnd) {
          rightYear.value = leftYear.value + 1;
        } else {
          rightYear.value = tempEnd;
        }
        const startIndex = Math.ceil((startDate.getMonth() + 1) / 3);
        const endIndex = Math.ceil((endDate.getMonth() + 1) / 3);
        startQuarter.value = computedDate(leftYear.value, startIndex, "START");
        endQuarter.value = computedDate(tempEnd, endIndex, "END");
      } else {
        init();
      }
    }, {
      immediate: true,
      deep: true
    });
    const onReduce = (tag) => {
      if (tag === "left") {
        leftYear.value -= 1;
      } else {
        rightYear.value -= 1;
      }
    };
    const onAdd = (tag) => {
      if (tag === "left") {
        leftYear.value += 1;
      } else {
        rightYear.value += 1;
      }
    };
    const renderLeftIcon = (tag) => {
      if (tag === "right" && leftYear.value === rightYear.value) {
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
      if (tag === "left" && leftYear.value === rightYear.value) {
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
      emit("change", [startQuarter.value.toLocaleDateString(), endQuarter.value.toLocaleDateString()]);
      visible.value = false;
    };
    const onItemClick = (year, index) => {
      if (startQuarter.value && endQuarter.value) {
        startQuarter.value = null;
        endQuarter.value = null;
      }
      if (!startQuarter.value) {
        startQuarter.value = computedDate(year, index, "START");
      } else {
        const tempStartYear = startQuarter.value.getFullYear();
        const tempStartMonth = startQuarter.value.getMonth() + 1;
        const tempStartQuarter = Math.ceil(tempStartMonth / 3);
        if (year > tempStartYear) {
          endQuarter.value = computedDate(year, index, "END");
        } else if (year < tempStartYear) {
          endQuarter.value = computedDate(tempStartYear, tempStartQuarter, "END");
          startQuarter.value = computedDate(year, index, "START");
        } else if (index >= tempStartQuarter) {
          endQuarter.value = computedDate(year, index, "END");
        } else {
          endQuarter.value = computedDate(tempStartYear, tempStartQuarter, "END");
          startQuarter.value = computedDate(year, index, "START");
        }
        emitFunc();
      }
    };
    const computedSelectArea = (year, index) => {
      if (leftYear.value && rightYear.value && startQuarter.value && endQuarter.value) {
        const tempStartYear = startQuarter.value.getFullYear();
        const tempEndYear = endQuarter.value.getFullYear();
        const tempStartMonth = startQuarter.value.getMonth() + 1;
        const tempEndMonth = endQuarter.value.getMonth() + 1;
        const tempStartQuarter = Math.ceil(tempStartMonth / 3);
        const tempEndQuarter = Math.ceil(tempEndMonth / 3);
        if (year > tempStartYear && year < tempEndYear) {
          return true;
        }
        if (year === tempStartYear && year < tempEndYear && index >= tempStartQuarter) {
          return true;
        }
        if (year === tempEndYear && year > tempStartYear && index <= tempEndQuarter) {
          return true;
        }
        if (year === tempStartYear && year === tempEndYear && index <= tempEndQuarter && index >= tempStartQuarter) {
          return true;
        }
      }
      return false;
    };
    const computedHoverSelectArea = (year, index) => {
      if (leftYear.value && rightYear.value && startQuarter.value && !endQuarter.value && hoverItem.value) {
        const tempHoverYear = hoverItem.value.getFullYear();
        const tempHoverMonth = hoverItem.value.getMonth() + 1;
        const tempHoverQuarter = Math.ceil(tempHoverMonth / 3);
        let tempStart = startQuarter.value;
        let tempEnd = hoverItem.value;
        const startDateYear = startQuarter.value.getFullYear();
        const startDateMonth = startQuarter.value.getMonth() + 1;
        const startDateQuarter = Math.ceil(startDateMonth / 3);
        if (tempHoverYear <= startDateYear && tempHoverQuarter <= startDateQuarter) {
          tempEnd = startQuarter.value;
          tempStart = hoverItem.value;
        }
        const tempStartYear = tempStart.getFullYear();
        const tempEndYear = tempEnd.getFullYear();
        const tempStartMonth = tempStart.getMonth() + 1;
        const tempEndMonth = tempEnd.getMonth() + 1;
        const tempStartQuarter = Math.ceil(tempStartMonth / 3);
        const tempEndQuarter = Math.ceil(tempEndMonth / 3);
        if (year > tempStartYear && year < tempEndYear) {
          return true;
        }
        if (year === tempStartYear && year < tempEndYear && index >= tempStartQuarter) {
          return true;
        }
        if (year === tempEndYear && year > tempStartYear && index <= tempEndQuarter) {
          return true;
        }
        if (tempHoverYear <= startDateYear && tempHoverQuarter < startDateQuarter && year === tempHoverYear && index >= tempHoverQuarter && index <= startDateQuarter) {
          return true;
        }
        if (tempHoverYear >= startDateYear && tempHoverQuarter > startDateQuarter && year === tempHoverYear && index <= tempHoverQuarter && index >= startDateQuarter) {
          return true;
        }
      }
      return false;
    };
    const computedSelected = (year, index) => {
      if (startQuarter.value) {
        const tempStartYear = startQuarter.value.getFullYear();
        const tempStartMonth = startQuarter.value.getMonth() + 1;
        const tempStartQuarter = Math.ceil(tempStartMonth / 3);
        if (year === tempStartYear && tempStartQuarter === index) {
          return true;
        }
      }
      if (endQuarter.value) {
        const tempEndYear = endQuarter.value.getFullYear();
        const tempEndMonth = endQuarter.value.getMonth() + 1;
        const tempEndQuarter = Math.ceil(tempEndMonth / 3);
        if (year === tempEndYear && tempEndQuarter === index) {
          return true;
        }
      }
      return false;
    };
    const computedHover = (year, index) => {
      if (hoverItem.value) {
        return hoverItem.value.getTime() === computedDate(year, index, "START").getTime();
      }
      return false;
    };
    const computedCurQuarter = (year, index) => {
      const curDate = computedDate(year, index, "START");
      const toDay = /* @__PURE__ */ new Date();
      const tempStartMonth = curDate.getMonth() + 1;
      const tempStartQuarter = Math.ceil(tempStartMonth / 3);
      const toYear = toDay.getFullYear();
      const tempToDayMonth = toDay.getMonth() + 1;
      const tempToDayQuarter = Math.ceil(tempToDayMonth / 3);
      return year === toYear && tempStartQuarter === tempToDayQuarter;
    };
    const onMouseHover = (year, index) => {
      hoverItem.value = computedDate(year, index, "START");
    };
    const onMouseleave = () => {
      hoverItem.value = null;
    };
    const renderSelect = () => {
      return vue.createVNode("div", {
        "class": ns.e("date-panel")
      }, [vue.createVNode("div", {
        "class": ns.em("date-panel", "left")
      }, [vue.createVNode("div", {
        "class": ns.em("date-panel", "left-header")
      }, [renderLeftIcon("left"), vue.createVNode("span", null, [leftYear.value, ibiz.i18n.t("editor.dateRangeSelect.year")]), renderRightIcon("left")]), vue.createVNode("div", {
        "class": ns.em("date-panel", "left-content")
      }, [quarterItems.map((item, index) => {
        return vue.createVNode("div", {
          "class": [ns.em("date-panel", "left-item"), ns.is("include", computedSelectArea(leftYear.value, index + 1)), ns.is("selected", computedSelected(leftYear.value, index + 1)), ns.is("hoverinclude", computedHoverSelectArea(leftYear.value, index + 1)), ns.is("curquarter", computedCurQuarter(leftYear.value, index + 1)), ns.is("hover", computedHover(leftYear.value, index + 1))],
          "onClick": () => onItemClick(leftYear.value, index + 1),
          "onMouseenter": () => onMouseHover(leftYear.value, index + 1),
          "onMouseleave": () => onMouseleave()
        }, [item]);
      })])]), vue.createVNode("div", {
        "class": ns.em("date-panel", "right")
      }, [vue.createVNode("div", {
        "class": ns.em("date-panel", "right-header")
      }, [renderLeftIcon("right"), vue.createVNode("span", null, [rightYear.value, ibiz.i18n.t("editor.dateRangeSelect.year")]), renderRightIcon("right")]), vue.createVNode("div", {
        "class": ns.em("date-panel", "right-content")
      }, [quarterItems.map((item, index) => {
        return vue.createVNode("div", {
          "class": [ns.em("date-panel", "right-item"), ns.is("selected", computedSelected(rightYear.value, index + 1)), ns.is("include", computedSelectArea(rightYear.value, index + 1)), ns.is("hoverinclude", computedHoverSelectArea(rightYear.value, index + 1)), ns.is("curquarter", computedCurQuarter(rightYear.value, index + 1)), ns.is("hover", computedHover(rightYear.value, index + 1))],
          "onClick": () => onItemClick(rightYear.value, index + 1),
          "onMouseenter": () => onMouseHover(rightYear.value, index + 1),
          "onMouseleave": () => onMouseleave()
        }, [item]);
      })])])]);
    };
    const handleClose = () => {
      visible.value = false;
    };
    const handleOpen = () => {
      visible.value = true;
    };
    const visibleChange = (_visible) => {
      emit("visibleChange", _visible);
    };
    return {
      ns,
      renderSelect,
      visible,
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
      "popper-class": this.ns.b("quarter-pop"),
      "placement": "right",
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

exports.default = quarterRangeSelect;
