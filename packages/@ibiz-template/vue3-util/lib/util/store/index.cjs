'use strict';

var pinia = require('pinia');
var appStore = require('./app-store/app-store.cjs');
var uiStore = require('./ui-store/ui-store.cjs');

"use strict";
const piniaInstance = pinia.createPinia();

exports.useAppStore = appStore.useAppStore;
exports.useUIStore = uiStore.useUIStore;
exports.piniaInstance = piniaInstance;
