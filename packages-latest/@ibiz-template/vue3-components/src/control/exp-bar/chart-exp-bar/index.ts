import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { ChartExpBarControl } from './chart-exp-bar';
import { ChartExpBarProvider } from './chart-exp-bar.provider';

export const IBizChartExpBarControl = withInstall(
  ChartExpBarControl,
  function (v: App) {
    v.component(ChartExpBarControl.name, ChartExpBarControl);
    registerControlProvider(
      ControlType.CHART_EXPBAR,
      () => new ChartExpBarProvider(),
    );
  },
);

export default IBizChartExpBarControl;
