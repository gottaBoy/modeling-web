import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import {
  IBizGridFieldColumn,
  IBizGridFieldEditColumn,
  IBizGridUAColumn,
  IBizGridGroupColumn,
  IBizGridColumnHeader,
  IBizDynamicGridFieldEditColumn,
} from '../grid-column';
import { IBizRowEditPopover } from '../row-edit-popover/row-edit-popover';
import { IBizVirtualizedTableControl } from '../virtualized-table';
import { GridControl } from './grid';
import { GridProvider } from './grid.provider';

export * from './grid-control.util';

export const IBizGridControl = withInstall(GridControl, (v: App) => {
  v.component(GridControl.name, GridControl);
  v.component(IBizRowEditPopover.name, IBizRowEditPopover);
  v.use(IBizGridFieldColumn);
  v.use(IBizGridUAColumn);
  v.use(IBizGridColumnHeader);
  v.use(IBizGridFieldEditColumn);
  v.use(IBizGridGroupColumn);
  v.use(IBizDynamicGridFieldEditColumn);
  v.use(IBizVirtualizedTableControl);
  registerControlProvider(ControlType.GRID, () => new GridProvider());
});

export default IBizGridControl;
