/**
 * 是否为日期
 *
 * @author tony001
 * @date 2024-07-23 17:07:19
 * @export
 * @param {number} stdDataType
 * @return {*}
 */
export declare function isDate(stdDataType: number): boolean;
/**
 * 格式化时间
 *
 * @author tony001
 * @date 2024-07-23 17:07:25
 * @export
 * @param {('DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR')} type
 * @param {string} value
 * @return {*}  {string}
 */
export declare function formatDate(type: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR', value: string): string;
/**
 *
 *  标识与时间单位关系数组
 *
 */
export declare const tags: Array<{
    unit: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR';
    tag: string;
}>;
/**
 * 时间处理工具
 *
 * @export
 * @class DateUtil
 */
export declare class DateUtil {
    /**
     * 处理时间转字符串 (name >= TIMESTAMP(starttime)) AND (name  <= TIMESTAMP(endtime))
     * starttime: YYYY-MM-DD  00:00:00
     * endtime: YYYY-MM-DD  23:59:59
     *
     * @param {IData} config
     * @return {*}  {string}
     * @memberof DateUtil
     */
    handleDateToString(config: IData, field: string): string;
    /**
     * 处理字符串转时间
     *
     * @param {string} time
     * @return {*}
     * @memberof DateUtil
     */
    handleStringToDate(time: string, type?: 'DYNAMIC' | 'STATIC'): {
        unit: "DAY" | "WEEK" | "MONTH" | "QUARTER" | "YEAR";
        type: "STATIC" | "DYNAMIC";
        start: number;
        end: number;
    } | undefined;
    /**
     * 计算时间单位
     *
     * @param {string} str
     * @return {*}
     * @memberof DateUtil
     */
    computedDateUnit(str: string): 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR';
    /**
     *
     * @param {('DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR')} dateUnit
     * @param {('DYNAMIC' | 'STATIC')} dateType
     * @param {number} _start
     * @param {number} _end
     * @return {*}  {(Array<string | number>)}
     * @memberof DateUtil
     */
    computedDynamicTimeToDate(dateUnit: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR', dateType: 'DYNAMIC' | 'STATIC', _start: number, _end: number): Array<string | number>;
    /**
     *时间间隔转季度
     *
     * @private
     * @param {Date} current
     * @param {number} timespan
     * @return {*}
     * @memberof DateUtil
     */
    private timeSpanConvertToQuarter;
    /**
     * 时间转年周
     *
     * @private
     * @param {Date} current
     * @param {number} timespan
     * @return {*}
     * @memberof DateUtil
     */
    private timeSpanConvertToWeek;
    /**
     * 时间间隔转月份
     *
     * @private
     * @param {Date} current
     * @param {number} timespan
     * @return {*}
     * @memberof DateUtil
     */
    private timeSpanConvertToMonth;
    /**
     * 补全时间格式
     *
     * @private
     * @param {string} _date
     * @param {('START' | 'END')} _tag
     * @return {*}  {string}
     * @memberof DateUtil
     */
    private completeTimeFormat;
    /**
     * 计算在各个时间类型下的开始结束时间
     *
     * @param {('DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR')} dateUnit
     * @param {('DYNAMIC' | 'STATIC')} dateType
     * @param {string} _start
     * @param {string} _end
     * @return {*}  {{
     *     start: number;
     *     end: number;
     *   }}
     * @memberof DateUtil
     */
    computedDateTypesTime(dateUnit: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR', dateType: 'DYNAMIC' | 'STATIC', _start: string, _end: string): {
        start: number;
        end: number;
    };
    /**
     * 计算动态类型时间
     *
     * @param {('DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR')} dateUnit
     * @param {string} _start
     * @param {string} _end
     * @return {*}  {{ start: number; end: number }}
     * @memberof DateUtil
     */
    computedDynamicTime(dateUnit: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR', _start: string, _end: string): {
        start: number;
        end: number;
    };
    /**
     *计算年的前后间隔
     *
     * @param {string} _start
     * @param {string} _end
     * @return {*}  {{ start: number; end: number }}
     * @memberof DateUtil
     */
    computedYearsSpace(_start: string, _end: string): {
        start: number;
        end: number;
    };
    /**
     * 计算季度的前后间隔
     *
     * @param {string} _start
     * @param {string} _end
     * @return {*}  {{ start: number; end: number }}
     * @memberof DateUtil
     */
    computedQuartersSpace(_start: string, _end: string): {
        start: number;
        end: number;
    };
    /**
     * 计算天的前后间隔
     *
     * @param {string} _start
     * @param {string} _end
     * @return {*}  {{ start: number; end: number }}
     * @memberof DateUtil
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
     * @memberof DateUtil
     */
    computedWeeksSpace(_start: string, _end: string): {
        start: number;
        end: number;
    };
    /**
     * 计算月的前后间隔
     *
     * @param {string} _start
     * @param {string} _end
     * @return {*}  {{ start: number; end: number }}
     * @memberof DateUtil
     */
    computedMonthsSpace(_start: string, _end: string): {
        start: number;
        end: number;
    };
    /**
     * 获取指定时间所在周的星期一
     *
     * @param {Date} date
     * @return {*}  {Date}
     * @memberof DateUtil
     */
    getDateWeekMonday(date: Date): Date;
    /**
     * 计算静态类型时间
     *
     * @param {('DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR')} dateUnit
     * @param {string} _start
     * @param {string} _end
     * @return {*}  {{ start: number; end: number }}
     * @memberof DateUtil
     */
    computedStaticTime(dateUnit: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR', _start: string, _end: string): {
        start: number;
        end: number;
    };
    /**
     *计算 天 的时间范围,返回开始和结束时间的秒数
     *
     * @param {string} _start
     * @param {string} _end
     * @return {*}  {{
     *     start: number;
     *     end: number;
     *   }}
     * @memberof DateUtil
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
     * @memberof DateUtil
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
     * @memberof DateUtil
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
     * @memberof DateUtil
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
     * @memberof DateUtil
     */
    computedYearsTime(_start: string, _end: string): {
        start: number;
        end: number;
    };
}
