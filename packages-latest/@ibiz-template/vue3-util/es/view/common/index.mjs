import { registerViewProvider } from '@ibiz-template/runtime';
import '../../util/index.mjs';
import { ViewProvider } from './view.provider.mjs';
import { View } from './view.mjs';
import { AppDataUploadViewProvider } from '../app-data-upload-view/app-data-upload-view.provider.mjs';
import { MDCustomViewProvider } from '../md-custom-view/md-custom-view.provider.mjs';
import { withInstall } from '../../util/install.mjs';

"use strict";
const IBizView = withInstall(View, function(v) {
  v.component(View.name, View);
  registerViewProvider("DEFAULT", () => new ViewProvider());
  registerViewProvider(
    "APPDATAUPLOADVIEW",
    () => new AppDataUploadViewProvider()
  );
  registerViewProvider("DEMDCUSTOMVIEW", () => new MDCustomViewProvider());
});

export { IBizView };
