import { PartialWithObject } from '@ibiz-template/core';
import { DataChangeEvent, EventBase } from '../argument';
import { IViewEvent } from './i-view.event';

/**
 * 编辑视图事件
 *
 * @author lxm
 * @date 2022-09-13 10:09:00
 * @export
 * @interface IEditViewEvent
 * @extends {IViewEvent}
 */
export interface IEditViewEvent extends IViewEvent {
  /**
   * 视图数据变更
   *
   * @author lxm
   * @date 2022-08-30 16:08:34
   */
  onDataChange: {
    event: DataChangeEvent;
    emitArgs: PartialWithObject<DataChangeEvent, EventBase> & {
      data?: IData[];
    };
  };
}
