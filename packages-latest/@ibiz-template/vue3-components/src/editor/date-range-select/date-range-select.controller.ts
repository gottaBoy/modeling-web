/* @typescript-eslint/explicit-module-boundary-types */
import { EditorController } from '@ibiz-template/runtime';
import dayjs from 'dayjs';

export class DateRangeSelectEditorController extends EditorController {
  /**
   * 是否显示时间单位选择
   *
   * @type {Boolean}
   * @memberof DateRangeSelectEditorController
   */
  public switchUnit: boolean = true;

  /**
   * 默认时间单位
   *
   * @type {('DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR')}
   * @memberof DateRangeSelectEditorController
   */
  public defaultUnit: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR' = 'DAY';

  /**
   * 抛出模式
   * TIME模式则是抛出时间字符串 年-月-日 时:分:秒
   * @type {('DEFAULT' | 'TIME')}
   * @memberof DateRangeSelectEditorController
   */
  public emitMode: 'DEFAULT' | 'TIME' = 'DEFAULT';

  /**
   * 初始化
   *
   * @return {*}  {Promise<void>}
   * @memberof DateRangeSelectEditorController
   */
  async init(): Promise<void> {
    await super.onInit();
    if (this.editorParams) {
      if (this.editorParams.switchUnit) {
        this.switchUnit = this.editorParams.switchUnit === 'true';
      }
      if (this.editorParams.switchunit) {
        this.switchUnit = this.editorParams.switchunit === 'true';
      }
      if (this.editorParams.defaultUnit) {
        this.defaultUnit = this.editorParams.defaultUnit;
      }
      if (this.editorParams.defaultunit) {
        this.defaultUnit = this.editorParams.defaultunit;
      }
      if (this.editorParams.emitMode) {
        this.emitMode = this.editorParams.emitMode;
      }
      if (this.editorParams.emitmode) {
        this.emitMode = this.editorParams.emitmode;
      }
    }
  }

  /**
   * 初始化默认时间
   *
   * @param {('DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR')} unit
   * @memberof DateRangeSelectEditorController
   */
  public initDefaultDate = (
    unit: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR',
  ): Array<string | number> | undefined => {
    const current = new Date(new Date().toLocaleDateString());
    if (unit === 'DAY') {
      const start = new Date(current.getTime() - 7 * 24 * 60 * 60 * 1000);
      const end = current.toLocaleDateString().replaceAll('/', '-');
      return [
        dayjs(start).format('YYYY-MM-DD'),
        dayjs(end).format('YYYY-MM-DD'),
      ];
    }
    if (unit === 'WEEK') {
      const day = current.getDay();
      let weekday = day;
      if (day === 0) {
        weekday = 7;
      }
      const sunday = current.getTime() + (7 - weekday) * 24 * 60 * 60 * 1000;
      const end = new Date(sunday).toLocaleDateString().replaceAll('/', '-');
      const beforeSix = current.getTime() - 6 * 7 * 24 * 60 * 60 * 1000;
      const start = new Date(beforeSix)
        .toLocaleDateString()
        .replaceAll('/', '-');
      return [start, end];
    }
    if (unit === 'MONTH') {
      const year = current.getFullYear();
      const month = current.getMonth() + 1;
      let startYear = year;
      let startMonth = month - 6;
      if (startMonth < 1) {
        startMonth += 12;
        startYear -= 1;
      }
      let startMonthText = `${startMonth}`;
      let monthText = `${month}`;
      if (startMonth < 10) {
        startMonthText = `0${startMonthText}`;
      }
      if (month < 10) {
        monthText = `0${month}`;
      }
      return [`${startYear}-${startMonthText}`, `${year}-${monthText}`];
    }
    if (unit === 'QUARTER') {
      const year = current.getFullYear();
      return [`${year}-1`, `${year}-12`];
    }
    if (unit === 'YEAR') {
      return [current.getFullYear(), current.getFullYear()];
    }
  };

