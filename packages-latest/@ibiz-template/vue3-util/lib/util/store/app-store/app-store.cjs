'use strict';

var pinia = require('pinia');
var vue = require('vue');

"use strict";
const useAppStore = pinia.defineStore("appStore", () => {
  const appStore = vue.reactive({});
  return { appStore };
});

exports.useAppStore = useAppStore;
