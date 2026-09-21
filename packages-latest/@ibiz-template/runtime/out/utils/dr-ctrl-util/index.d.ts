import { IDRBarItemsState, IDRTabPagesState, ISearchCondField } from '../../interface';
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
/**
 * 将对象格式的查询参数转换为结构化的搜索条件数组
 *
 * @export
 * @param {IParams} _params
 * @return {*}  {ISearchCondField[]}
 *
 * @example
 * 转换规则：
 * 1. 仅处理键以'N_'开头且包含有效操作符后缀的参数
 * 2. 从键中提取字段名（去除'N_'前缀和操作符后缀）
 * 3. 仅当参数值不为null、undefined或空字符串时才生成条件
 *
 * 示例：
 * 输入：{n_age_gt: 18, n_name_like: '慧', invalidKey: 'value'}
 * 输出：[
 *   {condtype: 'DEFIELD', fieldname: 'age', value: 18, condop: 'GT'},
 *   {condtype: 'DEFIELD', fieldname: 'name', value: '慧', condop: 'LIKE'}
 * ]
 */
export declare function paramsToSearchconds(_params: IParams): ISearchCondField[];
//# sourceMappingURL=index.d.ts.map