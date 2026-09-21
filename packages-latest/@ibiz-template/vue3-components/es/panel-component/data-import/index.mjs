import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { DataImportShell } from './data-import-shell.mjs';
import { DataImportProvider } from './data-import.provider.mjs';

"use strict";
const IBizDataImport = withInstall(DataImportShell, function(v) {
  v.component(DataImportShell.name, DataImportShell);
  registerPanelItemProvider(
    "RAWITEM_DATA_IMPORT",
    () => new DataImportProvider()
  );
});

export { IBizDataImport, IBizDataImport as default };
