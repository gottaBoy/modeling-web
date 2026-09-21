import { RuntimeError } from '../../error';
import {
  OnClickOutsideHandler,
  OnClickOutsideOptions,
  OnClickOutsideResult,
} from '../../interface';
import { eventPath, isEventInside, listenJSEvent } from '../event/event';

const defaultWindow = typeof window !== 'undefined' ? window : undefined;

/**
 * @description 监听目标元素之外的点击事件回调
 * @export
 * @param {HTMLElement} target 目标元素
 * @param {OnClickOutsideHandler} handler 触发的时间回调
 * @param {OnClickOutsideOptions} [options={}] 额外配置参数
 * @returns {*}  {OnClickOutsideResult}
 */
export function onClickOutside(
  target: HTMLElement,
  handler: OnClickOutsideHandler,
  options: OnClickOutsideOptions = {},
): OnClickOutsideResult {
  const { window = defaultWindow, ignore = [], capture = true } = options;

  if (!target) throw new RuntimeError(ibiz.i18n.t('core.utils.targetElement'));
  if (!window)
    throw new RuntimeError(ibiz.i18n.t('core.utils.cannotFindWindow'));

  /** 是否需要监听，为false时handler不会执行 */
  let shouldListen = true;

  /**
   * 判断event的触发是否是在元素的外部(排除了ignore元素)
   * @param event 事件对象
   * @returns
   */
  const isOutside = (event: MouseEvent): boolean => {
    // 有一个判断是在内部，则不算外部，返回false
    return ![target, ...ignore].some(el => {
      return isEventInside(event, el);
    });
  };

  /** 暂停，所有监听的回调都不执行，用于增强某些ignore无法实现的场景 */
  let isPaused = false;
  const pause = (): void => {
    isPaused = true;
  };
  const proceed = (): void => {
    isPaused = false;
  };

  /** pointerup延时触发标识 */
  let fallback: number;

  /**
   * 事件监听处理回调
   * @param event 事件对象
   * @returns
   */
  const listener = (event: MouseEvent): void => {
    if (isPaused) return;
    window.clearTimeout(fallback);

    // 当需要监听并且最终触发在外部时才需要执行回调
    if (!(shouldListen && isOutside(event))) return;

    handler(event);
  };

  // 鼠标左键单击先后触发pointerdown,pointerup,click
  // 鼠标右键单击先后触发pointerdown,pointerup
  const cleanups = [
    listenJSEvent(window, 'click', listener, { passive: true, capture }),
    listenJSEvent(
      window,
      'pointerdown',
      e => {
        if (isPaused) return;
        // 当pointerdown是在内部触发则不需要后续监听
        shouldListen = isOutside(e);
      },
      { passive: true },
    ),
    listenJSEvent(
      window,
      'pointerup',
      e => {
        if (isPaused) return;
        // 鼠标左键触发才执行
        if (e.button === 0) {
          // 锁死结果避免延时执行时变更
          const path = eventPath(e);
          e.composedPath = (): (EventTarget | null)[] => path;
          fallback = window.setTimeout(() => listener(e), 50);
        }
      },
      { passive: true },
    ),
  ].filter(Boolean);

  /**
   * 停止事件监听，移除监听
   */
  const stop = (): void => cleanups.forEach(fn => fn());
  return { stop, pause, proceed };
}
