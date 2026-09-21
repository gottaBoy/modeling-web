import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { ToolbarControl } from './toolbar.mjs';
import { IBizExportExcel } from './export-excel/export-excel.mjs';
import { IBizShortCutButton } from './short-cut-button/short-cut-button.mjs';
import { ToolbarProvider } from './toolbar.provider.mjs';

"use strict";
const IBizToolbarControl = withInstall(
  ToolbarControl,
  function(v) {
    v.component(ToolbarControl.name, ToolbarControl);
    v.component(IBizExportExcel.name, IBizExportExcel);
    v.component(IBizShortCutButton.name, IBizShortCutButton);
    registerControlProvider(ControlType.TOOLBAR, () => new ToolbarProvider());
  }
);

export { IBizToolbarControl, IBizToolbarControl as default };
