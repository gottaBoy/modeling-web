'use strict';

var vue = require('vue');
var dayjs = require('dayjs');
var vue3Util = require('@ibiz-template/vue3-util');
var quarterOfYear = require('dayjs/plugin/quarterOfYear');
require('./calendar-user2.css');

"use strict";
dayjs.extend(quarterOfYear);
const CalendarUser2 = /* @__PURE__ */ vue.defineComponent({
  name: "CalendarUser2",
  props: {
    title: {
      type: String,
      default: () => ibiz.i18n.t("control.calendar.title")
    },
    items: {
      type: Array,
      default: () => []
    },
    legends: {
      type: Array,
      default: () => []
    },
    timeRange: {
      required: true,
      type: Array,
      validator: (range) => range.length === 2
    },
    semanticClass: {
      type: Function,
      required: true
    },
    semanticStyle: {
      type: Function,
      required: true
    }
  },
  emits: {
    legendClick: (_legend) => true,
    timeRangeChange: (_range) => true
  },
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("calendar-user2");
    const range = vue.computed({
      get() {
        return props.timeRange;
      },
      set(date) {
        emit("timeRangeChange", date);
      }
    });
    const legends = vue.computed(() => {
      return props.legends.filter((legend) => legend.isShow);
    });
    const itemsByDate = vue.computed(() => {
      const map = /* @__PURE__ */ new Map();
      for (const item of props.items) {
        if (!item.beginTime && !item.endTime)
          continue;
        const start = dayjs(item.beginTime || item.endTime);
        const end = dayjs(item.endTime || item.beginTime);
        const daysDiff = end.diff(start, "day") + 1;
        for (let i = 0; i < daysDiff; i++) {
          const dateKey = start.add(i, "day").format("YYYY-MM-DD");
          if (!map.has(dateKey))
            map.set(dateKey, []);
          map.get(dateKey).push(item);
        }
      }
      return map;
    });
    const dateMarkersMap = vue.computed(() => {
      const map = /* @__PURE__ */ new Map();
      if (!props.timeRange.length)
        return map;
      const [startDate, endDate] = props.timeRange;
      let current = dayjs(startDate);
      while (current.isBefore(endDate) || current.isSame(endDate, "day")) {
        const dateKey = current.format("YYYY-MM-DD");
        const dateItems = itemsByDate.value.get(dateKey) || [];
        if (dateItems.length > 0) {
          const marks = legends.value.map((legend) => ({
            ...legend,
            items: dateItems.filter((item) => item.itemType === legend.id)
          })).filter((legend) => legend.items.length);
          if (marks.length) {
            map.set(dateKey, marks);
          }
        }
        current = current.add(1, "day");
      }
      return map;
    });
    const months = vue.computed(() => {
      if (!props.timeRange.length)
        return [];
      const [startDate, endDate] = props.timeRange;
      const monthsList = [];
      let current = dayjs(startDate).startOf("month");
      while (current.isBefore(endDate) || current.isSame(endDate, "month")) {
        monthsList.push(current.toDate());
        current = current.add(1, "month");
      }
      return monthsList;
    });
    return {
      ns,
      range,
      months,
      dateMarkersMap
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.ns.b()
    }, [vue.createVNode("div", {
      "class": [this.ns.e("header"), this.semanticClass("header")],
      "style": this.semanticStyle("header")
    }, [vue.createVNode("div", {
      "class": [this.ns.e("title"), this.ns.em("header", "left"), this.semanticClass("title")],
      "style": this.semanticStyle("title")
    }, [this.title]), vue.createVNode("div", {
      "class": [this.ns.e("legend"), this.ns.em("header", "legend"), this.semanticClass("legend")],
      "style": this.semanticStyle("legend")
    }, [this.legends.length > 1 && this.legends.map((legend) => {
      return vue.createVNode("div", {
        "class": [this.ns.e("legend-item"), this.ns.em("legend", "item"), this.semanticClass("legend.item")],
        "style": this.semanticStyle("legend.item"),
        "onClick": () => this.$emit("legendClick", legend)
      }, [vue.createVNode("div", {
        "class": this.ns.em("legend-item", "tip"),
        "style": {
          backgroundColor: legend.isShow ? legend == null ? void 0 : legend.bkcolor : "var(".concat(this.ns.cssVarName("color-disabled-bg"), ")")
        }
      }, null), vue.createVNode("div", {
        "class": this.ns.em("legend-item", "text")
      }, [legend.name])]);
    })]), vue.createVNode("div", {
      "class": [this.ns.e("toolbar"), this.ns.em("header", "right"), this.semanticClass("toolbar")],
      "style": this.semanticStyle("toolbar")
    }, [vue.createVNode(vue.resolveComponent("el-date-picker"), {
      "type": "monthrange",
      "clearable": false,
      "modelValue": this.range,
      "onUpdate:modelValue": ($event) => this.range = $event,
      "class": [this.ns.e("data-picker"), this.ns.em("toolbar", "picker"), this.semanticClass("toolbar.picker")],
      "style": this.semanticStyle("toolbar.picker")
    }, null)])]), vue.createVNode("div", {
      "class": [this.ns.e("body"), this.semanticClass("body")],
      "style": this.semanticStyle("body")
    }, [this.months.map((month) => {
      return vue.createVNode(vue.resolveComponent("el-calendar"), {
        "modelValue": month,
        "class": this.ns.e("month-calendar"),
        "key": "".concat(month.getFullYear(), "-").concat(month.getMonth())
      }, {
        header: ({
          date
        }) => {
          return vue.createVNode("div", {
            "class": this.ns.em("month-calendar", "header")
          }, [date]);
        },
        dateCell: ({
          data
        }) => {
          const {
            date
          } = data;
          const marks = this.dateMarkersMap.get(dayjs(date).format("YYYY-MM-DD")) || [];
          return vue.createVNode(vue.resolveComponent("el-popover"), {
            "trigger": "click",
            "persistent": false,
            "disabled": !marks.length,
            "popper-style": this.semanticStyle("popup"),
            "popper-class": [this.ns.e("popover"), this.semanticClass("popup")]
          }, {
            default: () => {
              return vue.createVNode("div", {
                "class": this.ns.em("popover", "content")
              }, [marks.map((mark) => {
                return vue.createVNode("div", {
                  "class": [this.ns.e("event"), this.ns.em("event", mark.id)]
                }, [mark.items.map((item) => {
                  var _a, _b;
                  return (_b = (_a = this.$slots).event) == null ? void 0 : _b.call(_a, {
                    data: item
                  });
                })]);
              })]);
            },
            reference: () => vue.createVNode("div", {
              "class": this.ns.e("date")
            }, [vue.createVNode("div", {
              "class": this.ns.em("date", "day")
            }, [date.getDate()]), vue.createVNode("div", {
              "class": this.ns.em("date", "event")
            }, [marks.map((mark) => {
              if (mark.isShow)
                return vue.createVNode("div", {
                  "class": [this.ns.e("mark"), this.ns.e("item"), this.semanticClass("mark", {
                    item: mark
                  })],
                  "style": {
                    backgroundColor: mark.bkcolor,
                    ...this.semanticStyle("mark", {
                      item: mark
                    })
                  }
                }, null);
            })])])
          });
        }
      });
    })])]);
  }
});

exports.CalendarUser2 = CalendarUser2;
