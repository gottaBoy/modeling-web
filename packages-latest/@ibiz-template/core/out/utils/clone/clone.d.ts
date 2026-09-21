export type CloneOpts = {
    deep?: boolean;
};
/**
 * @description 克隆方法（如果对象有clone方法会用clone方法调用clone）
 * @export
 * @template T
 * @param {T} value
 * @param {CloneOpts} [opts]
 * @returns {*}  {T}
 */
export declare function clone<T>(value: T, opts?: CloneOpts): T;
//# sourceMappingURL=clone.d.ts.map