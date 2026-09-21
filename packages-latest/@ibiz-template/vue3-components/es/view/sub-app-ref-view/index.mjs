import { registerViewProvider, ViewType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { SubAppRefViewProvider } from './sub-app-ref-view.provider.mjs';
import { SubAppRefView } from './sub-app-ref-view.mjs';

"use strict";
const IBizSubAppRefView = withInstall(SubAppRefView, function(v) {
  v.component(SubAppRefView.name, SubAppRefView);
  registerViewProvider(
    ViewType.DE_SUB_APP_REF_VIEW,
    () => new SubAppRefViewProvider()
  );
});

export { IBizSubAppRefView };
