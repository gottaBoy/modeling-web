'use strict';

var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var wfStepTraceView_provider = require('./wf-step-trace-view.provider.cjs');
var wfStepTraceView = require('./wf-step-trace-view.cjs');

"use strict";
const IBizWFStepTraceView = vue3Util.withInstall(
  wfStepTraceView.WFStepTraceView,
  function(v) {
    v.component(wfStepTraceView.WFStepTraceView.name, wfStepTraceView.WFStepTraceView);
    runtime.registerViewProvider(
      runtime.ViewType.APP_WF_STEP_TRACE_VIEW,
      () => new wfStepTraceView_provider.WFStepTraceViewProvider()
    );
  }
);

exports.IBizWFStepTraceView = IBizWFStepTraceView;
