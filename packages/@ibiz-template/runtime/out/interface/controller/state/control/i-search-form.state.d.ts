import { IFormState } from './i-form.state';
/**
 * 存储的过滤条件
 * @author lxm
 * @date 2023-11-27 03:15:22
 * @export
 * @interface StoredFilter
 */
export interface StoredFilter {
    /**
     * 标题
     * @author lxm
     * @date 2023-11-27 03:15:56
     * @type {string}
     */
    name: string;
    /**
     * 搜索条件的数据
     * @author lxm
     * @date 2023-11-27 03:48:21
     * @type {IData}
     */
    data: IData;
}
export interface ISearchFormState extends IFormState {
    /**
     * 存储的过滤条件集合
     * @author lxm
     * @date 2023-11-27 03:47:51
     * @type {StoredFilter[]}
     */
    storedFilters: StoredFilter[];
    /**
     * 启用存储过滤条件
     *
     * @author tony001
     * @date 2024-11-13 16:11:49
     * @type {boolean}
     */
    enableStoredFilters: boolean;
}
//# sourceMappingURL=i-search-form.state.d.ts.map