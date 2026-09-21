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
export declare function testCond(value: valueType, op: string, value2: valueType): boolean;
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
export declare function compare(value: valueType, value2: valueType): number;
/**
 * 数值比较
 *
 * @static
 * @param {number} value
 * @param {number} value2
 * @returns {number}
 * @memberof Verify
 */
export declare function compareNumber(value: number, value2: number): number;
/**
 * 范围比较，比较value是否在value2的范围内
 *
 * @static
 * @param {*} value
 * @param {*} value2
 * @returns {boolean}
 * @memberof Verify
 */
export declare function contains(value: valueType, value2: valueType): boolean;
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
export declare function strContain(value: valueType, value2: valueType, mode?: 'start' | 'end'): boolean;
export {};
//# sourceMappingURL=verify.d.ts.map