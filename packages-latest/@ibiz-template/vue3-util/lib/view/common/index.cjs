'use strict';

var runtime = require('@ibiz-template/runtime');
require('../../util/index.cjs');
var view_provider = require('./view.provider.cjs');
var view = require('./view.cjs');
var appDataUploadView_provider = require('../app-data-upload-view/app-data-upload-view.provider.cjs');
var mdCustomView_provider = require('../md-custom-view/md-custom-view.provider.cjs');
var install = require('../../util/install.cjs');

"use strict";
const IBizView = install.withInstall(view.View, function(v) {
  v.component(view.View.name, view.View);
  runtime.registerViewProvider("DEFAULT", () => new view_provider.ViewProvider());
  runtime.registerViewProvider(
    "APPDATAUPLOADVIEW",
    () => new appDataUploadView_provider.AppDataUploadViewProvider()
  );
  runtime.registerViewProvider("DEMDCUSTOMVIEW", () => new mdCustomView_provider.MDCustomViewProvider());
});

exports.IBizView = IBizView;
