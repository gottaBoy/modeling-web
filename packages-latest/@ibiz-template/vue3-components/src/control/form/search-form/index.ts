import { ControlType, registerControlProvider } from '@ibiz-template/runtime';
import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { SearchFormControl } from './search-form';
import { SearchFormProvider } from './search-form.provider';

export const IBizSearchFormControl = withInstall(
  SearchFormControl,
  function (v: App) {
    v.component(SearchFormControl.name, SearchFormControl);
    registerControlProvider(
      ControlType.SEARCHFORM,
      () => new SearchFormProvider(),
    );
  },
);

export default IBizSearchFormControl;
