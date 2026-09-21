/* eslint-disable no-restricted-syntax */
import { defineStore } from 'pinia';
import { reactive, Ref } from 'vue';
import { useZIndexStore } from './z-index';

export interface IUIState {
  /**
   * ui层级
   *
   * @author lxm
   * @date 2022-08-18 21:08:48
   * @type {number}
   */
  zIndex: Ref<number>;

  theme: string;
}

export const useUIStore = defineStore('uiStore', () => {
  const zIndex = useZIndexStore();

  const getTheme = () => {
    const themeTag = ibiz.util.theme.getTheme();
    return themeTag.includes('dark') ? 'dark' : 'light';
  };

  const UIStore = reactive<IUIState>({
    zIndex: zIndex.zIndex,
    theme: getTheme(),
  });

  ibiz.util.theme.evt.on('onChange', () => {
    UIStore.theme = getTheme();
  });

  return { UIStore, zIndex };
});
