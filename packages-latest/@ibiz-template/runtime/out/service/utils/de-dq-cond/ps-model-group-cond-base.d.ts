import { PSModelCondBase } from './ps-model-cond-base';
/**
 * 逻辑组
 *
 * @export
 * @class PSModelGroupCondBase
 * @extends {PSModelCondBase}
 */
export declare class PSModelGroupCondBase extends PSModelCondBase {
    /**
     * 子条件项
     *
     * @private
     * @type {PSModelCondBase[]}
     * @memberof PSModelGroupCondBase
     */
    private childCondList;
    /**
     * 是否取反
     *
     * @private
     * @memberof PSModelGroupCondBase
     */
    private bNotMode;
    /**
     * 解析分组条件
     *
     * @param {unknown[]} arr
     * @memberof PSModelGroupCondBase
     */
    parse(arr: unknown[]): void;
    setNotMode(bNotMode: boolean): void;
    isNotMode(): boolean;
    getChildPSModelCondBases(): PSModelCondBase[];
}
//# sourceMappingURL=ps-model-group-cond-base.d.ts.map