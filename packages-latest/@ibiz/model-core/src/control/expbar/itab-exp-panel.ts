import { IControl } from '../icontrol';
import { IControlContainer } from '../icontrol-container';

/**
 *
 * 分页导航部件模型对象接口
 * 继承父接口类型值[TABEXPPANEL]
 * @export
 * @interface ITabExpPanel
 */
export interface ITabExpPanel extends IControl, IControlContainer {
  /**
   * 导航面板分页集合
   *
   * @type {string[]}
   * 来源  getPSTabExpPages
   */
  tabExpPageIds?: string[];

  /**
   * 导航面板布局
   * @description 值模式 [分页视图分页栏位置] {TOP：上方（默认）、 TOP_EMBEDDED：上方（嵌入）、 TOP_DROPDOWNLIST：上方（下拉列表）、 LEFT：左侧、 BOTTOM：下方、 RIGHT：右侧、 FLOW：流布局、 FLOW_NOHEADER：流布局（无标题）、 NOHAEDER：无分页栏、 USER：用户自定义、 USER2：用户自定义2 }
   * @type {( string | 'TOP' | 'TOP_EMBEDDED' | 'TOP_DROPDOWNLIST' | 'LEFT' | 'BOTTOM' | 'RIGHT' | 'FLOW' | 'FLOW_NOHEADER' | 'NOHAEDER' | 'USER' | 'USER2')}
   * 来源  getTabLayout
   */
  tabLayout?:
    | string
    | 'TOP'
    | 'TOP_EMBEDDED'
    | 'TOP_DROPDOWNLIST'
    | 'LEFT'
    | 'BOTTOM'
    | 'RIGHT'
    | 'FLOW'
    | 'FLOW_NOHEADER'
    | 'NOHAEDER'
    | 'USER'
    | 'USER2';

  /**
   * 全局唯一标记
   * @type {string}
   * 来源  getUniqueTag
   */
  uniqueTag?: string;
}
