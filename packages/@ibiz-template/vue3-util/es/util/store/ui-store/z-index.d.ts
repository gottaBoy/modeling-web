import { Ref } from 'vue';
export interface IzIndexStore {
    /**
     * 当前最高的ui层级
     *
     * @author lxm
     * @date 2022-08-18 21:08:48
     * @type {number}
     */
    zIndex: Ref<number>;
    /**
     * 增加Ui层级,返回增加后的层级
     *
     * @author lxm
     * @date 2022-08-18 21:08:22
     */
    increment(): number;
    /**
     * 减少Ui层级
     *
     * @author lxm
     * @date 2022-08-18 21:08:22
     */
    decrement(): void;
}
/**
 * 定义zIndex的全局状态变量
 *
 * @author lxm
 * @date 2022-08-18 21:08:26
 * @export
 * @returns {*}
 */
export declare function useZIndexStore(): IzIndexStore;
//# sourceMappingURL=z-index.d.ts.map