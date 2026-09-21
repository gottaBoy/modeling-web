import { IDEGridUAColumn, IUIActionGroupDetail } from '@ibiz/model-core';
import { GridColumnController } from '../../grid/grid-column.controller';
import { GridRowState } from '../../grid/grid-row.state';
import { IApiGridUAColumnController } from '../../../../../interface';
/**
 * @description 表格操作列控制器
 * @export
 * @class GridUAColumnController
 * @extends {GridColumnController<IDEGridUAColumn>}
 * @implements {IApiGridUAColumnController}
 */
export declare class GridUAColumnController extends GridColumnController<IDEGridUAColumn> implements IApiGridUAColumnController {
    /**
     * 给rowController初始化操作列的状态
     *
     * @author lxm
     * @date 2022-09-07 21:09:43
     * @param {GridRowState} row
     */
    initActionStates(row: GridRowState): void;
    /**
     * @description 触发界面行为
     * @param {IUIActionGroupDetail} detail
     * @param {GridRowState} row
     * @param {MouseEvent} event
     * @returns {*}  {Promise<void>}
     * @memberof GridUAColumnController
     */
    onActionClick(detail: IUIActionGroupDetail, row: GridRowState, event: MouseEvent): Promise<void>;
}
//# sourceMappingURL=grid-ua-column.controller.d.ts.map