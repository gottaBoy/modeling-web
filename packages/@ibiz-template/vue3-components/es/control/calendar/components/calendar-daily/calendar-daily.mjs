import { defineComponent, watch, onMounted, onUnmounted, createVNode } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { showTitle } from '@ibiz-template/core';
import '../interface/index.mjs';
import '../util/index.mjs';
import { useCalendarDaily } from './use-calendar-daily.mjs';
import './calendar-daily.css';
import { calendarDailyProps, calendarDailyEmits } from '../interface/calendar-daily.mjs';
import { isToday } from '../util/util.mjs';

"use strict";
const CalendarDaily = /* @__PURE__ */ defineComponent({
  name: "CalendarDaily",
  props: calendarDailyProps,
  emits: calendarDailyEmits,
  setup(props, {
    emit,
    slots
  }) {
    const ns = useNamespace("calendar-daily");
    const {
      drawData,
      curTimeTop,
      curTimeVal,
      resizableHand,
      events,
      curTimeTimer,
      calendarDaily,
      selectedData,
      eventClick,
      handleDrag,
      handleDragStart,
      handleCurTime,
      initDrawData
    } = useCalendarDaily(props, emit);
    watch(() => props.selectedData, () => {
      if (props.selectedData && props.selectedData.length > 0) {
        const data = props.selectedData.length > selectedData.value.length ? props.selectedData : selectedData.value;
        selectedData.value = data;
      } else {
        selectedData.value = [];
      }
    }, {
      immediate: true,
      deep: true
    });
    onMounted(() => {
      handleCurTime();
      drawData.value = initDrawData();
      curTimeTimer.value = setInterval(() => handleCurTime(), 1e3);
    });
    onUnmounted(() => {
      const timer = curTimeTimer.value;
      if (timer) {
        clearInterval(timer);
        curTimeTimer.value = null;
      }
    });
    const renderEventItem = (location, eventBoxStyle, eventContentStyle, event, index, slotNme, classEName) => {
      var _a;
      return createVNode("div", {
        "key": index,
        "class": [ns.em(classEName, "event-box")],
        "style": eventBoxStyle
      }, [createVNode("button", {
        "class": [ns.em(classEName, "event-content"), event.isSelectedEvent ? "is-selected-event" : "", event.classname],
        "onClick": () => eventClick(event, "head"),
        "style": eventContentStyle
      }, [slots[slotNme] ? (_a = slots[slotNme]) == null ? void 0 : _a.call(slots, {
        data: event
      }) : createVNode("div", {
        "class": [ns.em(classEName, "event-summary"), event.classname],
        "title": showTitle("".concat(event.text || "", " ").concat(event.timeRange || ""))
      }, [event.icon && createVNode("span", {
        "class": [event.icon, ns.em(classEName, "event-icon")],
        "style": {
          color: event.bkColor
        }
      }, null), event.text && createVNode("span", {
        "class": [ns.em(classEName, "event-name")]
      }, [event.text])]), location === "header" && event.isSelectedEvent ? createVNode("span", {
        "class": ["fa fa-check", ns.em(classEName, "check")]
      }, null) : ""])]);
    };
    const renderHeader = () => {
      return createVNode("div", {
        "class": [ns.e("calendar-daily__head")],
        "ref": (el) => {
          resizableHand.value = el;
        }
      }, [createVNode("div", {
        "class": ns.e("allday-info")
      }, [ibiz.i18n.t("control.calendar.calendardaily.tip")]), createVNode("div", {
        "class": ns.em("allday-info", "work-items")
      }, [createVNode("div", {
        "class": ns.em("allday-info", "work-items-scroll")
      }, [createVNode("div", {
        "class": ns.em("allday-info", "work-items-body")
      }, [events.value.map((event, index) => {
        const eventBoxStyle = {};
        const eventContentStyle = {
          color: event.color,
          background: event.bkColorFade
        };
        return renderEventItem("header", eventBoxStyle, eventContentStyle, event, index, "head-event", "allday-info");
      })])])]), createVNode("div", {
        "class": ns.e("resizable-handle"),
        "draggable": "true",
        "onDrag": (event) => handleDrag(event),
        "onDragstart": (event) => handleDragStart(event)
      }, [createVNode("div", {
        "class": ns.e("allday-resize-line")
      }, null)])]);
    };
    const renderContent = () => {
      return createVNode("div", {
        "class": [ns.e("scroll-area")]
      }, [createVNode("div", {
        "class": ns.e("time-pane")
      }, [createVNode("div", {
        "class": ns.em("time-pane", "time-labels")
      }, [drawData.value.map((timescale) => createVNode("div", {
        "key": timescale,
        "class": [ns.em("time-pane", "time-label")]
      }, [timescale]))]), createVNode("div", {
        "class": ns.em("time-pane", "time-columns")
      }, [drawData.value.map((timescale, index) => createVNode("div", {
        "key": timescale,
        "class": [ns.em("time-pane", "time-column"), index === drawData.value.length - 1 && ns.em("time-pane", "time-column-last")]
      }, null)), createVNode("div", {
        "class": ns.em("time-pane", "event-timed-container")
      }, [createVNode("div", {
        "class": ns.em("time-pane", "container-scroll")
      }, [events.value.map((event, index) => {
        const eventBoxStyle = {
          top: "".concat(event.styleTop, "px"),
          left: "".concat(event.styleLeft),
          height: "".concat(event.height, "px"),
          width: "".concat(event.width),
          "min-height": "".concat(event.height, "px"),
          "z-index": event.zIndex
        };
        const eventContentStyle = {
          background: event.bkColorFade,
          "border-left": "3px solid ".concat(event.bkColor),
          color: event.color
        };
        const tempContent = renderEventItem("content", eventBoxStyle, eventContentStyle, event, index, "event", "time-pane");
        return tempContent;
      })])])]), isToday(props == null ? void 0 : props.selectedDay, /* @__PURE__ */ new Date()) ? createVNode("div", {
        "class": ns.em("time-pane", "current-time"),
        "style": {
          top: "".concat(curTimeTop.value, "px")
        }
      }, [createVNode("div", {
        "class": ns.em("time-pane", "current-time-label")
      }, [curTimeVal.value])]) : ""])]);
    };
    return {
      ns,
      calendarDaily,
      renderHeader,
      renderContent
    };
  },
  render() {
    return createVNode("div", {
      "ref": (el) => {
        this.calendarDaily = el;
      },
      "class": this.ns.b()
    }, [this.renderHeader(), this.renderContent()]);
  }
});

export { CalendarDaily };
