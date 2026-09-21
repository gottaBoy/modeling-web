import { App } from 'vue';
import { registerViewProvider, ViewType } from '@ibiz-template/runtime';
import { withInstall } from '../../util';
import { HtmlViewProvider } from './html-view.provider';
import { HtmlView } from './html-view';

export const IBizHtmlView = withInstall(HtmlView, function (v: App) {
  v.component(HtmlView.name!, HtmlView);
  registerViewProvider(ViewType.DE_HTML_VIEW, () => new HtmlViewProvider());
});
