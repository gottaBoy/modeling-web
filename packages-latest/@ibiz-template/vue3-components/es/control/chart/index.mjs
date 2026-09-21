import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { ControlLoadingPlaceholder } from '@ibiz-template/vue3-util';
import { defineAsyncComponent } from 'vue';
import { ChartProvider } from './chart.provider.mjs';

"use strict";
const IBizChartControl = {
  install(v) {
    v.component(
      "IBizChartControl",
      defineAsyncComponent({
        loader: () => import('./chart.mjs'),
        loadingComponent: ControlLoadingPlaceholder,
        delay: 0
      })
    );
    registerControlProvider(ControlType.CHART, () => new ChartProvider());
  }
};

export { IBizChartControl, IBizChartControl as default };
