'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');
require('../interface/index.cjs');
require('../util/index.cjs');
var useCalendarDaily = require('./use-calendar-daily.cjs');
require('./calendar-daily.css');
var calendarDaily = require('../interface/calendar-daily.cjs');
var util = require('../util/util.cjs');

"use strict";
const CalendarDaily = /* @__PURE__ */ vue.defineComponent({
  name: "CalendarDaily",
  props: calendarDaily.calendarDailyProps,
  emits: calendarDaily.calendarDailyEmits,
  setup(props, {
    emit,
    slots
  }) {
    const ns = vue3Util.useNamespace("calendar-daily");
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
    } = useCalendarDaily.useCalendarDaily(props, emit);
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
    const renderEventItem = (location, eventBoxStyle, eventContentStyle, event, index, slotNme, classEName) => {
      var _a;
      return vue.createVNode("div", {
        "key": index,
        "class": [ns.em(classEName, "event-box")],
        "style": eventBoxStyle
      }, [vue.createVNode("button", {
        "class": [ns.em(classEName, "event-content"), event.isSelectedEvent ? "is-selected-event" : "", event.classname],
        "onClick": () => eventClick(event, "head"),
        "style": eventContentStyle
      }, [slots[slotNme] ? (_a = slots[slotNme]) == null ? void 0 : _a.call(slots, {
        data: event
      }) : vue.createVNode("div", {
        "class": [ns.em(classEName, "event-summary"), event.classname],
        "title": core.showTitle("".concat(event.text || "", " ").concat(event.timeRange || ""))
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
        "class": [ns.e("calendar-daily__head")],
        "ref": (el) => {
          resizableHand.value = el;
        }
      }, [vue.createVNode("div", {
        "class": ns.e("allday-info")
      }, [ibiz.i18n.t("control.calendar.calendardaily.tip")]), vue.createVNode("div", {
        "class": ns.em("allday-info", "work-items")
      }, [vue.createVNode("div", {
        "class": ns.em("allday-info", "work-items-scroll")
      }, [vue.createVNode("div", {
        "class": ns.em("allday-info", "work-items-body")
      }, [events.value.map((event, index) => {
        const eventBoxStyle = {};
        const eventContentStyle = {
          color: event.color,
          background: event.bkColorFade
        };
        return renderEventItem("header", eventBoxStyle, eventContentStyle, event, index, "head-event", "allday-info");
      })])])]), vue.createVNode("div", {
        "class": ns.e("resizable-handle"),
        "draggable": "true",
        "onDrag": (event) => handleDrag(event),
        "onDragstart": (event) => handleDragStart(event)
      }, [vue.createVNode("div", {
        "class": ns.e("allday-resize-line")
      }, null)])]);
    };
    const renderContent = () => {
      return vue.createVNode("div", {
        "class": [ns.e("scroll-area")]
      }, [vue.createVNode("div", {
        "class": ns.e("time-pane")
      }, [vue.createVNode("div", {
        "class": ns.em("time-pane", "time-labels")
      }, [drawData.value.map((timescale) => vue.createVNode("div", {
        "key": timescale,
        "class": [ns.em("time-pane", "time-label")]
      }, [timescale]))]), vue.createVNode("div", {
        "class": ns.em("time-pane", "time-columns")
      }, [drawData.value.map((timescale, index) => vue.createVNode("div", {
        "key": timescale,
        "class": [ns.em("time-pane", "time-column"), index === drawData.value.length - 1 && ns.em("time-pane", "time-column-last")]
      }, null)), vue.createVNode("div", {
        "class": ns.em("time-pane", "event-timed-container")
      }, [vue.createVNode("div", {
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
      })])])]), util.isToday(props == null ? void 0 : props.selectedDay, /* @__PURE__ */ new Date()) ? vue.createVNode("div", {
        "class": ns.em("time-pane", "current-time"),
        "style": {
          top: "".concat(curTimeTop.value, "px")
        }
      }, [vue.createVNode("div", {
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
    return vue.createVNode("div", {
      "ref": (el) => {
        this.calendarDaily = el;
      },
      "class": this.ns.b()
    }, [this.renderHeader(), this.renderContent()]);
  }
});

exports.CalendarDaily = CalendarDaily;
