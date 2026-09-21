import { INavigateParamContainer } from '../inavigate-param-container';
import { IDEFormDetail } from './ideform-detail';
import { ILanguageRes } from '../../res/ilanguage-res';

/**
 *
 * 继承父接口类型值[DRUIPART]
 * @export
 * @interface IDEFormDRUIPart
 */
export interface IDEFormDRUIPart
  extends IDEFormDetail,
    INavigateParamContainer {
  /**
   * 自定义遮罩信息
   * @type {string}
   * 来源  getMaskInfo
   */
  maskInfo?: string;

  /**
   * 遮罩模式
   * @description 值模式 [表单多数据部件遮罩模式] {-1：自动判断、 0：不显示、 1：新建数据时遮盖 }
   * @type {( number | -1 | 0 | 1)}
   * @default -1
   * 来源  getMaskMode
   */
  maskMode?: number | -1 | 0 | 1;

  /**
   * 遮罩信息语言资源
   *
   * @type {ILanguageRes}
   * 来源  getMaskPSLanguageRes
   */
  maskLanguageRes?: ILanguageRes;

  /**
   * 嵌入视图
   *
   * @type {string}
   * 来源  getPSAppView
   */
  appViewId?: string;

  /**
   * 调用表单项更新
   *
   * @type {string}
   * 来源  getPSDEFormItemUpdate
   */
  deformItemUpdateId?: string;

  /**
   * 界面参数项名称
   * @type {string}
   * 来源  getParamItem
   */
  paramItem?: string;

  /**
   * 父数据对象
   * @type {IModel}
   * 来源  getParentDataJO
   */
  parentDataJO?: IModel;

  /**
   * 界面刷新触发表单项
   * @type {string}
   * 来源  getRefreshItems
   */
  refreshItems?: string;

  /**
   * 需要进行保存
   * @type {boolean}
   * 来源  isNeedSave
   */
  needSave?: boolean;

  /**
   * 附加刷新项只赋值不刷新
   * @type {boolean}
   * 来源  isRefreshItemsSetParamOnly
   */
  refreshItemsSetParamOnly?: boolean;
}
