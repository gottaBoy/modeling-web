import { IAppDEView } from './iapp-deview';
import { IAppDEXDataView } from './iapp-dexdata-view';
import { IAppDataRelationView } from './iapp-data-relation-view';

/**
 *
 * 继承父接口类型值[DEOPTVIEW,DEEDITVIEW,DEEDITVIEW2,DEEDITVIEW3,DEEDITVIEW4]
 * @export
 * @interface IAppDEEditView
 */
export interface IAppDEEditView
  extends IAppDEView,
    IAppDataRelationView,
    IAppDEXDataView {
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
   * 内置多表单模式
   * @description 值模式 [编辑视图多表单模式] {0：无、 1：数据类型多表单、 2：主状态多表单 }
   * @type {( number | 0 | 1 | 2)}
   * @default 0
   * 来源  getMultiFormMode
   */
  multiFormMode?: number | 0 | 1 | 2;

  /**
   * 启用脏检查
   * @type {boolean}
   * @default true
   * 来源  isEnableDirtyChecking
   */
  enableDirtyChecking?: boolean;

  /**
   * 隐藏编辑表单
   * @type {boolean}
   * @default false
   * 来源  isHideEditForm
   */
  hideEditForm?: boolean;

  /**
   * 手动附加表单
   * @type {boolean}
   * @default false
   * 来源  isManualAppendForms
   */
  manualAppendForms?: boolean;

  /**
   * 显示信息栏
   * @type {boolean}
   * 来源  isShowDataInfoBar
   */
  showDataInfoBar?: boolean;
}
