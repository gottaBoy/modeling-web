import { IComponentEvent, EventBase } from '../../../interface';
import { QXEventEx } from './qx-event-ex';
export type FunProperty<T> = {
    [p in keyof T]: (...args: any[]) => any;
};
export type defaultType = {
    [p: string]: (...args: any[]) => any;
};
export type EventTypeKeyOf<T> = {
    [K in keyof T]: T[K] extends {
        event: IParams;
        emitArgs: undefined | IParams;
    } ? K : never;
}[keyof T];
export type EventTypeObjec<T> = {
    [K in keyof T]: T[K] extends {
        event: IParams;
        emitArgs: undefined | IParams;
    } ? T[K] : never;
};
/**
 * 控制器事件触发，监听工具类，需要提供基础事件参数的回调。
 *
 * @author lxm
 * @date 2022-08-30 16:08:49
 * @export
 * @class ControllerEvent
 * @template E 事件接口
 * @template A 能力行为接口
 */
export declare class ControllerEvent<E extends IComponentEvent = IComponentEvent> {
    protected getBaseArgs: () => Omit<EventBase, 'eventName'>;
    /**
     * 是否已经销毁
     * @author lxm
     * @date 2023-08-30 02:54:14
     * @type {boolean}
     */
    isDestroyed: boolean;
    /**
     * 事件对象
     *
     * @author lxm
     * @date 2022-08-30 14:08:40
     */
    protected readonly evt: QXEventEx<defaultType>;
    /**
     * 发送事件，并等待所有监听器执行完毕
     * @author lxm
     * @date 2023-03-30 06:49:12
     * @template K
     * @param name 事件名称
     * @param args 事件参数
     * @return {*}  {Promise<void>}
     */
    emit<K extends EventTypeKeyOf<E>>(name: K, args: EventTypeObjec<E>[K]['emitArgs']): Promise<void>;
    /**
     * 订阅指定事件
     * @author lxm
     * @date 2023-03-30 06:46:59
     * @param  name 事件名
     * @param  fn 事件回调
     */
    on<K extends EventTypeKeyOf<E>>(name: K, fn: (event: EventTypeObjec<E>[K]['event']) => void | Promise<void>): void;
    /**
     * 取消订阅指定事件
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-09-22 17:45:07
     */
    off<K extends EventTypeKeyOf<E>>(name: K, fn: (event: EventTypeObjec<E>[K]['event']) => void | Promise<void>): void;
    /**
     * 订阅任意事件
     * @author lxm
     * @date 2023-03-30 06:48:28
     * @param fn 事件回调
     */
    onAll(fn: (eventName: string, event: EventBase) => void | Promise<void>): void;
    /**
     * Creates an instance of ControllerEvent.
     * @author lxm
     * @date 2023-04-25 09:30:28
     * @param {() => Omit<EventBase, 'eventName'>} getBaseArgs 提供当前控制器环境内的通用的事件参数
     */
    constructor(getBaseArgs: () => Omit<EventBase, 'eventName'>);
    /**
     * 销毁方法，清空
     *
     * @author lxm
     * @date 2022-08-30 17:08:41
     */
    destroy(): void;
}
//# sourceMappingURL=controller-event.d.ts.map