'use strict';

var runtime = require('@ibiz-template/runtime');
require('../../util/index.cjs');
var htmlView_provider = require('./html-view.provider.cjs');
var htmlView = require('./html-view.cjs');
var install = require('../../util/install.cjs');

"use strict";
const IBizHtmlView = install.withInstall(htmlView.HtmlView, function(v) {
  v.component(htmlView.HtmlView.name, htmlView.HtmlView);
  runtime.registerViewProvider(runtime.ViewType.DE_HTML_VIEW, () => new htmlView_provider.HtmlViewProvider());
});

exports.IBizHtmlView = IBizHtmlView;
