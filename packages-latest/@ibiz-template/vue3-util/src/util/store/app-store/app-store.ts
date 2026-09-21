import { defineStore } from 'pinia';
import { reactive } from 'vue';

export interface IAppStore {}

export const useAppStore = defineStore('appStore', () => {
  const appStore = reactive<IAppStore>({});

  return { appStore };
});
