import { IDEToolbarItem } from './idetoolbar-item';

/**
 *
 * 继承父接口类型值[DEUIACTION]
 * @export
 * @interface IDETBUIActionItem
 */
export interface IDETBUIActionItem extends IDEToolbarItem {
  /**
   * 行为级别
   * @description 值模式 [界面行为行为级别] {50：不常用、 100：一般操作、 200：常用操作、 250：关键操作 }
   * @type {( number | 50 | 100 | 200 | 250)}
   * @default 100
   * 来源  getActionLevel
   */
  actionLevel?: number | 50 | 100 | 200 | 250;

  /**
   * 边框样式
   * @description 值模式 [边框样式] {NONE：无边框、 SOLID：实线边框、 DOTTED：点状边框、 DASHED：虚线边框、 DOUBLE：双线边框 }
   * @type {( string | 'NONE' | 'SOLID' | 'DOTTED' | 'DASHED' | 'DOUBLE')}
   * 来源  getBorderStyle
   */
  borderStyle?: string | 'NONE' | 'SOLID' | 'DOTTED' | 'DASHED' | 'DOUBLE';

  /**
   * 按钮样式
   * @description 值模式 [按钮样式] {DEFAULT：默认、 INVERSE：反向、 PRIMARY：主要、 INFO：信息、 SUCCESS：成功、 WARNING：警告、 DANGER：危险、 STYLE2：样式2、 STYLE3：样式3、 STYLE4：样式4 }
   * @type {( string | 'DEFAULT' | 'INVERSE' | 'PRIMARY' | 'INFO' | 'SUCCESS' | 'WARNING' | 'DANGER' | 'STYLE2' | 'STYLE3' | 'STYLE4')}
   * 来源  getButtonStyle
   */
  buttonStyle?:
    | string
    | 'DEFAULT'
    | 'INVERSE'
    | 'PRIMARY'
    | 'INFO'
    | 'SUCCESS'
    | 'WARNING'
    | 'DANGER'
    | 'STYLE2'
    | 'STYLE3'
    | 'STYLE4';

  /**
   * 无权限显示模式
   * @description 值模式 [无权限按钮显示模式] {1：禁用、 2：隐藏、 6：隐藏且默认隐藏 }
   * @type {( number | 1 | 2 | 6)}
   * 来源  getNoPrivDisplayMode
   */
  noPrivDisplayMode?: number | 1 | 2 | 6;

  /**
   * 子项集合
   *
   * @type {IDEToolbarItem[]}
   * 来源  getPSDEToolbarItems
   */
  detoolbarItems?: IDEToolbarItem[];

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
