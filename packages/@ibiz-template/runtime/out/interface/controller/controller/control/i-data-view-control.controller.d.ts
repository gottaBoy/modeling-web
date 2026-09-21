import { IDEDataView } from '@ibiz/model-core';
import { IDataViewControlEvent } from '../../event';
import { IDataViewControlState } from '../../state';
import { IMDControlController } from './i-md-control.controller';
/**
 * 数据视图（卡片）控制器
 *
 * @export
 * @interface IDataViewControlController
 * @extends {IMDControlController<IDEDataView, IDataViewControlState, IDataViewControlEvent>}
 */
export interface IDataViewControlController<T extends IDEDataView = IDEDataView, S extends IDataViewControlState = IDataViewControlState, E extends IDataViewControlEvent = IDataViewControlEvent> extends IMDControlController<T, S, E> {
    /**
     * 加载更多
     *
     * @return {*}  {Promise<void>}
     * @memberof IDataViewControlController
     */
    loadMore(): Promise<void>;
    /**
     * @description 切换折叠状态
     * @param {IData} [params]
     * @memberof IDataViewControlController
     */
    changeCollapse(params?: IData): void;
}
//# sourceMappingURL=i-data-view-control.controller.d.ts.map