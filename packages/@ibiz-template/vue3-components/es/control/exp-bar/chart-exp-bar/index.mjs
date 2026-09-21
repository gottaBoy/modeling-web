import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { ChartExpBarControl } from './chart-exp-bar.mjs';
import { ChartExpBarProvider } from './chart-exp-bar.provider.mjs';

"use strict";
const IBizChartExpBarControl = withInstall(
  ChartExpBarControl,
  function(v) {
    v.component(ChartExpBarControl.name, ChartExpBarControl);
    registerControlProvider(
      ControlType.CHART_EXPBAR,
      () => new ChartExpBarProvider()
    );
  }
);

export { IBizChartExpBarControl, IBizChartExpBarControl as default };
