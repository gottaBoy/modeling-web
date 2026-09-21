/**
 * 把实体属性的值转换成布尔值
 * 以下值会转成true,其他都为false
 * - 字符串：'1'，'true',
 * - 数字：1
 * - 布尔值：true
 * @author lxm
 * @date 2023-12-07 05:07:28
 * @export
 * @param {unknown} value
 * @return {*}  {boolean}
 */
export declare function fieldValueToBoolean(value: unknown): boolean;
/**
 * 将输入的字符串转化为对象
 * @param input 输入字符串，如：DELETE:0,UPDATE:1
 * @returns {"DELETE":0,"UPDATE":1}
 */
export declare function convertToObject(input: string | undefined): {
    [key: string]: number;
};
/**
 * 转换数组成ListMap
 *
 * @param {IData[]} arr
 * @return {*} listMap
 */
export declare function convertArrayToListMap(arr: IData[]): IData;
/**
 * 转换ListMap成数组
 *
 * @param {listMap} obj
 * @return {*} IData[]
 */
export declare function convertListMapToArray(obj: IData): IData[];
/**
 * @description 获取没有预置字段的上下文
 * @export
 * @param {IContext} context
 * @returns {*}  {IData}
 */
export declare function getTempContext(context: IContext): IData;
//# sourceMappingURL=util.d.ts.map