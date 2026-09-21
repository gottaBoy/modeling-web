import { IDETreeNodeColumn } from './idetree-node-column';
import { IDEUIActionGroup } from '../../dataentity/uiaction/ideuiaction-group';

/**
 *
 * 继承父接口类型值[UAGRIDCOLUMN]
 * @export
 * @interface IDETreeNodeUAColumn
 */
export interface IDETreeNodeUAColumn extends IDETreeNodeColumn {
  /**
   * 界面行为组
   *
   * @type {IDEUIActionGroup}
   * 来源  getPSDEUIActionGroup
   */
  deuiactionGroup?: IDEUIActionGroup;
}
