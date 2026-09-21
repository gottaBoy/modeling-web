/**
 * 时间尺度
 */
export type TimeScale = 'year' | 'quarter' | 'month' | 'week' | 'yearweek' | 'day';
/**
 * @description 根据尺度格式化时间
 * @export
 * @param {string} val 时间
 * @param {TimeScale} timeScale 时间尺度
 * @returns {*}  {string}
 */
export declare function formatDateByScale(val: string, timeScale: TimeScale): string;
/**
 * @description 获取某年的总周数
 * @param {number} year 年份
 * @returns {*}  {number}
 */
export declare function getWeeksInYear(year: number): number;
/**
 * @description 生成年周数组
 * 如：['2025-23', '2025-24', '2025-25']
 * @export
 * @param {string} minYearWeek 最小年周
 * @param {string} maxYearWeek 最大年周
 * @param {number} [paddingWeeks=0] 前后范围
 * @returns {*}  {string[]}
 */
export declare function generateYearWeekRange(minYearWeek: string, maxYearWeek: string, paddingWeeks?: number): string[];
/**
 * @description 根据尺度计算时间范围
 * @export
 * @param {string} val 时间
 * @param {TimeScale} timeScale 时间尺度
 * @returns {*}  {({
 *       start: string;
 *       end: string;
 *     }
 *   | undefined)}
 */
export declare function calcDateRangeByScale(val: string, timeScale: TimeScale): {
    start: string;
    end: string;
} | undefined;
/**
 * @description 根据时间尺度比较两个日期是否相等
 * @export
 * @param {(string | Date)} dateStr1 时间1
 * @param {(string | Date)} dateStr2 时间2
 * @param {TimeScale} timeScale
 * @returns {*}  {boolean}
 */
export declare function compareDateEqualByScale(dateStr1: string | Date, dateStr2: string | Date, timeScale: TimeScale): boolean;
//# sourceMappingURL=index.d.ts.map