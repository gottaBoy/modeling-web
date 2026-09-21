import { EditorController } from '@ibiz-template/runtime';
export declare class DateRangeSelectEditorController extends EditorController {
    /**
     * 是否显示时间单位选择
     *
     * @type {Boolean}
     * @memberof DateRangeSelectEditorController
     */
    switchUnit: boolean;
    /**
     * 默认时间单位
     *
     * @type {('DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR')}
     * @memberof DateRangeSelectEditorController
     */
    defaultUnit: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR';
    /**
     * 抛出模式
     * TIME模式则是抛出时间字符串 年-月-日 时:分:秒
     * @type {('DEFAULT' | 'TIME')}
     * @memberof DateRangeSelectEditorController
     */
    emitMode: 'DEFAULT' | 'TIME';
    /**
     * 初始化
     *
     * @return {*}  {Promise<void>}
     * @memberof DateRangeSelectEditorController
     */
    init(): Promise<void>;
    /**
     * 初始化默认时间
     *
     * @param {('DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR')} unit
     * @memberof DateRangeSelectEditorController
     */
    initDefaultDate: (unit: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR') => Array<string | number> | undefined;
    /**
     * 计算动态时间间隔转具体时间
     *
     * @param {('DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR')} dateUnit
     * @param {string} _start
     * @param {string} _end
     * @memberof DateRangeSelectEditorController
     */
    computedDynamicTimeToDate(dateUnit: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR', dateType: 'DYNAMIC' | 'STATIC', _start: number, _end: number): Array<string | number>;
    /**
     * 时间间隔转季度
     *
     * @private
     * @param {Date} current
     * @param {number} timespan
     * @memberof DateRangeSelectEditorController
     */
    private timeSpanConvertToQuarter;
    /**
     * 时间转年周
     *
     * @private
     * @param {Date} current
     * @param {number} timespan
     * @memberof DateRangeSelectEditorController
     */
    private timeSpanConvertToWeek;
    /**
     * 时间间隔转月份
     *
     * @private
     * @param {Date} current
     * @param {number} timespan
     * @memberof DateRangeSelectEditorController
     */
    private timeSpanConvertToMonth;
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
    computedDateTypesTime(dateUnit: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR', dateType: 'DYNAMIC' | 'STATIC', _start: string, _end: string): {
        start: number;
        end: number;
        emitStart: number | string;
        emitEnd: number | string;
    };
    /**
     * 计算完整时间格式
     *
     * @private
     * @param {(string|number)} date
     * @memberof DateRangeSelectEditorController
     */
    private computedFullDateFormat;
    /**
     * 计算动态类型时间
     *
     * @param {('DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR')} dateUnit
     * @param {string} _start
     * @param {string} _end
     * @return {*}  {{ start: number; end: number }}
     * @memberof DateRangeSelectEditorController
     */
    computedDynamicTime(dateUnit: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR', _start: string, _end: string): {
        start: number;
        end: number;
    };
    /**
     * 计算天的前后间隔
     *
     * @param {string} _start
     * @param {string} _end
     * @return {*}  {{ start: number; end: number }}
     * @memberof DateRangeSelectEditorController
     */
    computedDaysSpace(_start: string, _end: string): {
        start: number;
        end: number;
    };
    /**
     * 计算周的前后间隔
     *
     * @param {string} _start
     * @param {string} _end
     * @return {*}  {{ start: number; end: number }}
     * @memberof DateRangeSelectEditorController
     */
    computedWeeksSpace(_start: string, _end: string): {
        start: number;
        end: number;
    };
    /**
     * 获取指定时间所在周星期一的时间
     *
     * @param {Date} date
     * @return {*}
     * @memberof DateRangeSelectEditorController
     */
    getDateWeekMonday(date: Date): Date;
    /**
     * 计算指定时间在年度内的周数
     *
     * @param {(Date | string)} endDate
     * @return {*}
     * @memberof DateRangeSelectEditorController
     */
    getYearWeek(endDate: Date): number;
    /**
     * 计算月的前后间隔
     *
     * @param {string} _start
     * @param {string} _end
     * @return {*}  {{ start: number; end: number }}
     * @memberof DateRangeSelectEditorController
     */
    computedMonthsSpace(_start: string, _end: string): {
        start: number;
        end: number;
    };
    /**
     *计算季度的前后间隔
     *
     * @param {string} _start
     * @param {string} _end
     * @return {*}  {{ start: number; end: number }}
     * @memberof DateRangeSelectEditorController
     */
    computedQuartersSpace(_start: string, _end: string): {
        start: number;
        end: number;
    };
    /**
     *计算年的前后间隔
     *
     * @param {string} _start
     * @param {string} _end
     * @return {*}  {{ start: number; end: number }}
     * @memberof DateRangeSelectEditorController
     */
    computedYearsSpace(_start: string, _end: string): {
        start: number;
        end: number;
    };
    /**
     * 计算静态类型时间
     *
     * @param {('DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR')} dateUnit
     * @param {string} _start
     * @param {string} _end
     * @return {*}  {{ start: number; end: number }}
     * @memberof DateRangeSelectEditorController
     */
    computedStaticTime(dateUnit: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR', _start: string, _end: string): {
        start: number;
        end: number;
    };
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
    computedDaysTime(_start: string, _end: string): {
        start: number;
        end: number;
    };
    /**
     * 计算 周 的时间范围,返回开始和结束时间的秒数
     *
     * @param {string} _start
     * @param {string} _end
     * @return {*}  {{ start: number; end: number }}
     * @memberof DateRangeSelectEditorController
     */
    computedWeeksTime(_start: string, _end: string): {
        start: number;
        end: number;
    };
    /**
     * 计算 月 的时间范围,返回开始和结束时间的秒数
     *
     * @param {string} _start
     * @param {string} _end
     * @return {*}  {{ start: number; end: number }}
     * @memberof DateRangeSelectEditorController
     */
    computedMonthsTime(_start: string, _end: string): {
        start: number;
        end: number;
    };
    /**
     * 计算 季度 的时间范围,返回开始和结束时间的秒数
     *
     * @param {string} _start
     * @param {string} _end
     * @return {*}  {{ start: number; end: number }}
     * @memberof DateRangeSelectEditorController
     */
    computedQuartersTime(_start: string, _end: string): {
        start: number;
        end: number;
    };
    /**
     * 计算 年 的时间范围,返回开始和结束时间的秒数
     *
     * @param {string} _start
     * @param {string} _end
     * @return {*}  {{ start: number; end: number }}
     * @memberof DateRangeSelectEditorController
     */
    computedYearsTime(_start: string, _end: string): {
        start: number;
        end: number;
    };
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
    handleTimeToText: (type: 'DYNAMIC' | 'STATIC', unit: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR', value: string[], start: number, end: number) => string;
    /**
     * 计算天的显示文本
     *
     * @private
     * @param {number} start
     * @param {number} end
     * @return {*}
     * @memberof DateRangeSelectEditorController
     */
    private computedTextOfDay;
    /**
     * 计算周的文本
     *
     * @private
     * @param {number} start
     * @param {number} end
     * @return {*}
     * @memberof DateRangeSelectEditorController
     */
    private computedTextOfWeek;
    /**
     *  计算月的文本
     *
     * @private
     * @param {number} start
     * @param {number} end
     * @return {*}
     * @memberof DateRangeSelectEditorController
     */
    private computedTextOfMonth;
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
    private computedTextOfQuarter;
    /**
     *  计算年的文本
     *
     * @private
     * @param {number} start
     * @param {number} end
     * @return {*}
     * @memberof DateRangeSelectEditorController
     */
    private computedTextOfYear;
}
