/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounce } from 'lodash-es';
import { isNotNil, isNil } from 'ramda';
import { CoreConst, EMOJIMAP } from '../../constant';
import { getAppCookie } from '../cookie-util/cookie-util';

/**
 * @description 获取认证令牌
 * @export
 * @returns {*}  {(string | null)}
 */
export function getToken(): string | null {
  return getAppCookie(CoreConst.TOKEN);
}

/**
 * @description 判断两个数组是否有相同的元素, 用法: 传入两个数组 返回值为boolean类型
 * @example
 * ```
 * isOverlap([1, 2, 3], [3, 4, 5]) // => true
 * isOverlap([1, 2, 3], [4, 5, 6]) // => false
 * ```
 * @export
 * @param {any[]} arr1
 * @param {any[]} arr2
 * @returns {*}  {boolean}
 */
export function isOverlap(arr1: any[], arr2: any[]): boolean {
  const newArr = Array.from(new Set([...arr1, ...arr2]));
  return newArr.length !== arr1.length + arr2.length;
}

/**
 * @description 判断两个数组是否元素相同, 用法：传入需要判断的数组 返回值是boolean类型
 * @example
 * isOverlap([1, 2, 3], [1, 2, 3]) // => true
 * isOverlap([{ test1: 1, test2: 2, test3: 3 }, { test1: 2, test2: 2, test3: 3 }], [{ test1: 1, test2: 2, test3: 3 }, { test1: 2, test2: 2, test3: 3 }], 'test1') // => true
 * @export
 * @param {any[]} arr1
 * @param {any[]} arr2
 * @param {string} [field] 比较元素里的某个固定属性
 * @return {*}  {boolean}
 */
export function isElementSame(
  arr1: any[],
  arr2: any[],
  field?: string,
): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }
  const allElements = field
    ? [...arr1.map(item => item[field]), ...arr2.map(item => item[field])]
    : [...arr1, ...arr2];

  const newArr = Array.from(new Set(allElements));
  return newArr.length === arr1.length;
}

/**
 * @description 防抖并合并每次的参数，最后一次才会执行 用法：传入要防抖的函数和合并参数函数 有需要又可以传入时间 返回防抖函数执行值
 * @example
 * ```
 * // 定义测试函数
 * function testFunc(a, b) {
 *   console.log(`testFunc called with (${a}, ${b})`);
 * }
 *
 * function testMerge(oldParams, newParams) {
 *   // 将相邻的重复函数调用合并为一个函数调用，只取第一个参数 a，第二个参数 b 取最后一次调用时的值
 *   const [a] = oldParams;
 *   const [, b] = newParams;
 *   return [a, b];
 * }
 *
 * // 创建一个节流后的函数
 * const debouncedTestFunc = debounceAndMerge(testFunc, testMerge, 1000);
 *
 * // 连续调用多次，但只会在最后一次调用时输出
 * debouncedTestFunc(1, 2);
 * debouncedTestFunc(2, 3);
 * debouncedTestFunc(3, 4);
 * debouncedTestFunc(4, 5); // testFunc called with (1, 5)
 * ```
 * @export
 * @template T
 * @param {T} func 要防抖的函数
 * @param {(
 *     oldParams: Parameters<T>,
 *     newParams: Parameters<T>,
 *   ) => Parameters<T>} mergeFunc 合并的回调函数
 * @param {number} [wait] 防抖的延迟毫秒数
 * @returns {*}
 */
export function debounceAndMerge<T extends (...args: any[]) => any>(
  func: T,
  mergeFunc: (
    oldParams: Parameters<T>,
    newParams: Parameters<T>,
  ) => Parameters<T>,
  wait?: number,
): (...args: Parameters<T>) => any {
  // 缓存上一次的函数参数
  let oldParams: Parameters<T> | undefined;
  const debounceFunc = debounce((...params: Parameters<T>) => {
    // 防抖函数执行的时候清空缓存参数
    oldParams = undefined;
    return func(...params);
  }, wait);
  return (...args: Parameters<T>) => {
    // 合并参数，并把参数缓存到oldParams里，用新参数调用防抖函数
    let newParams = args;
    if (oldParams) {
      newParams = mergeFunc(oldParams, newParams);
    }
    oldParams = newParams;
    return debounceFunc(...newParams);
  };
}

