/* eslint-disable default-param-last */
import { listenJSEvent } from '@ibiz-template/core';

/**
 * 通过回车聚焦元素
 *
 * @export
 * @param {(HTMLElement | Document)} [target=document] 聚焦元素范围 默认document
 * @param {string[]} [querySelects=[
 *     'a',
 *     'input',
 *     'button',
 *     'textarea',
 *     'select',
 *     '[tabindex]:not([tabindex="-1"])',
 *   ]] 可聚焦元素选择器
 * @param {() => void} [callback] 最后一个可聚焦元素回车事件回调
 * @return {*}  {{
 *   cleanup: () => void;
 * }}
 */
export function useFocusByEnter(
  target: HTMLElement | Document = document,
  querySelects: string[] = [
    'a',
    'input',
    'button',
    'textarea',
    'select',
    '[tabindex]:not([tabindex="-1"])',
  ],
  callback?: () => void,
): {
  cleanup: () => void;
} {
  const querySelector = querySelects.join(',');
  const listener = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') {
      // 阻止默认行为
      event.preventDefault();
      const currentElement = document.activeElement as HTMLElement;
      // 获取所有可聚焦元素
      const focusableElements = Array.from(
        target.querySelectorAll(querySelector),
      ) as HTMLElement[];
      const currentIndex = focusableElements.indexOf(currentElement);
      const nextElement = focusableElements[currentIndex + 1];
      if (nextElement) {
        // 聚焦到下一个元素
        nextElement.focus();
      } else {
        callback?.();
      }
    }
  };
  const cleanup = listenJSEvent(window, 'keydown', listener, {
    capture: true,
  });
  return { cleanup };
}
