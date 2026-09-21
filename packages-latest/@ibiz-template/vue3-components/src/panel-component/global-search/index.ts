import { App } from 'vue';
import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { GlobalSearchProvider } from './global-search.provider';
import { GlobalSearch } from './global-search';

export const IBizGlobalSearch = withInstall(GlobalSearch, function (v: App) {
  v.component(GlobalSearch.name!, GlobalSearch);
  registerPanelItemProvider(
    'RAWITEM_GLOBAL_SEARCH',
    () => new GlobalSearchProvider(),
  );
});

export default IBizGlobalSearch;
