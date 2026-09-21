import { defineComponent, createVNode, watch, onMounted, onUnmounted } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { showTitle } from '@ibiz-template/core';
import '../interface/index.mjs';
import { useCalendarWeek } from './use-calendar-week.mjs';
import './calendar-week.css';
import { calendarWeekEmits, calendarWeekProps } from '../interface/calendar-week.mjs';

"use strict";
const CalendarWeek = /* @__PURE__ */ defineComponent({
  name: "CalendarWeek",
  props: calendarWeekProps,
  emits: calendarWeekEmits,
  setup(props, {
    emit,
    slots
  }) {
    const ns = useNamespace("calendar-week");
    const {
      drawData,
      resizableHand,
      rows,
      weekDays,
      curTimeTimer,
      calendarWeek,
      selectedData,
      legends,
      rowsHeader,
      headerEventRef,
      thumbHeight,
      scrollTop,
      realHeight,
      isScroll,
      handleEventClick,
      handleEventDblClick,
      handleDrag,
      handleDragStart,
      handleDragEnd,
      handleCurTime,
      initDrawData,
      handleUIEvents,
      onScrollbarMouseDown,
      onHeaderEventScroll,
      initHeaderEventScroll,
      eventContextmenu,
      contentMousemove,
      eventMouseenter,
      eventMouseleave
    } = useCalendarWeek(props, emit, ns);
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
    watch(() => props.legends, () => {
      legends.value = props.legends || [];
      handleUIEvents();
    }, {
      immediate: true,
      deep: true
    });
    watch(() => props.events, () => {
      handleUIEvents();
      initHeaderEventScroll();
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
    const renderScrollbar = () => {
      return createVNode("div", {
        "class": ns.b("scroll-bar")
      }, [createVNode("div", {
        "class": ns.be("scroll-bar", "thumb"),
        "onMousedown": onScrollbarMouseDown
      }, null)]);
    };
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
        "class": [ns.em(classEName, "event-content"), ns.is("selected-event", !!event.isSelectedEvent), event.classname],
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
        "class": ns.e("header"),
        "ref": (el) => {
          resizableHand.value = el;
        }
      }, [createVNode("div", {
        "class": [ns.em("header", "dates")]
      }, [createVNode("div", {
        "class": [ns.em("header", "date-cell-first")]
      }, null), weekDays.value.map((weekDay) => createVNode("div", {
        "class": [ns.em("header", "date-cell")]
      }, [createVNode("div", {
        "class": [ns.em("header", "date-week")]
      }, [weekDay.caption]), createVNode("div", {
        "class": [ns.em("header", "date-day"), weekDay.isActivate ? "is-today" : ""]
      }, [weekDay.day])]))]), createVNode("div", {
        "class": [ns.em("header", "events")]
      }, [createVNode("div", {
        "class": [ns.em("header", "event-cell-first")]
      }, [ibiz.i18n.t("control.calendar.calendardaily.tip")]), createVNode("div", {
        "class": ns.em("header", "event-container"),
        "ref": (el) => {
          headerEventRef.value = el;
        },
        "onScroll": onHeaderEventScroll
      }, [createVNode("div", {
        "class": ns.em("header", "container-scroll")
      }, [rowsHeader.value.map((item) => createVNode("div", {
        "class": [ns.em("header", "event-cell")]
      }, [item.map((event, index) => {
        const eventBoxStyle = {
          top: "".concat(Number(index * 26) + 2, "px"),
          left: "".concat(event.styleLeft),
          width: "".concat(event == null ? void 0 : event.width)
        };
        const eventContentStyle = {
          background: event.bkColorFade
        };
        if (!event.isShow)
          return "";
        return renderEventItem("header", eventBoxStyle, eventContentStyle, event, index, "head-event", "header");
      })]))]), isScroll.value && renderScrollbar()])]), createVNode("div", {
        "class": ns.em("header", "resizable-handle"),
        "draggable": "true",
        "onDrag": (event) => handleDrag(event),
        "onDragstart": (event) => handleDragStart(event),
        "onDragend": () => handleDragEnd()
      }, [createVNode("div", {
        "class": ns.em("header", "resize-line")
      }, null)])]);
    };
    const renderContent = () => {
      return createVNode("div", {
        "class": ns.e("scroll-area"),
        "onMousemove": contentMousemove
      }, [createVNode("div", {
        "class": ns.e("time-pane")
      }, [createVNode("div", {
        "class": ns.em("time-pane", "time-labels")
      }, [drawData.value.map((timescale) => createVNode("div", {
        "key": timescale,
        "class": [ns.em("time-pane", "time-label")]
      }, [timescale]))]), rows.value.map((item) => createVNode("div", {
        "class": ns.em("time-pane", "time-columns")
      }, [drawData.value.map((timescale, index) => createVNode("div", {
        "key": timescale,
        "class": [ns.em("time-pane", "time-column"), index === drawData.value.length - 1 && ns.em("time-pane", "time-column-last")]
      }, null)), createVNode("div", {
        "class": ns.em("time-pane", "event-timed-container")
      }, [createVNode("div", {
        "class": ns.em("time-pane", "container-scroll")
      }, [item.map((event, index) => {
        const eventBoxStyle = {
          top: "".concat(event.styleTop, "px"),
          left: "".concat(event.styleLeft),
          height: typeof event.height === "number" ? "".concat(event.height, "px") : event.height,
          width: "".concat(event.width),
          "min-height": "".concat(event.height && event.height > 30 ? event.height : 30, "px"),
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
      })])])]))])]);
    };
    return {
      ns,
      thumbHeight,
      calendarWeek,
      scrollTop,
      realHeight,
      headerEventRef,
      renderHeader,
      renderContent
    };
  },
  render() {
    return createVNode("div", {
      "ref": (el) => {
        this.calendarWeek = el;
      },
      "class": this.ns.b(),
      "style": {
        ["".concat(this.ns.cssVarBlockName("header-event-scroll-bar-thumb-height"))]: "".concat(this.thumbHeight, "px"),
        ["".concat(this.ns.cssVarBlockName("header-event-scroll-bar-thumb-top"))]: "".concat(this.scrollTop, "px"),
        ["".concat(this.ns.cssVarBlockName("header-event-scroll-real-height"))]: "".concat(this.realHeight, "px")
      }
    }, [this.renderHeader(), this.renderContent()]);
  }
});

export { CalendarWeek };
