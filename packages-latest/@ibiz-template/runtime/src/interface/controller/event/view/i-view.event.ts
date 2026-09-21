import { PartialWithObject } from '@ibiz-template/core';
import {
  CloseViewEvent,
  DataChangeEvent,
  EventBase,
  RedrawViewEvent,
  ViewInfoEvent,
} from '../argument';
import { IComponentEvent } from '../common/i-component.event';

/**
 * @description 视图事件
 * @export
 * @interface IViewEvent
 * @extends {IComponentEvent}
 * @primary
 */
export interface IViewEvent extends IComponentEvent {
  /**
   * @description 关闭视图
   * @type {{
   *     event: CloseViewEvent;
   *     emitArgs: PartialWithObject<CloseViewEvent, EventBase>;
   *   }}
   * @memberof IViewEvent
   */
  onCloseView: {
    event: CloseViewEvent;
    emitArgs: PartialWithObject<CloseViewEvent, EventBase>;
  };

  /**
   * @description 视图信息变更事件
   * @type {{
   *     event: ViewInfoEvent;
   *     emitArgs: PartialWithObject<ViewInfoEvent, EventBase>;
   *   }}
   * @memberof IViewEvent
   */
  onViewInfoChange: {
    event: ViewInfoEvent;
    emitArgs: PartialWithObject<ViewInfoEvent, EventBase>;
  };

  /**
   * @description 视图数据变更(有数据能力的视图才有)
   * @type {({
   *     event: DataChangeEvent;
   *     emitArgs: PartialWithObject<DataChangeEvent, EventBase> & {
   *       data?: IData[];
   *     };
   *   })}
   * @memberof IViewEvent
   */
  onDataChange: {
    event: DataChangeEvent;
    emitArgs: PartialWithObject<DataChangeEvent, EventBase> & {
      data?: IData[];
    };
  };

  /**
   * @description 重绘视图
   * @type {{
   *     event: RedrawViewEvent;
   *     emitArgs: PartialWithObject<RedrawViewEvent, EventBase>;
   *   }}
   * @memberof IViewEvent
   */
  onRedrawView: {
    event: RedrawViewEvent;
    emitArgs: PartialWithObject<RedrawViewEvent, EventBase>;
  };

  /**
   * @description 门户点击事件(实体数据看板视图、应用看板视图)
   * @type {{
   *     event: DataChangeEvent;
   *     emitArgs: { data: IData };
   *   }}
   * @memberof IViewEvent
   */
  onPorletClick: {
    event: DataChangeEvent;
    emitArgs: { data: IData };
  };

  /**
   * @description 预置class变更事件，可通过此事件来设置视图的class
   * @type {{
   *     event: DataChangeEvent;
   *     emitArgs: { data: string[] };
   *   }}
   * @memberof IViewEvent
   */
  onPresetClassChange: {
    event: DataChangeEvent;
    emitArgs: { data: string[] };
  };

  /**
   * @description 更新用户访问状态
   * @type {{
   *     event: EventBase;
   *     emitArgs: undefined;
   *   }}
   * @memberof IViewEvent
   */
  onUpdateAccessState: {
    event: EventBase;
    emitArgs: undefined;
  };
}
