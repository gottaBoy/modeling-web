import { IAppDEExplorerView } from './iapp-deexplorer-view';

/**
 *
 * 继承父接口类型值[DETABEXPVIEW,DETABEXPVIEW9]
 * @export
 * @interface IAppDETabExplorerView
 */
export interface IAppDETabExplorerView extends IAppDEExplorerView {
  /**
   * 分页部件布局模式
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
}
