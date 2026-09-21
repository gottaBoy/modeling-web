import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { GanttControl } from './gantt.mjs';
import { GanttProvider } from './gantt.provider.mjs';

"use strict";
const IBizGanttControl = withInstall(GanttControl, function(v) {
  v.component(GanttControl.name, GanttControl);
  registerControlProvider(ControlType.GANTT, () => new GanttProvider());
});

export { IBizGanttControl, IBizGanttControl as default };
