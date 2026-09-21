import { IDEContextMenuItem } from './idecontext-menu-item';

/**
 *
 * 上下文界面行为菜单项模型对象接口
 * 继承父接口类型值[DEUIACTION]
 * @export
 * @interface IDECMUIActionItem
 */
export interface IDECMUIActionItem extends IDEContextMenuItem {
  /**
   * 行为级别
   * @description 值模式 [界面行为行为级别] {50：不常用、 100：一般操作、 200：常用操作、 250：关键操作 }
   * @type {( number | 50 | 100 | 200 | 250)}
   * @default 100
   * 来源  getActionLevel
   */
  actionLevel?: number | 50 | 100 | 200 | 250;

  /**
   * 界面行为对象
   *
   * @type {string}
   * 来源  getPSUIAction
   */
  uiactionId?: string;

  /**
   * 界面行为操作目标
   * @description 值模式 [界面行为操作目标] {SINGLEDATA：单项数据、 SINGLEKEY：单项数据（主键）、 MULTIDATA：多项数据、 MULTIKEY：多项数据（主键）、 NONE：无数据 }
   * @type {( string | 'SINGLEDATA' | 'SINGLEKEY' | 'MULTIDATA' | 'MULTIKEY' | 'NONE')}
   * 来源  getUIActionTarget
   */
  uiactionTarget?:
    | string
    | 'SINGLEDATA'
    | 'SINGLEKEY'
    | 'MULTIDATA'
    | 'MULTIKEY'
    | 'NONE';

  /**
   * 启用点击切换模式
   * @type {boolean}
   * @default false
   * 来源  isEnableToggleMode
   */
  enableToggleMode?: boolean;

  /**
   * 是否隐藏
   * @type {boolean}
   * @default false
   * 来源  isHiddenItem
   */
  hiddenItem?: boolean;
}
