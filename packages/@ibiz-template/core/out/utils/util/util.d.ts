/**
 * 获取认证令牌
 *
 * @author chitanda
 * @date 2022-07-20 18:07:39
 * @export
 * @return {*}  {(string | null)}
 */
export declare function getToken(): string | null;
/**
 * 判断两个数组是否有相同的元素
 *
 * @description 判断两个数组是否有相同的元素, 用法: 传入两个数组 返回值为boolean类型
 * @example
 * ```
 * isOverlap([1, 2, 3], [3, 4, 5]) // => true
 * isOverlap([1, 2, 3], [4, 5, 6]) // => false
 * ```
 * @author lxm
 * @date 2022-09-20 19:09:29
 * @export
 * @param {any[]} arr1
 * @param {any[]} arr2
 * @returns {*}  {boolean}
 */
export declare function isOverlap(arr1: any[], arr2: any[]): boolean;
/**
 * 是否元素相同
 *
 * @description 判断两个数组是否元素相同, 用法：传入需要判断的数组 返回值是boolean类型
 * @example
 * isOverlap([1, 2, 3], [1, 2, 3]) // => true
 * isOverlap([{ test1: 1, test2: 2, test3: 3 }, { test1: 2, test2: 2, test3: 3 }], [{ test1: 1, test2: 2, test3: 3 }, { test1: 2, test2: 2, test3: 3 }], 'test1') // => true
 * @author lxm
 * @date 2023-05-22 12:50:53
 * @export
 * @param {any[]} arr1
 * @param {any[]} arr2
 * @param {string} [field] 比较元素里的某个固定属性
 * @return {*}  {boolean}
 */
export declare function isElementSame(arr1: any[], arr2: any[], field?: string): boolean;
/**
 * 防抖并合并每次的参数，
 * 最后一次才会执行
 *
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
 * @author lxm
 * @date 2022-09-20 21:09:53
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
export declare function debounceAndMerge<T extends (...args: any[]) => any>(func: T, mergeFunc: (oldParams: Parameters<T>, newParams: Parameters<T>) => Parameters<T>, wait?: number): (...args: Parameters<T>) => any;
/**
 * 防抖并合并每次的参数，最后一次才会执行
 * 绑定方法为异步方法，给每次调用返回最终执行那次的结果
 *
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
 * @author lxm
 * @date 2022-09-20 21:09:53
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
export declare function debounceAndAsyncMerge<T extends (...args: any[]) => Promise<any>>(func: T, mergeFunc: (oldParams: Parameters<T>, newParams: Parameters<T>) => Parameters<T>, wait?: number): T;
/**
 * 把右侧的对象里非空的属性合并到左侧对象里
 *
 * @description 把右侧的对象里非空的属性合并到左侧对象里， 用法：传入需要合并的数组 无返回值
 * @example
 * ```
 * obj1 = { a: 1, b: 2 }; obj2 = { c: null, d: false, e: undefined, f: 0, g: {} }; mergeInLeft(obj1, obj2); // => obj1 修改为 { a: 1, b: 2, d: false, f: 0, g: {} }
 * obj1 = { a: 1, b: 2 }; obj2 = { a: 2, b: 3, c: null, d: false, e: undefined, f: 0, g: {} }; // => obj1 修改为 { a: 2, b: 3, d: false, f: 0, g: {} }
 * ```
 * @author lxm
 * @date 2023-05-16 02:23:39
 * @param {IData} l
 * @param {IData} r
 */
export declare function mergeInLeft(l: IData, r: IData): void;
/**
 * 把右侧的对象里非空的属性合并到左侧对象属性为空里
 *
 * @description 把右侧的对象里非空的属性合并到左侧对象属性为空里, 用法：传入需要合并的数组 无返回值
 * @example
 * ```
 * obj1 = { a: 1, b: 2 }; obj2 = { c: null, d: false, e: undefined, f: 0, g: {} }; mergeInLeft(obj1, obj2); // => obj1 修改为 { a: 1, b: 2, d: false, f: 0, g: {} }
 * obj1 = { a: 1, b: 2 }; obj2 = { a: 2, b: 3, c: null, d: false, e: undefined, f: 0, g: {} }; // => obj1 修改为 { a: 1, b: 2, d: false, f: 0, g: {} }
 * ```
 * @author zk
 * @date 2023-06-01 02:06:36
 * @export
 * @param {IData} l
 * @param {IData} r
 */
