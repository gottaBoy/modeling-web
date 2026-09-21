import { IDEList } from '@ibiz/model-core';
import { IListEvent } from '../../event';
import { IListState } from '../../state';
import { IMDControlController } from './i-md-control.controller';
/**
 * 列表控制器
 * @author lxm
 * @date 2023-05-04 01:47:16
 * @export
 * @interface IListController
 * @extends {IMDControlController}
 */
export interface IListController<T extends IDEList = IDEList, S extends IListState = IListState, E extends IListEvent = IListEvent> extends IMDControlController<T, S, E> {
    /**
     * 设置列表数据
     *
     * @author zk
     * @date 2023-05-26 02:05:55
     * @param {IData[]} items
     * @memberof IListController
     */
    setData(items: IData[]): void;
    /**
     * 获取列表全部数据
     *
     * @author zk
     * @date 2023-05-26 02:05:26
     * @return {*}  {IData[]}
     * @memberof IListController
     */
    getAllData(): IData[];
    /**
     * 加载更多
     *
     * @return {*}  {Promise<void>}
     * @memberof IListController
     */
    loadMore(): Promise<void>;
    /**
     * @description 切换折叠
     * @param {IData} [params]
     * @memberof IListController
     */
    changeCollapse(params?: IData): void;
}
//# sourceMappingURL=i-list.controller.d.ts.map