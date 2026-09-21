/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { listenJSEvent } from '@ibiz-template/core';
import { ViewController } from '@ibiz-template/runtime';
import { onMounted, onUnmounted } from 'vue';

/**
 * 监听视图操作
 *
 * @author tony001
 * @date 2025-01-17 18:01:18
 * @export
 * @param {ViewController} view
 */
export function useViewOperation(view: ViewController): void {
  let listenJSEventFuncs: Function[] = [];

  onMounted(() => {
    const viewElement = document.getElementById(view.id);
    const listenJSEventNames = ['keydown', 'click'];
    if (!viewElement) return;
    // 冒泡阶段在目标源可能会阻止冒泡，因此界面操作存在未监听到的情况，调整未捕获阶段监听
    listenJSEventFuncs = listenJSEventNames.map(eventName => {
      return listenJSEvent(
        viewElement,
        eventName,
        (event: UIEvent) => {
          view.setOperateState('MANUAL');
        },
        { once: true, capture: true },
      );
    });
  });

  // 组件销毁时，移除事件监听
  onUnmounted(() => {
    if (listenJSEventFuncs && listenJSEventFuncs.length > 0) {
      listenJSEventFuncs.forEach(listenJSEventFunc => {
        listenJSEventFunc();
      });
    }
  });
}
