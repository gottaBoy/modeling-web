import { ref, computed } from 'vue';
import '../util/index.mjs';
import { isToday, handleTimeRange, handleBkColor, fade, handleEVentClick } from '../util/util.mjs';

"use strict";
const useCalendarDaily = (props, emit) => {
  const drawData = ref([]);
  const curTimeTimer = ref();
  const curTimeTop = ref(0);
  const curTimeVal = ref("00:00");
  const resizableHand = ref();
  const calendarDaily = ref();
  const legends = computed(() => props.legends || []);
  const multiple = computed(() => props.multiple === true);
  const selectedData = ref([]);
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
  const events = computed(() => {
    return computeUIEvents(
      props.events,
      props == null ? void 0 : props.selectedDay,
      legends.value,
      calendarDaily.value
    );
  });
  const computeUIEvents = (events2, curDate, legends2, calendarDaily2) => {
    const tempEvents = [];
    const tempColors = /* @__PURE__ */ new Map();
    let contentWidth = 0;
    if (calendarDaily2) {
      contentWidth = parseInt(window.getComputedStyle(calendarDaily2).width, 10);
    }
    events2.sort((a, b) => {
      const beginTimeDifference = new Date(a.beginTime).getTime() - new Date(b.beginTime).getTime();
      let type;
      if (beginTimeDifference === 0) {
        type = new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
      } else {
        type = beginTimeDifference;
      }
      return type;
    });
    const tempArray = events2.filter((event) => {
      return event && event.beginTime && event.endTime && isToday(curDate, event.beginTime) && isToday(curDate, event.endTime);
    });
    tempArray.forEach((event, index) => {
      const tempItem = {};
      Object.assign(tempItem, event);
      const targetLegend = legends2.find(
        (legendItem) => Object.is(legendItem.id, event.itemType)
      );
      const targetEvent = selectedData.value.find(
        (item) => item.id === event.id
      );
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
      if (event.beginTime && event.endTime) {
        const height = handleEventHeight(
          event.beginTime,
          event.endTime,
          curDate
        );
        const timeRange = handleTimeRange(
          event.beginTime,
          event.endTime,
          "HH:mm"
        );
        Object.assign(tempItem, { height, timeRange });
      }
      if (event.beginTime) {
        const { styleTop } = handleTopOrCurVal(new Date(event.beginTime));
        Object.assign(tempItem, { styleTop });
      }
      if (!(event == null ? void 0 : event.bkColor)) {
        const bkColor = targetLegend ? targetLegend.bkcolor : handleBkColor(tempColors, event.itemType);
        Object.assign(tempItem, { bkColor });
      }
      if (tempItem.bkColor) {
        const tempBkColor = fade(tempItem.bkColor, 10);
        Object.assign(tempItem, {
          bkColorFade: tempBkColor
        });
      }
      if ((tempItem == null ? void 0 : tempItem.height) && (tempItem == null ? void 0 : tempItem.height) > 10) {
        const border = "1px solid #FFF";
        Object.assign(tempItem, { border });
      } else {
        Object.assign(tempItem, { border: "none" });
      }
      if (targetEvent) {
        Object.assign(tempItem, { isSelectedEvent: true });
      } else {
        Object.assign(tempItem, { isSelectedEvent: false });
      }
      if (targetLegend && targetLegend.isShow || !targetLegend) {
        tempEvents.push(tempItem);
      }
    });
    tempColors.clear();
    return tempEvents;
  };
  const handleEventHeight = (startTime, endTime, date) => {
    let height = 1;
    if (isToday(startTime, date) && isToday(endTime, date)) {
      const difference = new Date(endTime).getTime() - new Date(startTime).getTime();
      height = Math.floor(difference / (1e3 * 60));
    }
    if (height < 3) {
      height = 3;
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
  const eventClick = async (item, location) => {
    const res = await handleEVentClick(
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
    eventClick,
    initDrawData
  };
};

export { useCalendarDaily };