export declare function mergeDefaultInLeft(l: IData, r: IData): void;
/**
 * 比较两个数组集合，找出相同和不同的元素
 *
 * @description 比较两个数组集合，找出相同和不同的元素 用法：传入需要比较的两个数组  返回值是{more: IData[], less: IData[], same: IData[]}
 * @example
 * ```
 * 数组中没有引用对象
 * compareArr([1, 2, false, true, undefined, null],  [1, false, undefined]); // => {more: [2, true, null], less: [], same: [1, false, undefined]}
 * 数组中有引用对象
 * compareArr([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }], [{ id: 2, name: 'Jane' }, { id: 3, name: 'Bob' }], 'id') // => {more: [{ id: 1, name: 'John' }],  less: [{ id: 3, name: 'Bob' }], same: [{ id: 2, name: 'Jane' }, { id: 2, name: 'Jane' }]}
 * ```
 * @author lxm
 * @date 2023-05-29 12:33:55
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
export declare function compareArr(arr1: IData[], arr2: IData[], keyField?: string): {
    more: IData[];
    less: IData[];
    same: IData[];
};
/**
 * 转换为数字或undefined
 * - 如果是undefined或null 返回undefined
 * - 其他情况转成数字，能转成数字的返回数字，NaN的返回undefined
 *
 * @description 转换为数字或undefined,如果是undefined或null 返回undefined,其他情况转成数字，能转成数字的返回数字，NaN的返回undefined 用法：传入任意值 返回值为number或undefined类型
 * @example
 * ```
 * toNumberOrNil(5); // => 5
 * toNumberOrNil(undefined); // => undefined
 * ```
 * @author lxm
 * @date 2023-06-08 06:30:57
 * @param {unknown} value 值
 * @return {*}  {(number | undefined)}
 */
export declare function toNumberOrNil(value: unknown): number | undefined;
/**
 * 判断字符串是否是svg的格式
 *
 * @description 判断字符串是否是svg的格式 用法：传入svg字符串 返回值为Boolean类型
 * @example
 * ```
 * isSvg('<svg xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="100" height="100" fill="red" /></svg>'); // => true
 * isSvg('<svg1 xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="100" height="100" fill="red" /></svg1>'); // => false
 * ```
 * @author lxm
 * @date 2023-10-17 02:04:28
 * @export
 * @param {string} str
 * @return {*}  {boolean}
 */
export declare function isSvg(str: string): boolean;
/**
 * 处理浮点数相加
 *
 * @description 处理浮点数相加 用法：传入需要相加的数值 返回值为number类型
 * @example
 * ```
 * plus(10, 10); // => 20
 * plus(99.99, -99.999); // => -0.009
 * ```
 * @param {number} a
 * @param {number} b
 * @return {*}
 * @author: zhujiamin
 * @Date: 2023-11-08 17:04:09
 */
export declare function plus(a: number, b: number): number;
/**
 * 根据给定的属性名称集合，
 * 查看目标对象是否具有该属性，如果没有设置undefined的定义
 *
 * @description 根据给定的属性名称集合，查看目标对象是否具有该属性，如果没有设置undefined的定义 ，用法：传入对象和字符串 无返回值
 * @example
 * ```
 * obj = { a: '' }; updateKeyDefine(obj, ['b']);  // =>  obj 修改为 {a: '', b: undefined}
 * obj = { a: '' }; updateKeyDefine(obj, ['a', 'b']) // => obj 修改为 {a: '', b: undefined}
 * ```
 * @author lxm
 * @date 2023-12-20 05:21:47
 * @export
 * @param {IParams} target 目标对象
 * @param {s(string | symbol)[]} keys 需要支持的属性名称集合
 */
