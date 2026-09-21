import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { SearchFormButtons } from './searchform-buttons';
import { SearchFormButtonsProvider } from './searchform-buttons.provider';

export const IBizSearchFormButtons = withInstall(
  SearchFormButtons,
  function (v: App) {
    v.component(SearchFormButtons.name, SearchFormButtons);
    registerPanelItemProvider(
      'RAWITEM_SEARCHFORM_BUTTONS',
      () => new SearchFormButtonsProvider(),
    );
  },
);

export default IBizSearchFormButtons;
