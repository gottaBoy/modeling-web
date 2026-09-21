/* eslint-disable @typescript-eslint/no-explicit-any */

import { NOOP } from '../../constant';

/**
 * @description 计算event的composedPath返回事件路径(兼容了IE)
 * @export
 * @param {MouseEvent} event
 * @returns {*}  {((EventTarget | null)[])}
 */
export function eventPath(event: MouseEvent): (EventTarget | null)[] {
  const path = ((event.composedPath && event.composedPath()) ||
    (event as any).path) as HTMLElement[] | undefined;

  if (path != null) return path;

  // 浏览器没有提供的，自己递归计算
  function getParents(
    node: HTMLElement,
    memo: HTMLElement[] = [],
  ): HTMLElement[] {
    const parentNode = node.parentNode as HTMLElement | null;

    return parentNode
      ? getParents(parentNode, memo.concat([parentNode]))
      : memo;
  }

  return [event.target].concat(getParents(event.target as HTMLElement));
}

/**
 * @description 监听JS原生事件，返回cleanup回调，调用后删除该监听
 * @export
 * @param {EventTarget} target 监听对象
 * @param {string} eventName 监听事件名称
 * @param {(..._args: any[]) => any} listener 监听回调
 * @param {AddEventListenerOptions} [options={}] 额外参数
 * @returns {*}  {() => void}
 */
export function listenJSEvent(
  target: EventTarget,
  eventName: string,
  listener: (..._args: any[]) => any,
  options: AddEventListenerOptions = {},
): () => void {
  target.addEventListener(eventName, listener, options);

  let cleanup = (): void => {
    target.removeEventListener(eventName, listener, options);
    // cleanup方法只能调用一次
    cleanup = NOOP;
  };

  return () => {
    cleanup();
  };
}

/**
 * @description event是否是在目标元素内部触发的
 * @export
 * @param {MouseEvent} event 原生事件
 * @param {HTMLElement} el 目标元素
 * @returns {*}  {boolean}
 */
export function isEventInside(event: MouseEvent, el: HTMLElement): boolean {
  return el && (event.target === el || eventPath(event).includes(el));
}
