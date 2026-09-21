import { registerViewProvider, ViewType } from '@ibiz-template/runtime';
import '../../util/index.mjs';
import { HtmlViewProvider } from './html-view.provider.mjs';
import { HtmlView } from './html-view.mjs';
import { withInstall } from '../../util/install.mjs';

"use strict";
const IBizHtmlView = withInstall(HtmlView, function(v) {
  v.component(HtmlView.name, HtmlView);
  registerViewProvider(ViewType.DE_HTML_VIEW, () => new HtmlViewProvider());
});

export { IBizHtmlView };
