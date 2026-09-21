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
      if (items.length === 0) {
        return vue.createVNode("div", {
          "class": ns.e("black"),
          "onClick": onBlackClick
        }, null);
      }
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
          "onShow": () => {
            popoverValue.value = items[0].id;
          }
        }, {
          reference: () => {
            return vue.createVNode("span", {
              "class": ns.b("more")
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
        "class": ns.b("header")
      }, [vue.createVNode("div", {
        "class": ns.be("header", "time-item")
      }, [vue.createVNode("div", {
        "class": [ns.e("cell"), ns.be("header", "time-text"), ns.be("header", "top")]
      }, null), weekday.value.map((item) => {
        return vue.createVNode("div", {
          "class": [ns.be("header", "week-day"), ns.e("cell"), ns.be("header", "top")]
        }, [item.text, item.date]);
      })]), vue.createVNode("div", {
        "class": ns.be("header", "time-item")
      }, [vue.createVNode("div", {
        "class": [ns.e("cell"), ns.be("header", "time-text")]
      }, [vue.createTextVNode("\u5168\u5929")]), weekday.value.map((item) => {
        return vue.createVNode("div", {
          "class": [ns.be("header", "week-item"), ns.e("cell")]
        }, [renderEvent(item)]);
      })])]);
    };
    const renderWeekContent = () => {
      return vue.createVNode("div", {
        "class": ns.b("content")
      }, [timeList.value.map((item) => {
        return vue.createVNode("div", {
          "class": ns.be("content", "time-item")
        }, [vue.createVNode("div", {
          "class": [ns.be("content", "time-text"), ns.e("cell")]
        }, [item.text]), weekday.value.map((day) => {
          return vue.createVNode("div", {
            "class": [ns.be("content", "week-item"), ns.e("cell")]
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
