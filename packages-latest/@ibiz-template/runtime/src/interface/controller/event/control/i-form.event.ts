import { PartialWithObject } from '@ibiz-template/core';
import { EventBase, FormDataChangeEvent, FormDetailEvent } from '../argument';
import { IControlEvent } from './i-control.event';

/**
 * @primary
 * @description 表单事件
 * @export
 * @interface IFormEvent
 * @extends {IControlEvent}
 */
export interface IFormEvent extends IControlEvent {
  /**
   * @description 表单数据变更事件
   * @type {{
   *     event: FormDataChangeEvent;
   *     emitArgs: PartialWithObject<FormDataChangeEvent, EventBase>;
   *   }}
   * @memberof IFormEvent
   */
  onFormDataChange: {
    event: FormDataChangeEvent;
    emitArgs: PartialWithObject<FormDataChangeEvent, EventBase>;
  };

  /**
   * @description 加载草稿前
   * @type {{
   *     event: EventBase;
   *     emitArgs: Partial<EventBase>;
   *   }}
   * @memberof IFormEvent
   */
  onBeforeLoadDraft: {
    event: EventBase;
    emitArgs: Partial<EventBase>;
  };

  /**
   * @description 加载草稿成功后
   * @type {{
   *     event: EventBase;
   *     emitArgs: undefined;
   *   }}
   * @memberof IFormEvent
   */
  onLoadDraftSuccess: {
    event: EventBase;
    emitArgs: undefined;
  };

  /**
   * @description 加载草稿失败后
   * @type {{
   *     event: EventBase;
   *     emitArgs: undefined;
   *   }}
   * @memberof IFormEvent
   */
  onLoadDraftError: {
    event: EventBase;
    emitArgs: undefined;
  };

  /**
   * @description 表单里的成员事件监听
   * @type {{
   *     event: FormDetailEvent;
   *     emitArgs: PartialWithObject<FormDetailEvent, EventBase>;
   *   }}
   * @memberof IFormEvent
   */
  onFormDetailEvent: {
    event: FormDetailEvent;
    emitArgs: PartialWithObject<FormDetailEvent, EventBase>;
  };
}
