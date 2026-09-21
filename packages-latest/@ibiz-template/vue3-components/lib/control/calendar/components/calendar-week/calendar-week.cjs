'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');
require('../interface/index.cjs');
var useCalendarWeek = require('./use-calendar-week.cjs');
require('./calendar-week.css');
var calendarWeek = require('../interface/calendar-week.cjs');

"use strict";
const CalendarWeek = /* @__PURE__ */ vue.defineComponent({
  name: "CalendarWeek",
  props: calendarWeek.calendarWeekProps,
  emits: calendarWeek.calendarWeekEmits,
  setup(props, {
    emit,
    slots
  }) {
    const ns = vue3Util.useNamespace("calendar-week");
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
    } = useCalendarWeek.useCalendarWeek(props, emit, ns);
    vue.watch(() => props.selectedData, () => {
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
    vue.watch(() => props.legends, () => {
      legends.value = props.legends || [];
      handleUIEvents();
    }, {
      immediate: true,
      deep: true
    });
    vue.watch(() => props.events, () => {
      handleUIEvents();
      initHeaderEventScroll();
    }, {
      immediate: true,
      deep: true
    });
    vue.onMounted(() => {
      handleCurTime();
      drawData.value = initDrawData();
      curTimeTimer.value = setInterval(() => handleCurTime(), 1e3);
    });
    vue.onUnmounted(() => {
      const timer = curTimeTimer.value;
      if (timer) {
        clearInterval(timer);
        curTimeTimer.value = null;
      }
    });
    const renderScrollbar = () => {
      return vue.createVNode("div", {
        "class": ns.b("scroll-bar")
      }, [vue.createVNode("div", {
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
      return vue.createVNode("div", {
        "class": [ns.em("event-popover", "body")]
      }, [vue.createVNode("div", {
        "class": [ns.em("event-popover", "scroll")]
      }, [(slots == null ? void 0 : slots.event) ? (_a = slots.event) == null ? void 0 : _a.call(slots, {
        data: _tempEvent
      }) : vue.createVNode("div", {
        "class": [ns.em("event-popover", "content")]
      }, ["".concat(_event.text || "", " ").concat(_event.timeRange || "")])])]);
    };
    const renderEventItem = (location, eventBoxStyle, eventContentStyle, event, index, slotNme, classEName) => {
      var _a;
      let title = "".concat(event.text || "");
      if (location === "header" && event.timeRange)
        title = "".concat(title, "     ").concat(event.timeRange || "");
      title = core.showTitle(title) || "";
      if (props.showDetail)
        title = "";
      const component = renderPopoverContent(event);
      return vue.createVNode("div", {
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
      }, [vue.createVNode("button", {
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
      }) : vue.createVNode("div", {
        "class": [ns.em(classEName, "event-summary"), event.classname]
      }, [event.icon && vue.createVNode("span", {
        "class": [event.icon, ns.em(classEName, "event-icon")],
        "style": {
          color: event.bkColor
        }
      }, null), event.text && vue.createVNode("span", {
        "class": [ns.em(classEName, "event-name")]
      }, [event.text])]), location === "header" && event.isSelectedEvent ? vue.createVNode("span", {
        "class": ["fa fa-check", ns.em(classEName, "check")]
      }, null) : ""])]);
    };
    const renderHeader = () => {
      return vue.createVNode("div", {
        "class": ns.e("header"),
        "ref": (el) => {
          resizableHand.value = el;
        }
      }, [vue.createVNode("div", {
        "class": [ns.em("header", "dates")]
      }, [vue.createVNode("div", {
        "class": [ns.em("header", "date-cell-first")]
      }, null), weekDays.value.map((weekDay) => vue.createVNode("div", {
        "class": [ns.em("header", "date-cell")]
      }, [vue.createVNode("div", {
        "class": [ns.em("header", "date-week")]
      }, [weekDay.caption]), vue.createVNode("div", {
        "class": [ns.em("header", "date-day"), weekDay.isActivate ? "is-today" : ""]
      }, [weekDay.day])]))]), vue.createVNode("div", {
        "class": [ns.em("header", "events")]
      }, [vue.createVNode("div", {
        "class": [ns.em("header", "event-cell-first")]
      }, [ibiz.i18n.t("control.calendar.calendardaily.tip")]), vue.createVNode("div", {
        "class": ns.em("header", "event-container"),
        "ref": (el) => {
          headerEventRef.value = el;
        },
        "onScroll": onHeaderEventScroll
      }, [vue.createVNode("div", {
        "class": ns.em("header", "container-scroll")
      }, [rowsHeader.value.map((item) => vue.createVNode("div", {
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
      })]))]), isScroll.value && renderScrollbar()])]), vue.createVNode("div", {
        "class": ns.em("header", "resizable-handle"),
        "draggable": "true",
        "onDrag": (event) => handleDrag(event),
        "onDragstart": (event) => handleDragStart(event),
        "onDragend": () => handleDragEnd()
      }, [vue.createVNode("div", {
        "class": ns.em("header", "resize-line")
      }, null)])]);
    };
    const renderContent = () => {
      return vue.createVNode("div", {
        "class": ns.e("scroll-area"),
        "onMousemove": contentMousemove
      }, [vue.createVNode("div", {
        "class": ns.e("time-pane")
      }, [vue.createVNode("div", {
        "class": ns.em("time-pane", "time-labels")
      }, [drawData.value.map((timescale) => vue.createVNode("div", {
        "key": timescale,
        "class": [ns.em("time-pane", "time-label")]
      }, [timescale]))]), rows.value.map((item) => vue.createVNode("div", {
        "class": ns.em("time-pane", "time-columns")
      }, [drawData.value.map((timescale, index) => vue.createVNode("div", {
        "key": timescale,
        "class": [ns.em("time-pane", "time-column"), index === drawData.value.length - 1 && ns.em("time-pane", "time-column-last")]
      }, null)), vue.createVNode("div", {
        "class": ns.em("time-pane", "event-timed-container")
      }, [vue.createVNode("div", {
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
    return vue.createVNode("div", {
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

exports.CalendarWeek = CalendarWeek;
