import { MDCustomViewController } from '@ibiz-template/runtime';

"use strict";
class MDCustomViewProvider {
  constructor() {
    this.component = "IBizView";
  }
  createController(model, context, params, ctx) {
    return new MDCustomViewController(model, context, params, ctx);
  }
}

export { MDCustomViewProvider };
