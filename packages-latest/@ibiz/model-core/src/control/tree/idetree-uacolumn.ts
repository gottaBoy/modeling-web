import { IDETreeColumn } from './idetree-column';
import { IDEUIActionGroup } from '../../dataentity/uiaction/ideuiaction-group';

/**
 *
 * 实体树表格界面行为操作列模型对象接口
 * @export
 * @interface IDETreeUAColumn
 */
export interface IDETreeUAColumn extends IDETreeColumn {
  /**
   * 界面行为组
   *
   * @type {IDEUIActionGroup}
   * 来源  getPSDEUIActionGroup
   */
  deuiactionGroup?: IDEUIActionGroup;
}
