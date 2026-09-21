'use strict';

var pinia = require('pinia');
var vue = require('vue');
var zIndex = require('./z-index.cjs');

"use strict";
const useUIStore = pinia.defineStore("uiStore", () => {
  const zIndex$1 = zIndex.useZIndexStore();
  const getTheme = () => {
    const themeTag = ibiz.util.theme.getTheme();
    return themeTag.includes("dark") ? "dark" : "light";
  };
  const UIStore = vue.reactive({
    zIndex: zIndex$1.zIndex,
    theme: getTheme()
  });
  ibiz.util.theme.evt.on("onChange", () => {
    UIStore.theme = getTheme();
  });
  return { UIStore, zIndex: zIndex$1 };
});

exports.useUIStore = useUIStore;
