import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { PanelIndexViewSearch } from './panel-index-view-search';
import { PanelIndexViewSearchProvider } from './panel-index-view-search.provider';

export const IBizPanelIndexViewSearch = withInstall(
  PanelIndexViewSearch,
  function (v: App) {
    v.component(PanelIndexViewSearch.name, PanelIndexViewSearch);
    registerPanelItemProvider(
      'RAWITEM_INDEX_VIEW_SEARCH',
      () => new PanelIndexViewSearchProvider(),
    );
  },
);

export default IBizPanelIndexViewSearch;
