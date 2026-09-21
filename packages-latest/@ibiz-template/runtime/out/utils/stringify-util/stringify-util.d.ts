/**
 * @description 序列化对象，存在循环引用时替换对象为[Circular]
 * @export
 * @param {Parameters<JSON['stringify']>[0]} obj 对象
 * @returns {*}  {string}
 */
export declare function stringifyObj(obj: Parameters<JSON['stringify']>[0]): string;
//# sourceMappingURL=stringify-util.d.ts.map