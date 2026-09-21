'use strict';

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var subAppRefView_provider = require('./sub-app-ref-view.provider.cjs');
var subAppRefView = require('./sub-app-ref-view.cjs');

"use strict";
const IBizSubAppRefView = vue3Util.withInstall(subAppRefView.SubAppRefView, function(v) {
  v.component(subAppRefView.SubAppRefView.name, subAppRefView.SubAppRefView);
  runtime.registerViewProvider(
    runtime.ViewType.DE_SUB_APP_REF_VIEW,
    () => new subAppRefView_provider.SubAppRefViewProvider()
  );
});

exports.IBizSubAppRefView = IBizSubAppRefView;
