import { IControlAction } from '../icontrol-action';
import { ISDAjaxControl } from '../isdajax-control';
import { IDEForm } from './ideform';
import { ISysCss } from '../../res/isys-css';

/**
 *
 * 实体编辑表单模型对象接口
 * 继承父接口类型值[FORM]
 * @export
 * @interface IDEEditForm
 */
export interface IDEEditForm extends IDEForm, ISDAjaxControl {
  /**
   * 自动保存模式
   * @type {number}
   * @default 0
   * 来源  getAutoSaveMode
   */
  autoSaveMode?: number;

  /**
   * 建立数据行为
   *
   * @type {IControlAction}
   * 来源  getCreatePSControlAction
   */
  createControlAction?: IControlAction;

  /**
   * 获取草稿数据行为（拷贝）
   *
   * @type {IControlAction}
   * 来源  getGetDraftFromPSControlAction
   */
  getDraftFromControlAction?: IControlAction;

  /**
   * 获取草稿数据行为
   *
   * @type {IControlAction}
   * 来源  getGetDraftPSControlAction
   */
  getDraftControlAction?: IControlAction;

  /**
   * 获取数据行为
   *
   * @type {IControlAction}
   * 来源  getGetPSControlAction
   */
  getControlAction?: IControlAction;

  /**
   * 导航栏样式表
   *
   * @type {ISysCss}
   * 来源  getNavBarPSSysCss
   */
  navBarSysCss?: ISysCss;

  /**
   * 导航栏位置
   * @description 值模式 [导航栏位置] {TOPLEFT：左上角、 TOPRIGHT：右上角、 BOTTOMLEFT：左下角、 BOTTOMRIGHT：右下角、 MIDDLELEFT：左侧中间、 MIDDLERIGHT：右侧中间、 TOP：上方、 BOTTOM：下方、 USER：用户自定义、 USER2：用户自定义2 }
   * @type {( string | 'TOPLEFT' | 'TOPRIGHT' | 'BOTTOMLEFT' | 'BOTTOMRIGHT' | 'MIDDLELEFT' | 'MIDDLERIGHT' | 'TOP' | 'BOTTOM' | 'USER' | 'USER2')}
   * 来源  getNavBarPos
   */
  navBarPos?:
    | string
    | 'TOPLEFT'
    | 'TOPRIGHT'
    | 'BOTTOMLEFT'
    | 'BOTTOMRIGHT'
    | 'MIDDLELEFT'
    | 'MIDDLERIGHT'
    | 'TOP'
    | 'BOTTOM'
    | 'USER'
    | 'USER2';

  /**
   * 导航栏样式
   * @type {string}
   * 来源  getNavBarStyle
   */
  navBarStyle?: string;

  /**
   * 导航栏宽度
   * @type {number}
   * @default 0.0
   * 来源  getNavBarWidth
   */
  navBarWidth?: number;

  /**
   * 导航栏高度
   * @type {number}
   * @default 0.0
   * 来源  getNavbarHeight
   */
  navbarHeight?: number;

  /**
   * 应用计数器引用
   *
   * @type {string}
   * 来源  getPSAppCounterRef
   */
  appCounterRefId?: string;

  /**
   * 删除数据行为
   *
   * @type {IControlAction}
   * 来源  getRemovePSControlAction
   */
  removeControlAction?: IControlAction;

  /**
   * 更新数据行为
   *
   * @type {IControlAction}
   * 来源  getUpdatePSControlAction
   */
  updateControlAction?: IControlAction;

  /**
   * 支持自动保存
   * @type {boolean}
   * @default false
   * 来源  isEnableAutoSave
   */
  enableAutoSave?: boolean;

  /**
   * 支持自定义表单项
   * @type {boolean}
   * @default false
   * 来源  isEnableCustomized
   */
  enableCustomized?: boolean;

  /**
   * 信息表单
   * @type {boolean}
   * @default false
   * 来源  isInfoFormMode
   */
  infoFormMode?: boolean;

  /**
   * 显示表单导航栏
   * @type {boolean}
   * @default false
   * 来源  isShowFormNavBar
   */
  showFormNavBar?: boolean;
}
