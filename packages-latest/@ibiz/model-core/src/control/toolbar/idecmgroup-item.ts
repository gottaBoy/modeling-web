import { IDEContextMenuItem } from './idecontext-menu-item';

/**
 *
 * 上下文菜单分组模型对象接口
 * 继承父接口类型值[ITEMS]
 * @export
 * @interface IDECMGroupItem
 */
export interface IDECMGroupItem extends IDEContextMenuItem {
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
   * 子项集合
   *
   * @type {IDEContextMenuItem[]}
   * 来源  getPSDEContextMenuItems
   */
  decontextMenuItems?: IDEContextMenuItem[];
}
