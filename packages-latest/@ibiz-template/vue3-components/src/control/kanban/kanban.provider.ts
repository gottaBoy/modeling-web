import { IControlProvider } from '@ibiz-template/runtime';
/**
 * 看板（kanban）部件适配器
 *
 * @export
 * @class KanbanProvider
 * @implements {IControlProvider}
 */
export class KanbanProvider implements IControlProvider {
  component: string = 'IBizKanbanControl';
}
