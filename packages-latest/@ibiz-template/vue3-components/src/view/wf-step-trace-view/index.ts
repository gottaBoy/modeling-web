import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { registerViewProvider, ViewType } from '@ibiz-template/runtime';
import { WFStepTraceViewProvider } from './wf-step-trace-view.provider';
import { WFStepTraceView } from './wf-step-trace-view';

export const IBizWFStepTraceView = withInstall(
  WFStepTraceView,
  function (v: App) {
    v.component(WFStepTraceView.name, WFStepTraceView);
    registerViewProvider(
      ViewType.APP_WF_STEP_TRACE_VIEW,
      () => new WFStepTraceViewProvider(),
    );
  },
);