  /**
   * 计算动态时间间隔转具体时间
   *
   * @param {('DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR')} dateUnit
   * @param {string} _start
   * @param {string} _end
   * @memberof DateRangeSelectEditorController
   */
  public computedDynamicTimeToDate(
    dateUnit: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR',
    dateType: 'DYNAMIC' | 'STATIC',
    _start: number,
    _end: number,
  ): Array<string | number> {
    if (dateType === 'STATIC') {
      const start = new Date(_start * 1000);
      const end = new Date(_end * 1000);
      if (dateUnit === 'YEAR') {
        // 只返回年
        return [start.getFullYear(), end.getFullYear()];
      }
      return [
        dayjs(start).format('YYYY-MM-DD'),
        dayjs(end).format('YYYY-MM-DD'),
      ];
    }
    const current = new Date();
    current.setHours(0, 0, 0, 0);

    if (dateUnit === 'WEEK') {
      const start = this.timeSpanConvertToWeek(current, _start);
      const end = this.timeSpanConvertToWeek(current, _end);
      return [start, end];
    }
    if (dateUnit === 'MONTH') {
      const start = this.timeSpanConvertToMonth(current, _start);
      const end = this.timeSpanConvertToMonth(current, _end);
      return [start, end];
    }
    if (dateUnit === 'QUARTER') {
      const start = this.timeSpanConvertToQuarter(current, _start);
      const end = this.timeSpanConvertToQuarter(current, _end);
      return [start, end];
    }
    if (dateUnit === 'YEAR') {
      const start = current.getFullYear() + _start;
      const end = current.getFullYear() + _end;
      return [start, end];
    }
    // 默认是天
    const start = _start * 24 * 60 * 60 * 1000;
    const end = _end * 24 * 60 * 60 * 1000;
    const tempStart = new Date(current.getTime() + start);
    const tempEnd = new Date(current.getTime() + end);
    return [
      dayjs(tempStart).format('YYYY-MM-DD'),
      dayjs(tempEnd).format('YYYY-MM-DD'),
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
  private timeSpanConvertToQuarter(current: Date, timespan: number) {
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
    return `${year}-${quarter * 3}`;
  }

  /**
   * 时间转年周
   *
   * @private
   * @param {Date} current
   * @param {number} timespan
   * @memberof DateRangeSelectEditorController
   */
  private timeSpanConvertToWeek(current: Date, timespan: number) {
    const date = current.getTime();
    const time = timespan * 7 * 24 * 60 * 60 * 1000;
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
  private timeSpanConvertToMonth(current: Date, timespan: number) {
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
      return `${year}-0${month}`;
    }
    return `${year}-${month}`;
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
  public computedDateTypesTime(
    dateUnit: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR',
    dateType: 'DYNAMIC' | 'STATIC',
    _start: string,
    _end: string,
  ): {
    start: number;
    end: number;
    emitStart: number | string;
    emitEnd: number | string;
  } {
    const tempDate: {
      start: number;
      end: number;
      emitStart: number | string;
      emitEnd: number | string;
    } = {
      start: 0,
      end: 0,
      emitStart: 0,
      emitEnd: 0,
    };
    if (dateType === 'STATIC') {
      const { start, end } = this.computedStaticTime(dateUnit, _start, _end);
      Object.assign(tempDate, {
        start,
        end,
        emitStart: start,
        emitEnd: end,
      });
    } else {
      const { start, end } = this.computedDynamicTime(dateUnit, _start, _end);
      Object.assign(tempDate, {
        start,
        end,
        emitStart: start,
        emitEnd: end,
      });
    }
    if (this.emitMode === 'TIME') {
      // 计算年月日 时分秒
      const tempStart = this.computedFullDateFormat(_start, dateUnit, 'START');
      const tempEnd = this.computedFullDateFormat(_end, dateUnit, 'END');
      Object.assign(tempDate, {
        emitStart: tempStart,
        emitEnd: tempEnd,
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
  private computedFullDateFormat(
    date: string | number,
    unit: string,
    tag: 'START' | 'END',
  ) {
    const tempDate = new Date(String(date));
    const month = tempDate.getMonth() + 1;
    const bigMonth = [1, 3, 5, 7, 8, 10, 12];
    if (tag === 'START') {
      tempDate.setHours(0, 0, 0, 0);
    } else {
      tempDate.setHours(23, 59, 59, 0);
    }
    if (unit === 'MONTH') {
      if (tag === 'START') {
        tempDate.setDate(1);
      } else if (month === 2) {
        tempDate.setDate(29);
      } else if (bigMonth.includes(month)) {
        tempDate.setDate(31);
      } else {
        tempDate.setDate(30);
      }
    }
    if (unit === 'QUARTER') {
      if (tag === 'START') {
        tempDate.setDate(1);
      } else if (month === 2) {
        tempDate.setDate(29);
      } else if (bigMonth.includes(month)) {
        tempDate.setDate(31);
      } else {
        tempDate.setDate(30);
      }
    }
    if (unit === 'YEAR') {
      if (tag === 'START') {
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
  computedDynamicTime(
    dateUnit: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR',
    _start: string,
    _end: string,
  ): { start: number; end: number } {
    switch (dateUnit) {
      case 'DAY':
        return this.computedDaysSpace(_start, _end);
      case 'WEEK':
        return this.computedWeeksSpace(_start, _end);
      case 'MONTH':
        return this.computedMonthsSpace(_start, _end);
      case 'QUARTER':
        return this.computedQuartersSpace(_start, _end);
      case 'YEAR':
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
  computedDaysSpace(
    _start: string,
    _end: string,
  ): { start: number; end: number } {
    const current = new Date();
    const tempStart = new Date(_start);
    const tempEnd = new Date(_end);
    current.setHours(0, 0, 0, 0);
    tempStart.setHours(0, 0, 0, 0);
    tempEnd.setHours(0, 0, 0, 0);

    const start =
      (tempStart.getTime() - current.getTime()) / (24 * 60 * 60 * 1000);
    const end = (tempEnd.getTime() - current.getTime()) / (24 * 60 * 60 * 1000);
    return {
      start,
      end,
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
  computedWeeksSpace(
    _start: string,
    _end: string,
  ): { start: number; end: number } {
    const current = new Date();
    const tempStart = new Date(_start);
    const tempEnd = new Date(_end);
    // 初始化为每天开始时间
    current.setHours(0, 0, 0, 0);
    tempStart.setHours(0, 0, 0, 0);
    tempEnd.setHours(0, 0, 0, 0);

    // 计算周间隔
    const computedWeekInterval = (start: Date, end: Date): number => {
      const startMonday = this.getDateWeekMonday(start);
      const endMonday = this.getDateWeekMonday(end);
      const week =
        (endMonday.getTime() - startMonday.getTime()) /
        (7 * 24 * 60 * 60 * 1000);
      return week;
    };
    const start = computedWeekInterval(current, tempStart);
    const end = computedWeekInterval(current, tempEnd);
    return {
      start,
      end,
    };
  }

  /**
   * 获取指定时间所在周星期一的时间
   *
   * @param {Date} date
   * @return {*}
   * @memberof DateRangeSelectEditorController
   */
  public getDateWeekMonday(date: Date): Date {
    const day = date.getDay();
    let week = day;
    if (day === 0) {
      week = 7;
    }
    const monday = date.getTime() - (week - 1) * 24 * 60 * 60 * 1000;
    return new Date(monday);
  }

  /**
   * 计算指定时间在年度内的周数
   *
   * @param {(Date | string)} endDate
   * @return {*}
   * @memberof DateRangeSelectEditorController
   */
  public getYearWeek(endDate: Date): number {
    // 本年的第一天
    const beginDate = new Date(endDate.getFullYear(), 0, 1);
    // 星期从0-6,0代表星期天，6代表星期六
    let endWeek = endDate.getDay();
    if (endWeek === 0) endWeek = 7;
    let beginWeek = beginDate.getDay();
    if (beginWeek === 0) beginWeek = 7;
    // 计算两个日期的天数差
    const millisDiff = endDate.getTime() - beginDate.getTime();
    const dayDiff = Math.floor(
      (millisDiff + (beginWeek - endWeek) * (24 * 60 * 60 * 1000)) / 86400000,
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
  computedMonthsSpace(
    _start: string,
    _end: string,
  ): { start: number; end: number } {
    const current = new Date();
    const startDate = new Date(_start);
    const endDate = new Date(_end);

    // 计算月度间隔
    const computedMonthInterval = (start: Date, end: Date) => {
      const startYear = start.getFullYear();
      const startMonth = start.getMonth() + 1;
      const endYear = end.getFullYear();
      const endMonth = end.getMonth() + 1;
      return (endYear - startYear) * 12 - startMonth + endMonth;
    };
    const start = computedMonthInterval(current, startDate);
    const end = computedMonthInterval(current, endDate);
    return {
      start,
      end,
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
  computedQuartersSpace(
    _start: string,
    _end: string,
  ): { start: number; end: number } {
    const current = new Date();
    const startDate = new Date(_start);
    const endDate = new Date(_end);

    // 计算季度间隔
    const computedQuarterInterval = (start: Date, end: Date) => {
      const startYear = start.getFullYear();
      const startMonth = start.getMonth() + 1;
      const startQuarter = Math.ceil(startMonth / 3);

      const endYear = end.getFullYear();
      const endMonth = end.getMonth() + 1;
      const endQuarter = Math.ceil(endMonth / 3);

      return (endYear - startYear) * 4 - startQuarter + endQuarter;
    };
    const start = computedQuarterInterval(current, startDate);
    const end = computedQuarterInterval(current, endDate);
    return {
      start,
      end,
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
  computedYearsSpace(
    _start: string,
    _end: string,
  ): { start: number; end: number } {
    const currentYear = new Date().getFullYear();
    const start = new Date(`${_start}`).getFullYear() - currentYear;
    const end = new Date(`${_end}`).getFullYear() - currentYear;
    return {
      start,
      end,
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
  computedStaticTime(
    dateUnit: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR',
    _start: string,
    _end: string,
  ): { start: number; end: number } {
    switch (dateUnit) {
      case 'DAY':
        return this.computedDaysTime(_start, _end);
      case 'WEEK':
        return this.computedWeeksTime(_start, _end);
      case 'MONTH':
        return this.computedMonthsTime(_start, _end);
      case 'QUARTER':
        return this.computedQuartersTime(_start, _end);
      case 'YEAR':
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
  public computedDaysTime(
    _start: string,
    _end: string,
  ): {
    start: number;
    end: number;
  } {
    const startDate = new Date(_start);
    const endDate = new Date(_end);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 0);
    const start = startDate.getTime() / 1000;
    const end = endDate.getTime() / 1000;
    return {
      start,
      end,
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
  computedWeeksTime(
    _start: string,
    _end: string,
  ): { start: number; end: number } {
    const startDate = new Date(_start);
    const endDate = new Date(_end);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 0);
    const start = startDate.getTime() / 1000;
    const end = endDate.getTime() / 1000;
    return {
      start,
      end,
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
  computedMonthsTime(
    _start: string,
    _end: string,
  ): { start: number; end: number } {
    const big = [1, 3, 5, 7, 8, 10, 12]; // 31天的月份
    const startDate = new Date(_start);
    const endDate = new Date(_end);
    startDate.setHours(0, 0, 0, 0);

    if (big.includes(endDate.getMonth() + 1)) {
      // 31天月份
      endDate.setDate(31);
    } else if (endDate.getMonth() === 1) {
      // 2月份，只有29天
      endDate.setDate(29);
    } else {
      // 其余月份，30天
      endDate.setDate(30);
    }
    endDate.setHours(23, 59, 59, 0);
    const start = startDate.getTime() / 1000;
    const end = endDate.getTime() / 1000;
    return {
      start,
      end,
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
  computedQuartersTime(
    _start: string,
    _end: string,
  ): { start: number; end: number } {
    const startDate = new Date(_start);
    const endDate = new Date(_end);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 0);
    const start = startDate.getTime() / 1000;
    const end = endDate.getTime() / 1000;
    return {
      start,
      end,
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
  computedYearsTime(
    _start: string,
    _end: string,
  ): { start: number; end: number } {
    const startDate = new Date(_start);
    const endDate = new Date(_end);
    startDate.setHours(0, 0, 0, 0);
    endDate.setMonth(11);
    endDate.setDate(31);
    endDate.setHours(23, 59, 59, 0);
    const start = startDate.getTime() / 1000;
    const end = endDate.getTime() / 1000;
    return {
      start,
      end,
    };
  }

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
  handleTimeToText = (
    type: 'DYNAMIC' | 'STATIC',
    unit: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR',
    value: string[],
    start: number,
    end: number,
  ): string => {
    if (!value || (Array.isArray(value) && !value.length)) {
      return '';
    }
    const tempStart = new Date(value[0]);
    const tempEnd = new Date(value[1]);
    const tempStartYear = tempStart.getFullYear();
    const tempEndYear = tempEnd.getFullYear();
    const tempStartMonth = tempStart.getMonth() + 1;
    const tempEndMonth = tempEnd.getMonth() + 1;
    const startWeek = this.getYearWeek(tempStart);
    const endWeek = this.getYearWeek(tempEnd);
    let timeSpan = value.join('~');
    let timetype = '';
    if (unit === 'DAY') {
      timeSpan = value.join('~');
    }
    if (unit === 'WEEK') {
      const startText = `${tempStartYear}-${startWeek}${ibiz.i18n.t(
        'editor.dateRangeSelect.week',
      )}`;
      const endText = `${tempEndYear}-${endWeek}${ibiz.i18n.t(
        'editor.dateRangeSelect.week',
      )}`;
      timeSpan = `${startText}~${endText}`;
    }
    if (unit === 'MONTH') {
      let startMonth: string | number = tempStartMonth;
      let endMonth: string | number = tempEndMonth;
      if (tempStartMonth < 10) {
        startMonth = `0${tempStartMonth}`;
      }
      if (tempEndMonth < 10) {
        endMonth = `0${tempEndMonth}`;
      }
      timeSpan = `${tempStartYear}-${startMonth} ~ ${tempEndYear}-${endMonth}`;
    }
    if (unit === 'QUARTER') {
      const startQuarter = Math.ceil(tempStartMonth / 3);
      const endQuarter = Math.ceil(tempEndMonth / 3);
      timeSpan = `${tempStartYear}-Q${startQuarter} ~ ${tempEndYear}-Q${endQuarter}`;
    }
    if (unit === 'YEAR') {
      timeSpan = `${value[0]} ~ ${value[1]}`;
    }

    if (type === 'STATIC') {
      // 固定时间
      timetype = ibiz.i18n.t('editor.dateRangeSelect.static');
    } else if (unit === 'DAY') {
      // 动态时间
      timetype = this.computedTextOfDay(start, end);
    } else if (unit === 'WEEK') {
      timetype = this.computedTextOfWeek(start, end);
    } else if (unit === 'MONTH') {
      timetype = this.computedTextOfMonth(start, end);
    } else if (unit === 'QUARTER') {
      timetype = this.computedTextOfQuarter(
        start,
        end,
        tempStartYear,
        tempEndYear,
        tempStartMonth,
        tempEndMonth,
      );
    } else if (unit === 'YEAR') {
      timetype = this.computedTextOfYear(start, end);
    } else {
      timetype = this.computedTextOfDay(start, end);
    }
    return `${timetype} | ${timeSpan}`;
  };

  /**
   * 计算天的显示文本
   *
   * @private
   * @param {number} start
   * @param {number} end
   * @return {*}
   * @memberof DateRangeSelectEditorController
   */
  private computedTextOfDay(start: number, end: number) {
    let timetype = '';
    if (start === end && start === 0) {
      timetype = ibiz.i18n.t('editor.dateRangeSelect.today');
    } else if (end === 0 && start < 0) {
      timetype = `${ibiz.i18n.t('editor.dateRangeSelect.recently')}${Math.abs(
        start,
      )}${ibiz.i18n.t('editor.dateRangeSelect.day')}`;
    } else {
      const starTtime = `${
        start > 0
          ? ibiz.i18n.t('editor.dateRangeSelect.future')
          : ibiz.i18n.t('editor.dateRangeSelect.pastTime')
      }${Math.abs(start)}${ibiz.i18n.t('editor.dateRangeSelect.day')}`;
      const endTime = `${
        end > 0
          ? ibiz.i18n.t('editor.dateRangeSelect.future')
          : ibiz.i18n.t('editor.dateRangeSelect.pastTime')
      }${Math.abs(end)}${ibiz.i18n.t('editor.dateRangeSelect.day')}`;
      timetype = `${starTtime} ~ ${endTime}`;
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
  private computedTextOfWeek(start: number, end: number) {
    let timetype = '';
    if (start === end && start === 0) {
      timetype = ibiz.i18n.t('editor.dateRangeSelect.currentWeek');
    } else if (end === 0 && start < 0) {
      timetype = `${ibiz.i18n.t('editor.dateRangeSelect.recently')}${Math.abs(
        start,
      )}${ibiz.i18n.t('editor.dateRangeSelect.week')}`;
    } else {
      const starTtime = `${
        start > 0
          ? ibiz.i18n.t('editor.dateRangeSelect.future')
          : ibiz.i18n.t('editor.dateRangeSelect.pastTime')
      }${Math.abs(start)}${ibiz.i18n.t('editor.dateRangeSelect.week')}`;
      const endTime = `${
        end > 0
          ? ibiz.i18n.t('editor.dateRangeSelect.future')
          : ibiz.i18n.t('editor.dateRangeSelect.pastTime')
      }${Math.abs(end)}${ibiz.i18n.t('editor.dateRangeSelect.week')}`;
      timetype = `${starTtime} ~ ${endTime}`;
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
  private computedTextOfMonth(start: number, end: number) {
    let timetype = '';
    if (start === end && start === 0) {
      timetype = ibiz.i18n.t('editor.dateRangeSelect.pastTime');
    } else if (end === 0 && start < 0) {
      timetype = `${ibiz.i18n.t('editor.dateRangeSelect.recently')}${Math.abs(
        start,
      )}${ibiz.i18n.t('editor.dateRangeSelect.month')}`;
    } else {
      const starTtime = `${
        start > 0
          ? ibiz.i18n.t('editor.dateRangeSelect.future')
          : ibiz.i18n.t('editor.dateRangeSelect.pastTime')
      }${Math.abs(start)}${ibiz.i18n.t('editor.dateRangeSelect.month')}`;
      const endTime = `${
        end > 0
          ? ibiz.i18n.t('editor.dateRangeSelect.future')
          : ibiz.i18n.t('editor.dateRangeSelect.pastTime')
      }${Math.abs(end)}${ibiz.i18n.t('editor.dateRangeSelect.month')}`;
      timetype = `${starTtime} ~ ${endTime}`;
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
  private computedTextOfQuarter(
    start: number,
    end: number,
    tempStartYear: number,
    tempEndYear: number,
    tempStartMonth: number,
    tempEndMonth: number,
  ) {
    let timetype = '';
    const curDate = new Date();
    const curYear = curDate.getFullYear();
    const startQuarter = Math.ceil(tempStartMonth / 3);
    const endQuarter = Math.ceil(tempEndMonth / 3);
    if (
      tempStartYear === tempEndYear &&
      startQuarter === 1 &&
      endQuarter === 4
    ) {
      timetype = ibiz.i18n.t('editor.dateRangeSelect.currentYear');
    } else if (start === end && start === 0) {
      timetype = ibiz.i18n.t('editor.dateRangeSelect.currentYear');
    } else if (end === 0 && start < 0 && curYear === tempStartYear) {
      timetype = `${ibiz.i18n.t(
        'editor.dateRangeSelect.currentYear',
      )}${Math.abs(start)}${ibiz.i18n.t('editor.dateRangeSelect.quarter')}`;
    } else {
      const starTtime = `${
        start > 0
          ? ibiz.i18n.t('editor.dateRangeSelect.future')
          : ibiz.i18n.t('editor.dateRangeSelect.pastTime')
      }${Math.abs(start)}${ibiz.i18n.t('editor.dateRangeSelect.quarter')}`;
      const endTime = `${
        end > 0
          ? ibiz.i18n.t('editor.dateRangeSelect.future')
          : ibiz.i18n.t('editor.dateRangeSelect.pastTime')
      }${Math.abs(end)}${ibiz.i18n.t('editor.dateRangeSelect.quarter')}`;
      timetype = `${starTtime} ~ ${endTime}`;
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
  private computedTextOfYear(start: number, end: number) {
    let timetype = '';
    if (start === end && start === 0) {
      timetype = ibiz.i18n.t('editor.dateRangeSelect.currentYear');
    } else if (end === 0 && start < 0) {
      timetype = `${ibiz.i18n.t('editor.dateRangeSelect.recently')}${Math.abs(
        start,
      )}${ibiz.i18n.t('editor.dateRangeSelect.year')}`;
    } else {
      const starTtime = `${
        start > 0
          ? ibiz.i18n.t('editor.dateRangeSelect.future')
          : ibiz.i18n.t('editor.dateRangeSelect.pastTime')
      }${Math.abs(start)}${ibiz.i18n.t('editor.dateRangeSelect.year')}`;
      const endTime = `${
        end > 0
          ? ibiz.i18n.t('editor.dateRangeSelect.future')
          : ibiz.i18n.t('editor.dateRangeSelect.pastTime')
      }${Math.abs(end)}${ibiz.i18n.t('editor.dateRangeSelect.year')}`;
      timetype = `${starTtime} ~ ${endTime}`;
    }
    return timetype;
  }
}
