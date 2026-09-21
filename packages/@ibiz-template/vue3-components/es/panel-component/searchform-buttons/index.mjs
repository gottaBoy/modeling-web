import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { SearchFormButtons } from './searchform-buttons.mjs';
import { SearchFormButtonsProvider } from './searchform-buttons.provider.mjs';

"use strict";
const IBizSearchFormButtons = withInstall(
  SearchFormButtons,
  function(v) {
    v.component(SearchFormButtons.name, SearchFormButtons);
    registerPanelItemProvider(
      "RAWITEM_SEARCHFORM_BUTTONS",
      () => new SearchFormButtonsProvider()
    );
  }
);

export { IBizSearchFormButtons, IBizSearchFormButtons as default };
