import { PartialWithObject } from '@ibiz-template/core';
import { EventBase, LoadEvent } from '../argument';
import { IControlEvent } from './i-control.event';
/**
 * 多数据部件事件
 *
 * @author lxm
 * @date 2022-08-30 16:08:43
 * @export
 * @interface IMDControlEvent
 */
export interface IMDControlEvent extends IControlEvent {
    /**
     * 数据激活事件
     *
     * @author lxm
     * @date 2022-08-31 14:08:22
     */
    onActive: {
        event: EventBase;
        emitArgs: {
            data: IData[];
            event?: MouseEvent | undefined;
        };
    };
    /**
     * 选中数据变更事件
     *
     * @author lxm
     * @date 2022-08-31 14:08:12
     */
    onSelectionChange: {
        event: EventBase;
        emitArgs: {
            data: IData[];
        };
    };
    /**
     * 保存之前
     *
     * @author lxm
     */
    onBeforeSave: {
        event: EventBase;
        emitArgs: undefined;
    };
    /**
     * 保存成功后
     *
     * @author lxm
     */
    onSaveSuccess: {
        event: EventBase;
        emitArgs: undefined;
    };
    /**
     * 保存失败
     *
     * @author lxm
     */
    onSaveError: {
        event: EventBase;
        emitArgs: undefined;
    };
    /**
     * 删除之前
     *
     * @author lxm
     */
    onBeforeRemove: {
        event: EventBase;
        emitArgs: undefined;
    };
    /**
     * 删除成功之后
     *
     * @author lxm
     */
    onRemoveSuccess: {
        event: EventBase;
        emitArgs: undefined;
    };
    /**
     * 删除失败
     *
     * @author lxm
     */
    onRemoveError: {
        event: EventBase;
        emitArgs: undefined;
    };
    /**
     * 加载前事件
     *
     * @author lxm
     * @date 2022-08-30 16:08:18
     */
    onBeforeLoad: {
        event: EventBase;
        emitArgs: undefined;
    };
    /**
     * 加载后处理事件
     *
     * @author lxm
     * @date 2023-05-23 03:38:38
     */
    onLoadSuccess: {
        event: LoadEvent;
        emitArgs: PartialWithObject<LoadEvent, EventBase>;
    };
    /**
     * 加载失败
     *
     * @author lxm
     */
    onLoadError: {
        event: EventBase;
        emitArgs: undefined;
    };
    /**
     * 导航数据变更
     * - 部件内部导航使用
     * @type {({
     *     event: EventBase & { navData: IData };
     *     emitArgs: { navData: IData };
     *   })}
     * @memberof IMDControlEvent
     */
    onNavDataChange: {
        event: EventBase & {
            navData: IData;
        };
        emitArgs: {
            navData: IData;
        };
    };
}
//# sourceMappingURL=i-md-control.event.d.ts.map