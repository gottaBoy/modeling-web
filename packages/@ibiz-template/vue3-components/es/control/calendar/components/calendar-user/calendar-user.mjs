import { defineComponent, ref, watch, createVNode, resolveComponent, createTextVNode } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import '../interface/index.mjs';
import { getDayTime, calcCurWeek, calcCurtimeEvents } from './use-calendar-user.mjs';
import './calendar-user.css';
import { calendarUserProps, calendarUserEmits } from '../interface/calendar-user.mjs';

"use strict";
const CalendarUser = /* @__PURE__ */ defineComponent({
  name: "CalendarUser",
  props: calendarUserProps,
  emits: calendarUserEmits,
  setup(props, {
    emit,
    slots
  }) {
    const ns = useNamespace("calendar-user");
    const weekday = ref([]);
    const timeList = ref([]);
    timeList.value = getDayTime();
    const popoverValue = ref("");
    const curPopover = ref();
    watch(() => props.selectedDay, () => {
      if (props.selectedDay) {
        weekday.value = calcCurWeek(new Date(props.selectedDay));
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
        return createVNode("div", {
          "class": ns.e("black"),
          "onClick": onBlackClick
        }, null);
      }
      if (items.length > 1) {
        return [(_a = slots.event) == null ? void 0 : _a.call(slots, {
          data: items[0]
        }), createVNode(resolveComponent("el-popover"), {
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
            return createVNode("span", {
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
      const events = calcCurtimeEvents(props.events, _week, _time);
      return renderCalendarList(events);
    };
    const renderWeekHeader = () => {
      return createVNode("div", {
        "class": ns.b("header")
      }, [createVNode("div", {
        "class": ns.be("header", "time-item")
      }, [createVNode("div", {
        "class": [ns.e("cell"), ns.be("header", "time-text"), ns.be("header", "top")]
      }, null), weekday.value.map((item) => {
        return createVNode("div", {
          "class": [ns.be("header", "week-day"), ns.e("cell"), ns.be("header", "top")]
        }, [item.text, item.date]);
      })]), createVNode("div", {
        "class": ns.be("header", "time-item")
      }, [createVNode("div", {
        "class": [ns.e("cell"), ns.be("header", "time-text")]
      }, [createTextVNode("\u5168\u5929")]), weekday.value.map((item) => {
        return createVNode("div", {
          "class": [ns.be("header", "week-item"), ns.e("cell")]
        }, [renderEvent(item)]);
      })])]);
    };
    const renderWeekContent = () => {
      return createVNode("div", {
        "class": ns.b("content")
      }, [timeList.value.map((item) => {
        return createVNode("div", {
          "class": ns.be("content", "time-item")
        }, [createVNode("div", {
          "class": [ns.be("content", "time-text"), ns.e("cell")]
        }, [item.text]), weekday.value.map((day) => {
          return createVNode("div", {
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
    return createVNode("div", {
      "class": this.ns.b()
    }, [this.renderWeekHeader(), this.renderWeekContent()]);
  }
});

export { CalendarUser };
