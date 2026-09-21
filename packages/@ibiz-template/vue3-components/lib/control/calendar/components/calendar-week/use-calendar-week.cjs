'use strict';

var vue = require('vue');
require('../util/index.cjs');
var util = require('../util/util.cjs');

"use strict";
const useCalendarWeek = (props, emit) => {
  const drawData = vue.ref([]);
  const curTimeTimer = vue.ref();
  const curTimeTop = vue.ref(1);
  const curTimeVal = vue.ref("00:00");
  const resizableHand = vue.ref();
  const calendarWeek = vue.ref();
  const legends = vue.ref();
  const multiple = vue.computed(() => props.multiple === true);
  const selectedData = vue.ref([]);
  const rows = vue.ref([]);
  const rowsHeader = vue.ref([]);
  const weekDays = vue.ref([]);
  const popVisible = vue.ref(true);
  let initialMouseY = 0;
  let initialHeight = 0;
  const handleDragStart = (event) => {
    initialMouseY = event.clientY;
    initialHeight = parseInt(
      window.getComputedStyle(resizableHand.value).height,
      10
    );
  };
  const handleDrag = (event) => {
    const heightChange = event.clientY - initialMouseY + initialHeight;
    resizableHand.value.style.height = "".concat(heightChange, "px");
  };
  const getDateRanges = (firstDate, lastDate) => {
    const firstDay = new Date(firstDate);
    const targetDate = new Date(lastDate);
    const dateArray = [];
    firstDay.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);
    for (let currentDate = new Date(firstDay); currentDate <= targetDate; currentDate.setDate(currentDate.getDate() + 1)) {
      dateArray.push(new Date(currentDate));
    }
    return dateArray;
  };
  const handleUIEvents = () => {
    const events = props.events;
    const curDate = props == null ? void 0 : props.selectedDay;
    const tempColors = /* @__PURE__ */ new Map();
    const { firstDay, lastDay } = util.getCurWeekDates(curDate);
    const tempArray = [];
    const tempEvents = [];
    const tempRowsHeader = [];
    weekDays.value = [];
    for (let i = 0; i < 7; i++) {
      const addDay = i;
      const dayValue = firstDay.getDate() + addDay;
      const date = new Date(
        firstDay.getFullYear(),
        firstDay.getMonth(),
        dayValue
      );
      const day = date.getDate();
      const tempWeeks = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
      ];
      const weeks = tempWeeks.map((item2) => {
        return ibiz.i18n.t("control.calendar.calendarweek.weeks.".concat(item2));
      });
      const caption = weeks[i];
      const isActivate = util.isToday(date, curDate);
      const item = { date, day, caption, isActivate };
      weekDays.value.push(item);
      tempArray.push([]);
      tempEvents.push([]);
      tempRowsHeader.push([]);
    }
    events.forEach((event) => {
      if (event.beginTime) {
        const item = {};
        Object.assign(item, event);
        const targetEvent = selectedData.value.find(
          (tempItem) => tempItem.id === event.id
        );
        if (targetEvent) {
          Object.assign(item, { isSelectedEvent: true });
        } else {
          Object.assign(item, { isSelectedEvent: false });
        }
        if (!event.endTime && event.beginTime) {
          Object.assign(item, { endTime: event.beginTime });
        }
        if (util.isDateInCurWeek(item.beginTime, firstDay, lastDay) && util.isDateInCurWeek(item.endTime, firstDay, lastDay)) {
          const dateArray = getDateRanges(item.beginTime, item.endTime);
          dateArray.forEach((date) => {
            const weekIndex = new Date(date).getDay();
            tempArray[weekIndex].push(item);
          });
        } else if (util.isDateInCurWeek(item.beginTime, firstDay, lastDay) && !util.isDateInCurWeek(item.endTime, firstDay, lastDay)) {
          const dateArray = getDateRanges(item.beginTime, lastDay);
          dateArray.forEach((date) => {
            const weekIndex = new Date(date).getDay();
            tempArray[weekIndex].push(item);
          });
        } else if (util.isDateInCurWeek(item.endTime, firstDay, lastDay) && !util.isDateInCurWeek(item.beginTime, firstDay, lastDay)) {
          const dateArray = getDateRanges(firstDay, item.endTime);
          dateArray.forEach((date) => {
            const weekIndex = new Date(date).getDay();
            tempArray[weekIndex].push(item);
          });
        } else if (!util.isDateInCurWeek(event.endTime, firstDay, lastDay) && !util.isDateInCurWeek(event.beginTime, firstDay, lastDay) && util.isTimeGreaterThan(firstDay, event.beginTime) && util.isTimeGreaterThan(event.endTime, firstDay)) {
          const dateArray = getDateRanges(firstDay, lastDay);
          dateArray.forEach((date) => {
            const weekIndex = new Date(date).getDay();
            tempArray[weekIndex].push(item);
          });
        }
      }
    });
    tempArray.forEach((item) => {
      item.sort((a, b) => {
        const tempA = a;
        const tempB = b;
        const beginTimeDifference = new Date(tempA.beginTime).getTime() - new Date(tempB.beginTime).getTime();
        let type;
        if (beginTimeDifference === 0) {
          type = new Date(tempA.endTime).getTime() - new Date(tempB.endTime).getTime();
        } else {
          type = beginTimeDifference;
        }
        return type;
      });
    });
    tempArray.forEach((item, hostIndex) => {
      item.forEach((event, index) => {
        const targetLegend = legends.value.find(
          (legendItem) => Object.is(legendItem.id, event.itemType)
        );
        if (targetLegend && targetLegend.isShow || !targetLegend) {
          const tempEventContent = {};
          const tempEventHeader = {};
          const length = tempArray[hostIndex].length;
          const weekDay = weekDays.value[hostIndex];
          Object.assign(tempEventContent, event);
          Object.assign(tempEventContent, { zIndex: index + 1 });
          const percentage = Number((100 / length).toFixed(3));
          const width = "".concat(percentage, "%");
          const styleLeft = "".concat(index * percentage, "%");
          Object.assign(tempEventContent, { width, styleLeft });
          let height = 3;
          let styleTop = 60;
          let timeRange = "";
          if (util.isToday(event.beginTime, event.endTime)) {
            height = getEventHeight(event.beginTime, event.endTime);
            timeRange = util.handleTimeRange(
              event.beginTime,
              event.endTime,
              "HH:mm"
            );
            const tempVal = handleTopOrCurVal(new Date(event.beginTime));
            styleTop = tempVal.styleTop;
          } else if (util.isToday(event.beginTime, weekDay.date) && !util.isToday(event.endTime, weekDay.date)) {
            const endDate = new Date(weekDay.date);
            endDate.setHours(23, 59, 59, 0);
            height = getEventHeight(event.beginTime, endDate);
            timeRange = util.handleTimeRange(
              event.beginTime,
              event.endTime,
              "YYYY-MM-DD HH:mm"
            );
            const tempVal = handleTopOrCurVal(new Date(event.beginTime));
            styleTop = tempVal.styleTop;
          } else if (util.isToday(event.endTime, weekDay.date) && !util.isToday(event.beginTime, weekDay.date)) {
            const beginDate = new Date(weekDay.date);
            beginDate.setHours(0, 0, 0, 0);
            height = getEventHeight(beginDate, event.endTime);
            timeRange = util.handleTimeRange(
              event.beginTime,
              event.endTime,
              "YYYY-MM-DD HH:mm"
            );
            const tempVal = handleTopOrCurVal(new Date(beginDate));
            styleTop = tempVal.styleTop;
          } else {
            const date = new Date(weekDay.date);
            const beginDate = new Date(date.setHours(0, 0, 0, 0));
            const endDate = new Date(date.setHours(23, 59, 59, 59));
            height = getEventHeight(beginDate, endDate);
            timeRange = util.handleTimeRange(
              event.beginTime,
              event.endTime,
              "YYYY-MM-DD HH:mm"
            );
            const tempVal = handleTopOrCurVal(new Date(beginDate));
            styleTop = tempVal.styleTop;
          }
          Object.assign(tempEventContent, { height, styleTop, timeRange });
          if (!(event == null ? void 0 : event.bkColor)) {
            const bkColor = targetLegend ? targetLegend.bkcolor : util.handleBkColor(tempColors, event.itemType);
            Object.assign(tempEventContent, { bkColor });
          }
          if (tempEventContent.bkColor) {
            const tempBkColor = util.fade(tempEventContent.bkColor, 10);
            Object.assign(tempEventContent, {
              bkColorFade: tempBkColor
            });
          }
          if ((tempEventContent == null ? void 0 : tempEventContent.height) && (tempEventContent == null ? void 0 : tempEventContent.height) > 10) {
            const border = "1px solid #FFF";
            Object.assign(tempEventContent, { border });
          } else {
            Object.assign(tempEventContent, { border: "none" });
          }
          tempEvents[hostIndex].push(tempEventContent);
          if (!util.isToday(event.beginTime, event.endTime)) {
            Object.assign(tempEventHeader, tempEventContent);
            Object.assign(tempEventHeader, {
              width: 0,
              styleLeft: 0
            });
            let headerEVentWidth = 0;
            let headerEventLeft = 0;
            if (util.isDateInCurWeek(event.beginTime, firstDay, lastDay) && util.isDateInCurWeek(event.endTime, firstDay, lastDay)) {
              const eventWidth = handleHeaderEventWidth(
                event.beginTime,
                event.endTime,
                firstDay,
                lastDay
              );
              const eventLeft = handleHeaderEventLeft(
                event.beginTime,
                firstDay,
                lastDay
              );
              headerEVentWidth = "".concat(eventWidth, "%");
              headerEventLeft = "".concat(eventLeft, "%");
            } else if (util.isDateInCurWeek(event.beginTime, firstDay, lastDay) && !util.isDateInCurWeek(event.endTime, firstDay, lastDay)) {
              const eventWidth = handleHeaderEventWidth(
                event.beginTime,
                lastDay,
                firstDay,
                lastDay
              );
              const eventLeft = handleHeaderEventLeft(
                event.beginTime,
                firstDay,
                lastDay
              );
              headerEVentWidth = "".concat(eventWidth, "%");
              headerEventLeft = "".concat(eventLeft, "%");
            } else if (util.isDateInCurWeek(event.endTime, firstDay, lastDay) && !util.isDateInCurWeek(event.beginTime, firstDay, lastDay)) {
              const eventWidth = handleHeaderEventWidth(
                firstDay,
                event.endTime,
                firstDay,
                lastDay
              );
              headerEVentWidth = "".concat(eventWidth, "%");
              headerEventLeft = "".concat(0, "%");
            } else if (!util.isDateInCurWeek(event.endTime, firstDay, lastDay) && !util.isDateInCurWeek(event.beginTime, firstDay, lastDay) && util.isTimeGreaterThan(firstDay, event.beginTime) && util.isTimeGreaterThan(event.endTime, firstDay)) {
              const eventWidth = handleHeaderEventWidth(
                firstDay,
                lastDay,
                firstDay,
                lastDay
              );
              headerEVentWidth = "".concat(eventWidth, "%");
              headerEventLeft = "".concat(0, "%");
            }
            Object.assign(tempEventHeader, {
              width: headerEVentWidth,
              styleLeft: headerEventLeft
            });
            let eventHeaderIsShow = false;
            if (util.isDateInCurWeek(event.beginTime, firstDay, lastDay) && util.isToday(event.beginTime, weekDay.date)) {
              eventHeaderIsShow = true;
            } else if (hostIndex === 0) {
              eventHeaderIsShow = true;
            }
            Object.assign(tempEventHeader, {
              isShow: eventHeaderIsShow
            });
            tempRowsHeader[hostIndex].push(tempEventHeader);
          }
        }
      });
    });
    tempColors.clear();
    rows.value = tempEvents;
    rowsHeader.value = tempRowsHeader;
  };
  const getEventHeight = (startTime, endTime) => {
    let height = 1;
    if (util.isToday(startTime, endTime)) {
      const difference = new Date(endTime).getTime() - new Date(startTime).getTime();
      height = Math.floor(difference / (1e3 * 60));
    }
    if (height < 3) {
      height = 3;
    }
    return height;
  };
  const handleHeaderEventWidth = (startTime, endTime, firstDay, lastDay) => {
    let eventWidth = "0";
    if (util.isDateInCurWeek(startTime, firstDay, lastDay) && util.isDateInCurWeek(endTime, firstDay, lastDay)) {
      const hour = 24;
      const ratio = Number((100 / hour).toFixed(3));
      const difference = new Date(endTime).getTime() - new Date(startTime).getTime();
      const totalHours = difference / (1e3 * 60 * 60);
      eventWidth = (totalHours * ratio).toFixed(3);
    }
    return eventWidth;
  };
  const handleHeaderEventLeft = (startTime, firstDay, lastDay) => {
    let eventLeft = "0";
    if (util.isDateInCurWeek(startTime, firstDay, lastDay)) {
      const beginTimeHour = new Date(startTime).getHours();
      const beginTimeMinutes = new Date(startTime).getMinutes() / 60;
      const hour = 24;
      const ratio = Number((100 / hour).toFixed(3));
      const positionTotalHour = beginTimeHour + beginTimeMinutes;
      eventLeft = (positionTotalHour * ratio).toFixed(3);
    }
    return eventLeft;
  };
  const handleTopOrCurVal = (date) => {
    const currentHours = date.getHours();
    const currentMinutes = date.getMinutes();
    const hours = String(currentHours).padStart(2, "0");
    const minutes = String(currentMinutes).padStart(2, "0");
    let styleTop;
    let timeVal;
    if (currentHours === 0 && currentMinutes === 0) {
      styleTop = 1;
      timeVal = "00:00";
    } else {
      const topVal = currentHours * 60 + currentMinutes;
      styleTop = topVal;
      timeVal = "".concat(hours, ":").concat(minutes);
    }
    return { styleTop, timeVal };
  };
  const handleCurTime = () => {
    const { styleTop, timeVal } = handleTopOrCurVal(/* @__PURE__ */ new Date());
    curTimeTop.value = styleTop;
    curTimeVal.value = timeVal;
  };
  const initDrawData = () => {
    const tempDrawData = [];
    for (let i = 1; i < 24; i++) {
      const hours = String(i).padStart(2, "0");
      const timescale = "".concat(hours, ":00");
      tempDrawData.push(timescale);
    }
    return tempDrawData;
  };
  const eventClick = async (item, location) => {
    popVisible.value = false;
    const res = await util.handleEVentClick(
      item,
      location,
      props.events,
      multiple.value,
      selectedData.value,
      emit
    );
    const { tempSelectedData, isSelectedEvent } = res;
    if (!isSelectedEvent) {
      Object.assign(item, { isSelectedEvent });
    }
    selectedData.value = tempSelectedData;
    handleUIEvents();
  };
  return {
    drawData,
    curTimeTimer,
    curTimeTop,
    curTimeVal,
    rows,
    resizableHand,
    calendarWeek,
    selectedData,
    weekDays,
    legends,
    rowsHeader,
    popVisible,
    handleCurTime,
    handleDrag,
    handleDragStart,
    eventClick,
    initDrawData,
    handleUIEvents
  };
};

exports.useCalendarWeek = useCalendarWeek;
