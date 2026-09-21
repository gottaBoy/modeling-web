import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { PanelIndexViewSearch } from './panel-index-view-search.mjs';
import { PanelIndexViewSearchProvider } from './panel-index-view-search.provider.mjs';

"use strict";
const IBizPanelIndexViewSearch = withInstall(
  PanelIndexViewSearch,
  function(v) {
    v.component(PanelIndexViewSearch.name, PanelIndexViewSearch);
    registerPanelItemProvider(
      "RAWITEM_INDEX_VIEW_SEARCH",
      () => new PanelIndexViewSearchProvider()
    );
  }
);

export { IBizPanelIndexViewSearch, IBizPanelIndexViewSearch as default };
