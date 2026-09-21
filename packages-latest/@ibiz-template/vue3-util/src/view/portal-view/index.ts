import { App } from 'vue';
import { registerViewProvider, ViewType } from '@ibiz-template/runtime';
import { withInstall } from '../../util';
import { PortalViewProvider } from './portal-view.provider';
import { PortalView } from './portal-view';

export const IBizPortalView = withInstall(PortalView, function (v: App) {
  v.component(PortalView.name!, PortalView);
  registerViewProvider(
    ViewType.APP_PORTAL_VIEW,
    () => new PortalViewProvider(),
  );
  registerViewProvider(ViewType.DE_PORTAL_VIEW, () => new PortalViewProvider());
  registerViewProvider(
    ViewType.DE_PORTAL_VIEW9,
    () => new PortalViewProvider(),
  );
});
