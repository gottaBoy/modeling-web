import { OnClickOutsideResult } from '@ibiz-template/core';
import { Ref, ref } from 'vue';
import { useClickOutside } from '../click-outside/click-outside';
import { useEventListener } from '../event/event';

/**
 * 给指定元素添加聚焦和失焦事件
 * 点击指定元素时会触发聚焦事件
 * 已经聚焦之后，点击指定元素外部会触发失焦事件。
 * @author lxm
 * @date 2023-05-31 08:36:04
 * @export
 * @return {*}
 */
export function useFocusAndBlur(
  focus: () => void,
  blur: () => void,
): {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentRef: Ref<any>;
  isFocus: Ref<boolean>;
  doBlur: () => void;
  pause: () => void;
  stop: () => void;
} {
  /** 添加事件的元素ref */
  const componentRef = ref();
  const isFocus = ref(false);
  let outsideFuns: OnClickOutsideResult;
  /**
   * 手动触发失焦事件
   * @author lxm
   * @date 2023-05-31 08:43:54
   */
  const doBlur = (): void => {
    if (!isFocus.value) {
      ibiz.log.debug(ibiz.i18n.t('vue3Util.use.focusBlur.noFocus'));
    }
    blur();
    outsideFuns.stop();
    isFocus.value = false;
  };

  /**
   * 暂停外部点击的监听
   * 用于某些组件操作过程中会触发外部点击的场景
   * @author lxm
   * @date 2023-05-31 08:47:53
   */
  const pause = (): void => {
    if (outsideFuns) {
      outsideFuns.pause();
    }
  };

  /**
   * 暂停外部点击的监听
   * 用于某些组件操作过程中会触发外部点击的场景
   * @author lxm
   * @date 2023-05-31 08:47:53
   */
  const stop = (): void => {
    if (outsideFuns) {
      outsideFuns.stop();
    }
  };

  useEventListener(
    componentRef,
    'click',
    _evt => {
      if (!isFocus.value) {
        outsideFuns = useClickOutside(componentRef, () => {
          doBlur();
        });
        isFocus.value = true;
        focus();
      }
    },
    { capture: true }, // 捕获防止内部ui拦截点击事件
  );
  return { componentRef, isFocus, doBlur, pause, stop };
}
