'use strict';

var vue = require('vue');
require('../util/index.cjs');
var util = require('../util/util.cjs');

"use strict";
const useCalendarWeek = (props, emit, _ns) => {
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
    if (heightChange < 320)
      resizableHand.value.style.height = "".concat(heightChange, "px");
  };
  const handleDragEnd = () => {
    initHeaderEventScroll();
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
  const handleEventItemUIData = (_event, _weekDay, tempColors, _length, _index) => {
    const tempEventContent = {};
    const { targetLegend } = _event;
    Object.assign(tempEventContent, _event);
    Object.assign(tempEventContent, { zIndex: _index + 1 });
    const percentage = Number((100 / _length).toFixed(3));
    const width = "".concat(percentage, "%");
    const styleLeft = "".concat(_index * percentage, "%");
    Object.assign(tempEventContent, { width, styleLeft });
    let height = "auto";
    let styleTop = 60;
    const timeRange = util.handleTimeRange(
      _event.beginTime,
      _event.endTime,
      "YYYY-MM-DD HH:mm:ss"
    );
    if (util.isToday(_event.beginTime, _event.endTime)) {
      height = getEventHeight(_event.beginTime, _event.endTime);
      const tempVal = handleTopOrCurVal(new Date(_event.beginTime));
      styleTop = tempVal.styleTop;
    } else if (util.isToday(_event.beginTime, _weekDay.date) && !util.isToday(_event.endTime, _weekDay.date)) {
      const endDate = new Date(_weekDay.date);
      endDate.setHours(23, 59, 59, 0);
      height = getEventHeight(_event.beginTime, endDate);
      const tempVal = handleTopOrCurVal(new Date(_event.beginTime));
      styleTop = tempVal.styleTop;
    } else if (util.isToday(_event.endTime, _weekDay.date) && !util.isToday(_event.beginTime, _weekDay.date)) {
      const beginDate = new Date(_weekDay.date);
      beginDate.setHours(0, 0, 0, 0);
      height = getEventHeight(beginDate, _event.endTime);
      const tempVal = handleTopOrCurVal(new Date(beginDate));
      styleTop = tempVal.styleTop;
    } else {
      const date = new Date(_weekDay.date);
      const beginDate = new Date(date.setHours(0, 0, 0, 0));
      const endDate = new Date(date.setHours(23, 59, 59, 59));
      height = getEventHeight(beginDate, endDate);
      const tempVal = handleTopOrCurVal(new Date(beginDate));
      styleTop = tempVal.styleTop;
    }
    Object.assign(tempEventContent, { height, styleTop, timeRange });
    if (!(_event == null ? void 0 : _event.bkColor)) {
      const bkColor = targetLegend && targetLegend.bkcolor || util.handleBkColor(tempColors, _event.itemType);
      Object.assign(tempEventContent, { bkColor });
    }
    if (tempEventContent.bkColor) {
      const tempBkColor = util.fade(tempEventContent.bkColor, 10);
      Object.assign(tempEventContent, {
        bkColorFade: tempBkColor
      });
    }
    if (!(_event == null ? void 0 : _event.color)) {
      const tempColor = targetLegend && targetLegend.color;
      Object.assign(tempEventContent, {
        color: tempColor
      });
    }
    if ((tempEventContent == null ? void 0 : tempEventContent.height) && (tempEventContent == null ? void 0 : tempEventContent.height) > 10) {
      const border = "1px solid #FFF";
      Object.assign(tempEventContent, { border });
    } else {
      Object.assign(tempEventContent, { border: "none" });
    }
    return tempEventContent;
  };
  const handleHeaderEventItemUIData = (_event, _weekDay, _firstDay, _lastDay, _length, _index, _hostIndex) => {
    const tempEventHeader = {};
    Object.assign(tempEventHeader, _event);
    Object.assign(tempEventHeader, {
      width: 0,
      styleLeft: 0
    });
    let headerEVentWidth = 0;
    let headerEventLeft = 0;
    if (util.isDateInCurWeek(_event.beginTime, _firstDay, _lastDay) && util.isDateInCurWeek(_event.endTime, _firstDay, _lastDay)) {
      const eventWidth = handleHeaderEventWidth(
        _event.beginTime,
        _event.endTime,
        _firstDay,
        _lastDay
      );
      const eventLeft = handleHeaderEventLeft(
        _event.beginTime,
        _firstDay,
        _lastDay
      );
      headerEVentWidth = "".concat(eventWidth, "%");
      headerEventLeft = "".concat(eventLeft, "%");
    } else if (util.isDateInCurWeek(_event.beginTime, _firstDay, _lastDay) && !util.isDateInCurWeek(_event.endTime, _firstDay, _lastDay)) {
      const eventWidth = handleHeaderEventWidth(
        _event.beginTime,
        _lastDay,
        _firstDay,
        _lastDay
      );
      const eventLeft = handleHeaderEventLeft(
        _event.beginTime,
        _firstDay,
        _lastDay
      );
      headerEVentWidth = "".concat(eventWidth, "%");
      headerEventLeft = "".concat(eventLeft, "%");
    } else if (util.isDateInCurWeek(_event.endTime, _firstDay, _lastDay) && !util.isDateInCurWeek(_event.beginTime, _firstDay, _lastDay)) {
      const eventWidth = handleHeaderEventWidth(
        _firstDay,
        _event.endTime,
        _firstDay,
        _lastDay
      );
      headerEVentWidth = "".concat(eventWidth, "%");
      headerEventLeft = "".concat(0, "%");
    } else if (!util.isDateInCurWeek(_event.endTime, _firstDay, _lastDay) && !util.isDateInCurWeek(_event.beginTime, _firstDay, _lastDay) && util.isTimeGreaterThan(_firstDay, _event.beginTime) && util.isTimeGreaterThan(_event.endTime, _firstDay)) {
      const eventWidth = handleHeaderEventWidth(
        _firstDay,
        _lastDay,
        _firstDay,
        _lastDay
      );
      headerEVentWidth = "".concat(eventWidth, "%");
      headerEventLeft = "".concat(0, "%");
    }
    Object.assign(tempEventHeader, {
      width: headerEVentWidth,
      styleLeft: headerEventLeft
    });
    let eventHeaderIsShow = false;
    if (util.isDateInCurWeek(_event.beginTime, _firstDay, _lastDay) && util.isToday(_event.beginTime, _weekDay.date)) {
      eventHeaderIsShow = true;
    } else if (_hostIndex === 0) {
      eventHeaderIsShow = true;
    }
    const _curDate = new Date(_weekDay.date);
    if (!util.checkDateRangeIncludes(_event.beginTime, _event.endTime, _curDate)) {
      eventHeaderIsShow = false;
    }
    Object.assign(tempEventHeader, {
      isShow: eventHeaderIsShow
    });
    return tempEventHeader;
  };
  const handleUIEvents = () => {
    const events = props.events;
    const curDate = props == null ? void 0 : props.selectedDay;
    const tempColors = /* @__PURE__ */ new Map();
    const { firstDay, lastDay } = util.getCurWeekDates(curDate);
    const tempArray = [];
    const tempHeaderArray = [];
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
      tempHeaderArray.push([]);
      tempEvents.push([]);
      tempRowsHeader.push([]);
    }
    events.forEach((event) => {
      const targetLegend = legends.value.find(
        (legendItem) => Object.is(legendItem.id, event.itemType)
      );
      if (!targetLegend || !targetLegend.isShow)
        return;
      if (event.beginTime) {
        const item = { targetLegend };
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
        if (util.isDateInCurWeek(item.beginTime, firstDay, lastDay) && util.isDateInCurWeek(item.endTime, firstDay, lastDay) || util.isDateInCurWeek(item.beginTime, firstDay, lastDay) && !util.isDateInCurWeek(item.endTime, firstDay, lastDay) || util.isDateInCurWeek(item.endTime, firstDay, lastDay) && !util.isDateInCurWeek(item.beginTime, firstDay, lastDay) || !util.isDateInCurWeek(event.endTime, firstDay, lastDay) && !util.isDateInCurWeek(event.beginTime, firstDay, lastDay) && util.isTimeGreaterThan(firstDay, event.beginTime) && util.isTimeGreaterThan(event.endTime, firstDay)) {
          const dateArray = getDateRanges(firstDay, lastDay);
          dateArray.forEach((date) => {
            const weekIndex = new Date(date).getDay();
            tempHeaderArray[weekIndex].push({ ...item });
          });
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
    tempHeaderArray.forEach((item) => {
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
        if (event.targetLegend) {
          const length = tempArray[hostIndex].length;
          const weekDay = weekDays.value[hostIndex];
          tempEvents[hostIndex].push(
            handleEventItemUIData(event, weekDay, tempColors, length, index)
          );
        }
      });
    });
    tempHeaderArray.forEach((item, hostIndex) => {
      item.forEach((event, index) => {
        if (event.targetLegend) {
          const length = tempArray[hostIndex].length;
          const weekDay = weekDays.value[hostIndex];
          const _tempEnent = handleEventItemUIData(
            event,
            weekDay,
            tempColors,
            length,
            index
          );
          tempRowsHeader[hostIndex].push(
            handleHeaderEventItemUIData(
              _tempEnent,
              weekDay,
              firstDay,
              lastDay,
              length,
              index,
              hostIndex
            )
          );
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
    if (height < 30) {
      height = "auto";
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
  const handleEventClick = (item, location) => {
    popVisible.value = false;
    const res = util.handleEmit(
      "eventClick",
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
  const handleEventDblClick = (item, location) => {
    popVisible.value = false;
    const res = util.handleEmit(
      "eventDblClick",
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
  const headerEventRef = vue.ref();
  const scrollTop = vue.ref(0);
  const thumbHeight = vue.ref(0);
  const enableScroll = vue.ref(false);
  const orginY = vue.ref(0);
  const realHeight = vue.ref(1);
  const visibleHeight = vue.ref(1);
  const isScroll = vue.ref(false);
  const onMouseMove = (event) => {
    if (enableScroll.value) {
      const y = event.clientY - orginY.value;
      scrollTop.value += y;
      orginY.value = event.clientY;
      if (headerEventRef.value) {
        headerEventRef.value.scrollTop = realHeight.value * (scrollTop.value / visibleHeight.value);
      }
    }
    event.preventDefault();
    event.stopPropagation();
  };
  const onMouseUp = (event) => {
    enableScroll.value = false;
    event.preventDefault();
    event.stopPropagation();
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };
  const onScrollbarMouseDown = (event) => {
    orginY.value = event.clientY;
    enableScroll.value = true;
    event.preventDefault();
    event.stopPropagation();
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };
  const onHeaderEventScroll = (event) => {
    var _a, _b, _c;
    const realTop = ((_a = event.target) == null ? void 0 : _a.scrollTop) || 0;
    realHeight.value = (_b = event.target) == null ? void 0 : _b.scrollHeight;
    visibleHeight.value = (_c = event.target) == null ? void 0 : _c.clientHeight;
    const realRatio = realTop / realHeight.value;
    scrollTop.value = realRatio * visibleHeight.value;
    thumbHeight.value = visibleHeight.value * (visibleHeight.value / realHeight.value);
  };
  const initHeaderEventScroll = () => {
    realHeight.value = 0;
    visibleHeight.value = 0;
    isScroll.value = false;
    thumbHeight.value = 0;
    vue.nextTick(() => {
      if (headerEventRef.value) {
        realHeight.value = headerEventRef.value.scrollHeight;
        visibleHeight.value = headerEventRef.value.clientHeight;
        if (realHeight.value > visibleHeight.value) {
          isScroll.value = true;
        }
        thumbHeight.value = visibleHeight.value * (visibleHeight.value / realHeight.value);
      }
    });
  };
  const eventContextmenu = async (item, evt) => {
    emit("eventContextmenu", { evt, data: [item] });
  };
  vue.watch(
    () => headerEventRef.value,
    () => {
      initHeaderEventScroll();
    },
    {
      immediate: true,
      deep: true
    }
  );
  const followElement = util.createFollowElement();
  let overlay = null;
  let eventLocation = "";
  const contentMousemove = (_event) => {
    if (eventLocation === "content" && overlay && followElement)
      util.followMouseMove(_event, followElement);
  };
  const eventMouseenter = (_event, _component, _location) => {
    if (!props.showDetail || overlay) {
      return;
    }
    const isContent = _location === "content";
    eventLocation = _location;
    overlay = util.openPopover(
      _component,
      isContent ? followElement : _event.target,
      {
        placement: isContent ? "right-start" : "bottom",
        modalClass: _ns.e("event-popover")
      }
    );
  };
  const eventMouseleave = (_e) => {
    overlay == null ? void 0 : overlay.dismiss();
    overlay = null;
    eventLocation = "";
  };
  vue.onBeforeUnmount(() => {
    util.removeFollowElement(followElement);
  });
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
    headerEventRef,
    thumbHeight,
    realHeight,
    scrollTop,
    isScroll,
    handleCurTime,
    handleDrag,
    handleDragStart,
    handleDragEnd,
    handleEventClick,
    handleEventDblClick,
    initDrawData,
    handleUIEvents,
    onScrollbarMouseDown,
    onHeaderEventScroll,
    initHeaderEventScroll,
    eventContextmenu,
    contentMousemove,
    eventMouseenter,
    eventMouseleave
  };
};

exports.useCalendarWeek = useCalendarWeek;
