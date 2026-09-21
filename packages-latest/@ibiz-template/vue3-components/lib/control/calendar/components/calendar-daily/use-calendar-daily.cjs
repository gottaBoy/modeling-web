'use strict';

var vue = require('vue');
require('../util/index.cjs');
var util = require('../util/util.cjs');

"use strict";
const useCalendarDaily = (props, emit, _ns) => {
  const drawData = vue.ref([]);
  const curTimeTimer = vue.ref();
  const curTimeTop = vue.ref(0);
  const curTimeVal = vue.ref("00:00");
  const resizableHand = vue.ref();
  const calendarDaily = vue.ref();
  const legends = vue.computed(() => props.legends || []);
  const multiple = vue.computed(() => props.multiple === true);
  const selectedData = vue.ref([]);
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
  const events = vue.computed(() => {
    return computeUIEvents(
      props.events,
      props == null ? void 0 : props.selectedDay,
      legends.value,
      calendarDaily.value
    );
  });
  const computeUIEvents = (_events, curDate, _legends, _calendarDaily) => {
    const tempEvents = [];
    const tempColors = /* @__PURE__ */ new Map();
    let contentWidth = 0;
    if (_calendarDaily) {
      contentWidth = parseInt(
        window.getComputedStyle(_calendarDaily).width,
        10
      );
    }
    _events.sort((a, b) => {
      const beginTimeDifference = new Date(a.beginTime).getTime() - new Date(b.beginTime).getTime();
      let type;
      if (beginTimeDifference === 0) {
        type = new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
      } else {
        type = beginTimeDifference;
      }
      return type;
    });
    const tempArray = [];
    _events.forEach((event) => {
      const targetLegend = _legends.find(
        (legendItem) => Object.is(legendItem.id, event.itemType)
      );
      if (!targetLegend || !targetLegend.isShow)
        return;
      if (event && event.beginTime && util.checkDateRangeIncludes(event.beginTime, event.endTime, curDate)) {
        const item = { ...event, targetLegend };
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
        tempArray.push(item);
      }
    });
    tempArray.forEach((event, index) => {
      const { targetLegend } = event;
      const tempItem = {};
      Object.assign(tempItem, event);
      Object.assign(tempItem, { zIndex: index + 1 });
      const length = tempArray.length;
      const itemWidth = (contentWidth - 90) / length;
      const percentage = Number((100 / length).toFixed(3));
      let width = "".concat(percentage, "%");
      let styleLeft = "".concat(index * percentage, "%");
      if (itemWidth < 100) {
        width = "100px";
        styleLeft = "".concat(index * 100, "px");
      }
      Object.assign(tempItem, { width, styleLeft });
      let height = "auto";
      let styleTop = 60;
      const timeRange = util.handleTimeRange(
        event.beginTime,
        event.endTime,
        "YYYY-MM-DD HH:mm:ss"
      );
      if (util.isToday(event.beginTime, event.endTime)) {
        height = getEventHeight(event.beginTime, event.endTime);
        const tempVal = handleTopOrCurVal(new Date(event.beginTime));
        styleTop = tempVal.styleTop;
      } else if (util.isToday(event.beginTime, curDate) && !util.isToday(event.endTime, curDate)) {
        const endDate = new Date(curDate);
        endDate.setHours(23, 59, 59, 0);
        height = getEventHeight(event.beginTime, endDate);
        const tempVal = handleTopOrCurVal(new Date(event.beginTime));
        styleTop = tempVal.styleTop;
      } else if (util.isToday(event.endTime, curDate) && !util.isToday(event.beginTime, curDate)) {
        const beginDate = new Date(curDate);
        beginDate.setHours(0, 0, 0, 0);
        height = getEventHeight(beginDate, event.endTime);
        const tempVal = handleTopOrCurVal(new Date(beginDate));
        styleTop = tempVal.styleTop;
      } else {
        const date = new Date(curDate);
        const beginDate = new Date(date.setHours(0, 0, 0, 0));
        const endDate = new Date(date.setHours(23, 59, 59, 59));
        height = getEventHeight(beginDate, endDate);
        const tempVal = handleTopOrCurVal(new Date(beginDate));
        styleTop = tempVal.styleTop;
      }
      Object.assign(tempItem, { height, styleTop, timeRange });
      if (!(event == null ? void 0 : event.bkColor)) {
        const bkColor = targetLegend && targetLegend.bkcolor || util.handleBkColor(tempColors, event.itemType);
        Object.assign(tempItem, { bkColor });
      }
      if (tempItem.bkColor) {
        const tempBkColor = util.fade(tempItem.bkColor, 10);
        Object.assign(tempItem, {
          bkColorFade: tempBkColor
        });
      }
      if (!(event == null ? void 0 : event.color)) {
        const tempColor = targetLegend && targetLegend.color;
        Object.assign(tempItem, {
          color: tempColor
        });
      }
      if ((tempItem == null ? void 0 : tempItem.height) && (tempItem == null ? void 0 : tempItem.height) > 10) {
        const border = "1px solid #FFF";
        Object.assign(tempItem, { border });
      } else {
        Object.assign(tempItem, { border: "none" });
      }
      tempEvents.push(tempItem);
    });
    tempColors.clear();
    return tempEvents;
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
  const handleTopOrCurVal = (date) => {
    const currentHours = date.getHours();
    const currentMinutes = date.getMinutes();
    const hours = String(currentHours).padStart(2, "0");
    const minutes = String(currentMinutes).padStart(2, "0");
    let styleTop;
    let timeVal;
    if (currentHours === 0 && currentMinutes === 0) {
      styleTop = 0;
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
  };
  const handleEventDblClick = (item, location) => {
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
  };
  const eventContextmenu = async (item, evt) => {
    emit("eventContextmenu", { evt, data: [item] });
  };
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
    events,
    resizableHand,
    calendarDaily,
    selectedData,
    handleCurTime,
    handleDrag,
    handleDragStart,
    handleEventClick,
    handleEventDblClick,
    eventContextmenu,
    initDrawData,
    contentMousemove,
    eventMouseenter,
    eventMouseleave
  };
};

exports.useCalendarDaily = useCalendarDaily;
