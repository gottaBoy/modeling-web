import { withInstall } from '@ibiz-template/vue3-util';
import { BIReport } from './bi-report.mjs';

"use strict";
const IBizBIReport = withInstall(BIReport, (v) => {
  v.component(BIReport.name, BIReport);
});

export { IBizBIReport, IBizBIReport as default };
