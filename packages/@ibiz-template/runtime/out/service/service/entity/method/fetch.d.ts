import { HttpResponse } from '@ibiz-template/core';
import { IAppDEDataSet } from '@ibiz/model-core';
import { PSDEDQCondEngine, SearchFilter } from '../../../utils';
import { Method } from './method';
import { IDataEntity } from '../../../../interface';
/**
 * 数据集请求
 *
 * @author chitanda
 * @date 2022-10-10 14:10:48
 * @export
 * @class FetchMethod
 * @extends {Method}
 */
export declare class FetchMethod extends Method {
    method: IAppDEDataSet;
    exec(context: IContext, params?: IData | IData[], params2?: IParams, header?: IData): Promise<HttpResponse<IDataEntity[]>>;
    /**
     * 搜索本地数据
     *
     * @author chitanda
     * @date 2023-12-18 11:12:27
     * @param {(PSDEDQCondEngine | null)} cond 查询实例
     * @param {SearchFilter} filter 过滤对象
     * @param {string[]} [queryParamKeys=this.entity.quickSearchAppDEFieldIds!] 当前实体支持快速搜索的属性
     * @return {*}  {Promise<IDataEntity[]>}
     */
    searchLocal(cond: PSDEDQCondEngine | null, filter: SearchFilter, queryParamKeys?: string[]): Promise<IDataEntity[]>;
    /**
     * 获取代码表数据来源的集合
     * @author lxm
     * @date 2023-08-03 02:55:00
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  {Promise<HttpResponse<IData[]>>}
     */
    protected fetchCodeListSet(context: IContext, params: IParams): Promise<HttpResponse<IData[]>>;
}
//# sourceMappingURL=fetch.d.ts.map