export declare function updateKeyDefine(target: IParams, keys: (string | symbol)[]): void;
/**
 * 判断字符串是否为Base64图片格式
 *
 * @description 判断字符串是否为Base64图片格式, 用法传入字符串 返回值为boolean类型
 * @example
 * ```
 * isBase64Image('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAmklEQVQ4T2NkoBAwUqifYt4q8ogcCQ3NjY2BgYGBgZmBgY9oRk5Ojy8vLz8+PjQ2NjYGBgYGBhZmBggcCQ3NjY2BgYGhnb4FlDyECYAw6fQGp7QUhYGAQ0AC8Dtdu4AxsAAAAAElFTkSuQmCC'); // => true
 * isBase64Image('data:image/png;,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAmklEQVQ4T2NkoBAwUqifYt4q8ogcCQ3NjY2BgYGBgZmBgY9oRk5Ojy8vLz8+PjQ2NjYGBgYGBhZmBggcCQ3NjY2BgYGhnb4FlDyECYAw6fQGp7QUhYGAQ0AC8Dtdu4AxsAAAAAElFTkSuQmCC'); // => false
 * ```
 * @param {string} str
 * @return {*}
 * @author: zhujiamin
 * @Date: 2023-12-28 10:49:23
 */
export declare function isBase64Image(str: string): boolean;
/**
 * 判断字符串是否为Base64格式
 * @description 判断字符串是否为Base64格式, 用法传入字符串 返回值为boolean类型
 * ```
 * isBase64('JUYwJTlGJTk4JTg0') => true
 * isBase64('Hello World!') => false
 * ```
 * @export
 * @param {string} str
 * @return {*}  {boolean}
 */
export declare function isBase64(str: string): boolean;
/**
 * 判断字符串是否为表情符号格式
 * @description 判断字符串是否为表情符号格式, 用法传入字符串 返回值为boolean类型
 * ```
 * isEmoji('JUYwJTlGJTk4JTg0') => true
 * isEmoji('Hello World!') => false
 * ```
 * @export
 * @param {string} str
 * @return {*}  {boolean}
 */
export declare function isEmoji(str: string): boolean;
/**
 * 字符串转Base64格式字符串
 * @description 主要用于将UTF-8字符串转为Base64格式字符串
 * ```
 * strToBase64('😄') => 'JUYwJTlGJTk4JTg0'
 * ```
 * @export
 * @param {string} str
 * @return {*}  {string}
 */
export declare function strToBase64(str: string): string;
/**
 * Base64格式字符串转普通字符串
 * @description 主要用于将UTF-8字符串转为的Base64格式字符串转回UTF-8字符串
 * ```
 * base64ToStr('JUYwJTlGJTk4JTg0') => '😄'
 * ```
 * @export
 * @param {string} base64
 * @return {*}  {string}
 */
export declare function base64ToStr(base64: string): string;
/**
 * @description base64转blob
 * @export
 * @param {string} base64
 * @return {*}  {Blob}
 */
export declare function base64ToBlob(base64: string): Blob;
/**
 * 计算各种视图打开方式的样式
 *
 * @description 用于计算各种视图打开方式的样式， 用法：传入数值和视图类型 返回值为number或string类型
 * @example
 * ```
 * calcOpenModeStyle(0, 'drawer'); // => '0%'
 * calcOpenModeStyle(150, 'drawer'); // => 150
 * ```
 * @param {number} value
 * @return {*}
 * @author: zhujiamin
 * @Date: 2024-01-30 09:39:03
 */
export declare function calcOpenModeStyle(value: number, type: 'drawer' | 'modal' | 'popover'): string | number;
/**
 * 计算title
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
export declare function showTitle(str: string | undefined): string | undefined;
/**
 * 将非标准JSON字符串转为JSON对象（自动修复常见的格式问题）
 *
 * 1. 将单引号替换为双引号
 * 2. 给对象的属性名加上双引号
 * 3. 去除最后一个元素后的多余逗号
 * 4. 去除多余的空格和换行符
 * @export
 * @param {string} str
 * @return {*}  {*}
 */
export declare function fixJsonString(str: string): any;
/**
 * 获取随机数
 * - 默认获取 0 - 1000 的随机数
 * @export
 * @param {number} [min=0] 随机数最小值
 * @param {number} [max=1000] 随机数最大值
 * @return {*}  {number}
 */
export declare function getRandomInt(min?: number, max?: number): number;
//# sourceMappingURL=util.d.ts.map