import { App } from 'vue';
import { withInstall } from '@ibiz-template/vue3-util';
import { GridColumnHeader } from './grid-column-header';

export const IBizGridColumnHeader = withInstall(
  GridColumnHeader,
  function (v: App) {
    v.component(GridColumnHeader.name!, GridColumnHeader);
  },
);

export default IBizGridColumnHeader;
