/**
 * 可选配置参数
 *
 * @author lxm
 * @date 2022-10-28 16:10:48
 * @export
 * @interface OnClickOutsideOptions
 * @extends {ConfigurableWindow}
 * @template E
 */
export interface OnClickOutsideOptions {
    /**
     * 指定使用的window,不给就用默认的window
     * 一般是在iframe或测试环境中使用。
     *
     * @author lxm
     * @date 2022-10-28 17:10:49
     * @type {Window}
     */
    window?: Window;
    /**
     * 指定需要忽略的元素，用于排除某些外部的元素
     *
     * @author lxm
     * @date 2022-10-28 17:10:50
     * @type {HTMLElement[]}
     */
    ignore?: HTMLElement[];
    /**
     * 是否捕获内部元素。默认为是，内部元素不会触发回调。
     * @default true
     */
    capture?: boolean;
}
/**
 * 回调处理函数类型
 */
export type OnClickOutsideHandler = (_evt: PointerEvent | MouseEvent) => void;
/**
 * OnClickOutside返回对象类型
 *
 * @author lxm
 * @date 2022-10-31 11:10:59
 * @export
 * @interface OnClickOutsideResult
 */
export interface OnClickOutsideResult {
    /**
     * 停止监听，并移除相关监听事件
     *
     * @author lxm
     * @date 2022-10-31 11:10:28
     */
    stop: () => void;
    /**
     * 暂停监听
     *
     * @author lxm
     * @date 2022-10-31 11:10:30
     */
    pause: () => void;
    /**
     * 继续监听
     *
     * @author lxm
     * @date 2022-10-31 11:10:32
     */
    proceed: () => void;
}
//# sourceMappingURL=click-outside.d.ts.map