import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { GlobalSearchProvider } from './global-search.provider.mjs';
import { GlobalSearch } from './global-search.mjs';

"use strict";
const IBizGlobalSearch = withInstall(GlobalSearch, function(v) {
  v.component(GlobalSearch.name, GlobalSearch);
  registerPanelItemProvider(
    "RAWITEM_GLOBAL_SEARCH",
    () => new GlobalSearchProvider()
  );
});

export { IBizGlobalSearch, IBizGlobalSearch as default };
