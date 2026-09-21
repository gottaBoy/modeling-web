'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class AppStartViewEngine extends runtime.ViewEngineBase {
  async onCreated() {
    await super.onCreated();
    ibiz.util.hiddenAppLoading();
  }
}

exports.AppStartViewEngine = AppStartViewEngine;
