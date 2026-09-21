import type { PropType } from 'vue';
import { isDate, isArray, isObject, get, set } from 'lodash-es';
import type { IEvent, IUIEvent } from '../interface';
declare const epPropKey = "__epPropKey";
declare const closeIcon = "<i class='el-icon' data-v-ea893728=''> <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' data-v-ea893728='' > <path d='M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z'></path> </svg></i>";
/**
 * @description 处理气泡关闭
 * @param {MouseEvent} el
 */
declare const handlePopClose: (el: MouseEvent) => void;
/**
 * @description 处理事件绘制时间范围
 * @param {string | Date} startTime
 * @param {string | Date} endTime
 * @param {string} format
 * @param {string} partition
 * @returns {string}
 */
declare const handleTimeRange: (startTime: string | Date, endTime: string | Date, format: string, partition?: string) => string;
/**
 * @description 处理背景颜色
 * @param {IData} tempColors
 * @returns {string}
 */
declare const handleBkColor: (tempColors: IData, type: string) => any;
/**
 * @description 调整颜色不透明度
 * @param {String} color   十六进制| Rgb | Rgb颜色或颜色关键字
 * @param {Number} Percent 不透明度
 * @return {String|Boolean} Rgba颜色（无效输入将返回false）
 */
declare const fade: (color: string, Percent: number) => string | false;
/**
 * @description 判断是否为今天
 */
declare const isToday: (date: Date | string, curDate: Date | string) => boolean;
/**
 * @description 定义类型
 * @param {*} val
 * @returns {PropType<T>}
 */
declare const definePropType: <T>(val: IData | PropType<T>) => PropType<T>;
/**
 * @description 是否为有效时间范围
 * @param {*} range
 * @returns {range is [Date, Date]}
 */
declare const isValidRange: (range: IData) => range is [Date, Date];
/**
 * @description 判断时间是否在当前周内
 * @param {Date | string} dateToCheck 需要检查的日期
 * @returns {boolean}
 */
declare const isDateInCurWeek: (dateToCheck: Date | string, firstDayOfWeek: Date | string, lastDayOfWeek: Date | string) => boolean;
/**
 * @description 判断时间A是否大于时间B
 * @param {Date | string} timeA
 * @param {Date | string} timeB
 * @returns {boolean}
 */
declare const isTimeGreaterThan: (timeA: Date | string, timeB: Date | string) => boolean;
/**
 * @description 根据当前时间获取周第一天时间及周末时间
 * @param {Date | string} curDate 当前选中时间
 * @returns {boolean}
 */
declare const getCurWeekDates: (curDate: Date | string) => {
    firstDay: Date;
    lastDay: Date;
};
/**
 * @description 处理事件点击
 */
declare const handleEVentClick: (item: IUIEvent, location: string, events: IEvent[], multiple: boolean, selectedData: IEvent[], emit: Function) => Promise<unknown>;
/**
 * @description 生成一个从 0 到 n-1 的范围数组
 * @param {number} n 生成范围数组的长度
 * @returns {number[]} 从 0 到 n-1 的范围数组
 */
declare const rangeArr: (n: number) => number[];
/**
 * @description 处理props
 * @param {*} props
 * @returns {Record<string, any>}
 */
declare const handleProps: <Props extends Record<string, IParams | {
    __epPropKey: true;
}>>(props: Props) => IParams;
export { epPropKey, closeIcon, isDate, isArray, isObject, isToday, get, set, handleProps, rangeArr, isValidRange, definePropType, handleTimeRange, handleBkColor, fade, handleEVentClick, handlePopClose, getCurWeekDates, isDateInCurWeek, isTimeGreaterThan, };
