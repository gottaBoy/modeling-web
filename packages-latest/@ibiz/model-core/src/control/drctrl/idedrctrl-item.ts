import { IControlItem } from '../icontrol-item';
import { INavigateParamContainer } from '../inavigate-param-container';
import { ILanguageRes } from '../../res/ilanguage-res';
import { ISysImage } from '../../res/isys-image';

/**
 *
 * 数据关系边栏部件模型对象接口
 * @export
 * @interface IDEDRCtrlItem
 */
export interface IDEDRCtrlItem extends IControlItem, INavigateParamContainer {
  /**
   * 标题语言资源
   *
   * @type {ILanguageRes}
   * 来源  getCapPSLanguageRes
   */
  capLanguageRes?: ILanguageRes;

  /**
   * 标题
   * @type {string}
   * 来源  getCaption
   */
  caption?: string;

  /**
   * 计数器标识
   * @type {string}
   * 来源  getCounterId
   */
  counterId?: string;

  /**
   * 计数器模式
   * @description 值模式 [计数器显示模式] {0：默认、 1：0 值时隐藏 }
   * @type {( number | 0 | 1)}
   * @default 0
   * 来源  getCounterMode
   */
  counterMode?: number | 0 | 1;

  /**
   * 启用判断数据访问标识
   * @type {string}
   * 来源  getDataAccessAction
   */
  dataAccessAction?: string;

  /**
   * 启用模式
   * @description 值模式 [关系界面组成员启用模式] {ALL：全部启用、 INWF：流程中启用、 ALLWF：全部流程状态启用、 EDIT：编辑时启用、 DEOPPRIV：实体操作标识、 DELOGIC：实体逻辑、 SCRIPT：脚本、 COUNT_GTE_ZERO：计数大于等于0、 COUNT_GT_ZERO：计数大于0、 CUSTOM：自定义（暂不使用） }
   * @type {( string | 'ALL' | 'INWF' | 'ALLWF' | 'EDIT' | 'DEOPPRIV' | 'DELOGIC' | 'SCRIPT' | 'COUNT_GTE_ZERO' | 'COUNT_GT_ZERO' | 'CUSTOM')}
   * 来源  getEnableMode
   */
  enableMode?:
    | string
    | 'ALL'
    | 'INWF'
    | 'ALLWF'
    | 'EDIT'
    | 'DEOPPRIV'
    | 'DELOGIC'
    | 'SCRIPT'
    | 'COUNT_GTE_ZERO'
    | 'COUNT_GT_ZERO'
    | 'CUSTOM';

  /**
   * 头部前端扩展插件
   *
   * @type {string}
   * 来源  getHeaderPSSysPFPlugin
   */
  headerSysPFPluginId?: string;

  /**
   * 项标记
   * @type {string}
   * 来源  getItemTag
   */
  itemTag?: string;

  /**
   * 项标记2
   * @type {string}
   * 来源  getItemTag2
   */
  itemTag2?: string;

  /**
   * 关联视图
   *
   * @type {string}
   * 来源  getPSAppView
   */
  appViewId?: string;

  /**
   * 项图片资源对象
   *
   * @type {ISysImage}
   * 来源  getPSSysImage
   */
  sysImage?: ISysImage;

  /**
   * 启用判断实体逻辑
   *
   * @type {string}
   * 来源  getTestPSAppDELogic
   */
  testAppDELogicId?: string;

  /**
   * 启用判断脚本
   * @type {string}
   * 来源  getTestScriptCode
   */
  testScriptCode?: string;
}
