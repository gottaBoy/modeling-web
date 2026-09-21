import dayjs from 'dayjs';
/**
 * 根据当前时间获取上周日到本周六的所有日期
 * @author ljx
 * @date 2024-12-19 10:33:35
 * @export
 * @param {dayjs.ConfigType} date (当前时间)
 * @return {*}  {dayjs.ConfigType[]}
 */
export declare const getWeekRange: (date: dayjs.ConfigType) => dayjs.ConfigType[];
/**
 * 判断当前时间是否在开始时间与结束时间范围内
 * @author ljx
 * @date 2024-12-19 10:33:35
 * @export
 * @param {unknown} _argrs (包含当前时间、开始时间、结束时间、时间单位)
 * @return {*}  {boolean}
 */
export declare const isTimeBetween: (_argrs: {
    date: dayjs.ConfigType;
    beginTime?: string;
    endTime?: string;
    unit?: dayjs.OpUnitType | undefined;
}) => boolean;
