/* eslint-disable @typescript-eslint/no-explicit-any */
import { clearAll, QXEvent } from 'qx-util';
/**
 * QXEvent增强，添加监听任意事件的方式
 * @author lxm
 * @date 2023-03-23 10:02:12
 * @export
 * @class QXEventEx
 * @extends {QXEvent<T>}
 * @template T
 */
export class QXEventEx extends QXEvent {
    constructor() {
        super(...arguments);
        this.anyEventFns = [];
    }
    /**
     * 监听任意事件，返回值必须是数组，用来返回单次或多次的正常回调的结果。
     * 该返回值数组会在正常事件触发的时候展开合并入正常事件的结果里，模拟多次监听的常规返回。
     * @author lxm
     * @date 2023-03-23 09:50:33
     * @param {(...args: any[]) => Promise<any[]>} fn
     */
    onAll(fn) {
        // 避免反复监听
        if (!this.anyEventFns.includes(fn)) {
            this.anyEventFns.push(fn);
        }
    }
    emit(name, ...args) {
        super.emit(name, ...args);
        this.anyEventFns.forEach(fn => {
            fn(name, ...args);
        });
    }
    async asyncEmit(name, ...args) {
        const resultPromise1 = super.asyncEmit(name, ...args);
        // 任意事件监听回调执行，并把执行结果展开合并入原始结果集合
        const all = this.anyEventFns.map(fn => fn(name, ...args));
        const resultPromise2 = Promise.all(all);
        const resultArr1 = await resultPromise1;
        const resultArr2 = await resultPromise2;
        return resultArr1.concat(...resultArr2);
    }
    reset() {
        super.reset();
        clearAll(this.anyEventFns);
    }
}
