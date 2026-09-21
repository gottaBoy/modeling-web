import { PartialWithObject } from '@ibiz-template/core';
import { EventBase, FormDataChangeEvent, FormDetailEvent } from '../argument';
import { IControlEvent } from './i-control.event';
/**
 * 表单事件
 *
 * @author lxm
 * @date 2022-08-30 16:08:43
 * @export
 * @interface IFormEvent
 */
export interface IFormEvent extends IControlEvent {
    /**
     * 设置表单数据事件
     *
     * @author tony001
     * @date 2024-11-27 13:11:40
     * @type {{
     *     event: FormDataChangeEvent;
     *     emitArgs: PartialWithObject<FormDataChangeEvent, EventBase>;
     *   }}
     */
    onFormDataChange: {
        event: FormDataChangeEvent;
        emitArgs: PartialWithObject<FormDataChangeEvent, EventBase>;
    };
    /**
     * 加载草稿之前
     *
     * @author lxm
     */
    onBeforeLoadDraft: {
        event: EventBase;
        emitArgs: Partial<EventBase>;
    };
    /**
     * 加载草稿成功后
     *
     * @author lxm
     */
    onLoadDraftSuccess: {
        event: EventBase;
        emitArgs: undefined;
    };
    /**
     * 加载草稿失败
     *
     * @author lxm
     */
    onLoadDraftError: {
        event: EventBase;
        emitArgs: undefined;
    };
    /**
     * 表单里的成员事件监听
     * @author lxm
     * @date 2023-03-26 06:15:06
     * @param {EventBase} event
     * @return {*}  {Promise<void>}
     */
    onFormDetailEvent: {
        event: FormDetailEvent;
        emitArgs: PartialWithObject<FormDetailEvent, EventBase>;
    };
}
//# sourceMappingURL=i-form.event.d.ts.map