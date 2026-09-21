import { IDETreeColumn } from './idetree-column';
import { IDEUIActionGroup } from '../../dataentity/uiaction/ideuiaction-group';

/**
 *
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
