import { IDEDRCtrlItem } from './idedrctrl-item';
import { IDRCtrl } from './idrctrl';
import { ILanguageRes } from '../../res/ilanguage-res';
import { ISysImage } from '../../res/isys-image';

/**
 *
 * 实体数据关系部件模型对象接口
 * @export
 * @interface IDEDRCtrl
 */
export interface IDEDRCtrl extends IDRCtrl {
  /**
   * 实体数据关系标记
   * @type {string}
   * 来源  getDataRelationTag
   */
  dataRelationTag?: string;

  /**
   * 编辑项标题语言资源
   *
   * @type {ILanguageRes}
   * 来源  getEditItemCapPSLanguageRes
   */
  editItemCapLanguageRes?: ILanguageRes;

  /**
   * 编辑项标题
   * @type {string}
   * 来源  getEditItemCaption
   */
  editItemCaption?: string;

  /**
   * 编辑项图标
   *
   * @type {ISysImage}
   * 来源  getEditItemPSSysImage
   */
  editItemSysImage?: ISysImage;

  /**
   * 表单视图对象
   *
   * @type {string}
   * 来源  getFormPSAppView
   */
  formAppViewId?: string;

  /**
   * 关系项集合
   *
   * @type {IDEDRCtrlItem[]}
   * 来源  getPSDEDRCtrlItems
   */
  dedrctrlItems?: IDEDRCtrlItem[];

  /**
   * 全局唯一标记
   * @type {string}
   * 来源  getUniqueTag
   */
  uniqueTag?: string;

  /**
   * 支持自定义关系项
   * @type {boolean}
   * @default false
   * 来源  isEnableCustomized
   */
  enableCustomized?: boolean;

  /**
   * 隐藏编辑项
   * @type {boolean}
   * @default false
   * 来源  isHideEditItem
   */
  hideEditItem?: boolean;
}
