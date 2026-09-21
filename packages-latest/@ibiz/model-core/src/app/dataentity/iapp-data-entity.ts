import { IAppPortletCat } from '../control/iapp-portlet-cat';
import { IAppDEACMode } from './iapp-deacmode';
import { IAppDEDataExport } from './iapp-dedata-export';
import { IAppDEDataImport } from './iapp-dedata-import';
import { IAppDEField } from './iapp-defield';
import { IAppDELogic } from './iapp-delogic';
import { IAppDEMap } from './iapp-demap';
import { IAppDEMethod } from './iapp-demethod';
import { IAppDEMethodDTO } from './iapp-demethod-dto';
import { IAppDEPrint } from './iapp-deprint';
import { IAppDERS } from './iapp-ders';
import { IAppDEUIAction } from './iapp-deuiaction';
import { IAppDEUILogic } from './iapp-deuilogic';
import { IDEMainState } from '../../dataentity/mainstate/idemain-state';
import { IDEOPPriv } from '../../dataentity/priv/ideoppriv';
import { ILanguageRes } from '../../res/ilanguage-res';
import { ISysImage } from '../../res/isys-image';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 应用实体模型对象接口
 * @export
 * @interface IAppDataEntity
 */
export interface IAppDataEntity extends IModelObject {
  /**
   * 实体自填模式集合
   *
   * @type {IAppDEACMode[]}
   * 来源  getAllPSAppDEACModes
   */
  appDEACModes?: IAppDEACMode[];

  /**
   * 实体数据导出集合
   *
   * @type {IAppDEDataExport[]}
   * 来源  getAllPSAppDEDataExports
   */
  appDEDataExports?: IAppDEDataExport[];

  /**
   * 实体数据导入集合
   *
   * @type {IAppDEDataImport[]}
   * 来源  getAllPSAppDEDataImports
   */
  appDEDataImports?: IAppDEDataImport[];

  /**
   * 应用实体属性集合
   *
   * @type {IAppDEField[]}
   * 来源  getAllPSAppDEFields
   */
  appDEFields?: IAppDEField[];

  /**
   * 应用实体逻辑集合
   *
   * @type {IAppDELogic[]}
   * 来源  getAllPSAppDELogics
   */
  appDELogics?: IAppDELogic[];

  /**
   * 实体映射集合
   *
   * @type {IAppDEMap[]}
   * 来源  getAllPSAppDEMaps
   */
  appDEMaps?: IAppDEMap[];

  /**
   * 应用实体方法DTO对象集合
   *
   * @type {IAppDEMethodDTO[]}
   * 来源  getAllPSAppDEMethodDTOs
   */
  appDEMethodDTOs?: IAppDEMethodDTO[];

  /**
   * 应用实体方法集合
   *
   * @type {IAppDEMethod[]}
   * 来源  getAllPSAppDEMethods
   */
  appDEMethods?: IAppDEMethod[];

  /**
   * 实体打印集合
   *
   * @type {IAppDEPrint[]}
   * 来源  getAllPSAppDEPrints
   */
  appDEPrints?: IAppDEPrint[];

  /**
   * 实体界面行为集合
   *
   * @type {IAppDEUIAction[]}
   * 来源  getAllPSAppDEUIActions
   */
  appDEUIActions?: IAppDEUIAction[];

  /**
   * 实体界面逻辑集合
   *
   * @type {IAppDEUILogic[]}
   * 来源  getAllPSAppDEUILogics
   */
  appDEUILogics?: IAppDEUILogic[];

  /**
   * 实体门户部件分类集合
   *
   * @type {IAppPortletCat[]}
   * 来源  getAllPSAppPortletCats
   */
  appPortletCats?: IAppPortletCat[];

  /**
   * 实体主状态集合
   *
   * @type {IDEMainState[]}
   * 来源  getAllPSDEMainStates
   */
  demainStates?: IDEMainState[];

  /**
   * 实体操作标识集合
   *
   * @type {IDEOPPriv[]}
   * 来源  getAllPSDEOPPrivs
   */
  deopprivs?: IDEOPPriv[];

  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 代码名称2
   * @type {string}
   * 来源  getCodeName2
   */
  codeName2?: string;

  /**
   * 实体服务接口代码标识
   * @type {string}
   * 来源  getDEAPICodeName
   */
  deapicodeName?: string;

  /**
   * 实体服务接口代码标识2（复数）
   * @type {string}
   * 来源  getDEAPICodeName2
   */
  deapicodeName2?: string;

  /**
   * 实体服务接口标记
   * @type {string}
   * 来源  getDEAPITag
   */
  deapitag?: string;

  /**
   * 实体代码标识
   * @type {string}
   * 来源  getDECodeName
   */
  decodeName?: string;

  /**
   * 属性组使用模式
   * @description 值模式 [实体服务接口属性组联合模式] {REPLACE：替换实体属性、 OVERWRITE：重定义实体属性、 EXCLUDE：排除属性组属性 }
   * @type {( string | 'REPLACE' | 'OVERWRITE' | 'EXCLUDE')}
   * 来源  getDEFGroupMode
   */
  defgroupMode?: string | 'REPLACE' | 'OVERWRITE' | 'EXCLUDE';

  /**
   * 实体完全标识
   * @type {string}
   * 来源  getDEFullTag
   */
  defullTag?: string;

  /**
   * 实体标识
   * @type {string}
   * 来源  getDEName
   */
  dename?: string;

  /**
   * 实体访问控制体系
   * @description 值模式 [访问控制体系] {1：运行子系统角色体系（默认）、 2：当前系统角色及实体角色 }
   * @type {( number | 1 | 2)}
   * 来源  getDataAccCtrlArch
   */
  dataAccCtrlArch?: number | 1 | 2;

