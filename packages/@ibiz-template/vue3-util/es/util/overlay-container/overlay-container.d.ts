import { QXEvent } from 'qx-util';
import { IOverlayContainer } from '@ibiz-template/runtime';
import { App, Component, VNode } from 'vue';
/**
 * 全局弹出承载组件
 *
 * @author chitanda
 * @date 2022-11-09 12:11:09
 * @export
 * @class OverlayContainer
 */
export declare class OverlayContainer<O> implements IOverlayContainer {
    protected component: unknown;
    protected render: (...args: any[]) => VNode;
    protected opts?: O | undefined;
    protected vm?: App;
    /**
     * 具体模态组件
     *
     * @author chitanda
     * @date 2022-11-09 12:11:34
     * @protected
     * @type {*}
     */
    protected modal: any;
    /**
     * 外面调用dismiss时传的result结果
     *
     * @author lxm
     * @date 2022-11-09 20:11:06
     * @protected
     * @type {unknown}
     */
    protected result?: unknown;
    /**
     * 内部事件
     *
     * @author chitanda
     * @date 2022-11-09 12:11:42
     * @protected
     */
    protected evt: QXEvent<{
        dismiss: (data?: unknown) => void;
    }>;
    /**
     * 创建全局呈现
     *
     * @author chitanda
     * @date 2022-11-09 14:11:52
     * @param {unknown} component
     * @param {(h: CreateElement) => VNode} render
     * @param {IPopoverOptions} [opts]
     */
    constructor(component: unknown, render: (...args: any[]) => VNode, opts?: O | undefined);
    static createVueApp(_rootComponent: Component, _rootProps?: IData): App<Element>;
    /**
     * 初始化飘窗
     *
     * @author chitanda
     * @date 2022-11-09 12:11:55
     * @protected
     * @return {*}  {void}
     */
    protected init(): void;
    /**
     * 打开飘窗
     *
     * @author chitanda
     * @date 2022-11-09 12:11:52
     * @param {HTMLElement} target
     * @return {*}  {Promise<void>}
     */
    present(): Promise<void>;
    /**
     * 手动调用关闭飘窗
     *
     * @author chitanda
     * @date 2022-11-09 12:11:39
     * @param {unknown} [data]
     * @return {*}  {Promise<void>}
     */
    dismiss(data?: unknown): Promise<void>;
    /**
     * 订阅窗口关闭
     *
     * @author chitanda
     * @date 2022-11-09 12:11:20
     * @template T
     * @return {*}  {Promise<T>}
     */
    onWillDismiss<T = unknown>(): Promise<T>;
}
//# sourceMappingURL=overlay-container.d.ts.map