import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import { GanttControl } from './gantt';
import { GanttProvider } from './gantt.provider';

export const IBizGanttControl = withInstall(GanttControl, function (v: App) {
  v.component(GanttControl.name, GanttControl);
  registerControlProvider(ControlType.GANTT, () => new GanttProvider());
});

export default IBizGanttControl;