/**
 * @description 防抖并合并每次的参数，最后一次才会执行,绑定方法为异步方法，给每次调用返回最终执行那次的结果 用法：传入要防抖的函数和合并参数函数 返回Promise
 * @example
 * ```
 * // 定义一个异步函数
 * async function logData(params) {
 *   return new Promise(resolve => {
 *     setTimeout(() => {
 *       resolve(params);
 *     }, 1000);
 *   });
 * }
 *
 * // 定义合并参数的函数，每次只保留最后一次的参数
 * function mergeParams(oldParams, newParams) {
 *   return newParams;
 * }
 *
 * // 创建防抖函数
 * const debouncedLogData = debounceAndAsyncMerge(logData, mergeParams, 500);
 *
 * // 模拟连续3次调用
 * debouncedLogData('a').then(result => {
 *   console.log('Result of first call:', result); // => Result of first call: c
 * });
 * debouncedLogData('b').then(result => {
 *   console.log('Result of second call:', result); // => Result of first call: c
 * });
 * debouncedLogData('c').then(result => {
 *   console.log('Result of third call:', result); // => Result of first call: c
 * });
 *
 * // 等待 2000 毫秒后再次调用，会再次输出
 * setTimeout(() => {
 *   debouncedLogData('d').then(result => {
 *     console.log('Result of fourth call:', result); // => Result of fourth call: d
 *   });
 * }, 2000);
 * ```
 * @export
 * @template T
 * @param {T} func 要防抖的函数
 * @param {(
 *     oldParams: Parameters<T>,
 *     newParams: Parameters<T>,
 *   ) => Parameters<T>} mergeFunc 合并的回调函数
 * @param {number} [wait] 防抖的延迟毫秒数
 * @returns {*}
 */
export function debounceAndAsyncMerge<
  T extends (...args: any[]) => Promise<any>,
>(
  func: T,
  mergeFunc: (
    oldParams: Parameters<T>,
    newParams: Parameters<T>,
  ) => Parameters<T>,
  wait?: number,
): T {
  // 缓存上一次的函数参数
  let oldParams: Parameters<T> | undefined;
  let promises: Array<{ resolve: any; reject: any }> = [];
  const debounceFunc = debounce(async (...params: Parameters<T>) => {
    // 防抖函数执行的时候清空缓存参数
    oldParams = undefined;
    try {
      const result = await func(...params);
      promises.forEach(promise => {
        promise.resolve(result);
      });
      promises = [];
      return result;
    } catch (error) {
      promises.forEach(promise => {
        promise.reject(error);
      });
      promises = [];
    }
  }, wait);
  const fun = async (...args: Parameters<T>): Promise<unknown> => {
    // 合并参数，并把参数缓存到oldParams里，用新参数调用防抖函数
    let newParams = args;
    if (oldParams) {
      newParams = mergeFunc(oldParams, newParams);
    }
    oldParams = newParams;
    // 执行防抖函数
    debounceFunc(...newParams);
    return new Promise((resolve, reject) => {
      // 阻塞当前调用，当防抖函数被执行后返回
      promises.push({ resolve, reject });
    });
  };
  return fun as T;
}

/**
 * @description 把右侧的对象里非空的属性合并到左侧对象里， 用法：传入需要合并的数组 无返回值
 * @example
 * ```
 * obj1 = { a: 1, b: 2 }; obj2 = { c: null, d: false, e: undefined, f: 0, g: {} }; mergeInLeft(obj1, obj2); // => obj1 修改为 { a: 1, b: 2, d: false, f: 0, g: {} }
 * obj1 = { a: 1, b: 2 }; obj2 = { a: 2, b: 3, c: null, d: false, e: undefined, f: 0, g: {} }; // => obj1 修改为 { a: 2, b: 3, d: false, f: 0, g: {} }
 * ```
 * @param {IData} l
 * @param {IData} r
 */
