import { PartialWithObject } from '@ibiz-template/core';
import { EventBase } from '../argument';
import { IFormEvent } from './i-form.event';
import { FormMDCtrlRepeaterController } from '../../../../controller';
export interface EditFormEvent extends EventBase {
    /**
     * 事件参数
     */
    args: IData;
}
/**
 * 编辑表单事件
 *
 * @author lxm
 * @date 2022-08-30 16:08:43
 * @export
 * @interface IEditFormEvent
 */
export interface IEditFormEvent extends IFormEvent {
    /**
     * 加载之前
     *
     * @author lxm
     */
    onBeforeLoad: {
        event: EventBase;
        emitArgs: PartialWithObject<EditFormEvent, EventBase>;
    };
    /**
     * 加载成功后
     *
     * @author lxm
     */
    onLoadSuccess: {
        event: EventBase;
        emitArgs: PartialWithObject<EditFormEvent, EventBase>;
    };
    /**
     * 加载失败
     *
     * @author lxm
     */
    onLoadError: {
        event: EventBase;
        emitArgs: PartialWithObject<EditFormEvent, EventBase>;
    };
    /**
     * 保存之前
     *
     * @author lxm
     */
    onBeforeSave: {
        event: EventBase;
        emitArgs: PartialWithObject<EditFormEvent, EventBase>;
    };
    /**
     * 保存成功后
     *
     * @author lxm
     */
    onSaveSuccess: {
        event: EventBase;
        emitArgs: PartialWithObject<EditFormEvent, EventBase>;
    };
    /**
     * 保存失败
     *
     * @author lxm
     */
    onSaveError: {
        event: EventBase;
        emitArgs: PartialWithObject<EditFormEvent, EventBase>;
    };
    /**
     * 删除之前
     *
     * @author lxm
     */
    onBeforeRemove: {
        event: EventBase;
        emitArgs: PartialWithObject<EditFormEvent, EventBase>;
    };
    /**
     * 删除成功之后
     *
     * @author lxm
     */
    onRemoveSuccess: {
        event: EventBase;
        emitArgs: PartialWithObject<EditFormEvent, EventBase>;
    };
    /**
     * 删除失败
     *
     * @author lxm
     */
    onRemoveError: {
        event: EventBase;
        emitArgs: PartialWithObject<EditFormEvent, EventBase>;
    };
    /**
     * 多数据部件删除
     *
     * @type {{
     *     event: EventBase;
     *     emitArgs: PartialWithObject<EditFormEvent, EventBase>;
     *   }}
     * @memberof IEditFormEvent
     */
    onMDCtrlRemove: {
        event: EventBase;
        emitArgs: PartialWithObject<EditFormEvent, EventBase>;
    };
    /**
     * 多数据部件新建
     *
     * @type {{
     *     event: EventBase;
     *     emitArgs: PartialWithObject<EditFormEvent, EventBase>;
     *   }}
     * @memberof IEditFormEvent
     */
    onMDCtrlNew: {
        event: EventBase;
        emitArgs: PartialWithObject<EditFormEvent, EventBase>;
    };
    /**
     * @description 多数据部件改变
     * @type {{
     *     event: EventBase;
     *     emitArgs: PartialWithObject<EditFormEvent, EventBase>;
     *   }}
     * @memberof IEditFormEvent
     */
    onMDCtrlChange: {
        event: EventBase;
        emitArgs: {
            name: string;
            args: FormMDCtrlRepeaterController;
        };
    };
}
//# sourceMappingURL=i-edit-form.event.d.ts.map