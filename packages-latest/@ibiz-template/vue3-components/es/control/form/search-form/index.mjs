import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { SearchFormControl } from './search-form.mjs';
import { SearchFormProvider } from './search-form.provider.mjs';

"use strict";
const IBizSearchFormControl = withInstall(
  SearchFormControl,
  function(v) {
    v.component(SearchFormControl.name, SearchFormControl);
    registerControlProvider(
      ControlType.SEARCHFORM,
      () => new SearchFormProvider()
    );
  }
);

export { IBizSearchFormControl, IBizSearchFormControl as default };
