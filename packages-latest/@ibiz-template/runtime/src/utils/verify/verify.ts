import { RuntimeError } from '@ibiz-template/core';
import { isNilOrEmpty, notNilEmpty } from 'qx-util';
import { isNil } from 'ramda';

type valueType = string | number | Date | boolean | null | undefined;

/**
 * 比较值
 *
 * @author lxm
 * @date 2023-02-14 11:10:01
 * @export
 * @param {valueType} value 比较目标值(从源数据里取出来)
 * @param {string} op
 * @param {valueType} value2 比较条件值
 * @returns {*}  {boolean}
 */
export function testCond(
  value: valueType,
  op: string,
  value2: valueType,
): boolean {
  // 值包含在给定的范围中
  if (Object.is(op, 'IN')) {
    return contains(value, value2);
  }
  // 值不包含在给定的范围中
  if (Object.is(op, 'NOTIN')) {
    return !contains(value, value2);
  }

  switch (op) {
    // * 相等，不等操作，忽略类型
    // 等于操作
    case 'EQ':
      return `${value}` === `${value2}`;
    // 不等于操作
    case 'NOTEQ':
      return `${value}` !== `${value2}`;

    // *比较操作，非数值，日期等可比较类型抛出异常
    // 小于操作
    case 'LT':
      return compare(value, value2) < 0;
    // 小于等于操作
    case 'LTANDEQ':
      return compare(value, value2) <= 0;
    // 大于操作
    case 'GT':
      return compare(value, value2) > 0;
    // 大于等于操作
    case 'GTANDEQ':
      return compare(value, value2) >= 0;

    // * 空判断
    // 值不为空
    case 'ISNULL':
      return isNilOrEmpty(value);
    // 值为空
    case 'ISNOTNULL':
      return notNilEmpty(value);
    // 判断是否是null或者undefined
    case 'TESTNULL':
      return isNil(value);

    // * 范围判断
    // 值包含在给定的范围中
    case 'IN':
      return contains(value, value2);
    // 值包含在给定的范围中
    case 'NOTIN':
      return !contains(value, value2);

    // * 文本包含
    // 文本包含
    case 'LIKE':
      return strContain(value, value2);
    // 文本左包含
    case 'LEFTLIKE':
      return strContain(value, value2, 'start');
    // 文本右包含
    case 'RIGHTLIKE':
      return strContain(value, value2, 'end');
    default:
      // todo 自定义包含，位与操作，子数据（递归）
      throw new RuntimeError(
        ibiz.i18n.t('runtime.utils.verify.valueOperations', { op }),
      );
  }
}

/**
 * 值比较，
 * value 大于 value2 返回 1
 * value 等于 value2 返回 0
 * value 小于 value2 返回 -1
 *
 * @static
 * @param {*} value
 * @param {*} value2
 * @returns {number}
 * @memberof Verify
 */
export function compare(value: valueType, value2: valueType): number {
  const number1 = Number(value);
  const number2 = Number(value2);
  // 可转换为数值的，直接比较转换之后的数值
  if (!Number.isNaN(number1) && !Number.isNaN(number2)) {
    return compareNumber(number1, number2);
  }

  // 看是否可以转换为日期，能转换成有效日期的比较
  const date1 = new Date(value as string).getTime();
  const date2 = new Date(value2 as string).getTime();
  if (!Number.isNaN(date1) && !Number.isNaN(date2)) {
    return compareNumber(date1, date2);
  }

  throw new RuntimeError(
    ibiz.i18n.t('runtime.utils.verify.noCompared', { value, value2 }),
  );
}

/**
 * 数值比较
 *
 * @static
 * @param {number} value
 * @param {number} value2
 * @returns {number}
 * @memberof Verify
 */
export function compareNumber(value: number, value2: number): number {
  if (Number.isNaN(value)) {
    value = 0;
  }
  if (Number.isNaN(value2)) {
    value2 = 0;
  }
  if (value > value2) {
    return 1;
  }
  if (value < value2) {
    return -1;
  }
  return 0;
}

/**
 * 范围比较，比较value是否在value2的范围内
 *
 * @static
 * @param {*} value
 * @param {*} value2
 * @returns {boolean}
 * @memberof Verify
 */
export function contains(value: valueType, value2: valueType): boolean {
  if (!value2 || typeof value2 !== 'string') {
    throw new RuntimeError(
      ibiz.i18n.t('runtime.utils.verify.conditionalValues'),
    );
  }
  if (value) {
    // 定义一数组
    const arr = value2.split(',');
    return arr.includes(`${value}`);
  }
  return false;
}

/**
 * 文本包含，value里是否包含value2
 *
 * @author lxm
 * @date 2023-02-14 01:56:27
 * @export
 * @param {valueType} value
 * @param {valueType} value2
 * @param {('start' | 'end')} [mode] 匹配模式，start: 以value2开头，end: value2结尾
 * @returns {*}
 */
export function strContain(
  value: valueType,
  value2: valueType,
  mode?: 'start' | 'end',
): boolean {
  // 排除空值
  if (!value || !value2) {
    return false;
  }
  // 忽略大小写
  const val = `${value}`.toUpperCase();
  const val2 = `${value2}`.toUpperCase();
  const index = val.indexOf(val2);
  switch (mode) {
    // 左包含
    case 'start':
      return index === 0;
    // 右包含
    case 'end':
      return index + val2.length === val.length;
    // 包含
    default:
      return index !== -1;
  }
}
