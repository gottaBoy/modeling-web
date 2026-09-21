import { IDEList } from './idelist';
import { IDEUIActionGroup } from '../../dataentity/uiaction/ideuiaction-group';

/**
 *
 * 实体移动端多数据部件处理器模型对象接口，移动端多数据部件会同时绑定多个界面行为组，这些行为组用途由部件解释使用用途，例如左侧滑动、右侧滑动等
 * 继承父接口类型值[MOBMDCTRL]
 * @export
 * @interface IDEMobMDCtrl
 */
export interface IDEMobMDCtrl extends IDEList {
  /**
   * 界面行为组
   *
   * @type {IDEUIActionGroup}
   * 来源  getPSDEUIActionGroup
   */
  deuiactionGroup?: IDEUIActionGroup;

  /**
   * 界面行为组2
   *
   * @type {IDEUIActionGroup}
   * 来源  getPSDEUIActionGroup2
   */
  deuiactionGroup2?: IDEUIActionGroup;

  /**
   * 界面行为组3
   *
   * @type {IDEUIActionGroup}
   * 来源  getPSDEUIActionGroup3
   */
  deuiactionGroup3?: IDEUIActionGroup;

  /**
   * 界面行为组4
   *
   * @type {IDEUIActionGroup}
   * 来源  getPSDEUIActionGroup4
   */
  deuiactionGroup4?: IDEUIActionGroup;

  /**
   * 界面行为组5
   *
   * @type {IDEUIActionGroup}
   * 来源  getPSDEUIActionGroup5
   */
  deuiactionGroup5?: IDEUIActionGroup;

  /**
   * 界面行为组6
   *
   * @type {IDEUIActionGroup}
   * 来源  getPSDEUIActionGroup6
   */
  deuiactionGroup6?: IDEUIActionGroup;
}
