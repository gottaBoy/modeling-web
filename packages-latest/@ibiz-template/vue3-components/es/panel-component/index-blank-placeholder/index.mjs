import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { IndexBlankPlaceholder } from './index-blank-placeholder.mjs';
import { IndexBlankPlaceholderProvider } from './index-blank-placeholder.provider.mjs';
export { IndexBlankPlaceholderController } from './index-blank-placeholder.controller.mjs';

"use strict";
const IBizIndexBlankPlaceholder = withInstall(
  IndexBlankPlaceholder,
  function(v) {
    v.component(IndexBlankPlaceholder.name, IndexBlankPlaceholder);
    registerPanelItemProvider(
      "CONTAINER_INDEX_BLANK_PLACEHOLDER",
      () => new IndexBlankPlaceholderProvider()
    );
  }
);

export { IBizIndexBlankPlaceholder, IBizIndexBlankPlaceholder as default };
