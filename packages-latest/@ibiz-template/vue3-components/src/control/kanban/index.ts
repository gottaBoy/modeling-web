import { App } from 'vue';
import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { KanbanControl } from './kanban';
import { KanbanProvider } from './kanban.provider';

export const IBizKanbanControl = withInstall(KanbanControl, function (v: App) {
  v.component(KanbanControl.name!, KanbanControl);
  registerControlProvider(ControlType.KANBAN, () => new KanbanProvider());
});

export default IBizKanbanControl;