export function mergeInLeft(l: IData, r: IData): void {
  Object.keys(r).forEach(key => {
    if (isNotNil(r[key])) {
      l[key] = r[key];
    }
  });
}

/**
 * @description 把右侧的对象里非空的属性合并到左侧对象属性为空里, 用法：传入需要合并的数组 无返回值
 * @example
 * ```
 * obj1 = { a: 1, b: 2 }; obj2 = { c: null, d: false, e: undefined, f: 0, g: {} }; mergeInLeft(obj1, obj2); // => obj1 修改为 { a: 1, b: 2, d: false, f: 0, g: {} }
 * obj1 = { a: 1, b: 2 }; obj2 = { a: 2, b: 3, c: null, d: false, e: undefined, f: 0, g: {} }; // => obj1 修改为 { a: 1, b: 2, d: false, f: 0, g: {} }
 * ```
 * @export
 * @param {IData} l
 * @param {IData} r
 */
export function mergeDefaultInLeft(l: IData, r: IData): void {
  Object.keys(r).forEach(key => {
    if (isNotNil(r[key]) && isNil(l[key])) {
      l[key] = r[key];
    }
  });
}

/**
 * @description 比较两个数组集合，找出相同和不同的元素 用法：传入需要比较的两个数组  返回值是{more: IData[], less: IData[], same: IData[]}
 * @example
 * ```
 * 数组中没有引用对象
 * compareArr([1, 2, false, true, undefined, null],  [1, false, undefined]); // => {more: [2, true, null], less: [], same: [1, false, undefined]}
 * 数组中有引用对象
 * compareArr([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }], [{ id: 2, name: 'Jane' }, { id: 3, name: 'Bob' }], 'id') // => {more: [{ id: 1, name: 'John' }],  less: [{ id: 3, name: 'Bob' }], same: [{ id: 2, name: 'Jane' }, { id: 2, name: 'Jane' }]}
 * ```
 * @export
 * @param {IData[]} arr1 数组一
 * @param {IData[]} arr2 数组二
 * @param {string} [keyField] 主键属性，有主键比较主键
 * @return {*}  {{
 *   more: IData[]; arr1多的元素
 *   less: IData[]; arr1少的元素
 *   same: IData[]; 相同的元素
 * }}
 */
export function compareArr(
  arr1: IData[],
  arr2: IData[],
  keyField?: string,
): {
  more: IData[];
  less: IData[];
  same: IData[];
} {
  const all = new Set([...arr1, ...arr2]);
  const more: IData[] = [];
  const less: IData[] = [];
  const same: IData[] = [];

  if (keyField) {
    const arr1Keys = arr1.map(item => item[keyField]);
    const arr2Keys = arr2.map(item => item[keyField]);
    all.forEach(item => {
      if (!arr1Keys.includes(item[keyField])) {
        less.push(item);
        return;
      }
      if (!arr2Keys.includes(item[keyField])) {
        more.push(item);
        return;
      }
      same.push(item);
    });
  } else {
    all.forEach(item => {
      if (!arr1.includes(item)) {
        less.push(item);
        return;
      }
      if (!arr2.includes(item)) {
        more.push(item);
        return;
      }
      same.push(item);
    });
  }

  return {
    more,
    less,
    same,
  };
}

/**
 * @description 转换为数字或undefined,如果是undefined或null 返回undefined,其他情况转成数字，能转成数字的返回数字，NaN的返回undefined 用法：传入任意值 返回值为number或undefined类型
 * @example
 * ```
 * toNumberOrNil(5); // => 5
 * toNumberOrNil(undefined); // => undefined
 * ```
 * @param {unknown} value 值
 * @return {*}  {(number | undefined)}
 */
export function toNumberOrNil(value: unknown): number | undefined {
  if (isNil(value)) {
    return undefined;
  }
  const num = Number(value);
  if (Number.isNaN(num)) {
    return undefined;
  }
  return num;
}

