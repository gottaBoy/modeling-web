import { IAppDEExplorerView } from './iapp-deexplorer-view';

/**
 *
 * 应用实体边栏导航视图视图模型基础对象接口，导航部件以边栏形式呈现，支持定义边栏的放置位置
 * @export
 * @interface IAppDESideBarExplorerView
 */
export interface IAppDESideBarExplorerView extends IAppDEExplorerView {
  /**
   * 导航边栏位置
   * @description 值模式 [导航栏位置] {LEFT：左侧（默认）、 TOP：上方 }
   * @type {( string | 'LEFT' | 'TOP')}
   * 来源  getSideBarLayout
   */
  sideBarLayout?: string | 'LEFT' | 'TOP';
}
