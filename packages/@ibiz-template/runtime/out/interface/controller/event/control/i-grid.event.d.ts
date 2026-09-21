import { PartialWithObject } from '@ibiz-template/core';
import { EventBase, RowEditChangeEvent } from '../..';
import { IMDControlEvent } from './i-md-control.event';
/**
 * 表格部件事件
 *
 * @author lxm
 * @date 2022-08-30 16:08:43
 * @export
 * @interface IMDControlEvent
 */
export interface IGridEvent extends IMDControlEvent {
    /**
     * 设置表格数据事件
     * @author lxm
     * @date 2023-03-26 06:15:06
     * @param {emitArgs} undefined
     * @return {*}  {Promise<void>}
     */
    onGridDataChange: {
        event: EventBase;
        emitArgs: {
            data: IData[];
        };
    };
    /**
     * 表格行编辑切换事件
     * @author lxm
     * @date 2023-03-26 06:15:06
     * @param {emitArgs} undefined
     * @return {*}  {Promise<void>}
     */
    onRowEditChange: {
        event: RowEditChangeEvent;
        emitArgs: PartialWithObject<RowEditChangeEvent, EventBase>;
    };
    /**
     * @description 切换行展开
     * @type {{
     *     event: EventBase;
     *     emitArgs: { row: IData, expand?: boolean };
     *   }}
     * @memberof IGridEvent
     */
    onToggleRowExpansion: {
        event: EventBase;
        emitArgs: {
            row: IData;
            expand?: boolean;
        };
    };
}
//# sourceMappingURL=i-grid.event.d.ts.map