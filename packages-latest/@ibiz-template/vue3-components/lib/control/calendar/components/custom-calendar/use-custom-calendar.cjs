'use strict';

var dayjs = require('dayjs');
var ElementPlus = require('element-plus');
var vue = require('vue');
require('../constant/index.cjs');
require('../util/index.cjs');
var util = require('../util/util.cjs');
var event = require('../constant/event.cjs');

"use strict";
const adjacentMonth = (start, end) => {
  const firstMonthLastDay = start.endOf("month");
  const lastMonthFirstDay = end.startOf("month");
  const isSameWeek = firstMonthLastDay.isSame(lastMonthFirstDay, "week");
  const lastMonthStartDay = isSameWeek ? lastMonthFirstDay.add(1, "week") : lastMonthFirstDay;
  return [
    [start, firstMonthLastDay],
    [lastMonthStartDay.startOf("week"), end]
  ];
};
const threeConsecutiveMonth = (start, end) => {
  const firstMonthLastDay = start.endOf("month");
  const secondMonthFirstDay = start.add(1, "month").startOf("month");
  const secondMonthStartDay = firstMonthLastDay.isSame(
    secondMonthFirstDay,
    "week"
  ) ? secondMonthFirstDay.add(1, "week") : secondMonthFirstDay;
  const secondMonthLastDay = secondMonthStartDay.endOf("month");
  const lastMonthFirstDay = end.startOf("month");
  const lastMonthStartDay = secondMonthLastDay.isSame(lastMonthFirstDay, "week") ? lastMonthFirstDay.add(1, "week") : lastMonthFirstDay;
  return [
    [start, firstMonthLastDay],
    [secondMonthStartDay.startOf("week"), secondMonthLastDay],
    [lastMonthStartDay.startOf("week"), end]
  ];
};
const useCustomCalendar = (props, emit, _componentName) => {
  const { lang } = ElementPlus.useLocale();
  const selectedDay = vue.ref();
  const now = dayjs().locale(lang.value);
  const tempRealSelectedDay = vue.ref();
  const viewType = vue.computed(() => props.viewType);
  const legends = vue.ref([]);
  const tempColors = /* @__PURE__ */ new Map();
  const multiple = vue.computed(() => props.multiple === true);
  const selectedData = vue.computed(() => props.selectedData);
  vue.watch(
    () => props.legends,
    (newVal) => {
      const tempLegend = [];
      if (newVal) {
        props.legends.forEach((item) => {
          const tempItem = {};
          Object.assign(tempItem, item);
          Object.assign(tempItem, { isShow: true });
          if (item && !item.bkcolor) {
            const bkcolor = util.handleBkColor(tempColors, item.id);
            Object.assign(tempItem, { bkcolor });
          }
          tempLegend.push(tempItem);
        });
      }
      legends.value = tempLegend;
    },
    { immediate: true, deep: true }
  );
  const calculateValidatedDateRange = (startDayjs, endDayjs) => {
    const firstDay = startDayjs.startOf("week");
    const lastDay = endDayjs.endOf("week");
    const firstMonth = firstDay.get("month");
    const lastMonth = lastDay.get("month");
    let dateRange;
    if (firstMonth === lastMonth) {
      dateRange = [[firstDay, lastDay]];
    } else if ((firstMonth + 1) % 12 === lastMonth) {
      dateRange = adjacentMonth(firstDay, lastDay);
    } else if (
      // 连续三个月（兼容时间：2021-01-30至2021-02-28）
      firstMonth + 2 === lastMonth || (firstMonth + 1) % 11 === lastMonth
    ) {
      dateRange = threeConsecutiveMonth(firstDay, lastDay);
    } else {
      dateRange = [];
    }
    return dateRange;
  };
  const validatedRange = vue.computed(() => {
    if (!props.range)
      return [];
    let tempRange = [];
    const rangeArrDayjs = props.range.map(
      (item) => dayjs(item).locale(lang.value)
    );
    const [startDayjs, endDayjs] = rangeArrDayjs;
    if (startDayjs.isAfter(endDayjs)) {
      tempRange = [];
    }
    if (startDayjs.isSame(endDayjs, "month")) {
      tempRange = calculateValidatedDateRange(startDayjs, endDayjs);
    } else {
      if (startDayjs.add(1, "month").month() !== endDayjs.month()) {
        tempRange = [];
      }
      tempRange = calculateValidatedDateRange(startDayjs, endDayjs);
    }
    return tempRange;
  });
  const date = vue.computed(() => {
    let tempVal;
    if (!props.modelValue) {
      tempVal = tempRealSelectedDay.value || (validatedRange.value.length ? validatedRange.value[0][0] : now);
    } else {
      tempVal = dayjs(props.modelValue).locale(lang.value);
    }
    return tempVal;
  });
  const realSelectedDay = vue.computed({
    get() {
      let tempVal = date.value;
      if (!props.modelValue) {
        tempVal = selectedDay.value;
      }
      tempRealSelectedDay.value = tempVal;
      return tempVal;
    },
    set(val) {
      if (!val)
        return;
      const tempVal = dayjs(val);
      selectedDay.value = tempVal;
      const result = tempVal.toDate();
      emit(event.INPUT_EVENT, result);
      emit(event.CHANGE_EVENT, result);
      emit(event.UPDATE_MODEL_EVENT, result);
    }
  });
  const events = vue.computed(() => {
    if (props.events.length > 0)
      return props.events.map((event) => {
        const tempItem = {};
        Object.assign(tempItem, event);
        Object.assign(tempItem, {
          deData: event.deData,
          beginTime: event.beginTime,
          endTime: event.endTime,
          id: event.id,
          classname: event.classname,
          text: event.text,
          content: event.content,
          tips: event.tips,
          icon: event.icon,
          color: event.color,
          bkColor: event.bkColor,
          itemType: event.itemType
        });
        return tempItem;
      });
  });
  const prevMonthDayjs = vue.computed(
    () => date.value.subtract(1, "month").date(1)
  );
  const nextMonthDayjs = vue.computed(() => date.value.add(1, "month").date(1));
  const prevYearDayjs = vue.computed(() => date.value.subtract(1, "year").date(1));
  const nextYearDayjs = vue.computed(() => date.value.add(1, "year").date(1));
  const pickDay = (day) => {
    realSelectedDay.value = day;
  };
  const selectDate = (type) => {
    const dateMap = {
      "prev-month": prevMonthDayjs.value,
      "next-month": nextMonthDayjs.value,
      "prev-year": prevYearDayjs.value,
      "next-year": nextYearDayjs.value,
      today: now
    };
    const day = dateMap[type];
    if (!day.isSame(date.value, "day")) {
      pickDay(day);
    }
  };
  const i18nDate = vue.computed(() => {
    const pickedMonth = "".concat(date.value.format("M"));
    return "".concat(date.value.year(), " ").concat(ibiz.i18n.t(
      "control.calendar.year"
    ), " ").concat(pickedMonth, " ").concat(ibiz.i18n.t("control.calendar.month"));
  });
  const shortcuts = [
    {
      text: ibiz.i18n.t("control.calendar.today"),
      value: /* @__PURE__ */ new Date()
    },
    {
      text: ibiz.i18n.t("control.calendar.calendardaily.tomorrow"),
      value: () => {
        const tempDate = /* @__PURE__ */ new Date();
        tempDate.setTime(tempDate.getTime() + 3600 * 1e3 * 24);
        return tempDate;
      }
    },
    {
      text: ibiz.i18n.t("control.calendar.calendardaily.nextweek"),
      value: () => {
        const tempDate = /* @__PURE__ */ new Date();
        tempDate.setTime(tempDate.getTime() + 3600 * 1e3 * 24 * 7);
        return tempDate;
      }
    }
  ];
  const handleEVentClick = (value) => {
    emit("eventClick", value);
  };
  const handleEVentDblClick = (value) => {
    emit("eventDblClick", value);
  };
  const handleEventContextmenu = (value) => {
    emit("eventContextmenu", value);
  };
  const curWeek = vue.computed(() => {
    let tempWeek = "";
    if (realSelectedDay.value) {
      const curDate = realSelectedDay.value.day();
      const tempWeeks = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
      ];
      const weeks = tempWeeks.map((item) => {
        return ibiz.i18n.t("control.calendar.calendardaily.weeks.".concat(item));
      });
      tempWeek = weeks[curDate];
    }
    return tempWeek;
  });
  const selectLegend = (item) => {
    const targetLegend = legends.value.find(
      (legend) => {
        return item.id === legend.id;
      }
    );
    if (targetLegend)
      Object.assign(targetLegend, { isShow: !item.isShow });
  };
  return {
    date,
    viewType,
    i18nDate,
    events,
    shortcuts,
    validatedRange,
    realSelectedDay,
    curWeek,
    legends,
    multiple,
    selectedData,
    calculateValidatedDateRange,
    pickDay,
    selectDate,
    handleEVentClick,
    handleEVentDblClick,
    handleEventContextmenu,
    selectLegend
  };
};
function calcCurrentWeekRange(date) {
  let monday;
  let sunday;
  const day = date.getDay();
  if (day === 0) {
    monday = dayjs(new Date(date.getTime() - 6 * 864e5)).format(
      "YYYY-MM-DD"
    );
    sunday = dayjs(date).format("YYYY-MM-DD");
  } else {
    monday = dayjs(new Date(date.getTime() - (day - 1) * 864e5)).format(
      "YYYY-MM-DD"
    );
    sunday = dayjs(new Date(date.getTime() + (7 - day) * 864e5)).format(
      "YYYY-MM-DD"
    );
  }
  return [monday, sunday];
}

exports.calcCurrentWeekRange = calcCurrentWeekRange;
exports.useCustomCalendar = useCustomCalendar;
