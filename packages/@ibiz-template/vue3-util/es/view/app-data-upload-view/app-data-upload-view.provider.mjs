import { AppDataUploadViewController } from '@ibiz-template/runtime';

"use strict";
class AppDataUploadViewProvider {
  constructor() {
    this.component = "IBizView";
  }
  createController(model, context, params, ctx) {
    return new AppDataUploadViewController(model, context, params, ctx);
  }
}

export { AppDataUploadViewProvider };
