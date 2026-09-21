import { IAppDEView } from './iapp-deview';
import { IAppDataRelationView } from './iapp-data-relation-view';

/**
 *
 * 继承父接口类型值[DEINDEXVIEW]
 * @export
 * @interface IAppDEIndexView
 */
export interface IAppDEIndexView extends IAppDEView, IAppDataRelationView {
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
}
