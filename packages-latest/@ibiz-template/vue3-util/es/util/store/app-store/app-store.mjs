import { defineStore } from 'pinia';
import { reactive } from 'vue';

"use strict";
const useAppStore = defineStore("appStore", () => {
  const appStore = reactive({});
  return { appStore };
});

export { useAppStore };