const SvgPattern = /<svg\b[^>]*>[\s\S]*?<\/svg>/;

/**
 * @description 判断字符串是否是svg的格式 用法：传入svg字符串 返回值为Boolean类型
 * @example
 * ```
 * isSvg('<svg xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="100" height="100" fill="red" /></svg>'); // => true
 * isSvg('<svg1 xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="100" height="100" fill="red" /></svg1>'); // => false
 * ```
 * @export
 * @param {string} str
 * @return {*}  {boolean}
 */
export function isSvg(str: string): boolean {
  return SvgPattern.test(str);
}

/**
 * @description 处理浮点数相加 用法：传入需要相加的数值 返回值为number类型
 * @example
 * ```
 * plus(10, 10); // => 20
 * plus(99.99, -99.999); // => -0.009
 * ```
 * @param {number} a
 * @param {number} b
 * @return {*}
 */
export function plus(a: number, b: number): number {
  let c;
  let d;
  try {
    c = a.toString().split('.')[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split('.')[1].length;
  } catch (f) {
    d = 0;
  }
  const e = 10 ** Math.max(c, d);
  return (a * e + b * e) / e;
}

/**
 * @description 根据给定的属性名称集合，查看目标对象是否具有该属性，如果没有设置undefined的定义 ，用法：传入对象和字符串 无返回值
 * @example
 * ```
 * obj = { a: '' }; updateKeyDefine(obj, ['b']);  // =>  obj 修改为 {a: '', b: undefined}
 * obj = { a: '' }; updateKeyDefine(obj, ['a', 'b']) // => obj 修改为 {a: '', b: undefined}
 * ```
 * @export
 * @param {IParams} target 目标对象
 * @param {s(string | symbol)[]} keys 需要支持的属性名称集合
 */
export function updateKeyDefine(
  target: IParams,
  keys: (string | symbol)[],
): void {
  keys.forEach(key => {
    if (!Object.prototype.hasOwnProperty.call(target, key)) {
      Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: undefined,
      });
    }
  });
}

/**
 * @description 判断字符串是否为Base64图片格式, 用法传入字符串 返回值为boolean类型
 * @example
 * ```
 * isBase64Image('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAmklEQVQ4T2NkoBAwUqifYt4q8ogcCQ3NjY2BgYGBgZmBgY9oRk5Ojy8vLz8+PjQ2NjYGBgYGBhZmBggcCQ3NjY2BgYGhnb4FlDyECYAw6fQGp7QUhYGAQ0AC8Dtdu4AxsAAAAAElFTkSuQmCC'); // => true
 * isBase64Image('data:image/png;,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAmklEQVQ4T2NkoBAwUqifYt4q8ogcCQ3NjY2BgYGBgZmBgY9oRk5Ojy8vLz8+PjQ2NjYGBgYGBhZmBggcCQ3NjY2BgYGhnb4FlDyECYAw6fQGp7QUhYGAQ0AC8Dtdu4AxsAAAAAElFTkSuQmCC'); // => false
 * ```
 * @param {string} str
 * @return {*}
 */
export function isBase64Image(str: string): boolean {
  // 使用正则表达式检查字符串是否以"data:image/"开头，后面紧跟着base64编码
  return /^data:image\/[a-zA-Z+]+;base64,([/+=\w\s]+|[^,]+)$/.test(str);
}

/**
 * @description 判断字符串是否为Base64格式, 用法传入字符串 返回值为boolean类型
 * ```
 * isBase64('JUYwJTlGJTk4JTg0') => true
 * isBase64('Hello World!') => false
 * ```
 * @export
 * @param {string} str
 * @return {*}  {boolean}
 */
export function isBase64(str: string): boolean {
  // Base64 编码规则：包含字母、数字、+、/、=，并且长度通常是 4 的倍数（最后可能有 1 或 2 个等号）
  return /^[A-Za-z0-9+/=]+$/.test(str) && str.length % 4 === 0;
}

