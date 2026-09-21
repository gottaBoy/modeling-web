import { IAppDEView } from './iapp-deview';
import { IAppExplorerView } from './iapp-explorer-view';

/**
 *
 * 应用实体导航视图视图模型基础对象接口
 * @export
 * @interface IAppDEExplorerView
 */
export interface IAppDEExplorerView extends IAppExplorerView, IAppDEView {
  /**
   * 打开数据模式
   * @description 值模式 [编辑视图标记打开数据模式] {OPENDATA：登记打开数据、 EDITDATA：登记更新数据、 DISPLAYOPPERSON：显示操作人员、 NOTICERELOAD：提示刷新数据 }
   * @type {( string | 'OPENDATA' | 'EDITDATA' | 'DISPLAYOPPERSON' | 'NOTICERELOAD')}
   * 来源  getMarkOpenDataMode
   */
  markOpenDataMode?:
    | string
    | 'OPENDATA'
    | 'EDITDATA'
    | 'DISPLAYOPPERSON'
    | 'NOTICERELOAD';

  /**
   * 默认加载数据
   * @type {boolean}
   * 来源  isLoadDefault
   */
  loadDefault?: boolean;

  /**
   * 显示信息栏
   * @type {boolean}
   * 来源  isShowDataInfoBar
   */
  showDataInfoBar?: boolean;
}
