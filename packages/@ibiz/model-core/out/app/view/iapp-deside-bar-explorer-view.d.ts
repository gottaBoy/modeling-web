import { IAppDEExplorerView } from './iapp-deexplorer-view';
/**
 *
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
