import { registerControlProvider, ControlType } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { KanbanControl } from './kanban.mjs';
import { KanbanProvider } from './kanban.provider.mjs';

"use strict";
const IBizKanbanControl = withInstall(KanbanControl, function(v) {
  v.component(KanbanControl.name, KanbanControl);
  registerControlProvider(ControlType.KANBAN, () => new KanbanProvider());
});

export { IBizKanbanControl, IBizKanbanControl as default };
