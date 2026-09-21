'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class AppWelcomeViewEngine extends runtime.ViewEngineBase {
  async onCreated() {
    await super.onCreated();
    ibiz.util.hiddenAppLoading();
  }
}

exports.AppWelcomeViewEngine = AppWelcomeViewEngine;
