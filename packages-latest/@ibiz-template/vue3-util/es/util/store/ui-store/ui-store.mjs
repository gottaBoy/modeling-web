import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useZIndexStore } from './z-index.mjs';

"use strict";
const useUIStore = defineStore("uiStore", () => {
  const zIndex = useZIndexStore();
  const getTheme = () => {
    const themeTag = ibiz.util.theme.getTheme();
    return themeTag.includes("dark") ? "dark" : "light";
  };
  const UIStore = reactive({
    zIndex: zIndex.zIndex,
    theme: getTheme()
  });
  ibiz.util.theme.evt.on("onChange", () => {
    UIStore.theme = getTheme();
  });
  return { UIStore, zIndex };
});

export { useUIStore };
