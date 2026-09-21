import { registerViewProvider, ViewType } from '@ibiz-template/runtime';
import '../../util/index.mjs';
import { DeRedirectView } from './de-redirect-view.mjs';
import { DeRedirectViewProvider } from './de-redirect-view.provider.mjs';
import { withInstall } from '../../util/install.mjs';

"use strict";
const IBizDeRedirectView = withInstall(
  DeRedirectView,
  function(v) {
    v.component(DeRedirectView.name, DeRedirectView);
    const deRedirectViewProvider = new DeRedirectViewProvider();
    registerViewProvider(
      ViewType.DE_REDIRECT_VIEW,
      () => deRedirectViewProvider
    );
  }
);

export { IBizDeRedirectView };
