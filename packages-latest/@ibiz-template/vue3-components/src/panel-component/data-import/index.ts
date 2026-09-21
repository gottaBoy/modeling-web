import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { DataImportShell } from './data-import-shell';
import { DataImportProvider } from './data-import.provider';

export const IBizDataImport = withInstall(DataImportShell, function (v: App) {
  v.component(DataImportShell.name, DataImportShell);
  registerPanelItemProvider(
    'RAWITEM_DATA_IMPORT',
    () => new DataImportProvider(),
  );
});

export default IBizDataImport;
