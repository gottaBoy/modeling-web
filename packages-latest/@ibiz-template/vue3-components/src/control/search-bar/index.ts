import { ControlType, registerControlProvider } from '@ibiz-template/runtime';
import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { SearchBarControl } from './search-bar';
import { SearchBarProvider } from './search-bar.provider';
import { FilterTreeControl } from './filter-tree/filter-tree';
import { FilterModeSelect } from './filter-mode-select/filter-mode-select';
import { SearchGroups } from './search-groups/search-groups';
import { QuickSearchSelect } from './quick-search-select/quick-search-select';

export const IBizSearchBarControl = withInstall(
  SearchBarControl,
  function (v: App) {
    v.component(SearchBarControl.name, SearchBarControl);
    v.component(FilterTreeControl.name, FilterTreeControl);
    v.component(FilterModeSelect.name, FilterModeSelect);
    v.component(SearchGroups.name, SearchGroups);
    v.component(QuickSearchSelect.name, QuickSearchSelect);
    registerControlProvider(
      ControlType.SEARCHBAR,
      () => new SearchBarProvider(),
    );
  },
);

export default IBizSearchBarControl;
