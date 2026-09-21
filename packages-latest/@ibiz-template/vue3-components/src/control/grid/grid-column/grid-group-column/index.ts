import { registerGridColumnProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import GridGroupColumn from './grid-group-column';
import { GridGroupColumnProvider } from './grid-group-column.provider';

export const IBizGridGroupColumn = withInstall(GridGroupColumn, () => {
  registerGridColumnProvider(
    'GROUPGRIDCOLUMN',
    () => new GridGroupColumnProvider(),
  );
});

export default IBizGridGroupColumn;
