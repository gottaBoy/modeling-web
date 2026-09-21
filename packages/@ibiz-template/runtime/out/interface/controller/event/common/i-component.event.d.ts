import { EventBase } from '../argument';
export type CompEventType<T> = {
    [p in keyof T]: {
        event: IParams;
        emitArgs: undefined | IParams;
    };
};
/**
 * 组件通用生命周期事件
 *
 * @author lxm
 * @date 2022-09-21 16:09:57
 * @export
 * @interface IComponentEvent
 */
export interface IComponentEvent {
    /**
     * 自身的准备工作完成(如模型加载，各种初始化，init结束)
     *
     * @author lxm
     * @date 2022-09-21 16:09:28
     */
    onCreated: {
        event: EventBase;
        emitArgs: undefined;
    };
    /**
     * 没有下级组件的created之后的那轮渲染结束就是
     * 有下级的等所有下级mounted都抛出之后才算自己mounted
     *
     * @author lxm
     * @date 2022-09-21 16:09:17
     */
    onMounted: {
        event: EventBase;
        emitArgs: undefined;
    };
    /**
     * 自身组件被销毁时
     *
     * @author lxm
     * @date 2022-09-21 16:09:26
     */
    onDestroyed: {
        event: EventBase;
        emitArgs: undefined;
    };
    /**
     * 自身组件重新激活
     *
     * @author zzq
     * @date 2024-7-04 16:09:26
     */
    onActivated: {
        event: EventBase;
        emitArgs: undefined;
    };
    /**
     * 自身组件暂时停用
     *
     * @author zzq
     * @date 2024-7-04 16:09:26
     */
    onDeactivated: {
        event: EventBase;
        emitArgs: undefined;
    };
}
//# sourceMappingURL=i-component.event.d.ts.map