/**
 * @description 判断字符串是否为表情符号格式, 用法传入字符串 返回值为boolean类型
 * ```
 * isEmoji('JUYwJTlGJTk4JTg0') => true
 * isEmoji('Hello World!') => false
 * ```
 * @export
 * @param {string} str
 * @return {*}  {boolean}
 */
export function isEmoji(str: string): boolean {
  return EMOJIMAP.has(str);
}

/**
 * @description 字符串转Base64格式字符串，主要用于将UTF-8字符串转为Base64格式字符串
 * ```
 * strToBase64('😄') => 'JUYwJTlGJTk4JTg0'
 * ```
 * @export
 * @param {string} str
 * @return {*}  {string}
 */
export function strToBase64(str: string): string {
  return btoa(encodeURIComponent(str));
}

/**
 * @description Base64格式字符串转普通字符串，主要用于将UTF-8字符串转为的Base64格式字符串转回UTF-8字符串
 * ```
 * base64ToStr('JUYwJTlGJTk4JTg0') => '😄'
 * ```
 * @export
 * @param {string} base64
 * @return {*}  {string}
 */
export function base64ToStr(base64: string): string {
  return decodeURIComponent(atob(base64));
}

/**
 * @description base64转blob
 * @export
 * @param {string} base64
 * @return {*}  {Blob}
 */
export function base64ToBlob(base64: string): Blob {
  const binStr = atob(base64.split(',')[1]);
  const len = binStr.length;
  const arr = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }
  return new Blob([arr]);
}

/**
 * @description 用于计算各种视图打开方式的样式， 用法：传入数值和视图类型 返回值为number或string类型
 * @example
 * ```
 * calcOpenModeStyle(0, 'drawer'); // => '0%'
 * calcOpenModeStyle(150, 'drawer'); // => 150
 * ```
 * @param {number} value
 * @return {*}
 */
export function calcOpenModeStyle(
  value: number,
  type: 'drawer' | 'modal' | 'popover',
): string | number {
  if (value >= 0 && value <= 100) {
    return `${value}%`;
  }
  if (value > 100) {
    return type === 'drawer' ? value : `${value}px`;
  }
  // 处理其他情况，例如负值等
  ibiz.log.error(ibiz.i18n.t('core.utils.invalidInputValue'));
  return '';
}

/**
 * @description 根据环境变量判断是否展示title, 返回值为string或undefined类型
 * ```
 * enableTitle: true
 * showTitle('title') => str
 * enableTitle: false
 * showTitle('title') => undefined
 * ```
 * @export
 * @param {string | undefined} str
 * @return {*}  {string | undefined}
 */
export function showTitle(str: string | undefined): string | undefined {
  return ibiz.env.enableTitle ? str : undefined;
}

/**
 * @description 将非标准JSON字符串转为JSON对象（自动修复常见的格式问题）。1. 将单引号替换为双引号，2. 给对象的属性名加上双引号，3. 去除最后一个元素后的多余逗号，4. 去除多余的空格和换行符
 * @export
 * @param {string} str
 * @return {*}  {*}
 */
export function fixJsonString(str: string): any {
  // 1. 将单引号替换为双引号
  let fixedString = str.replace(/'/g, '"');

  // 2. 给对象的属性名加上双引号
  fixedString = fixedString.replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');

  // 3. 去除最后一个元素后的多余逗号
  fixedString = fixedString.replace(/,(\s*[\}\]])/g, '$1');

  // 4. 去除多余的空格和换行符
  fixedString = fixedString.trim();

  // 5. 尝试解析为有效的 JSON 字符串
  try {
    return JSON.parse(fixedString);
  } catch (e) {
    ibiz.log.error(str);
    return null;
  }
}

/**
 * @description 获取随机数，默认获取 0 - 1000 的随机数
 * @export
 * @param {number} [min=0] 随机数最小值
 * @param {number} [max=1000] 随机数最大值
 * @return {*}  {number}
 */
export function getRandomInt(min: number = 0, max: number = 1000): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
