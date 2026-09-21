import { defineComponent, createVNode, watch, onMounted, onUnmounted, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { showTitle } from '@ibiz-template/core';
import '../interface/index.mjs';
import '../util/index.mjs';
import { useCalendarDaily } from './use-calendar-daily.mjs';
import './calendar-daily.css';
import { isToday } from '../util/util.mjs';
import { calendarDailyEmits, calendarDailyProps } from '../interface/calendar-daily.mjs';

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
      handleEventClick,
      handleEventDblClick,
      handleDrag,
      handleDragStart,
      handleCurTime,
      initDrawData,
      eventContextmenu,
      contentMousemove,
      eventMouseenter,
      eventMouseleave
    } = useCalendarDaily(props, emit, ns);
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
    const renderPopoverContent = (_event) => {
      var _a;
      const _tempEvent = {
        ..._event,
        color: "",
        bkColor: ""
      };
      return createVNode("div", {
        "class": [ns.em("event-popover", "body")]
      }, [createVNode("div", {
        "class": [ns.em("event-popover", "scroll")]
      }, [(slots == null ? void 0 : slots.event) ? (_a = slots.event) == null ? void 0 : _a.call(slots, {
        data: _tempEvent
      }) : createVNode("div", {
        "class": [ns.em("event-popover", "content")]
      }, ["".concat(_event.text || "", " ").concat(_event.timeRange || "")])])]);
    };
    const renderEventItem = (location, eventBoxStyle, eventContentStyle, event, index, slotNme, classEName) => {
      var _a;
      let title = "".concat(event.text || "");
      if (location === "header" && event.timeRange)
        title = "".concat(title, "     ").concat(event.timeRange || "");
      title = showTitle(title) || "";
      if (props.showDetail)
        title = "";
      const component = renderPopoverContent(event);
      return createVNode("div", {
        "key": index,
        "style": {
          ...eventBoxStyle,
          ...props.semanticStyle("item", {
            item: event,
            location,
            index
          })
        },
        "class": [ns.e("item"), ns.em(classEName, "event-box"), props.semanticClass("item", {
          item: event,
          location,
          index
        })]
      }, [createVNode("button", {
        "class": [ns.em(classEName, "event-content"), event.isSelectedEvent ? "is-selected-event" : "", event.classname],
        "onClick": () => {
          handleEventClick(event, "head");
        },
        "onDblclick": () => {
          handleEventDblClick(event, "head");
        },
        "onContextmenu": (e) => eventContextmenu(event, e),
        "onMouseenter": (_e) => eventMouseenter(_e, component, location),
        "onMouseleave": eventMouseleave,
        "style": eventContentStyle,
        "title": title
      }, [slots[slotNme] ? (_a = slots[slotNme]) == null ? void 0 : _a.call(slots, {
        data: event
      }) : createVNode("div", {
        "class": [ns.em(classEName, "event-summary"), event.classname]
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
        "class": ns.e("calendar-daily__head"),
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
      }, [events.value.length > 0 ? events.value.map((event, index) => {
        const eventBoxStyle = {};
        const eventContentStyle = {
          background: event.bkColorFade
        };
        return renderEventItem("header", eventBoxStyle, eventContentStyle, event, index, "head-event", "allday-info");
      }) : createVNode(resolveComponent("iBizNoData"), {
        "hideNoDataImage": true
      }, null)])])]), createVNode("div", {
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
        "onMousemove": contentMousemove,
        "class": ns.e("scroll-area")
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
          height: typeof event.height === "number" ? "".concat(event.height, "px") : event.height,
          width: "".concat(event.width),
          "z-index": event.zIndex
        };
        if (typeof event.height === "number") {
          Object.assign(eventBoxStyle, {
            "min-height": "".concat(event.height, "px")
          });
        }
        const eventContentStyle = {
          background: event.bkColorFade,
          "border-left": "3px solid ".concat(event.bkColor)
        };
        return renderEventItem("content", eventBoxStyle, eventContentStyle, event, index, "", "time-pane");
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
