'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('../interface/index.cjs');
var useCalendarUser = require('./use-calendar-user.cjs');
require('./calendar-user.css');
var calendarUser = require('../interface/calendar-user.cjs');

"use strict";
const CalendarUser = /* @__PURE__ */ vue.defineComponent({
  name: "CalendarUser",
  props: calendarUser.calendarUserProps,
  emits: calendarUser.calendarUserEmits,
  setup(props, {
    emit,
    slots
  }) {
    const ns = vue3Util.useNamespace("calendar-user");
    const weekday = vue.ref([]);
    const timeList = vue.ref([]);
    timeList.value = useCalendarUser.getDayTime();
    const popoverValue = vue.ref("");
    const curPopover = vue.ref();
    vue.watch(() => props.selectedDay, () => {
      if (props.selectedDay) {
        weekday.value = useCalendarUser.calcCurWeek(new Date(props.selectedDay));
      }
    }, {
      immediate: true,
      deep: true
    });
    const onBlackClick = () => {
      emit("eventClick", {
        data: []
      });
    };
    const renderCalendarList = (items) => {
      var _a;
      if (items.length === 0)
        return vue.createVNode("div", {
          "class": ns.e("black"),
          "onClick": onBlackClick
        }, null);
      if (items.length > 1) {
        return [(_a = slots.event) == null ? void 0 : _a.call(slots, {
          data: items[0]
        }), vue.createVNode(vue.resolveComponent("el-popover"), {
          "trigger": "click",
          "ref": (el) => {
            if (el && items[0].id === popoverValue.value) {
              curPopover.value = el;
            }
          },
          "popper-class": [ns.em("more", "popper"), ns.e("custom-user-popover"), props.semanticClass("popup")],
          "popper-style": props.semanticStyle("popup"),
          "onShow": () => {
            popoverValue.value = items[0].id;
          }
        }, {
          reference: () => {
            return vue.createVNode("span", {
              "style": props.semanticStyle("more"),
              "class": [ns.e("more"), props.semanticClass("more")]
            }, ["+".concat(items.length - 1, " ").concat(ibiz.i18n.t("app.more"), "...")]);
          },
          default: () => {
            return items.map((item) => {
              var _a2;
              return (_a2 = slots.event) == null ? void 0 : _a2.call(slots, {
                data: item
              });
            });
          }
        })];
      }
      return items.map((item) => {
        var _a2;
        return (_a2 = slots.event) == null ? void 0 : _a2.call(slots, {
          data: item
        });
      });
    };
    const renderEvent = (_week, _time) => {
      const events = useCalendarUser.calcCurtimeEvents(props.events, _week, _time);
      return renderCalendarList(events);
    };
    const renderWeekHeader = () => {
      return vue.createVNode("div", {
        "class": ns.e("header")
      }, [vue.createVNode("div", {
        "class": [ns.e("row"), ns.em("header", "row")]
      }, [vue.createVNode("div", {
        "class": [ns.e("cell"), ns.em("cell", "top"), ns.em("header", "cell")]
      }, null), weekday.value.map((item) => {
        return vue.createVNode("div", {
          "class": [ns.e("cell"), ns.em("cell", "top"), ns.em("header", "cell")]
        }, [item.text, item.date]);
      })]), vue.createVNode("div", {
        "class": [ns.e("row"), ns.em("header", "row")]
      }, [vue.createVNode("div", {
        "class": [ns.e("cell"), ns.em("header", "cell")]
      }, [ibiz.i18n.t("control.calendar.calendardaily.tip")]), weekday.value.map((item) => {
        return vue.createVNode("div", {
          "class": [ns.e("cell"), ns.em("header", "cell")]
        }, [renderEvent(item)]);
      })])]);
    };
    const renderWeekContent = () => {
      return vue.createVNode("div", {
        "class": ns.e("body")
      }, [timeList.value.map((item) => {
        return vue.createVNode("div", {
          "class": [ns.e("row"), ns.em("body", "row")]
        }, [vue.createVNode("div", {
          "class": [ns.e("cell"), ns.em("body", "cell")]
        }, [item.text]), weekday.value.map((day) => {
          return vue.createVNode("div", {
            "class": [ns.e("cell"), ns.em("body", "cell")]
          }, [renderEvent(day, item)]);
        })]);
      })]);
    };
    return {
      ns,
      renderWeekHeader,
      renderWeekContent
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [this.renderWeekHeader(), this.renderWeekContent()]);
  }
});

exports.CalendarUser = CalendarUser;