  /**
   * 实体数据访问控制方式
   * @description 值模式 [实体数据访问控制方式] {0：无控制、 1：自控制、 2：附属主实体控制、 3：附属主实体控制（未映射自控） }
   * @type {( number | 0 | 1 | 2 | 3)}
   * 来源  getDataAccCtrlMode
   */
  dataAccCtrlMode?: number | 0 | 1 | 2 | 3;

  /**
   * 数据类型应用实体属性
   *
   * @type {string}
   * 来源  getDataTypePSAppDEField
   */
  dataTypeAppDEFieldId?: string;

  /**
   * 默认实体数据导入
   *
   * @type {string}
   * 来源  getDefaultPSAppDEDataExport
   */
  defaultAppDEDataExportId?: string;

  /**
   * 默认实体数据导入
   *
   * @type {string}
   * 来源  getDefaultPSAppDEDataImport
   */
  defaultAppDEDataImportId?: string;

  /**
   * 默认实体打印
   *
   * @type {string}
   * 来源  getDefaultPSAppDEPrint
   */
  defaultAppDEPrintId?: string;

  /**
   * 动态系统模式
   * @description 值模式 [实体动态系统模式] {0：不启用、 1：启用（默认）、 2：启用（系统）、 3：启用（系统模型组）、 4：启用（系统模块）、 5：启用（实体）、 99：启用（行数据） }
   * @type {( number | 0 | 1 | 2 | 3 | 4 | 5 | 99)}
   * @default 0
   * 来源  getDynaSysMode
   */
  dynaSysMode?: number | 0 | 1 | 2 | 3 | 4 | 5 | 99;

  /**
   * 实体支持界面行为
   * @description 值模式 [实体界面操作行为] {1：建立、 2：更新、 4：删除 }
   * @type {( number | 1 | 2 | 4)}
   * 来源  getEnableUIActions
   */
  enableUIActions?: number | 1 | 2 | 4;

  /**
   * 表单类型应用实体属性
   *
   * @type {string}
   * 来源  getFormTypePSAppDEField
   */
  formTypeAppDEFieldId?: string;

  /**
   * 索引类型应用实体属性
   *
   * @type {string}
   * 来源  getIndexTypePSAppDEField
   */
  indexTypeAppDEFieldId?: string;

  /**
   * 主键属性
   *
   * @type {string}
   * 来源  getKeyPSAppDEField
   */
  keyAppDEFieldId?: string;

  /**
   * 逻辑名称语言资源
   *
   * @type {ILanguageRes}
   * 来源  getLNPSLanguageRes
   */
  lnlanguageRes?: ILanguageRes;

  /**
   * 逻辑名称
   * @type {string}
   * 来源  getLogicName
   */
  logicName?: string;

  /**
   * 主状态属性集合
   *
   * @type {string[]}
   * 来源  getMainStatePSAppDEFields
   */
  mainStateAppDEFieldIds?: string[];

  /**
   * 主信息属性
   *
   * @type {string}
   * 来源  getMajorPSAppDEField
   */
  majorAppDEFieldId?: string;

  /**
   * 应用实体从关系集合
   *
   * @type {IAppDERS[]}
   * 来源  getMinorPSAppDERSs
   */
  minorAppDERSs?: IAppDERS[];

  /**
   * 组织标识应用实体属性
   *
   * @type {string}
   * 来源  getOrgIdPSAppDEField
   */
  orgIdAppDEFieldId?: string;

  /**
   * 系统图片资源
   *
   * @type {ISysImage}
   * 来源  getPSSysImage
   */
  sysImage?: ISysImage;

  /**
   * 快速搜索属性集合
   *
   * @type {string[]}
   * 来源  getQuickSearchPSAppDEFields
   */
  quickSearchAppDEFieldIds?: string[];

  /**
   * 请求路径集合
   *
   * 来源 getRequestPaths
   */
  requestPaths?: string[];

  /**
   * 本地存储模式
   * @description 值模式 [应用实体存储模式] {0：仅远程存储、 1：仅本地存储、 3：本地及远程存储、 4：DTO成员（无存储） }
   * @type {( number | 0 | 1 | 3 | 4)}
   * 来源  getStorageMode
   */
  storageMode?: number | 0 | 1 | 3 | 4;

  /**
   * 系统服务接口标记
   * @type {string}
   * 来源  getSysAPITag
   */
  sysAPITag?: string;

  /**
   * 联合键值属性集合
   *
   * @type {string[]}
   * 来源  getUnionKeyValuePSAppDEFields
   */
  unionKeyValueAppDEFieldIds?: string[];

  /**
   * 实体默认
   * @type {boolean}
   * 来源  isDefaultMode
   */
  defaultMode?: boolean;

  /**
   * 启用实体主状态
   * @type {boolean}
   * @default false
   * 来源  isEnableDEMainState
   */
  enableDEMainState?: boolean;

  /**
   * 提供过滤器相关行为
   * @type {boolean}
   * 来源  isEnableFilterActions
   */
  enableFilterActions?: boolean;

  /**
   * 支持临时数据模式
   * @type {boolean}
   * @default false
   * 来源  isEnableTempData
   */
  enableTempData?: boolean;

  /**
   * 提供工作流相关行为
   * @type {boolean}
   * 来源  isEnableWFActions
   */
  enableWFActions?: boolean;

  /**
   * 主实体
   * @type {boolean}
   * 来源  isMajor
   */
  major?: boolean;
}
