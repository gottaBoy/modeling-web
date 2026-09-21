import { withInstall } from '@ibiz-template/vue3-util';
import { registerControlProvider } from '@ibiz-template/runtime';
import { VirtualizedTableControl } from './virtualized-table';
import { VirtualizedTableProvider } from './virtualized-table.provider';

export const IBizVirtualizedTableControl = withInstall(
  VirtualizedTableControl,
  v => {
    v.component(VirtualizedTableControl.name!, VirtualizedTableControl);
    registerControlProvider(
      'GRID_VIRTUALIZED_TABLE',
      () => new VirtualizedTableProvider(),
    );
  },
);

export default IBizVirtualizedTableControl;
