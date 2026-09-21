import { IAppDEDataSet, IDEDQCondition } from '@ibiz/model-core';
import { PSDEDQCondEngine } from '../de-dq-cond/ps-de-dq-cond-engine';
/**
 * 获取查询条件工具类
 *
 * @author chitanda
 * @date 2022-08-25 17:08:44
 * @export
 * @class DEDQCondUtil
 */
export declare class DEDQCondUtil {
    /**
     * 查询条件缓存
     *
     * @author chitanda
     * @date 2022-08-25 17:08:57
     * @protected
     * @static
     * @type {WeakMap<IAppDEDataSet, PSDEDQCondEngine>}
     */
    protected static map: WeakMap<IAppDEDataSet, PSDEDQCondEngine>;
    /**
     * 根据数据查询获取查询
     *
     * @author chitanda
     * @date 2022-08-25 17:08:04
     * @static
     * @param {IAppDEDataSet} dataSet
     * @return {*}  {PSDEDQCondEngine}
     */
    static getCond(dataSet: IAppDEDataSet): PSDEDQCondEngine | null;
    /**
     * 计算查询条件
     *
     * @author chitanda
     * @date 2022-08-25 17:08:39
     * @protected
     * @static
     * @param {IDEDQCondition[]} items
     * @return {*}  {unknown[]}
     */
    protected static calcCond(items: IDEDQCondition[]): unknown[];
}
//# sourceMappingURL=de-dq-cond-util.d.ts.map