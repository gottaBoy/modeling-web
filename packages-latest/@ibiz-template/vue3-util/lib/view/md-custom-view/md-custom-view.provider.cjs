'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class MDCustomViewProvider {
  constructor() {
    this.component = "IBizView";
  }
  createController(model, context, params, ctx) {
    return new runtime.MDCustomViewController(model, context, params, ctx);
  }
}

exports.MDCustomViewProvider = MDCustomViewProvider;
