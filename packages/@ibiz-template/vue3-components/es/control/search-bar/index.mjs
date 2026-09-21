import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { SearchBarControl } from './search-bar.mjs';
import { SearchBarProvider } from './search-bar.provider.mjs';
import { FilterTreeControl } from './filter-tree/filter-tree.mjs';
import { FilterModeSelect } from './filter-mode-select/filter-mode-select.mjs';
import { SearchGroups } from './search-groups/search-groups.mjs';
import { QuickSearchSelect } from './quick-search-select/quick-search-select.mjs';

"use strict";
const IBizSearchBarControl = withInstall(
  SearchBarControl,
  function(v) {
    v.component(SearchBarControl.name, SearchBarControl);
    v.component(FilterTreeControl.name, FilterTreeControl);
    v.component(FilterModeSelect.name, FilterModeSelect);
    v.component(SearchGroups.name, SearchGroups);
    v.component(QuickSearchSelect.name, QuickSearchSelect);
    registerControlProvider(
      ControlType.SEARCHBAR,
      () => new SearchBarProvider()
    );
  }
);

export { IBizSearchBarControl, IBizSearchBarControl as default };
