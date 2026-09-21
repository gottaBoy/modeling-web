'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var dayjs = require('dayjs');
require('../../../../../node_modules/.pnpm/dayjs@1.11.13/node_modules/dayjs/locale/zh-cn.cjs');
require('./week-range-select.css');

"use strict";
var weekRangeSelect = /* @__PURE__ */ vue.defineComponent({
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
    const ns = vue3Util.useNamespace("bi-week-range");
    const curValue = vue.ref();
    const weekRangeRef = vue.ref();
    const visible = vue.ref(false);
    const Today = dayjs(/* @__PURE__ */ new Date()).format("YYYY/MM/DD");
    const start = vue.ref();
    const end = vue.ref();
    let clicked = false;
    const hoverItem = vue.ref();
    const initSelectDate = () => {
      start.value = null;
      end.value = null;
    };
    vue.watch(() => props.value, (newVal) => {
      if (newVal && Array.isArray(newVal)) {
        start.value = new Date(newVal[0]);
        end.value = new Date(newVal[1]);
      } else {
        initSelectDate();
      }
    }, {
      immediate: true,
      deep: true
    });
    const computedDateWeekSunday = (date) => {
      const day = date.getDay();
      let weekday = day;
      if (day === 0) {
        weekday = 7;
      }
      const sunday = date.getTime() + (7 - weekday) * 24 * 60 * 60 * 1e3;
      const tempEnd = new Date(sunday);
      tempEnd.setHours(23, 59, 59, 0);
      return tempEnd;
    };
    const computedDateWeekMonday = (date) => {
      const day = date.getDay();
      let weekday = day;
      if (day === 0) {
        weekday = 7;
      }
      const monday = date.getTime() - (weekday - 1) * 24 * 60 * 60 * 1e3;
      const tempStart = new Date(monday);
      tempStart.setHours(0, 0, 0, 0);
      return tempStart;
    };
    const isInRange = (cell) => {
      const {
        date
      } = cell;
      const curTime = date.getTime();
      if (start.value && end.value) {
        const startTime = start.value.getTime();
        const endTime = end.value.getTime();
        if (curTime >= startTime && curTime <= endTime) {
          return true;
        }
      }
      return false;
    };
    const isEnded = (cell) => {
      const {
        date
      } = cell;
      if (end.value) {
        const sunday = computedDateWeekSunday(end.value);
        const monday = computedDateWeekMonday(end.value);
        if (date.getTime() >= monday.getTime() && date.getTime() <= sunday.getTime()) {
          return true;
        }
        return false;
      }
    };
    const isStarted = (cell) => {
      const {
        date
      } = cell;
      if (start.value) {
        const sunday = computedDateWeekSunday(start.value);
        const monday = computedDateWeekMonday(start.value);
        if (date.getTime() >= monday.getTime() && date.getTime() <= sunday.getTime()) {
          return true;
        }
        return false;
      }
    };
    const isToday = (cell) => {
      const format = "YYYY/MM/DD";
      return cell.dayjs.format(format) === Today;
    };
    const handleChange = () => {
      if (start.value && end.value) {
        const startDate = start.value.toLocaleDateString();
        const endDate = end.value.toLocaleDateString();
        emit("change", [startDate, endDate]);
      }
    };
    const cellClick = (cell) => {
      const {
        date
      } = cell;
      if (!clicked) {
        initSelectDate();
        start.value = computedDateWeekMonday(date);
        clicked = true;
      } else {
        const tempSunday = computedDateWeekSunday(date);
        const tempMonday = computedDateWeekMonday(date);
        if (tempMonday.getTime() > start.value.getTime()) {
          end.value = tempSunday;
        } else {
          end.value = computedDateWeekSunday(start.value);
          start.value = tempMonday;
        }
        clicked = false;
      }
    };
    const weekRangeClick = () => {
      if (visible.value) {
        weekRangeRef.value.handleClose();
      } else {
        weekRangeRef.value.handleOpen();
      }
    };
    const visibleChange = (tag) => {
      visible.value = tag;
      emit("visibleChange", tag);
    };
    const handleClose = () => {
      weekRangeRef.value.handleClose();
    };
    const handleOpen = () => {
      weekRangeRef.value.handleOpen();
    };
    const isHover = (cell) => {
      const {
        date
      } = cell;
      if (hoverItem.value) {
        const monday = computedDateWeekMonday(hoverItem.value);
        const sunday = computedDateWeekSunday(hoverItem.value);
        const currentTime = date.getTime();
        if (monday.getTime() <= currentTime && sunday.getTime() >= currentTime) {
          return true;
        }
      }
      return false;
    };
    const isInHoverRange = (cell) => {
      var _a;
      const {
        date
      } = cell;
      const curTime = date.getTime();
      if (start.value && !end.value && hoverItem.value) {
        const curHoverTime = (_a = hoverItem.value) == null ? void 0 : _a.getTime();
        let tempStart = start.value;
        let tempEnd = hoverItem.value;
        if (curHoverTime < start.value.getTime()) {
          tempEnd = start.value;
          tempStart = hoverItem.value;
        }
        const startTime = tempStart.getTime();
        const endTime = tempEnd.getTime();
        if (curTime >= startTime && curTime <= endTime) {
          return true;
        }
        return isHover(cell);
      }
      return false;
    };
    const onMouseHover = (cell) => {
      const {
        date
      } = cell;
      hoverItem.value = date;
    };
    const onMouseleave = () => {
      hoverItem.value = null;
    };
    const isMonday = (cell) => {
      const {
        date
      } = cell;
      return date.getDay() === 1;
    };
    const isSunday = (cell) => {
      const {
        date
      } = cell;
      return date.getDay() === 0;
    };
    return {
      ns,
      curValue,
      weekRangeRef,
      isInRange,
      isInHoverRange,
      isEnded,
      isStarted,
      isToday,
      weekRangeClick,
      cellClick,
      visibleChange,
      handleChange,
      handleClose,
      handleOpen,
      isHover,
      isMonday,
      isSunday,
      onMouseHover,
      onMouseleave
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.ns.b(),
      "onClick": this.weekRangeClick
    }, [vue.createVNode(vue.resolveComponent("el-date-picker"), {
      "ref": "weekRangeRef",
      "modelValue": this.curValue,
      "onUpdate:modelValue": ($event) => this.curValue = $event,
      "popper-class": this.ns.b("picker-pop"),
      "type": "daterange",
      "onChange": this.handleChange,
      "onVisibleChange": this.visibleChange
    }, {
      default: (cell) => {
        return vue.createVNode("div", {
          "class": [this.ns.e("cell-item"), this.ns.is("inrange", this.isInRange(cell) && !this.isEnded(cell) && !this.isStarted(cell)), this.ns.is("inhoverrange", this.isInHoverRange(cell) && !this.isEnded(cell) && !this.isStarted(cell)), this.ns.is("hover", this.isHover(cell) && !this.isEnded(cell) && !this.isStarted(cell)), this.ns.is("left", cell.column === 0), this.ns.is("right", cell.column === 6), this.ns.is("ended", this.isEnded(cell)), this.ns.is("started", this.isStarted(cell)), this.ns.is("monday", this.isMonday(cell)), this.ns.is("sunday", this.isSunday(cell))],
          "onMouseenter": () => this.onMouseHover(cell),
          "onMouseleave": () => this.onMouseleave(),
          "onClick": () => this.cellClick(cell)
        }, [vue.createVNode("span", {
          "class": [this.ns.em("cell-item", "text"), this.ns.is("today", this.isToday(cell))]
        }, [cell.text])]);
      }
    })]);
  }
});

exports.default = weekRangeSelect;
