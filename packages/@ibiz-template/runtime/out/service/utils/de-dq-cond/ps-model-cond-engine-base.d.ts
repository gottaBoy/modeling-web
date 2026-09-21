import { PSModelGroupCondBase } from './ps-model-group-cond-base';
import { PSModelSingleCondBase } from './ps-model-single-cond-base';
/**
 * 模型条件引擎辅助对象
 *
 * @export
 * @abstract
 * @class PSModelCondEngineBase
 */
export declare abstract class PSModelCondEngineBase {
    /**
     * 根分组条件
     *
     * @private
     * @type {(PSModelGroupCondBase | null)}
     * @memberof PSModelCondEngineBase
     */
    private psModelGroupCondBase;
    /**
     * 解析条件
     *
     * @param {IData[]} obj
     * @memberof PSModelCondEngineBase
     */
    parse(obj: unknown[]): void;
    /**
     * 测试项
     *
     * @protected
     * @param {string} strCondOp
     * @param {*} objValue
     * @param {*} objCondValue
     * @return {*}  {boolean}
     * @memberof PSModelCondEngineBase
     */
    protected testSingleCond(strCondOp: string, objValue: string | number, objCondValue: string | number): boolean;
    /**
     * 创建分组
     *
     * @protected
     * @abstract
     * @return {*}  {PSModelGroupCondBase}
     * @memberof PSModelCondEngineBase
     */
    protected abstract createPSModelGroupCond(): PSModelGroupCondBase;
    /**
     * 创建逻辑项
     *
     * @protected
     * @abstract
     * @return {*}  {PSModelSingleCondBase}
     * @memberof PSModelCondEngineBase
     */
    protected abstract createPSModelSingleCond(): PSModelSingleCondBase;
    /**
     * 获取根分组条件
     *
     * @return {*}  {PSModelGroupCondBase}
     * @memberof PSModelCondEngineBase
     */
    getPSModelGroupCondBase(): PSModelGroupCondBase;
}
//# sourceMappingURL=ps-model-cond-engine-base.d.ts.map