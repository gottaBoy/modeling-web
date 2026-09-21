export type CloneOpts = {
    deep?: boolean;
};
/**
 * 克隆方法（如果对象有clone方法会用clone方法调用clone）
 * @author lxm
 * @date 2023-10-25 06:24:18
 * @export
 * @template T
 * @param {readonly} value
 * @param {*} T
 * @param {*} []
 * @param {CloneOpts} [opts]
 * @return {*}  {T[]}
 */
export declare function clone<T>(value: T, opts?: CloneOpts): T;
//# sourceMappingURL=clone.d.ts.map