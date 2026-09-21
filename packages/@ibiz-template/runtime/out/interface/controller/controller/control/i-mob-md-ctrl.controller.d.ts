import { IDEMobMDCtrl } from '@ibiz/model-core';
import { IListController } from './i-list.controller';
import { IMobMdCtrlState, ISearchGroupData } from '../../state';
import { IMobMDCtrlEvent } from '../../event';
/**
 * 移动端多数据部件控制器
 *
 * @author chitanda
 * @date 2023-06-16 10:06:17
 * @export
 * @interface IMobMDCtrlController
 * @extends {IListController}
 */
export interface IMobMDCtrlController<T extends IDEMobMDCtrl = IDEMobMDCtrl, S extends IMobMdCtrlState = IMobMdCtrlState, E extends IMobMDCtrlEvent = IMobMDCtrlEvent> extends IListController<T, S, E> {
    /**
     * 列表加载更多数据
     *
     * @author chitanda
     * @date 2023-06-16 17:06:38
     * @return {*}  {Promise<void>}
     */
    loadMore(): Promise<void>;
    /**
     * 设置分组点击
     *
     * @param {IData} data
     * @memberof IMobMDCtrlController
     */
    setGroupParams(data: ISearchGroupData): void;
}
//# sourceMappingURL=i-mob-md-ctrl.controller.d.ts.map