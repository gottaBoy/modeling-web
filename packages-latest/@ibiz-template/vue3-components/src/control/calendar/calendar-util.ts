import { Namespace } from '@ibiz-template/core';
import dayjs from 'dayjs';

/**
 * 根据当前时间获取上周日到本周六的所有日期
 * @author ljx
 * @date 2024-12-19 10:33:35
 * @export
 * @param {dayjs.ConfigType} date (当前时间)
 * @return {*}  {dayjs.ConfigType[]}
 */
export const getWeekRange = (date: dayjs.ConfigType): dayjs.ConfigType[] => {
  const today = dayjs(date);
  const lastSunday = today.startOf('week'); // 上周日
  const thisSaturday = today.endOf('week'); // 本周六

  const daysArray = [];
  let currentDay = lastSunday;

  while (
    currentDay.isBefore(thisSaturday) ||
    currentDay.isSame(thisSaturday, 'day')
  ) {
    daysArray.push(currentDay);
    currentDay = currentDay.add(1, 'day');
  }

  return daysArray;
};

/**
 * 判断当前时间是否在开始时间与结束时间范围内
 * @author ljx
 * @date 2024-12-19 10:33:35
 * @export
 * @param {unknown} _argrs (包含当前时间、开始时间、结束时间、时间单位)
 * @return {*}  {boolean}
 */
export const isTimeBetween = (_argrs: {
  date: dayjs.ConfigType;
  beginTime?: string;
  endTime?: string;
  unit?: dayjs.OpUnitType | undefined;
}): boolean => {
  const { date, beginTime, endTime, unit = 'day' } = _argrs;
  return !!(
    (beginTime && dayjs(date).isSame(beginTime, unit)) ||
    (endTime && dayjs(date).isSame(endTime, unit)) ||
    (beginTime &&
      endTime &&
      dayjs(date).isAfter(beginTime, unit) &&
      dayjs(date).isBefore(endTime, unit))
  );
};

/**
 * 用于处理日历图例
 *
 * @export
 * @param {Namespace} ns 菜单样式处理命名空间
 */
export function useCalendarLegend(ns: Namespace): {
  getFontColor: () => string;
  getBkColor: (_index: number) => string;
  getActBdrColors: (_index: number) => string;
} {
  /**
   * @description 获取css变量值
   * @param {string} varName
   * @return {*}
   */
  const getVarValue = (varName: string): string => {
    const root = document.documentElement;
    return getComputedStyle(root).getPropertyValue(varName);
  };

  // 图例背景色
  const bgColors = [
    // 首个颜色用主题色
    getVarValue(`${ns.cssVarName('color-primary')}`),
    '#2196F3',
    '#4CAF50',
    '#3F51B5',
    '#FF9800',
    '#673AB7',
    '#757575',
  ];

  // 图例边框激活色
  const actBdrColors = bgColors.map(() =>
    getVarValue(`${ns.cssVarName('color-black')}`),
  );

  /**
   * @description 获取背景颜色
   * @param {number} _index
   * @returns {string}
   */
  const getBkColor = (_index: number): string => {
    return bgColors[_index % bgColors.length] || bgColors[0];
  };

  /**
   * @description 获取激活背景颜色
   * @param {number} _index
   * @returns {string}
   */
  const getActBdrColors = (_index: number): string => {
    return (
      actBdrColors[_index] || getVarValue(`${ns.cssVarName('color-primary')}`)
    );
  };

  /**
   * @description 获取字体颜色
   * @returns {string}
   */
  const getFontColor = (): string => {
    return getVarValue(`${ns.cssVarName('color-primary-text')}`);
  };
  return { getFontColor, getBkColor, getActBdrColors };
}
