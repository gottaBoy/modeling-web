import { SearchFilter } from '../search-filter/search-filter';
import { PSModelCondBase } from './ps-model-cond-base';
import { PSModelCondEngineBase } from './ps-model-cond-engine-base';
import { PSModelGroupCondBase } from './ps-model-group-cond-base';
import { PSModelSingleCondBase } from './ps-model-single-cond-base';
/**
 * 实体查询条件引擎
 *
 * @author chitanda
 * @date 2022-08-17 23:08:58
 * @export
 * @class PSDEDQCondEngine
 * @extends {PSModelCondEngineBase}
 */
export declare class PSDEDQCondEngine extends PSModelCondEngineBase {
    /**
     * 数据上下文
     *
     * @static
     * @memberof PSDEDQCondEngine
     */
    static readonly PARAMTYPE_DATACONTEXT = "DATACONTEXT";
    /**
     * 网页请求上下文
     *
     * @static
     * @memberof PSDEDQCondEngine
     */
    static readonly PARAMTYPE_WEBCONTEXT = "WEBCONTEXT";
    /**
     * 测试
     *
     * @param {IData} data 检测的数据
     * @param {SearchFilter} filter 过滤条件
     * @return {*}  {boolean}
     * @memberof PSDEDQCondEngine
     */
    test(data: IData, filter: SearchFilter): boolean;
    /**
     * 查询条件判断
     *
     * @author chitanda
     * @date 2022-08-17 23:08:11
     * @protected
     * @param {PSModelCondBase} cond
     * @param {IData} data
     * @param {SearchFilter} filter
     * @return {*}  {boolean}
     */
    protected testCond(cond: PSModelCondBase, data: IData, filter: SearchFilter): boolean;
    protected createPSModelSingleCond(): PSModelSingleCondBase;
    protected createPSModelGroupCond(): PSModelGroupCondBase;
}
//# sourceMappingURL=ps-de-dq-cond-engine.d.ts.map