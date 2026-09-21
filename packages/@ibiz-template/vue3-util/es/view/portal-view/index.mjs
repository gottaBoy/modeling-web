import { registerViewProvider, ViewType } from '@ibiz-template/runtime';
import '../../util/index.mjs';
import { PortalViewProvider } from './portal-view.provider.mjs';
import { PortalView } from './portal-view.mjs';
import { withInstall } from '../../util/install.mjs';

"use strict";
const IBizPortalView = withInstall(PortalView, function(v) {
  v.component(PortalView.name, PortalView);
  registerViewProvider(
    ViewType.APP_PORTAL_VIEW,
    () => new PortalViewProvider()
  );
  registerViewProvider(ViewType.DE_PORTAL_VIEW, () => new PortalViewProvider());
  registerViewProvider(
    ViewType.DE_PORTAL_VIEW9,
    () => new PortalViewProvider()
  );
});

export { IBizPortalView };
