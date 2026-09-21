import { IDEKanban } from '@ibiz/model-core';
import { IKanbanEvent } from '../../event';
import { IKanbanState } from '../../state';
import { IDataViewControlController } from './i-data-view-control.controller';
/**
 * 看板部件控制器
 *
 * @export
 * @interface IDataViewControlController
 * @extends {IMDControlController<IDEDataView, IDataViewControlState, IDataViewControlEvent>}
 */
export interface IKanbanController extends IDataViewControlController<IDEKanban, IKanbanState, IKanbanEvent> {
    /**
     * 是否全屏
     *
     * @return {*}  {boolean}
     * @memberof IKanbanController
     */
    getFullscreen(): boolean;
    /**
     * 全屏
     *
     * @param {IData} container
     * @memberof IKanbanController
     */
    onFullScreen(container: IData): boolean;
    /**
     * 打开对应分组批操作工具栏
     *
     * @param {string | number} groupKey
     * @memberof IKanbanController
     */
    openBatch(groupKey: string | number): void;
    /**
     * 关闭批操作工具栏
     *
     * @memberof IKanbanController
     */
    closeBatch(): void;
}
//# sourceMappingURL=i-kanban.controller.d.ts.map