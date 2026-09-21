'use strict';

var vue = require('vue');
var dayjs = require('dayjs');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');
var index$1 = require('../calendar-daily/index.cjs');
var index = require('../calendar-week/index.cjs');
var index$2 = require('../calendar-user/index.cjs');
var useCustomCalendar = require('./use-custom-calendar.cjs');
require('./custom-calendar.css');
require('../interface/index.cjs');
var customCalendar = require('../interface/custom-calendar.cjs');

"use strict";
const CustomCalendar = /* @__PURE__ */ vue.defineComponent({
  name: "CustomCalendar",
  props: customCalendar.customCalendarProps,
  emits: customCalendar.customCalendarEmits,
  setup(props, {
    emit,
    slots
  }) {
    const ns = vue3Util.useNamespace("custom-calendar");
    const {
      date,
      events,
      shortcuts,
      viewType,
      validatedRange,
      realSelectedDay,
      curWeek,
      legends,
      multiple,
      selectedData,
      pickDay,
      handleEVentClick,
      handleEVentDblClick,
      selectDate,
      selectLegend
    } = useCustomCalendar.useCustomCalendar(props, emit, "custom-calendar");
    vue.onMounted(() => {
      pickDay(dayjs(/* @__PURE__ */ new Date()));
    });
    const renderWeek = () => {
      var _a;
      return vue.createVNode("div", {
        "class": [ns.e("calendar-week")]
      }, [(slots == null ? void 0 : slots.header) ? vue.createVNode("div", {
        "class": [ns.em("calendar-month", "header")]
      }, [(_a = slots == null ? void 0 : slots.header) == null ? void 0 : _a.call(slots, {
        date: dayjs(realSelectedDay.value).format("YYYY-MM-DD"),
        legends: legends.value
      })]) : vue.createVNode("div", {
        "class": [ns.em("calendar-week", "header")]
      }, [vue.createVNode("div", {
        "class": ns.em("calendar-week", "header-top")
      }, [vue.createVNode("div", {
        "class": ns.em("calendar-week", "title")
      }, [props.calendarTitle || ibiz.i18n.t("control.calendar.title")]), vue.createVNode("div", {
        "class": ns.em("calendar-week", "legend")
      }, [legends.value.length > 1 && legends.value.map((item) => {
        return vue.createVNode("div", {
          "class": ns.em("calendar-week", "legend-item"),
          "onClick": () => selectLegend(item)
        }, [vue.createVNode("div", {
          "class": ns.em("calendar-week", "legend-item-tip"),
          "style": {
            background: item.isShow ? item.bkcolor : "#CCCCCC"
          }
        }, null), vue.createVNode("div", {
          "class": ns.em("calendar-week", "legend-item-text"),
          "style": {
            color: item.isShow ? item.color : "#CCCCCC"
          },
          "title": core.showTitle(item.name)
        }, [item.name])]);
      })]), vue.createVNode("div", {
        "class": ns.em("calendar-week", "select-time")
      }, [vue.createVNode(vue.resolveComponent("el-date-picker"), {
        "modelValue": realSelectedDay.value,
        "onUpdate:modelValue": ($event) => realSelectedDay.value = $event,
        "type": "date",
        "placeholder": "\u9009\u62E9\u65E5\u671F",
        "shortcuts": shortcuts
      }, null)])])]), vue.createVNode(index.IBizCalendarWeek, {
        "selected-day": realSelectedDay.value,
        "showDetail": props.showDetail,
        "events": events.value,
        "legends": legends.value,
        "multiple": multiple.value,
        "selectedData": selectedData.value,
        "onEventClick": (value) => handleEVentClick(value),
        "onEventDblClick": (value) => handleEVentDblClick(value)
      }, slots)]);
    };
    const renderDay = () => {
      var _a;
      return vue.createVNode("div", {
        "class": [ns.e("calendar-week")]
      }, [(slots == null ? void 0 : slots.header) ? vue.createVNode("div", {
        "class": [ns.em("calendar-month", "header")]
      }, [(_a = slots == null ? void 0 : slots.header) == null ? void 0 : _a.call(slots, {
        date: dayjs(realSelectedDay.value).format("YYYY-MM-DD"),
        legends: legends.value
      })]) : vue.createVNode("div", {
        "class": [ns.em("calendar-week", "header")]
      }, [vue.createVNode("div", {
        "class": ns.em("calendar-week", "header-top")
      }, [vue.createVNode("div", {
        "class": ns.em("calendar-week", "title")
      }, [props.calendarTitle || ibiz.i18n.t("control.calendar.title")]), vue.createVNode("div", {
        "class": ns.em("calendar-week", "legend")
      }, [legends.value.length > 1 && legends.value.map((item) => {
        return vue.createVNode("div", {
          "class": ns.em("calendar-week", "legend-item"),
          "onClick": () => selectLegend(item)
        }, [vue.createVNode("div", {
          "class": ns.em("calendar-week", "legend-item-tip"),
          "style": {
            background: item.isShow ? item.bkcolor : "#CCCCCC"
          }
        }, null), vue.createVNode("div", {
          "class": ns.em("calendar-week", "legend-item-text"),
          "style": {
            color: item.isShow ? item.color : "#CCCCCC"
          },
          "title": core.showTitle(item.name)
        }, [item.name])]);
      })]), vue.createVNode("div", {
        "class": ns.em("calendar-week", "select-time")
      }, [vue.createVNode(vue.resolveComponent("el-date-picker"), {
        "modelValue": realSelectedDay.value,
        "onUpdate:modelValue": ($event) => realSelectedDay.value = $event,
        "type": "date",
        "placeholder": "\u9009\u62E9\u65E5\u671F",
        "shortcuts": shortcuts
      }, null)])]), vue.createVNode("div", {
        "class": ns.em("calendar-week", "text-secondary")
      }, [curWeek.value])]), vue.createVNode(index$1.IBizCalendarDaily, {
        "selected-day": realSelectedDay.value,
        "controller": props.controller,
        "events": events.value,
        "legends": legends.value,
        "multiple": multiple.value,
        "selectedData": selectedData.value,
        "onEventClick": (value) => handleEVentClick(value),
        "onEventDblClick": (value) => handleEVentDblClick(value)
      }, slots)]);
    };
    const renderUser = () => {
      return vue.createVNode(index$2.IBizCalendarUser, {
        "selected-day": realSelectedDay.value,
        "events": events.value,
        "onEventClick": (value) => handleEVentClick(value),
        "onEventDblClick": (value) => handleEVentDblClick(value)
      }, slots);
    };
    const renderContent = () => {
      switch (viewType.value) {
        case "DAY":
          return renderDay();
        case "WEEK":
          return renderWeek();
        case "USER":
          return renderUser();
        default:
          return null;
      }
    };
    return {
      ns,
      date,
      validatedRange,
      pickDay,
      selectDate,
      renderContent
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": [this.ns.b()]
    }, [this.renderContent()]);
  }
});

exports.CustomCalendar = CustomCalendar;
