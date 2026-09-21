import { IDEGridUAColumn, IUIActionGroupDetail } from '@ibiz/model-core';
import { GridColumnController } from '../../grid/grid-column.controller';
import { GridRowState } from '../../grid/grid-row.state';
/**
 * 表格操作列控制器
 * @return {*}
 * @author: zhujiamin
 * @Date: 2022-09-01 18:25:20
 */
export declare class GridUAColumnController extends GridColumnController<IDEGridUAColumn> {
    /**
     * 给rowController初始化操作列的状态
     *
     * @author lxm
     * @date 2022-09-07 21:09:43
     * @param {GridRowState} row
     */
    initActionStates(row: GridRowState): void;
    /**
     * 触发操作列点击事件
     *
     * @author lxm
     * @date 2022-09-07 22:09:46
     * @param {IPSUIActionGroupDetail} detail
     * @param {MouseEvent} event
     */
    onActionClick(detail: IUIActionGroupDetail, row: GridRowState, event: MouseEvent): Promise<void>;
}
//# sourceMappingURL=grid-ua-column.controller.d.ts.map