import { ViewEngineBase } from '@ibiz-template/runtime';

"use strict";
class AppStartViewEngine extends ViewEngineBase {
  async onCreated() {
    await super.onCreated();
    ibiz.util.hiddenAppLoading();
  }
}

export { AppStartViewEngine };
