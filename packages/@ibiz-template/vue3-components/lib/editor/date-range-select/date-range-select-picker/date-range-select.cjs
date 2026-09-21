'use strict';

var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
var dayjs = require('dayjs');
var quarterRangeSelect = require('./components/quarter-range-select/quarter-range-select.cjs');
var yearRangeSelect = require('./components/year-range-select/year-range-select.cjs');
var weekRangeSelect = require('./components/week-range-select/week-range-select.cjs');
require('./date-range-select.css');

"use strict";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const IBizDateRangeSelect = /* @__PURE__ */ vue.defineComponent({
  name: "IBizDateRangeSelect",
  components: {
    "bi-quarter-range-select": quarterRangeSelect.default,
    "bi-year-range-select": yearRangeSelect.default,
    "bi-week-range-select": weekRangeSelect.default
  },
  props: {
    ...vue3Util.getDatePickerProps(),
    value: {
      type: Object
    }
  },
  emits: ["change"],
  setup(props, {
    emit
  }) {
    const ns = vue3Util.useNamespace("date-range-select");
    const c = props.controller;
    const unitValue = vue.ref(c.defaultUnit);
    const curValue = vue.ref();
    const timeType = vue.ref("DYNAMIC");
    const editorRef = vue.ref({
      DYNAMIC: null,
      STATIC: null
    });
    const popVisible = vue.ref({
      ALL: false,
      STATIC: false,
      DYNAMIC: false
    });
    const selectValue = vue.ref();
    const isOverClose = vue.ref(false);
    const units = [{
      value: "DAY",
      label: ibiz.i18n.t("editor.dateRangeSelect.day")
    }, {
      value: "WEEK",
      label: ibiz.i18n.t("editor.dateRangeSelect.week")
    }, {
      value: "MONTH",
      label: ibiz.i18n.t("editor.dateRangeSelect.month")
    }, {
      value: "QUARTER",
      label: ibiz.i18n.t("editor.dateRangeSelect.quarter")
    }, {
      value: "YEAR",
      label: ibiz.i18n.t("editor.dateRangeSelect.year")
    }];
    const timeTypes = [{
      caption: ibiz.i18n.t("editor.dateRangeSelect.static"),
      type: "STATIC"
    }, {
      caption: ibiz.i18n.t("editor.dateRangeSelect.dynamic"),
      type: "DYNAMIC"
    }];
    const handleTimeToText = (type, value, start, end) => {
      selectValue.value = c.handleTimeToText(type, unitValue.value, value, start, end);
    };
    const initDate = () => {
      curValue.value = c.initDefaultDate(unitValue.value);
      const {
        start,
        end,
        emitStart,
        emitEnd
      } = props.controller.computedDateTypesTime(unitValue.value, "DYNAMIC", curValue.value[0], curValue.value[1]);
      handleTimeToText("DYNAMIC", curValue.value, start, end);
      emit("change", {
        unit: unitValue.value,
        type: "DYNAMIC",
        start: emitStart,
        end: emitEnd
      });
    };
    const unitChange = () => {
      initDate();
    };
    const renderDateUnit = () => {
      let _slot;
      return vue.createVNode("div", {
        "class": ns.e("date-unit")
      }, [vue.createVNode("span", {
        "class": ns.em("date-unit", "label")
      }, [ibiz.i18n.t("editor.dateRangeSelect.dateUnit")]), vue.createVNode("div", {
        "class": ns.em("date-unit", "editor")
      }, [vue.createVNode(vue.resolveComponent("el-select"), {
        "modelValue": unitValue.value,
        "onUpdate:modelValue": ($event) => unitValue.value = $event,
        "class": ns.em("date-unit", "editor-select"),
        "onChange": unitChange
      }, _isSlot(_slot = units.map((item) => {
        return vue.createVNode(vue.resolveComponent("el-option"), {
          "key": item.value,
          "value": item.value,
          "label": item.label
        }, {
          default: () => {
            return item.label;
          }
        });
      })) ? _slot : {
        default: () => [_slot]
      })])]);
    };
    const renderSelectValue = () => {
      return vue.createVNode("div", {
        "class": ns.e("select-value")
      }, [selectValue.value]);
    };
    const onTypeClick = (type, event) => {
      event.stopPropagation();
      event.preventDefault();
      if (popVisible.value.STATIC || popVisible.value.DYNAMIC) {
        popVisible.value[timeType.value] = false;
        isOverClose.value = true;
        editorRef.value[type].handleClose();
      } else {
        isOverClose.value = true;
        timeType.value = type;
        popVisible.value[type] = true;
        editorRef.value[type].handleOpen();
      }
      if (curValue.value && Array.isArray(curValue.value) && curValue.value.length > 0) {
        const {
          start,
          end
        } = props.controller.computedDateTypesTime(unitValue.value, timeType.value, curValue.value[0], curValue.value[1]);
        handleTimeToText(timeType.value, curValue.value, start, end);
      }
    };
    const onTimeChange = (type, value) => {
      popVisible.value[type] = false;
      popVisible.value.ALL = false;
      curValue.value = value;
      const {
        start,
        end,
        emitStart,
        emitEnd
      } = props.controller.computedDateTypesTime(unitValue.value, type, value[0], value[1]);
      handleTimeToText(type, value, start, end);
      emit("change", {
        start: emitStart,
        end: emitEnd,
        unit: unitValue.value,
        type: timeType.value
      });
    };
    const datePanelVisible = (type, visible) => {
      var _a;
      if (!visible) {
        popVisible.value[type] = false;
        if (!popVisible.value.STATIC && !popVisible.value.DYNAMIC && !isOverClose.value) {
          popVisible.value.ALL = false;
        } else {
          isOverClose.value = false;
          if (((_a = props.value) == null ? void 0 : _a.type) && timeType.value !== props.value.type) {
            popVisible.value.ALL = false;
            onTimeChange(timeType.value, curValue.value);
          }
        }
      }
    };
    const onOpen = (_event) => {
      _event.stopPropagation();
      _event.preventDefault();
      popVisible.value.ALL = !popVisible.value.ALL;
    };
    const setRef = (tag, el) => {
      editorRef.value[tag] = el;
    };
    const renderTimeRange = (type) => {
      if (unitValue.value === "QUARTER") {
        return vue.createVNode(vue.resolveComponent("bi-quarter-range-select"), {
          "ref": (el) => setRef(type, el),
          "class": [ns.em("date-type", "editor"), ns.em("date-type", "quarter")],
          "value": curValue.value,
          "onVisibleChange": (visible) => datePanelVisible(type, visible),
          "onChange": (value) => onTimeChange(type, value)
        }, null);
      }
      if (unitValue.value === "YEAR") {
        return vue.createVNode(vue.resolveComponent("bi-year-range-select"), {
          "ref": (el) => setRef(type, el),
          "class": [ns.em("date-type", "editor"), ns.em("date-type", "year")],
          "value": curValue.value,
          "onVisibleChange": (visible) => datePanelVisible(type, visible),
          "onChange": (value) => onTimeChange(type, value)
        }, null);
      }
      if (unitValue.value === "WEEK") {
        return vue.createVNode(vue.resolveComponent("bi-week-range-select"), {
          "ref": (el) => setRef(type, el),
          "class": [ns.em("date-type", "editor"), ns.em("date-type", "week")],
          "value": curValue.value,
          "onChange": (value) => onTimeChange(type, value),
          "onVisibleChange": (visible) => datePanelVisible(type, visible)
        }, null);
      }
      const unitType = unitValue.value === "DAY" ? "daterange" : "monthrange";
      const format = unitValue.value === "DAY" ? "YYYY-MM-DD" : "YYYY-MM";
      return vue.createVNode(vue.resolveComponent("el-date-picker"), {
        "ref": (el) => setRef(type, el),
        "modelValue": curValue.value,
        "onUpdate:modelValue": ($event) => curValue.value = $event,
        "class": ns.em("date-type", "editor"),
        "type": unitType,
        "format": "YYYY-MM-DD",
        "value-format": format,
        "onVisibleChange": (visible) => datePanelVisible(type, visible),
        "onChange": (value) => onTimeChange(type, value)
      }, null);
    };
    const renderDateRange = () => {
      return vue.createVNode("div", {
        "class": ns.e("date-range")
      }, [vue.createVNode("div", {
        "class": ns.em("date-range", "label")
      }, [ibiz.i18n.t("editor.dateRangeSelect.daterange")]), vue.createVNode(vue.resolveComponent("el-popover"), {
        "visible": popVisible.value.ALL || popVisible.value.DYNAMIC || popVisible.value.STATIC,
        "trigger": "click",
        "width": "240px",
        "popper-class": ns.b("date-range-select")
      }, {
        reference: () => {
          return vue.createVNode("div", {
            "class": ns.em("date-range", "editor"),
            "onClick": onOpen
          }, [vue.createVNode("span", {
            "class": ns.em("select", "time-caption")
          }, [renderSelectValue()]), vue.createVNode("i", {
            "class": "fa fa-angle-down",
            "aria-hidden": "true"
          }, null)]);
        },
        default: () => {
          return vue.createVNode("div", {
            "class": ns.e("date-type")
          }, [timeTypes.map((item) => {
            return vue.createVNode("div", {
              "class": ns.em("date-type", "item"),
              "onClick": (event) => onTypeClick(item.type, event)
            }, [vue.createVNode("span", {
              "class": ns.em("date-type", "item-caption")
            }, [item.caption]), vue.createVNode("span", {
              "class": ns.em("date-type", "item-icon")
            }, [item.type === timeType.value && vue.createVNode("svg", {
              "viewBox": "0 0 16 16",
              "xmlns": "http://www.w3.org/2000/svg",
              "height": "1em",
              "width": "1em",
              "focusable": "false"
            }, [vue.createVNode("g", {
              "id": "agctips/check",
              "stroke-width": "1",
              "fill-rule": "evenodd"
            }, [vue.createVNode("path", {
              "id": "agc\u8DEF\u5F84-12",
              "d": "M6.012 11.201L1.313 6.832l-.817.879 5.54 5.15 9.304-9.163-.842-.855z"
            }, null)])]), vue.createVNode("i", {
              "class": "fa fa-angle-right",
              "aria-hidden": "true"
            }, null)]), renderTimeRange(item.type)]);
          })]);
        }
      })]);
    };
    const setPopVisible = () => {
      if (!popVisible.value.DYNAMIC && !popVisible.value.STATIC) {
        popVisible.value.ALL = false;
      }
    };
    vue.watch(() => props.value, (newVal) => {
      if (newVal && Object.keys(newVal).length > 0) {
        const {
          start,
          end,
          unit,
          type
        } = newVal;
        unitValue.value = unit;
        timeType.value = type;
        if (props.controller.emitMode === "TIME") {
          if (unit === "YEAR") {
            curValue.value = [new Date(String(start)).getFullYear(), new Date(String(end)).getFullYear()];
          } else {
            curValue.value = [dayjs(start).format("YYYY-MM-DD"), dayjs(end).format("YYYY-MM-DD")];
          }
          const {
            start: _start,
            end: _end
          } = props.controller.computedDateTypesTime(unitValue.value, type, start, end);
          handleTimeToText(timeType.value, curValue.value, _start, _end);
        } else {
          curValue.value = c.computedDynamicTimeToDate(unitValue.value, timeType.value, start, end);
          handleTimeToText(timeType.value, curValue.value, start, end);
        }
      } else {
        initDate();
      }
    }, {
      immediate: true
    });
    vue.onMounted(() => {
      window.addEventListener("click", setPopVisible);
    });
    vue.onBeforeUnmount(() => {
      window.removeEventListener("click", setPopVisible);
    });
    return {
      ns,
      c,
      renderDateUnit,
      renderDateRange,
      onOpen
    };
  },
  render() {
    return vue.createVNode("div", {
      "class": this.ns.b(),
      "onClick": this.onOpen
    }, [this.c.switchUnit && this.renderDateUnit(), this.renderDateRange()]);
  }
});

exports.IBizDateRangeSelect = IBizDateRangeSelect;
