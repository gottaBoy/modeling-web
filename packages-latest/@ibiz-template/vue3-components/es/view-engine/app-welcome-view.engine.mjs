import { ViewEngineBase } from '@ibiz-template/runtime';

"use strict";
class AppWelcomeViewEngine extends ViewEngineBase {
  async onCreated() {
    await super.onCreated();
    ibiz.util.hiddenAppLoading();
  }
}

export { AppWelcomeViewEngine };
