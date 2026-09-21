import { IDRBarItemsState, IDRTabPagesState } from '../../interface';
import { AppCounter } from '../../service';
/**
 * 根据计数器数据，计算项显示状态
 *
 * @author zhanghengfeng
 * @date 2024-05-16 19:05:55
 * @export
 * @param {(IDRBarItemsState | IDRTabPagesState)} item
 * @param {AppCounter} [counter]
 * @return {*}  {(boolean | undefined)}
 */
export declare function calcItemVisibleByCounter(item: IDRBarItemsState | IDRTabPagesState, counter?: AppCounter): boolean | undefined;
/**
 * 根据启用模式，计算项显示状态
 *
 * @author zhanghengfeng
 * @date 2024-05-16 19:05:46
 * @export
 * @param {(IDRBarItemsState | IDRTabPagesState)} item
 * @param {IContext} context
 * @param {IParams} params
 * @param {string} appDeId
 * @param {string} appId
 * @param {IData} [data]
 * @return {*}  {(Promise<boolean | undefined>)}
 */
export declare function calcItemVisible(item: IDRBarItemsState | IDRTabPagesState, context: IContext, params: IParams, appDeId: string, appId: string, data?: IData): Promise<boolean | undefined>;
/**
 * 获取指定实体数据的主实体数据
 *
 * @export
 * @param {IData} data
 * @param {string} appDataEntityId
 * @param {IContext} context
 * @return {*}  {Promise<IData>}
 */
export declare function getDeDataMajorField(data: IData, context: IContext, appDataEntityId: string): Promise<IData>;
//# sourceMappingURL=index.d.ts.map