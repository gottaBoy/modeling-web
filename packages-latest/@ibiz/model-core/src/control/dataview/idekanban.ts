import { IControlAction } from '../icontrol-action';
import { IDEDataView } from './idedata-view';

/**
 *
 * 实体看板部件模型对象接口
 * 继承父接口类型值[KANBAN]
 * @export
 * @interface IDEKanban
 */
export interface IDEKanban extends IDEDataView {
  /**
   * 更新分组行为
   *
   * @type {IControlAction}
   * 来源  getUpdateGroupPSControlAction
   */
  updateGroupControlAction?: IControlAction;
}
