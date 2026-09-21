import { QXEvent } from 'qx-util';
import { QXEmitter } from 'qx-util/out/interface';
/**
 * QXEvent增强，添加监听任意事件的方式
 * @author lxm
 * @date 2023-03-23 10:02:12
 * @export
 * @class QXEventEx
 * @extends {QXEvent<T>}
 * @template T
 */
export declare class QXEventEx<T extends QXEmitter<T>> extends QXEvent<T> {
    private anyEventFns;
    /**
     * 监听任意事件，返回值必须是数组，用来返回单次或多次的正常回调的结果。
     * 该返回值数组会在正常事件触发的时候展开合并入正常事件的结果里，模拟多次监听的常规返回。
     * @author lxm
     * @date 2023-03-23 09:50:33
     * @param {(...args: any[]) => Promise<any[]>} fn
     */
    onAll(fn: (eventName: string | number | symbol, ...args: any[]) => Promise<any>): void;
    emit<K extends keyof T>(name: K, ...args: Parameters<T[K]>): void;
    asyncEmit<K extends keyof T>(name: K, ...args: Parameters<T[K]>): Promise<Awaited<ReturnType<T[K]>>[]>;
    reset(): void;
}
//# sourceMappingURL=qx-event-ex.d.ts.map