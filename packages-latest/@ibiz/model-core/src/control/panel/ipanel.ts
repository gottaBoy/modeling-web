import { IControl } from '../icontrol';
import { IControlAction } from '../icontrol-action';
import { IControlContainer } from '../icontrol-container';
import { ILayoutContainer } from '../layout/ilayout-container';
import { IPanelItem } from './ipanel-item';

/**
 *
 * 面板部件模型对象基础接口
 * @export
 * @interface IPanel
 */
export interface IPanel extends IControl, IControlContainer, ILayoutContainer {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 面板数据模式
   * @description 值模式 [面板数据模式] {0：不获取（使用传入数据）、 1：未传入时获取、 2：始终获取、 3：绑定到应用全局变量、 4：绑定到路由视图会话变量、 5：绑定到当前视图会话变量 }
   * @type {( number | 0 | 1 | 2 | 3 | 4 | 5)}
   * @default 0
   * 来源  getDataMode
   */
  dataMode?: number | 0 | 1 | 2 | 3 | 4 | 5;

  /**
   * 数据对象名称
   * @type {string}
   * 来源  getDataName
   */
  dataName?: string;

  /**
   * 面板数据刷新间隔
   * @type {number}
   * @default -1
   * 来源  getDataTimer
   */
  dataTimer?: number;

  /**
   * 获取数据行为
   *
   * @type {IControlAction}
   * 来源  getGetPSControlAction
   */
  getControlAction?: IControlAction;

  /**
   * 布局模式
   * @description 值模式 [面板布局模型] {TABLE：表格、 TABLE_12COL：栅格布局（12列）、 TABLE_24COL：栅格布局（24列）、 FLEX：Flex布局、 BORDER：边缘布局、 ABSOLUTE：绝对布局 }
   * @type {( string | 'TABLE' | 'TABLE_12COL' | 'TABLE_24COL' | 'FLEX' | 'BORDER' | 'ABSOLUTE')}
   * 来源  getLayoutMode
   */
  layoutMode?:
    | string
    | 'TABLE'
    | 'TABLE_12COL'
    | 'TABLE_24COL'
    | 'FLEX'
    | 'BORDER'
    | 'ABSOLUTE';

  /**
   * 面板样式
   * @type {string}
   * 来源  getPanelStyle
   */
  panelStyle?: string;

  /**
   * 面板宽度
   * @type {number}
   * @default 0.0
   * 来源  getPanelWidth
   */
  panelWidth?: number;

  /**
   * 面板顶级成员集合
   *
   * @type {IPanelItem[]}
   * 来源  getRootPSPanelItems
   */
  rootPanelItems?: IPanelItem[];

  /**
   * 布局面板
   * @type {boolean}
   * @default false
   * 来源  isLayoutPanel
   */
  layoutPanel?: boolean;

  /**
   * 移动端面板
   * @type {boolean}
   * @default false
   * 来源  isMobilePanel
   */
  mobilePanel?: boolean;
}
