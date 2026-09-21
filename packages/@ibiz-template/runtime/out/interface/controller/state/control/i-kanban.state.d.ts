import { IButtonContainerState } from '../../common';
import { IToolbarController } from '../../controller';
import { IDataViewControlState } from './i-data-view-control.state';
import { IMDControlGroupState } from './i-md-control.state';
/**
 * 看板部件（kanban）部件状态
 *
 * @export
 * @interface IDataViewControlState
 * @extends {IMDControlState}
 */
export interface IKanbanState extends IDataViewControlState {
    /**
     * @description 看板卡片操作项状态
     * @author 姜林君
     * @date 2024/03/21 09:03:21
     * @type {{ [p: string]: IButtonContainerState }}
     * @memberof IKanbanState
     */
    uaState: {
        [p: string]: IButtonContainerState;
    };
    /**
     * 可拖拽的
     * @author lxm
     * @date 2023-08-29 04:18:04
     * @type {boolean}
     */
    draggable: boolean;
    /**
     * 是否只读
     */
    readonly: boolean;
    /**
     * 是否正在更新
     * @author lxm
     * @date 2023-09-11 09:09:30
     * @type {boolean}
     */
    updating: boolean;
    /**
     * 是否正在批操作
     *
     * @type {boolean}
     * @memberof IKanbanState
     */
    batching: boolean;
    /**
     * 分组数据
     *
     * @type {IKanbanGroupState[]}
     * @memberof IKanbanState
     */
    groups: IKanbanGroupState[];
    /**
     * 选中分组标识
     *
     * @type {string | number}
     * @memberof IKanbanState
     */
    selectGroupKey: string | number;
}
/**
 * 看板部件分组数据
 *
 * @export
 * @interface IKanbanGroupState
 * @extends {IMDControlGroupState}
 */
export interface IKanbanGroupState extends IMDControlGroupState {
    /**
     * 颜色
     *
     * @type {string}
     * @memberof IKanbanGroupState
     */
    color?: string;
    /**
     * 快速工具栏控制器
     *
     * @type {IToolbarController}
     * @memberof IKanbanGroupState
     */
    quickToolbarController?: IToolbarController;
    /**
     * 批操作工具栏控制器
     *
     * @type {IToolbarController}
     * @memberof IKanbanGroupState
     */
    batchToolbarController?: IToolbarController;
}
//# sourceMappingURL=i-kanban.state.d.ts.map