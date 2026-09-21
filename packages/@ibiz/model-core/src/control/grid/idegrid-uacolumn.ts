import { IDEGridColumn } from './idegrid-column';
import { IDEUIActionGroup } from '../../dataentity/uiaction/ideuiaction-group';

/**
 *
 * 继承父接口类型值[UAGRIDCOLUMN]
 * @export
 * @interface IDEGridUAColumn
 */
export interface IDEGridUAColumn extends IDEGridColumn {
  /**
   * 界面行为组
   *
   * @type {IDEUIActionGroup}
   * 来源  getPSDEUIActionGroup
   */
  deuiactionGroup?: IDEUIActionGroup;
}
