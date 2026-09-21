import { EditorController } from '@ibiz-template/runtime';
import dayjs from 'dayjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class DateRangeSelectEditorController extends EditorController {
  constructor() {
    super(...arguments);
    /**
     * 是否显示时间单位选择
     *
     * @type {Boolean}
     * @memberof DateRangeSelectEditorController
     */
    __publicField(this, "switchUnit", true);
    /**
     * 默认时间单位
     *
     * @type {('DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR')}
     * @memberof DateRangeSelectEditorController
     */
    __publicField(this, "defaultUnit", "DAY");
    /**
     * 抛出模式
     * TIME模式则是抛出时间字符串 年-月-日 时:分:秒
     * @type {('DEFAULT' | 'TIME')}
     * @memberof DateRangeSelectEditorController
     */
    __publicField(this, "emitMode", "DEFAULT");
    /**
     * 初始化默认时间
     *
     * @param {('DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR')} unit
     * @memberof DateRangeSelectEditorController
     */
    __publicField(this, "initDefaultDate", (unit) => {
      const current = new Date((/* @__PURE__ */ new Date()).toLocaleDateString());
      if (unit === "DAY") {
        const start = new Date(current.getTime() - 7 * 24 * 60 * 60 * 1e3);
        const end = current.toLocaleDateString().replaceAll("/", "-");
        return [
          dayjs(start).format("YYYY-MM-DD"),
          dayjs(end).format("YYYY-MM-DD")
        ];
      }
      if (unit === "WEEK") {
        const day = current.getDay();
        let weekday = day;
        if (day === 0) {
          weekday = 7;
        }
        const sunday = current.getTime() + (7 - weekday) * 24 * 60 * 60 * 1e3;
        const end = new Date(sunday).toLocaleDateString().replaceAll("/", "-");
        const beforeSix = current.getTime() - 6 * 7 * 24 * 60 * 60 * 1e3;
        const start = new Date(beforeSix).toLocaleDateString().replaceAll("/", "-");
        return [start, end];
      }
      if (unit === "MONTH") {
        const year = current.getFullYear();
        const month = current.getMonth() + 1;
        let startYear = year;
        let startMonth = month - 6;
        if (startMonth < 1) {
          startMonth += 12;
          startYear -= 1;
        }
        let startMonthText = "".concat(startMonth);
        let monthText = "".concat(month);
        if (startMonth < 10) {
          startMonthText = "0".concat(startMonthText);
        }
        if (month < 10) {
          monthText = "0".concat(month);
        }
        return ["".concat(startYear, "-").concat(startMonthText), "".concat(year, "-").concat(monthText)];
      }
      if (unit === "QUARTER") {
        const year = current.getFullYear();
        return ["".concat(year, "-1"), "".concat(year, "-12")];
      }
      if (unit === "YEAR") {
        return [current.getFullYear(), current.getFullYear()];
      }
    });
    /**
     * 处理时间转文本
     *
     * @param {('DYNAMIC' | 'STATIC')} type
     * @param {('DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR')} unit
     * @param {string[]} value
     * @param {number} start
     * @param {number} end
     * @memberof DateRangeSelectEditorController
     */
    __publicField(this, "handleTimeToText", (type, unit, value, start, end) => {
      if (!value || Array.isArray(value) && !value.length) {
        return "";
      }
      const tempStart = new Date(value[0]);
      const tempEnd = new Date(value[1]);
      const tempStartYear = tempStart.getFullYear();
      const tempEndYear = tempEnd.getFullYear();
      const tempStartMonth = tempStart.getMonth() + 1;
      const tempEndMonth = tempEnd.getMonth() + 1;
      const startWeek = this.getYearWeek(tempStart);
      const endWeek = this.getYearWeek(tempEnd);
      let timeSpan = value.join("~");
      let timetype = "";
      if (unit === "DAY") {
        timeSpan = value.join("~");
      }
      if (unit === "WEEK") {
        const startText = "".concat(tempStartYear, "-").concat(startWeek).concat(ibiz.i18n.t(
          "editor.dateRangeSelect.week"
        ));
        const endText = "".concat(tempEndYear, "-").concat(endWeek).concat(ibiz.i18n.t(
          "editor.dateRangeSelect.week"
        ));
        timeSpan = "".concat(startText, "~").concat(endText);
      }
      if (unit === "MONTH") {
        let startMonth = tempStartMonth;
        let endMonth = tempEndMonth;
        if (tempStartMonth < 10) {
          startMonth = "0".concat(tempStartMonth);
        }
        if (tempEndMonth < 10) {
          endMonth = "0".concat(tempEndMonth);
        }
        timeSpan = "".concat(tempStartYear, "-").concat(startMonth, " ~ ").concat(tempEndYear, "-").concat(endMonth);
      }
      if (unit === "QUARTER") {
        const startQuarter = Math.ceil(tempStartMonth / 3);
        const endQuarter = Math.ceil(tempEndMonth / 3);
        timeSpan = "".concat(tempStartYear, "-Q").concat(startQuarter, " ~ ").concat(tempEndYear, "-Q").concat(endQuarter);
      }
      if (unit === "YEAR") {
        timeSpan = "".concat(value[0], " ~ ").concat(value[1]);
      }
      if (type === "STATIC") {
        timetype = ibiz.i18n.t("editor.dateRangeSelect.static");
      } else if (unit === "DAY") {
        timetype = this.computedTextOfDay(start, end);
      } else if (unit === "WEEK") {
        timetype = this.computedTextOfWeek(start, end);
      } else if (unit === "MONTH") {
        timetype = this.computedTextOfMonth(start, end);
      } else if (unit === "QUARTER") {
        timetype = this.computedTextOfQuarter(
          start,
          end,
          tempStartYear,
          tempEndYear,
          tempStartMonth,
          tempEndMonth
        );
      } else if (unit === "YEAR") {
        timetype = this.computedTextOfYear(start, end);
      } else {
        timetype = this.computedTextOfDay(start, end);
      }
      return "".concat(timetype, " | ").concat(timeSpan);
    });
  }
  /**
   * 初始化
   *
   * @return {*}  {Promise<void>}
   * @memberof DateRangeSelectEditorController
   */
  async init() {
    await super.onInit();
    if (this.editorParams) {
      if (this.editorParams.switchUnit) {
        this.switchUnit = this.editorParams.switchUnit === "true";
      }
      if (this.editorParams.defaultUnit) {
        this.defaultUnit = this.editorParams.defaultUnit;
      }
      if (this.editorParams.emitMode) {
        this.emitMode = this.editorParams.emitMode;
      }
    }
  }
  /**
   * 计算动态时间间隔转具体时间
   *
   * @param {('DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR')} dateUnit
   * @param {string} _start
   * @param {string} _end
   * @memberof DateRangeSelectEditorController
   */
  computedDynamicTimeToDate(dateUnit, dateType, _start, _end) {
    if (dateType === "STATIC") {
      const start2 = new Date(_start * 1e3);
      const end2 = new Date(_end * 1e3);
      if (dateUnit === "YEAR") {
        return [start2.getFullYear(), end2.getFullYear()];
      }
      return [
        dayjs(start2).format("YYYY-MM-DD"),
        dayjs(end2).format("YYYY-MM-DD")
      ];
    }
    const current = /* @__PURE__ */ new Date();
    current.setHours(0, 0, 0, 0);
    if (dateUnit === "WEEK") {
      const start2 = this.timeSpanConvertToWeek(current, _start);
      const end2 = this.timeSpanConvertToWeek(current, _end);
      return [start2, end2];
    }
    if (dateUnit === "MONTH") {
      const start2 = this.timeSpanConvertToMonth(current, _start);
      const end2 = this.timeSpanConvertToMonth(current, _end);
      return [start2, end2];
    }
    if (dateUnit === "QUARTER") {
      const start2 = this.timeSpanConvertToQuarter(current, _start);
      const end2 = this.timeSpanConvertToQuarter(current, _end);
      return [start2, end2];
    }
    if (dateUnit === "YEAR") {
      const start2 = current.getFullYear() + _start;
      const end2 = current.getFullYear() + _end;
      return [start2, end2];
    }
    const start = _start * 24 * 60 * 60 * 1e3;
    const end = _end * 24 * 60 * 60 * 1e3;
    const tempStart = new Date(current.getTime() + start);
    const tempEnd = new Date(current.getTime() + end);
    return [
      dayjs(tempStart).format("YYYY-MM-DD"),
      dayjs(tempEnd).format("YYYY-MM-DD")
    ];
  }
  /**
   * 时间间隔转季度
   *
   * @private
   * @param {Date} current
   * @param {number} timespan
   * @memberof DateRangeSelectEditorController
   */
  timeSpanConvertToQuarter(current, timespan) {
    const tempYear = Math.floor(Math.abs(timespan) / 4);
    const tempQuarter = timespan % 4;
    let yearSpan = tempYear;
    if (timespan < 0) {
      yearSpan = -yearSpan;
    }
    let year = current.getFullYear() + yearSpan;
    const month = current.getMonth() + 1;
    const curQuarter = Math.ceil(month / 3);
    let quarter = curQuarter + tempQuarter;
    if (quarter < 0) {
      year -= 1;
      quarter += 4;
    }
    if (quarter > 4) {
      year += 1;
      quarter -= 4;
    }
    return "".concat(year, "-").concat(quarter * 3);
  }
  /**
   * 时间转年周
   *
   * @private
   * @param {Date} current
   * @param {number} timespan
   * @memberof DateRangeSelectEditorController
   */
  timeSpanConvertToWeek(current, timespan) {
    const date = current.getTime();
    const time = timespan * 7 * 24 * 60 * 60 * 1e3;
    return new Date(date + time).toLocaleDateString();
  }
  /**
   * 时间间隔转月份
   *
   * @private
   * @param {Date} current
   * @param {number} timespan
   * @memberof DateRangeSelectEditorController
   */
  timeSpanConvertToMonth(current, timespan) {
    const tempYear = Math.floor(Math.abs(timespan) / 12);
    const tempMonth = timespan % 12;
    let yearSpan = tempYear;
    if (timespan < 0) {
      yearSpan = -yearSpan;
    }
    let year = current.getFullYear() + yearSpan;
    let month = current.getMonth() + 1 + tempMonth;
    if (month < 0) {
      year -= 1;
      month += 12;
    }
    if (month > 12) {
      year += 1;
      month -= 12;
    }
    if (month < 10) {
      return "".concat(year, "-0").concat(month);
    }
    return "".concat(year, "-").concat(month);
  }
  /**
   *计算在各个时间类型下的开始结束时间
   *
   * @param {('DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR')} dateUnit
   * @param {('DYNAMIC' | 'STATIC')} dateType
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{ start: number; end: number; }}
   * @memberof DateRangeSelectEditorController
   */
  computedDateTypesTime(dateUnit, dateType, _start, _end) {
    const tempDate = {
      start: 0,
      end: 0,
      emitStart: 0,
      emitEnd: 0
    };
    if (dateType === "STATIC") {
      const { start, end } = this.computedStaticTime(dateUnit, _start, _end);
      Object.assign(tempDate, {
        start,
        end,
        emitStart: start,
        emitEnd: end
      });
    } else {
      const { start, end } = this.computedDynamicTime(dateUnit, _start, _end);
      Object.assign(tempDate, {
        start,
        end,
        emitStart: start,
        emitEnd: end
      });
    }
    if (this.emitMode === "TIME") {
      const tempStart = this.computedFullDateFormat(_start, dateUnit, "START");
      const tempEnd = this.computedFullDateFormat(_end, dateUnit, "END");
      Object.assign(tempDate, {
        emitStart: tempStart,
        emitEnd: tempEnd
      });
    }
    return tempDate;
  }
  /**
   * 计算完整时间格式
   *
   * @private
   * @param {(string|number)} date
   * @memberof DateRangeSelectEditorController
   */
  computedFullDateFormat(date, unit, tag) {
    const tempDate = new Date(String(date));
    const month = tempDate.getMonth() + 1;
    const bigMonth = [1, 3, 5, 7, 8, 10, 12];
    if (tag === "START") {
      tempDate.setHours(0, 0, 0, 0);
    } else {
      tempDate.setHours(23, 59, 59, 0);
    }
    if (unit === "MONTH") {
      if (tag === "START") {
        tempDate.setDate(1);
      } else if (month === 2) {
        tempDate.setDate(29);
      } else if (bigMonth.includes(month)) {
        tempDate.setDate(31);
      } else {
        tempDate.setDate(30);
      }
    }
    if (unit === "QUARTER") {
      if (tag === "START") {
        tempDate.setDate(1);
      } else if (month === 2) {
        tempDate.setDate(29);
      } else if (bigMonth.includes(month)) {
        tempDate.setDate(31);
      } else {
        tempDate.setDate(30);
      }
    }
    if (unit === "YEAR") {
      if (tag === "START") {
        tempDate.setMonth(0);
        tempDate.setDate(1);
      } else {
        tempDate.setMonth(11);
        tempDate.setDate(31);
      }
    }
    return tempDate.toLocaleString();
  }
  /**
   * 计算动态类型时间
   *
   * @param {('DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR')} dateUnit
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{ start: number; end: number }}
   * @memberof DateRangeSelectEditorController
   */
  computedDynamicTime(dateUnit, _start, _end) {
    switch (dateUnit) {
      case "DAY":
        return this.computedDaysSpace(_start, _end);
      case "WEEK":
        return this.computedWeeksSpace(_start, _end);
      case "MONTH":
        return this.computedMonthsSpace(_start, _end);
      case "QUARTER":
        return this.computedQuartersSpace(_start, _end);
      case "YEAR":
        return this.computedYearsSpace(_start, _end);
      default:
        return this.computedDaysSpace(_start, _end);
    }
  }
  /**
   * 计算天的前后间隔
   *
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{ start: number; end: number }}
   * @memberof DateRangeSelectEditorController
   */
  computedDaysSpace(_start, _end) {
    const current = /* @__PURE__ */ new Date();
    const tempStart = new Date(_start);
    const tempEnd = new Date(_end);
    current.setHours(0, 0, 0, 0);
    tempStart.setHours(0, 0, 0, 0);
    tempEnd.setHours(0, 0, 0, 0);
    const start = (tempStart.getTime() - current.getTime()) / (24 * 60 * 60 * 1e3);
    const end = (tempEnd.getTime() - current.getTime()) / (24 * 60 * 60 * 1e3);
    return {
      start,
      end
    };
  }
  /**
   * 计算周的前后间隔
   *
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{ start: number; end: number }}
   * @memberof DateRangeSelectEditorController
   */
  computedWeeksSpace(_start, _end) {
    const current = /* @__PURE__ */ new Date();
    const tempStart = new Date(_start);
    const tempEnd = new Date(_end);
    current.setHours(0, 0, 0, 0);
    tempStart.setHours(0, 0, 0, 0);
    tempEnd.setHours(0, 0, 0, 0);
    const computedWeekInterval = (start2, end2) => {
      const startMonday = this.getDateWeekMonday(start2);
      const endMonday = this.getDateWeekMonday(end2);
      const week = (endMonday.getTime() - startMonday.getTime()) / (7 * 24 * 60 * 60 * 1e3);
      return week;
    };
    const start = computedWeekInterval(current, tempStart);
    const end = computedWeekInterval(current, tempEnd);
    return {
      start,
      end
    };
  }
  /**
   * 获取指定时间所在周星期一的时间
   *
   * @param {Date} date
   * @return {*}
   * @memberof DateRangeSelectEditorController
   */
  getDateWeekMonday(date) {
    const day = date.getDay();
    let week = day;
    if (day === 0) {
      week = 7;
    }
    const monday = date.getTime() - (week - 1) * 24 * 60 * 60 * 1e3;
    return new Date(monday);
  }
  /**
   * 计算指定时间在年度内的周数
   *
   * @param {(Date | string)} endDate
   * @return {*}
   * @memberof DateRangeSelectEditorController
   */
  getYearWeek(endDate) {
    const beginDate = new Date(endDate.getFullYear(), 0, 1);
    let endWeek = endDate.getDay();
    if (endWeek === 0)
      endWeek = 7;
    let beginWeek = beginDate.getDay();
    if (beginWeek === 0)
      beginWeek = 7;
    const millisDiff = endDate.getTime() - beginDate.getTime();
    const dayDiff = Math.floor(
      (millisDiff + (beginWeek - endWeek) * (24 * 60 * 60 * 1e3)) / 864e5
    );
    return Math.ceil(dayDiff / 7) + 1;
  }
  /**
   * 计算月的前后间隔
   *
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{ start: number; end: number }}
   * @memberof DateRangeSelectEditorController
   */
  computedMonthsSpace(_start, _end) {
    const current = /* @__PURE__ */ new Date();
    const startDate = new Date(_start);
    const endDate = new Date(_end);
    const computedMonthInterval = (start2, end2) => {
      const startYear = start2.getFullYear();
      const startMonth = start2.getMonth() + 1;
      const endYear = end2.getFullYear();
      const endMonth = end2.getMonth() + 1;
      return (endYear - startYear) * 12 - startMonth + endMonth;
    };
    const start = computedMonthInterval(current, startDate);
    const end = computedMonthInterval(current, endDate);
    return {
      start,
      end
    };
  }
  /**
   *计算季度的前后间隔
   *
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{ start: number; end: number }}
   * @memberof DateRangeSelectEditorController
   */
  computedQuartersSpace(_start, _end) {
    const current = /* @__PURE__ */ new Date();
    const startDate = new Date(_start);
    const endDate = new Date(_end);
    const computedQuarterInterval = (start2, end2) => {
      const startYear = start2.getFullYear();
      const startMonth = start2.getMonth() + 1;
      const startQuarter = Math.ceil(startMonth / 3);
      const endYear = end2.getFullYear();
      const endMonth = end2.getMonth() + 1;
      const endQuarter = Math.ceil(endMonth / 3);
      return (endYear - startYear) * 4 - startQuarter + endQuarter;
    };
    const start = computedQuarterInterval(current, startDate);
    const end = computedQuarterInterval(current, endDate);
    return {
      start,
      end
    };
  }
  /**
   *计算年的前后间隔
   *
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{ start: number; end: number }}
   * @memberof DateRangeSelectEditorController
   */
  computedYearsSpace(_start, _end) {
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const start = new Date("".concat(_start)).getFullYear() - currentYear;
    const end = new Date("".concat(_end)).getFullYear() - currentYear;
    return {
      start,
      end
    };
  }
  /**
   * 计算静态类型时间
   *
   * @param {('DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR')} dateUnit
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{ start: number; end: number }}
   * @memberof DateRangeSelectEditorController
   */
  computedStaticTime(dateUnit, _start, _end) {
    switch (dateUnit) {
      case "DAY":
        return this.computedDaysTime(_start, _end);
      case "WEEK":
        return this.computedWeeksTime(_start, _end);
      case "MONTH":
        return this.computedMonthsTime(_start, _end);
      case "QUARTER":
        return this.computedQuartersTime(_start, _end);
      case "YEAR":
        return this.computedYearsTime(_start, _end);
      default:
        return this.computedDaysTime(_start, _end);
    }
  }
  /**
   * 计算 天 的时间范围,返回开始和结束时间的秒数
   *
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{
   *     start: number;
   *     end: number;
   *   }}
   * @memberof DateRangeSelectEditorController
   */
  computedDaysTime(_start, _end) {
    const startDate = new Date(_start);
    const endDate = new Date(_end);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 0);
    const start = startDate.getTime() / 1e3;
    const end = endDate.getTime() / 1e3;
    return {
      start,
      end
    };
  }
  /**
   * 计算 周 的时间范围,返回开始和结束时间的秒数
   *
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{ start: number; end: number }}
   * @memberof DateRangeSelectEditorController
   */
  computedWeeksTime(_start, _end) {
    const startDate = new Date(_start);
    const endDate = new Date(_end);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 0);
    const start = startDate.getTime() / 1e3;
    const end = endDate.getTime() / 1e3;
    return {
      start,
      end
    };
  }
  /**
   * 计算 月 的时间范围,返回开始和结束时间的秒数
   *
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{ start: number; end: number }}
   * @memberof DateRangeSelectEditorController
   */
  computedMonthsTime(_start, _end) {
    const big = [1, 3, 5, 7, 8, 10, 12];
    const startDate = new Date(_start);
    const endDate = new Date(_end);
    startDate.setHours(0, 0, 0, 0);
    if (big.includes(endDate.getMonth() + 1)) {
      endDate.setDate(31);
    } else if (endDate.getMonth() === 1) {
      endDate.setDate(29);
    } else {
      endDate.setDate(30);
    }
    endDate.setHours(23, 59, 59, 0);
    const start = startDate.getTime() / 1e3;
    const end = endDate.getTime() / 1e3;
    return {
      start,
      end
    };
  }
  /**
   * 计算 季度 的时间范围,返回开始和结束时间的秒数
   *
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{ start: number; end: number }}
   * @memberof DateRangeSelectEditorController
   */
  computedQuartersTime(_start, _end) {
    const startDate = new Date(_start);
    const endDate = new Date(_end);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 0);
    const start = startDate.getTime() / 1e3;
    const end = endDate.getTime() / 1e3;
    return {
      start,
      end
    };
  }
  /**
   * 计算 年 的时间范围,返回开始和结束时间的秒数
   *
   * @param {string} _start
   * @param {string} _end
   * @return {*}  {{ start: number; end: number }}
   * @memberof DateRangeSelectEditorController
   */
  computedYearsTime(_start, _end) {
    const startDate = new Date(_start);
    const endDate = new Date(_end);
    startDate.setHours(0, 0, 0, 0);
    endDate.setMonth(11);
    endDate.setDate(31);
    endDate.setHours(23, 59, 59, 0);
    const start = startDate.getTime() / 1e3;
    const end = endDate.getTime() / 1e3;
    return {
      start,
      end
    };
  }
  /**
   * 计算天的显示文本
   *
   * @private
   * @param {number} start
   * @param {number} end
   * @return {*}
   * @memberof DateRangeSelectEditorController
   */
  computedTextOfDay(start, end) {
    let timetype = "";
    if (start === end && start === 0) {
      timetype = ibiz.i18n.t("editor.dateRangeSelect.today");
    } else if (end === 0 && start < 0) {
      timetype = "".concat(ibiz.i18n.t("editor.dateRangeSelect.recently")).concat(Math.abs(
        start
      )).concat(ibiz.i18n.t("editor.dateRangeSelect.day"));
    } else {
      const starTtime = "".concat(start > 0 ? ibiz.i18n.t("editor.dateRangeSelect.future") : ibiz.i18n.t("editor.dateRangeSelect.pastTime")).concat(Math.abs(start)).concat(ibiz.i18n.t("editor.dateRangeSelect.day"));
      const endTime = "".concat(end > 0 ? ibiz.i18n.t("editor.dateRangeSelect.future") : ibiz.i18n.t("editor.dateRangeSelect.pastTime")).concat(Math.abs(end)).concat(ibiz.i18n.t("editor.dateRangeSelect.day"));
      timetype = "".concat(starTtime, " ~ ").concat(endTime);
    }
    return timetype;
  }
  /**
   * 计算周的文本
   *
   * @private
   * @param {number} start
   * @param {number} end
   * @return {*}
   * @memberof DateRangeSelectEditorController
   */
  computedTextOfWeek(start, end) {
    let timetype = "";
    if (start === end && start === 0) {
      timetype = ibiz.i18n.t("editor.dateRangeSelect.currentWeek");
    } else if (end === 0 && start < 0) {
      timetype = "".concat(ibiz.i18n.t("editor.dateRangeSelect.recently")).concat(Math.abs(
        start
      )).concat(ibiz.i18n.t("editor.dateRangeSelect.week"));
    } else {
      const starTtime = "".concat(start > 0 ? ibiz.i18n.t("editor.dateRangeSelect.future") : ibiz.i18n.t("editor.dateRangeSelect.pastTime")).concat(Math.abs(start)).concat(ibiz.i18n.t("editor.dateRangeSelect.week"));
      const endTime = "".concat(end > 0 ? ibiz.i18n.t("editor.dateRangeSelect.future") : ibiz.i18n.t("editor.dateRangeSelect.pastTime")).concat(Math.abs(end)).concat(ibiz.i18n.t("editor.dateRangeSelect.week"));
      timetype = "".concat(starTtime, " ~ ").concat(endTime);
    }
    return timetype;
  }
  /**
   *  计算月的文本
   *
   * @private
   * @param {number} start
   * @param {number} end
   * @return {*}
   * @memberof DateRangeSelectEditorController
   */
  computedTextOfMonth(start, end) {
    let timetype = "";
    if (start === end && start === 0) {
      timetype = ibiz.i18n.t("editor.dateRangeSelect.pastTime");
    } else if (end === 0 && start < 0) {
      timetype = "".concat(ibiz.i18n.t("editor.dateRangeSelect.recently")).concat(Math.abs(
        start
      )).concat(ibiz.i18n.t("editor.dateRangeSelect.month"));
    } else {
      const starTtime = "".concat(start > 0 ? ibiz.i18n.t("editor.dateRangeSelect.future") : ibiz.i18n.t("editor.dateRangeSelect.pastTime")).concat(Math.abs(start)).concat(ibiz.i18n.t("editor.dateRangeSelect.month"));
      const endTime = "".concat(end > 0 ? ibiz.i18n.t("editor.dateRangeSelect.future") : ibiz.i18n.t("editor.dateRangeSelect.pastTime")).concat(Math.abs(end)).concat(ibiz.i18n.t("editor.dateRangeSelect.month"));
      timetype = "".concat(starTtime, " ~ ").concat(endTime);
    }
    return timetype;
  }
  /**
   *  计算季度的文本
   *
   * @private
   * @param {number} start
   * @param {number} end
   * @param {number} tempStartYear
   * @param {number} tempEndYear
   * @param {number} tempStartMonth
   * @param {number} tempEndMonth
   * @return {*}
   * @memberof DateRangeSelectEditorController
   */
  computedTextOfQuarter(start, end, tempStartYear, tempEndYear, tempStartMonth, tempEndMonth) {
    let timetype = "";
    const curDate = /* @__PURE__ */ new Date();
    const curYear = curDate.getFullYear();
    const startQuarter = Math.ceil(tempStartMonth / 3);
    const endQuarter = Math.ceil(tempEndMonth / 3);
    if (tempStartYear === tempEndYear && startQuarter === 1 && endQuarter === 4) {
      timetype = ibiz.i18n.t("editor.dateRangeSelect.currentYear");
    } else if (start === end && start === 0) {
      timetype = ibiz.i18n.t("editor.dateRangeSelect.currentYear");
    } else if (end === 0 && start < 0 && curYear === tempStartYear) {
      timetype = "".concat(ibiz.i18n.t(
        "editor.dateRangeSelect.currentYear"
      )).concat(Math.abs(start)).concat(ibiz.i18n.t("editor.dateRangeSelect.quarter"));
    } else {
      const starTtime = "".concat(start > 0 ? ibiz.i18n.t("editor.dateRangeSelect.future") : ibiz.i18n.t("editor.dateRangeSelect.pastTime")).concat(Math.abs(start)).concat(ibiz.i18n.t("editor.dateRangeSelect.quarter"));
      const endTime = "".concat(end > 0 ? ibiz.i18n.t("editor.dateRangeSelect.future") : ibiz.i18n.t("editor.dateRangeSelect.pastTime")).concat(Math.abs(end)).concat(ibiz.i18n.t("editor.dateRangeSelect.quarter"));
      timetype = "".concat(starTtime, " ~ ").concat(endTime);
    }
    return timetype;
  }
  /**
   *  计算年的文本
   *
   * @private
   * @param {number} start
   * @param {number} end
   * @return {*}
   * @memberof DateRangeSelectEditorController
   */
  computedTextOfYear(start, end) {
    let timetype = "";
    if (start === end && start === 0) {
      timetype = ibiz.i18n.t("editor.dateRangeSelect.currentYear");
    } else if (end === 0 && start < 0) {
      timetype = "".concat(ibiz.i18n.t("editor.dateRangeSelect.recently")).concat(Math.abs(
        start
      )).concat(ibiz.i18n.t("editor.dateRangeSelect.year"));
    } else {
      const starTtime = "".concat(start > 0 ? ibiz.i18n.t("editor.dateRangeSelect.future") : ibiz.i18n.t("editor.dateRangeSelect.pastTime")).concat(Math.abs(start)).concat(ibiz.i18n.t("editor.dateRangeSelect.year"));
      const endTime = "".concat(end > 0 ? ibiz.i18n.t("editor.dateRangeSelect.future") : ibiz.i18n.t("editor.dateRangeSelect.pastTime")).concat(Math.abs(end)).concat(ibiz.i18n.t("editor.dateRangeSelect.year"));
      timetype = "".concat(starTtime, " ~ ").concat(endTime);
    }
    return timetype;
  }
}

export { DateRangeSelectEditorController };
