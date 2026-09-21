import { defineComponent, createVNode, resolveComponent } from 'vue';
import dayjs from 'dayjs';
import { useNamespace } from '@ibiz-template/vue3-util';
import { showTitle } from '@ibiz-template/core';
import { IBizCalendarDaily } from '../calendar-daily/index.mjs';
import { IBizCalendarWeek } from '../calendar-week/index.mjs';
import { IBizCalendarUser } from '../calendar-user/index.mjs';
import { useCustomCalendar, calcCurrentWeekRange } from './use-custom-calendar.mjs';
import '../interface/index.mjs';
import './custom-calendar.css';
import { customCalendarEmits, customCalendarProps } from '../interface/custom-calendar.mjs';

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
      handleEventContextmenu,
      selectDate,
      selectLegend
    } = useCustomCalendar(props, emit, "custom-calendar");
    const renderWeek = () => {
      var _a;
      return createVNode("div", {
        "class": ns.e("calendar-week")
      }, [(slots == null ? void 0 : slots.header) ? createVNode("div", {
        "class": [ns.e("header"), ns.em("calendar-week", "header"), props.semanticClass("header")],
        "style": props.semanticStyle("header")
      }, [(_a = slots == null ? void 0 : slots.header) == null ? void 0 : _a.call(slots, {
        date: dayjs(realSelectedDay.value).format("YYYY-MM-DD"),
        legends: legends.value
      })]) : createVNode("div", {
        "class": [ns.e("header"), ns.em("calendar-week", "header"), props.semanticClass("header")],
        "style": props.semanticStyle("header")
      }, [createVNode("div", {
        "class": ns.em("calendar-week", "header-top")
      }, [createVNode("div", {
        "class": [ns.e("title"), ns.em("calendar-week", "title"), props.semanticClass("title")],
        "style": props.semanticStyle("title")
      }, [props.calendarTitle || ibiz.i18n.t("control.calendar.title")]), createVNode("div", {
        "class": [ns.e("legend"), ns.em("calendar-week", "legend"), props.semanticClass("legend")],
        "style": props.semanticStyle("legend")
      }, [legends.value.length > 1 && legends.value.map((item) => {
        return createVNode("div", {
          "class": [ns.em("legend", "item"), ns.em("calendar-week", "legend-item"), props.semanticClass("legend.item", {
            item
          })],
          "style": props.semanticStyle("legend.item", {
            item
          }),
          "onClick": () => selectLegend(item)
        }, [createVNode("div", {
          "class": ns.em("calendar-week", "legend-item-tip"),
          "style": {
            background: item.isShow ? item.bkcolor : "var(".concat(ns.cssVarName("color-disabled-bg"), ")")
          }
        }, null), createVNode("div", {
          "class": ns.em("calendar-week", "legend-item-text"),
          "title": showTitle(item.name)
        }, [item.name])]);
      })]), createVNode("div", {
        "class": [ns.e("toolbar"), ns.em("calendar-week", "select-time"), props.semanticClass("toolbar")],
        "style": props.semanticStyle("toolbar")
      }, [createVNode(resolveComponent("el-date-picker"), {
        "type": "date",
        "placeholder": "\u9009\u62E9\u65E5\u671F",
        "shortcuts": shortcuts,
        "modelValue": realSelectedDay.value,
        "onUpdate:modelValue": ($event) => realSelectedDay.value = $event,
        "class": [ns.em("toolbar", "picker"), props.semanticClass("toolbar.picker")],
        "style": props.semanticStyle("toolbar.picker")
      }, null)])])]), createVNode(IBizCalendarWeek, {
        "semanticClass": props.semanticClass,
        "semanticStyle": props.semanticStyle,
        "class": [ns.e("body"), props.semanticClass("body")],
        "style": props.semanticStyle("body"),
        "selected-day": realSelectedDay.value,
        "showDetail": props.showDetail,
        "events": events.value,
        "legends": legends.value,
        "multiple": multiple.value,
        "selectedData": selectedData.value,
        "onEventClick": (value) => handleEVentClick(value),
        "onEventDblClick": (value) => handleEVentDblClick(value),
        "onEventContextmenu": (value) => handleEventContextmenu(value)
      }, slots)]);
    };
    const renderDay = () => {
      var _a;
      return createVNode("div", {
        "class": ns.e("calendar-day")
      }, [(slots == null ? void 0 : slots.header) ? createVNode("div", {
        "class": [ns.e("header"), ns.em("calendar-day", "header"), props.semanticClass("header")],
        "style": props.semanticStyle("header")
      }, [(_a = slots == null ? void 0 : slots.header) == null ? void 0 : _a.call(slots, {
        date: dayjs(realSelectedDay.value).format("YYYY-MM-DD"),
        legends: legends.value
      })]) : createVNode("div", {
        "class": [ns.e("header"), ns.em("calendar-day", "header"), props.semanticClass("header")],
        "style": props.semanticStyle("header")
      }, [createVNode("div", {
        "class": ns.em("calendar-day", "header-top")
      }, [createVNode("div", {
        "class": [ns.e("title"), ns.em("calendar-day", "title"), props.semanticClass("title")],
        "style": props.semanticStyle("title")
      }, [props.calendarTitle || ibiz.i18n.t("control.calendar.title")]), createVNode("div", {
        "class": [ns.e("legend"), ns.em("calendar-day", "legend"), props.semanticClass("legend")],
        "style": props.semanticStyle("legend")
      }, [legends.value.length > 1 && legends.value.map((item) => {
        return createVNode("div", {
          "class": [ns.em("legend", "item"), ns.em("calendar-day", "legend-item"), props.semanticClass("legend.item", {
            item
          })],
          "style": props.semanticStyle("legend.item", {
            item
          }),
          "onClick": () => selectLegend(item)
        }, [createVNode("div", {
          "class": ns.em("calendar-day", "legend-item-tip"),
          "style": {
            background: item.isShow ? item.bkcolor : "var(".concat(ns.cssVarName("color-disabled-bg"), ")")
          }
        }, null), createVNode("div", {
          "class": ns.em("calendar-day", "legend-item-text"),
          "title": showTitle(item.name)
        }, [item.name])]);
      })]), createVNode("div", {
        "class": [ns.e("toolbar"), ns.em("calendar-day", "select-time"), props.semanticClass("toolbar")],
        "style": props.semanticStyle("toolbar")
      }, [createVNode(resolveComponent("el-date-picker"), {
        "type": "date",
        "class": [ns.em("toolbar", "picker"), props.semanticClass("toolbar.picker")],
        "style": props.semanticStyle("toolbar.picker"),
        "modelValue": realSelectedDay.value,
        "onUpdate:modelValue": ($event) => realSelectedDay.value = $event,
        "placeholder": ibiz.i18n.t("control.calendar.calendardaily.selectdate"),
        "shortcuts": shortcuts
      }, null)])]), createVNode("div", {
        "class": ns.em("calendar-day", "text-secondary")
      }, [curWeek.value])]), createVNode(IBizCalendarDaily, {
        "semanticClass": props.semanticClass,
        "semanticStyle": props.semanticStyle,
        "class": [ns.e("body"), props.semanticClass("body")],
        "style": props.semanticStyle("body"),
        "selected-day": realSelectedDay.value,
        "controller": props.controller,
        "showDetail": props.showDetail,
        "events": events.value,
        "legends": legends.value,
        "multiple": multiple.value,
        "selectedData": selectedData.value,
        "onEventClick": (value) => handleEVentClick(value),
        "onEventDblClick": (value) => handleEVentDblClick(value),
        "onEventContextmenu": (value) => handleEventContextmenu(value)
      }, slots)]);
    };
    const renderUser = () => {
      const weekRange = calcCurrentWeekRange(new Date(realSelectedDay.value));
      return createVNode("div", {
        "class": ns.e("calendar-user")
      }, [createVNode("div", {
        "class": [ns.e("header"), ns.e("calendar-user-header"), props.semanticClass("header")],
        "style": props.semanticStyle("header")
      }, [createVNode("div", {
        "class": [ns.e("title"), ns.em("calendar-user-header", "left"), props.semanticClass("title")],
        "style": props.semanticStyle("title")
      }, [weekRange.map((_date) => {
        return dayjs(new Date(_date)).format("YYYY-MM-DD");
      }).join(" ~ ")]), createVNode("div", {
        "class": [ns.e("toolbar"), ns.em("calendar-user-header", "right"), props.semanticClass("toolbar")],
        "style": props.semanticStyle("toolbar")
      }, [createVNode(resolveComponent("el-date-picker"), {
        "type": "week",
        "clearable": false,
        "popper-class": ns.em("calendar-user-header", "date-picker"),
        "modelValue": realSelectedDay.value,
        "onUpdate:modelValue": ($event) => realSelectedDay.value = $event,
        "class": [ns.em("toolbar", "picker"), ns.em("calendar-user-header", "date-range"), props.semanticClass("toolbar.picker")],
        "style": props.semanticStyle("toolbar.picker"),
        "placeholder": ibiz.i18n.t("control.calendar.calendarUser.selectWeekRange"),
        "format": ibiz.i18n.t("control.calendar.calendarUser.weekFormat")
      }, null)])]), createVNode(IBizCalendarUser, {
        "semanticClass": props.semanticClass,
        "semanticStyle": props.semanticStyle,
        "class": [ns.e("body"), props.semanticClass("body")],
        "style": props.semanticStyle("body"),
        "selected-day": realSelectedDay.value,
        "events": events.value,
        "onEventClick": (value) => handleEVentClick(value),
        "onEventDblClick": (value) => handleEVentDblClick(value)
      }, slots)]);
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
