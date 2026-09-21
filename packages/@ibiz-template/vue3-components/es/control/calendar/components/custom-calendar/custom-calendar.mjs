import { defineComponent, onMounted, createVNode, resolveComponent } from 'vue';
import dayjs from 'dayjs';
import { useNamespace } from '@ibiz-template/vue3-util';
import { showTitle } from '@ibiz-template/core';
import { IBizCalendarDaily } from '../calendar-daily/index.mjs';
import { IBizCalendarWeek } from '../calendar-week/index.mjs';
import { IBizCalendarUser } from '../calendar-user/index.mjs';
import { useCustomCalendar } from './use-custom-calendar.mjs';
import './custom-calendar.css';
import '../interface/index.mjs';
import { customCalendarProps, customCalendarEmits } from '../interface/custom-calendar.mjs';

"use strict";
const CustomCalendar = /* @__PURE__ */ defineComponent({
  name: "CustomCalendar",
  props: customCalendarProps,
  emits: customCalendarEmits,
  setup(props, {
    emit,
    slots
  }) {
    const ns = useNamespace("custom-calendar");
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
    } = useCustomCalendar(props, emit, "custom-calendar");
    onMounted(() => {
      pickDay(dayjs(/* @__PURE__ */ new Date()));
    });
    const renderWeek = () => {
      var _a;
      return createVNode("div", {
        "class": [ns.e("calendar-week")]
      }, [(slots == null ? void 0 : slots.header) ? createVNode("div", {
        "class": [ns.em("calendar-month", "header")]
      }, [(_a = slots == null ? void 0 : slots.header) == null ? void 0 : _a.call(slots, {
        date: dayjs(realSelectedDay.value).format("YYYY-MM-DD"),
        legends: legends.value
      })]) : createVNode("div", {
        "class": [ns.em("calendar-week", "header")]
      }, [createVNode("div", {
        "class": ns.em("calendar-week", "header-top")
      }, [createVNode("div", {
        "class": ns.em("calendar-week", "title")
      }, [props.calendarTitle || ibiz.i18n.t("control.calendar.title")]), createVNode("div", {
        "class": ns.em("calendar-week", "legend")
      }, [legends.value.length > 1 && legends.value.map((item) => {
        return createVNode("div", {
          "class": ns.em("calendar-week", "legend-item"),
          "onClick": () => selectLegend(item)
        }, [createVNode("div", {
          "class": ns.em("calendar-week", "legend-item-tip"),
          "style": {
            background: item.isShow ? item.bkcolor : "#CCCCCC"
          }
        }, null), createVNode("div", {
          "class": ns.em("calendar-week", "legend-item-text"),
          "style": {
            color: item.isShow ? item.color : "#CCCCCC"
          },
          "title": showTitle(item.name)
        }, [item.name])]);
      })]), createVNode("div", {
        "class": ns.em("calendar-week", "select-time")
      }, [createVNode(resolveComponent("el-date-picker"), {
        "modelValue": realSelectedDay.value,
        "onUpdate:modelValue": ($event) => realSelectedDay.value = $event,
        "type": "date",
        "placeholder": "\u9009\u62E9\u65E5\u671F",
        "shortcuts": shortcuts
      }, null)])])]), createVNode(IBizCalendarWeek, {
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
      return createVNode("div", {
        "class": [ns.e("calendar-week")]
      }, [(slots == null ? void 0 : slots.header) ? createVNode("div", {
        "class": [ns.em("calendar-month", "header")]
      }, [(_a = slots == null ? void 0 : slots.header) == null ? void 0 : _a.call(slots, {
        date: dayjs(realSelectedDay.value).format("YYYY-MM-DD"),
        legends: legends.value
      })]) : createVNode("div", {
        "class": [ns.em("calendar-week", "header")]
      }, [createVNode("div", {
        "class": ns.em("calendar-week", "header-top")
      }, [createVNode("div", {
        "class": ns.em("calendar-week", "title")
      }, [props.calendarTitle || ibiz.i18n.t("control.calendar.title")]), createVNode("div", {
        "class": ns.em("calendar-week", "legend")
      }, [legends.value.length > 1 && legends.value.map((item) => {
        return createVNode("div", {
          "class": ns.em("calendar-week", "legend-item"),
          "onClick": () => selectLegend(item)
        }, [createVNode("div", {
          "class": ns.em("calendar-week", "legend-item-tip"),
          "style": {
            background: item.isShow ? item.bkcolor : "#CCCCCC"
          }
        }, null), createVNode("div", {
          "class": ns.em("calendar-week", "legend-item-text"),
          "style": {
            color: item.isShow ? item.color : "#CCCCCC"
          },
          "title": showTitle(item.name)
        }, [item.name])]);
      })]), createVNode("div", {
        "class": ns.em("calendar-week", "select-time")
      }, [createVNode(resolveComponent("el-date-picker"), {
        "modelValue": realSelectedDay.value,
        "onUpdate:modelValue": ($event) => realSelectedDay.value = $event,
        "type": "date",
        "placeholder": "\u9009\u62E9\u65E5\u671F",
        "shortcuts": shortcuts
      }, null)])]), createVNode("div", {
        "class": ns.em("calendar-week", "text-secondary")
      }, [curWeek.value])]), createVNode(IBizCalendarDaily, {
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
      return createVNode(IBizCalendarUser, {
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
    return createVNode("div", {
      "class": [this.ns.b()]
    }, [this.renderContent()]);
  }
});

export { CustomCalendar };
