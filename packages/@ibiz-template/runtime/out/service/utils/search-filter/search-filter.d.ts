/**
 * 搜索过滤
 *
 * @export
 * @class SearchFilter
 */
export declare class SearchFilter {
    /**
     * 上下文
     *
     * @author chitanda
     * @date 2022-08-17 22:08:24
     * @type {IParams}
     */
    readonly context: IContext;
    /**
     * 分页
     *
     * @type {number}
     * @memberof SearchFilter
     */
    readonly page = 0;
    /**
     * 分页数据量
     *
     * @type {number}
     * @memberof SearchFilter
     */
    readonly size = 1000;
    /**
     * 快速搜索值
     *
     * @type {string}
     * @memberof SearchFilter
     */
    readonly query: string;
    /**
     * 数据
     *
     * @author chitanda
     * @date 2022-08-17 22:08:00
     * @type {IData}
     */
    readonly data: IData;
    /**
     * 排序属性
     *
     * @type {string}
     * @memberof SearchFilter
     */
    readonly sortField = "srfordervalue";
    /**
     * 排序模式
     *
     * @type {('ASC' | 'DESC')}
     * @memberof SearchFilter
     */
    readonly sortMode: 'ASC' | 'DESC';
    /**
     * 默认条件
     *
     * @author tony001
     * @date 2024-09-05 17:09:06
     * @type {IData}
     */
    readonly srfDefaultCond: IData;
    /**
     * Creates an instance of SearchFilter.
     *
     * @param {*} context
     * @param {*} [data]
     * @memberof SearchFilter
     */
    constructor(context: IContext, data?: IData);
    /**
     * 获取条件值
     *
     * @author chitanda
     * @date 2022-08-17 22:08:11
     * @param {string} key
     * @return {*}  {unknown}
     */
    getValue(key: string): unknown;
}
//# sourceMappingURL=search-filter.d.ts.map