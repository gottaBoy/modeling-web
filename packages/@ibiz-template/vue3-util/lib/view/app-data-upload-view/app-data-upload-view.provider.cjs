'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class AppDataUploadViewProvider {
  constructor() {
    this.component = "IBizView";
  }
  createController(model, context, params, ctx) {
    return new runtime.AppDataUploadViewController(model, context, params, ctx);
  }
}

exports.AppDataUploadViewProvider = AppDataUploadViewProvider;
