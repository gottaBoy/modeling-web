import { defineComponent, ref, watch, onMounted, onUnmounted, createVNode, resolveComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { showTitle } from '@ibiz-template/core';
import '../interface/index.mjs';
import { useCalendarWeek } from './use-calendar-week.mjs';
import './calendar-week.css';
import '../util/index.mjs';
import { calendarWeekProps, calendarWeekEmits } from '../interface/calendar-week.mjs';
import { handlePopClose, closeIcon } from '../util/util.mjs';

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
      eventClick,
      handleDrag,
      handleDragStart,
      handleCurTime,
      initDrawData,
      handleUIEvents
    } = useCalendarWeek(props, emit);
    const hoverItem = ref("");
    const visible = ref(false);
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
    const onMouseenter = (event) => {
      hoverItem.value = String(event.id);
      visible.value = true;
    };
    const onClickCalendarItem = () => {
      visible.value = false;
    };
    const onMouseleavee = () => {
      hoverItem.value = "";
      visible.value = false;
    };
    const renderEventItem = (location, eventBoxStyle, eventContentStyle, event, index, slotNme, classEName) => {
      var _a;
      return createVNode("div", {
        "key": index,
        "class": [ns.em(classEName, "event-box")],
        "style": eventBoxStyle,
        "onMouseenter": () => onMouseenter(event),
        "onMouseleave": onMouseleavee,
        "onClick": onClickCalendarItem
      }, [createVNode("button", {
        "class": [ns.em(classEName, "event-content"), event.isSelectedEvent ? "is-selected-event" : "", event.classname],
        "onClick": () => {
          eventClick(event, "head");
        },
        "style": eventContentStyle
      }, [slots[slotNme] ? (_a = slots[slotNme]) == null ? void 0 : _a.call(slots, {
        data: event
      }) : createVNode("div", {
        "class": [ns.em(classEName, "event-summary"), event.classname],
        "title": showTitle(location === "header" ? "".concat(event.text || "", " ").concat(event.timeRange || "") : "")
      }, [event.icon && createVNode("span", {
        "class": [event.icon, ns.em(classEName, "event-icon")],
        "style": {
          color: event.bkColor
        }
      }, null), event.text && createVNode("span", {
        "class": [ns.em(classEName, "event-name")],
        "title": event.text
      }, [event.text])]), location === "header" && event.isSelectedEvent ? createVNode("span", {
        "class": ["fa fa-check", ns.em(classEName, "check")]
      }, null) : ""])]);
    };
    const renderPopover = (content, event) => {
      if (!props.showDetail) {
        return content;
      }
      return createVNode(resolveComponent("el-popover"), {
        "visible": visible.value && event.id === hoverItem.value,
        "show-after": 100,
        "offset": 4,
        "width": "auto",
        "popper-class": [ns.e("event-popover")],
        "placement": "right-start"
      }, {
        reference: () => content,
        default: () => {
          var _a;
          return createVNode("div", {
            "class": [ns.em("event-popover", "body")]
          }, [createVNode("div", {
            "class": [ns.em("event-popover", "close")],
            "onClick": (el) => handlePopClose(el),
            "innerHTML": closeIcon
          }, null), createVNode("div", {
            "class": [ns.em("event-popover", "scroll")]
          }, [(slots == null ? void 0 : slots.event) ? (_a = slots.event) == null ? void 0 : _a.call(slots, {
            data: event
          }) : createVNode("div", {
            "class": [ns.em("event-popover", "content")]
          }, ["".concat(event.text || "", " ").concat(event.timeRange || "")])])]);
        }
      });
    };
    const renderHeader = () => {
      return createVNode("div", {
        "class": [ns.e("header")],
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
      }, [ibiz.i18n.t("control.calendar.calendardaily.tip")]), rowsHeader.value.map((item) => createVNode("div", {
        "class": [ns.em("header", "event-cell")]
      }, [item.map((event, index) => {
        const eventBoxStyle = {
          top: "".concat(Number(index * 26) + 2, "px"),
          left: "".concat(event.styleLeft),
          width: "".concat(event == null ? void 0 : event.width)
        };
        const eventContentStyle = {
          color: event.color,
          background: event.bkColorFade
        };
        return event.isShow ? renderEventItem("header", eventBoxStyle, eventContentStyle, event, index, "head-event", "header") : "";
      })]))]), createVNode("div", {
        "class": ns.em("header", "resizable-handle"),
        "draggable": "true",
        "onDrag": (event) => handleDrag(event),
        "onDragstart": (event) => handleDragStart(event)
      }, [createVNode("div", {
        "class": ns.em("header", "resize-line")
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
          height: "".concat(event.height, "px"),
          width: "".concat(event.width),
          "min-height": "".concat(event.height && event.height > 30 ? event.height : 30, "px"),
          "z-index": event.zIndex
        };
        const eventContentStyle = {
          background: event.bkColorFade,
          "border-left": "3px solid ".concat(event.bkColor),
          color: event.color
        };
        const tempContent = renderEventItem("content", eventBoxStyle, eventContentStyle, event, index, "", "time-pane");
        return renderPopover(tempContent, event);
      })])])]))])]);
    };
    return {
      ns,
      calendarWeek,
      renderHeader,
      renderContent
    };
  },
  render() {
    return createVNode("div", {
      "ref": (el) => {
        this.calendarWeek = el;
      },
      "class": this.ns.b()
    }, [this.renderHeader(), this.renderContent()]);
  }
});

export { CalendarWeek };
