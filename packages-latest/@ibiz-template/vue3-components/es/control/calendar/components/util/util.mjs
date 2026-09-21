import { warn, h } from 'vue';
import dayjs from 'dayjs';
import { clone } from 'ramda';
import { isObject, isArray, isDate, fromPairs } from 'lodash-es';
export { get, isArray, isDate, isObject, set } from 'lodash-es';

"use strict";
let clickCount = 0;
let timer;
const epPropKey = "__epPropKey";
const colors = [
  "#2196F3",
  "#4CAF50",
  "#3F51B5",
  "#FF9800",
  "#673AB7",
  "#757575"
];
const closeIcon = "<i class='el-icon' data-v-ea893728=''> <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' data-v-ea893728='' > <path d='M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z'></path> </svg></i>";
const hexReg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
const rgbReg = /^(rgb|rgba|RGB|RGBA)/;
function findLastParent(element) {
  var _a;
  if (!element) {
    return null;
  }
  if (!(element == null ? void 0 : element.parentNode) || ((_a = element == null ? void 0 : element.classList) == null ? void 0 : _a.contains("el-popover"))) {
    return element;
  }
  return findLastParent(element.parentNode);
}
const handlePopClose = (el) => {
  const node = findLastParent(el.target);
  if (node) {
    node.style.display = "none";
  }
};
const handleTimeRange = (startTime, endTime, format, partition = "~") => {
  var _a, _b;
  let timeRange = "";
  if (startTime && ((_a = dayjs(startTime)) == null ? void 0 : _a.isValid())) {
    timeRange = dayjs(startTime).format(format);
  }
  if (endTime && ((_b = dayjs(endTime)) == null ? void 0 : _b.isValid())) {
    timeRange = "".concat(timeRange, " ").concat(partition, " ").concat(dayjs(endTime).format(format));
  }
  return timeRange;
};
const handleBkColor = (tempColors, type) => {
  let tempColor = tempColors.get(type);
  const length = tempColors.size;
  if (type && !tempColor && length < colors.length) {
    tempColor = colors[length];
    tempColors.set(type, tempColor);
  }
  return tempColor || colors[0];
};
const validatorF = (color) => {
  const isHex = hexReg.test(color);
  const isRgb = rgbReg.test(color);
  const tempColor = color;
  if (isHex || isRgb)
    return tempColor;
  if (!color) {
    console.error("Color: Invalid color!");
    return "";
  }
  return tempColor;
};
const getRgbValueFromHex = (color) => {
  const tempColor = color.replace("#", "");
  const red = parseInt(tempColor.substring(0, 2), 16);
  const green = parseInt(tempColor.substring(2, 4), 16);
  const blue = parseInt(tempColor.substring(4, 6), 16);
  return [red, green, blue];
};
const getRgbValueFromRgb = (color) => {
  return color.replace(/rgb\(|rgba\(|\)/g, "").split(",").slice(0, 3).map(function(n) {
    return parseInt(n, 10);
  });
};
const getRgbValue = (color) => {
  if (!color) {
    console.error("getRgbValue: Missing parameters!");
    return false;
  }
  const tempColor = validatorF(color);
  if (!tempColor)
    return false;
  const isHex = hexReg.test(tempColor);
  const isRgb = rgbReg.test(tempColor);
  const lowerColor = tempColor.toLowerCase();
  if (isHex)
    return getRgbValueFromHex(lowerColor);
  if (isRgb)
    return getRgbValueFromRgb(lowerColor);
};
const getColorFromRgbValue = (value) => {
  if (!value) {
    console.error("getColorFromRgbValue: Missing parameters!");
    return false;
  }
  const valueLength = value.length;
  if (valueLength !== 3 && valueLength !== 4) {
    console.error("getColorFromRgbValue: Value is illegal!");
    return false;
  }
  let color = valueLength === 3 ? "rgb(" : "rgba(";
  color += "".concat(value.join(","), ")");
  return color;
};
const fade = (color, Percent) => {
  const percent = Percent || 100;
  if (!color) {
    console.error("fade: Missing parameters!");
    return false;
  }
  const rgbValue = getRgbValue(color);
  if (!rgbValue)
    return false;
  const rgbaValue = [...rgbValue, percent / 100];
  return getColorFromRgbValue(rgbaValue);
};
const isToday = (date, curDate) => {
  const dateToCheck = new Date(date);
  const currentDate = curDate ? new Date(curDate) : /* @__PURE__ */ new Date();
  const state = dateToCheck.getDate() === currentDate.getDate() && dateToCheck.getMonth() === currentDate.getMonth() && dateToCheck.getFullYear() === currentDate.getFullYear();
  return state;
};
function checkDateRangeIncludes(start, end, curDate) {
  const targetDate = dayjs(curDate);
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  if (!targetDate.isValid() || !startDate.isValid() || !endDate.isValid())
    return false;
  return targetDate.isSame(startDate, "day") || targetDate.isSame(endDate, "day") || startDate.isBefore(targetDate, "day") && endDate.isAfter(targetDate, "day");
}
function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
const definePropType = (val) => val;
const isEpProp = (val) => isObject(val) && !!val[epPropKey];
const isValidRange = (range) => isArray(range) && range.length === 2 && range.every((item) => isDate(item));
const isDateInCurWeek = (dateToCheck, firstDayOfWeek, lastDayOfWeek) => {
  const tempDate = new Date(dateToCheck);
  const tempFirstDay = new Date(firstDayOfWeek);
  const tempLastDay = new Date(lastDayOfWeek);
  tempDate.setHours(0, 0, 0, 0);
  tempFirstDay.setHours(0, 0, 0, 0);
  tempLastDay.setHours(0, 0, 0, 0);
  return tempDate >= tempFirstDay && tempDate <= tempLastDay;
};
const isTimeGreaterThan = (timeA, timeB) => {
  const date1 = new Date(timeA);
  const date2 = new Date(timeB);
  return date1.getTime() > date2.getTime();
};
const getCurWeekDates = (curDate) => {
  const currentDate = new Date(curDate);
  const currentDay = currentDate.getDay();
  const firstDayOfWeek = new Date(currentDate);
  firstDayOfWeek.setDate(currentDate.getDate() - currentDay);
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
  firstDayOfWeek.setHours(0, 0, 0, 0);
  lastDayOfWeek.setHours(23, 59, 59, 0);
  return {
    firstDay: firstDayOfWeek,
    lastDay: lastDayOfWeek
  };
};
const handleEmit = (eventName, item, location, events, multiple, selectedData, emit) => {
  let tempSelectedData = clone(selectedData);
  let isSelectedEvent = true;
  const targetEvent = events.find((event) => {
    return item.id === event.id;
  });
  const index = tempSelectedData.findIndex(
    (event) => item.id === event.id
  );
  if (multiple) {
    if (index === -1) {
      tempSelectedData.push(targetEvent);
    } else {
      Object.assign(item, { isSelectedEvent: false });
      isSelectedEvent = false;
      tempSelectedData.splice(index, 1);
    }
  } else if (index === -1) {
    tempSelectedData = [targetEvent];
  } else {
    Object.assign(item, { isSelectedEvent: false });
    isSelectedEvent = false;
    tempSelectedData = [];
  }
  switch (eventName) {
    case "eventClick":
      emit("eventClick", { location, data: tempSelectedData });
      break;
    case "eventDblClick":
      emit("eventDblClick", { location, data: tempSelectedData });
      break;
    default:
      break;
  }
  return { eventName, tempSelectedData, isSelectedEvent };
};
const handleEVentClick = (item, location, events, multiple, selectedData, emit) => {
  return new Promise((resolve) => {
    clickCount += 1;
    if (clickCount === 1) {
      timer = setTimeout(() => {
        if (clickCount === 1) {
          resolve(
            handleEmit(
              "eventClick",
              item,
              location,
              events,
              multiple,
              selectedData,
              emit
            )
          );
        }
        clickCount = 0;
      }, 300);
    } else if (clickCount === 2) {
      clearTimeout(timer);
      resolve(
        handleEmit(
          "eventDblClick",
          item,
          location,
          events,
          multiple,
          selectedData,
          emit
        )
      );
      clickCount = 0;
    }
  });
};
const handleProp = (prop, key) => {
  if (!isObject(prop) || isEpProp(prop))
    return prop;
  const { values, required, default: defaultValue, type, validator } = prop;
  const _validator = values || validator ? (val) => {
    let valid = false;
    let allowedValues = [];
    if (values) {
      allowedValues = Array.from(values);
      if (hasOwn(prop, "default")) {
        allowedValues.push(defaultValue);
      }
      valid || (valid = allowedValues.includes(val));
    }
    if (validator)
      valid || (valid = validator(val));
    if (!valid && allowedValues.length > 0) {
      const allowValuesText = [...new Set(allowedValues)].map((value) => JSON.stringify(value)).join(", ");
      warn(
        "Invalid prop: validation failed".concat(key ? ' for prop "'.concat(key, '"') : "", ". Expected one of [").concat(allowValuesText, "], got value ").concat(JSON.stringify(
          val
        ), ".")
      );
    }
    return valid;
  } : void 0;
  const epProp = {
    type,
    required: !!required,
    validator: _validator,
    [epPropKey]: true
  };
  if (hasOwn(prop, "default"))
    epProp.default = defaultValue;
  return epProp;
};
const rangeArr = (n) => Array.from(Array.from({ length: n }).keys());
const handleProps = (props) => fromPairs(
  Object.entries(props).map(([key, option]) => [
    key,
    handleProp(option, key)
  ])
);
function openPopover(_component, _targetEvt, _opts) {
  const overlay = ibiz.overlay.createPopover(
    (modal) => {
      return h(_component, { modal });
    },
    void 0,
    {
      width: "auto",
      height: "auto",
      noArrow: true,
      ..._opts
    }
  );
  overlay == null ? void 0 : overlay.present(_targetEvt);
  return overlay;
}
function followMouseMove(_event, _follow) {
  _follow.style.left = "".concat(_event.clientX + 20, "px");
  _follow.style.top = "".concat(_event.clientY + 20, "px");
}
const createFollowElement = () => {
  var _a;
  const followEl = document.createElement("div");
  followEl.style = "position: fixed; height: 2px; width: 2px; z-index: -1;";
  (_a = document.body) == null ? void 0 : _a.appendChild(followEl);
  return followEl;
};
const removeFollowElement = (followEl) => {
  document.body.removeChild(followEl);
};

export { checkDateRangeIncludes, closeIcon, createFollowElement, definePropType, epPropKey, fade, followMouseMove, getCurWeekDates, handleBkColor, handleEVentClick, handleEmit, handlePopClose, handleProps, handleTimeRange, isDateInCurWeek, isTimeGreaterThan, isToday, isValidRange, openPopover, rangeArr, removeFollowElement };
