import { App } from 'vue';
import { registerViewProvider, ViewType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { SubAppRefViewProvider } from './sub-app-ref-view.provider';
import { SubAppRefView } from './sub-app-ref-view';

export const IBizSubAppRefView = withInstall(SubAppRefView, function (v: App) {
  v.component(SubAppRefView.name, SubAppRefView);
  registerViewProvider(
    ViewType.DE_SUB_APP_REF_VIEW,
    () => new SubAppRefViewProvider(),
  );
});
