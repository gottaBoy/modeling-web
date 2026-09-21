import { IAjaxControl } from '../iajax-control';
import { IControlContainer } from '../icontrol-container';
import { IDEFormItemUpdate } from './ideform-item-update';
import { IDEFormItemVR } from './ideform-item-vr';
import { IDEFormPage } from './ideform-page';
import { ILayoutContainer } from '../layout/ilayout-container';

/**
 *
 * 实体表单模型基础对象接口
 * @export
 * @interface IDEForm
 */
export interface IDEForm
  extends IAjaxControl,
    ILayoutContainer,
    IControlContainer {
  /**
   * 表单功能模式
   * @description 值模式 [表单功能模式] {WFACTION：流程操作、 WIZARDFORM：向导表单 }
   * @type {( string | 'WFACTION' | 'WIZARDFORM')}
   * 来源  getFormFuncMode
   */
  formFuncMode?: string | 'WFACTION' | 'WIZARDFORM';

  /**
   * 表单样式
   * @type {string}
   * 来源  getFormStyle
   */
  formStyle?: string;

  /**
   * 表单宽度
   * @type {number}
   * @default 0.0
   * 来源  getFormWidth
   */
  formWidth?: number;

  /**
   * 应用实体属性输入提示集合
   *
   * @type {string}
   * 来源  getPSAppDEFInputTipSet
   */
  appDEFInputTipSetId?: string;

  /**
   * 表单项更新集合
   *
   * @type {IDEFormItemUpdate[]}
   * 来源  getPSDEFormItemUpdates
   */
  deformItemUpdates?: IDEFormItemUpdate[];

  /**
   * 表单项值规则集合
   *
   * @type {IDEFormItemVR[]}
   * 来源  getPSDEFormItemVRs
   */
  deformItemVRs?: IDEFormItemVR[];

  /**
   * 表单分页集合
   *
   * @type {IDEFormPage[]}
   * 来源  getPSDEFormPages
   */
  deformPages?: IDEFormPage[];

  /**
   * 表单分页头部位置
   * @description 值模式 [表单分页位置] {LEFT：左边、 TOP：上方、 RIGHT：右边、 BOTTOM：下方 }
   * @type {( string | 'LEFT' | 'TOP' | 'RIGHT' | 'BOTTOM')}
   * 来源  getTabHeaderPos
   */
  tabHeaderPos?: string | 'LEFT' | 'TOP' | 'RIGHT' | 'BOTTOM';

  /**
   * 启用表单项过滤器
   * @type {boolean}
   * @default false
   * 来源  isEnableItemFilter
   */
  enableItemFilter?: boolean;

  /**
   * 移动端部件
   * @type {boolean}
   * @default false
   * 来源  isMobileControl
   */
  mobileControl?: boolean;

  /**
   * 隐藏分页头部
   * @type {boolean}
   * 来源  isNoTabHeader
   */
  noTabHeader?: boolean;
}
