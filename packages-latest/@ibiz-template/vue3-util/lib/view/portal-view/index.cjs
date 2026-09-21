'use strict';

var runtime = require('@ibiz-template/runtime');
require('../../util/index.cjs');
var portalView_provider = require('./portal-view.provider.cjs');
var portalView = require('./portal-view.cjs');
var install = require('../../util/install.cjs');

"use strict";
const IBizPortalView = install.withInstall(portalView.PortalView, function(v) {
  v.component(portalView.PortalView.name, portalView.PortalView);
  runtime.registerViewProvider(
    runtime.ViewType.APP_PORTAL_VIEW,
    () => new portalView_provider.PortalViewProvider()
  );
  runtime.registerViewProvider(runtime.ViewType.DE_PORTAL_VIEW, () => new portalView_provider.PortalViewProvider());
  runtime.registerViewProvider(
    runtime.ViewType.DE_PORTAL_VIEW9,
    () => new portalView_provider.PortalViewProvider()
  );
});

exports.IBizPortalView = IBizPortalView;
