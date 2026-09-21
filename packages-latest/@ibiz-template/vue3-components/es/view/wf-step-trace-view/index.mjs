import { withInstall } from '@ibiz-template/vue3-util';
import { registerViewProvider, ViewType } from '@ibiz-template/runtime';
import { WFStepTraceViewProvider } from './wf-step-trace-view.provider.mjs';
import { WFStepTraceView } from './wf-step-trace-view.mjs';

"use strict";
const IBizWFStepTraceView = withInstall(
  WFStepTraceView,
  function(v) {
    v.component(WFStepTraceView.name, WFStepTraceView);
    registerViewProvider(
      ViewType.APP_WF_STEP_TRACE_VIEW,
      () => new WFStepTraceViewProvider()
    );
  }
);

export { IBizWFStepTraceView };
