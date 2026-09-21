/**
 * @description 计算event的composedPath返回事件路径(兼容了IE)
 * @export
 * @param {MouseEvent} event
 * @returns {*}  {((EventTarget | null)[])}
 */
export declare function eventPath(event: MouseEvent): (EventTarget | null)[];
/**
 * @description 监听JS原生事件，返回cleanup回调，调用后删除该监听
 * @export
 * @param {EventTarget} target 监听对象
 * @param {string} eventName 监听事件名称
 * @param {(..._args: any[]) => any} listener 监听回调
 * @param {AddEventListenerOptions} [options={}] 额外参数
 * @returns {*}  {() => void}
 */
export declare function listenJSEvent(target: EventTarget, eventName: string, listener: (..._args: any[]) => any, options?: AddEventListenerOptions): () => void;
/**
 * @description event是否是在目标元素内部触发的
 * @export
 * @param {MouseEvent} event 原生事件
 * @param {HTMLElement} el 目标元素
 * @returns {*}  {boolean}
 */
export declare function isEventInside(event: MouseEvent, el: HTMLElement): boolean;
//# sourceMappingURL=event.d.ts.map