'use strict';

var runtime = require('@ibiz-template/runtime');
require('../../util/index.cjs');
var deRedirectView = require('./de-redirect-view.cjs');
var deRedirectView_provider = require('./de-redirect-view.provider.cjs');
var install = require('../../util/install.cjs');

"use strict";
const IBizDeRedirectView = install.withInstall(
  deRedirectView.DeRedirectView,
  function(v) {
    v.component(deRedirectView.DeRedirectView.name, deRedirectView.DeRedirectView);
    const deRedirectViewProvider = new deRedirectView_provider.DeRedirectViewProvider();
    runtime.registerViewProvider(
      runtime.ViewType.DE_REDIRECT_VIEW,
      () => deRedirectViewProvider
    );
  }
);

exports.IBizDeRedirectView = IBizDeRedirectView;
