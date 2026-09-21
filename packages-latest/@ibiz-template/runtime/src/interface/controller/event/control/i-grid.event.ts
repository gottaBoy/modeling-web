import { PartialWithObject } from '@ibiz-template/core';
import { EventBase, RowEditChangeEvent } from '../..';
import { IMDControlEvent } from './i-md-control.event';

/**
 * @description 表格部件事件
 * @primary
 * @export
 * @interface IGridEvent
 * @extends {IMDControlEvent}
 */
export interface IGridEvent extends IMDControlEvent {
  /**
   * @description 设置表格数据
   * @type {{
   *     event: EventBase;
   *     emitArgs: { data: { name: string; index: number; items: IData[] } };
   *   }}
   * @memberof IGridEvent
   */
  onGridDataChange: {
    event: EventBase;
    emitArgs: { data: { name: string; index: number; items: IData[] } };
  };

  /**
   * @description 表格行编辑切换
   * @type {{
   *     event: RowEditChangeEvent;
   *     emitArgs: PartialWithObject<RowEditChangeEvent, EventBase>;
   *   }}
   * @memberof IGridEvent
   */
  onRowEditChange: {
    event: RowEditChangeEvent;
    emitArgs: PartialWithObject<RowEditChangeEvent, EventBase>;
  };

  /**
   * @description 切换行展开
   * @type {{
   *     event: EventBase;
   *     emitArgs: { row: IData; expand?: boolean };
   *   }}
   * @memberof IGridEvent
   */
  onToggleRowExpansion: {
    event: EventBase;
    emitArgs: { row: IData; expand?: boolean };
  };
}
