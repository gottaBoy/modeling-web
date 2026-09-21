import { INavigateParamContainer } from '../inavigate-param-container';

/**
 *
 * 面板数据区域模型对象基础接口
 * @export
 * @interface IPanelDataRegion
 */
export interface IPanelDataRegion extends INavigateParamContainer {
  /**
   * 数据对象名称
   * @type {string}
   * 来源  getDataName
   */
  dataName?: string;

  /**
   * 数据区域类型
   * @description 值模式 [数据面板模式] {NONE：无、 LOGINFORM：登录表单、 SINGLEDATA：单项数据、 MULTIDATA：多项数据（重复器）、 MULTIDATA_RAW：多项数据（仅数据）、 INHERIT：继承、 USER：用户自定义 }
   * @type {( string | 'NONE' | 'LOGINFORM' | 'SINGLEDATA' | 'MULTIDATA' | 'MULTIDATA_RAW' | 'INHERIT' | 'USER')}
   * @default INHERIT
   * 来源  getDataRegionType
   */
  dataRegionType?:
    | string
    | 'NONE'
    | 'LOGINFORM'
    | 'SINGLEDATA'
    | 'MULTIDATA'
    | 'MULTIDATA_RAW'
    | 'INHERIT'
    | 'USER';

  /**
   * 数据源类型
   * @description 值模式 [数据面板源（全部）] {DEACTION：实体行为、 DEDATASET：实体集合、 DELOGIC：实体逻辑、 ACTIVEDATAPARAM：绑定当前数据变量、 APPGLOBALPARAM：绑定应用全局变量、 TOPVIEWSESSIONPARAM：绑定顶级视图会话共享变量、 VIEWSESSIONPARAM：绑定当前视图会话共享变量、 CUSTOM：自定义代码 }
   * @type {( string | 'DEACTION' | 'DEDATASET' | 'DELOGIC' | 'ACTIVEDATAPARAM' | 'APPGLOBALPARAM' | 'TOPVIEWSESSIONPARAM' | 'VIEWSESSIONPARAM' | 'CUSTOM')}
   * 来源  getDataSourceType
   */
  dataSourceType?:
    | string
    | 'DEACTION'
    | 'DEDATASET'
    | 'DELOGIC'
    | 'ACTIVEDATAPARAM'
    | 'APPGLOBALPARAM'
    | 'TOPVIEWSESSIONPARAM'
    | 'VIEWSESSIONPARAM'
    | 'CUSTOM';

  /**
   * 应用实体处理逻辑
   *
   * @type {string}
   * 来源  getPSAppDELogic
   */
  appDELogicId?: string;

  /**
   * 应用实体方法
   *
   * @type {string}
   * 来源  getPSAppDEMethod
   */
  appDEMethodId?: string;

  /**
   * 应用实体
   *
   * @type {string}
   * 来源  getPSAppDataEntity
   */
  appDataEntityId?: string;

  /**
   * 数据刷新间隔(ms)
   * @type {number}
   * @default -1
   * 来源  getReloadTimer
   */
  reloadTimer?: number;

  /**
   * 脚本代码
   * @type {string}
   * 来源  getScriptCode
   */
  scriptCode?: string;

  /**
   * 显示处理提示
   * @type {boolean}
   * @default false
   * 来源  isShowBusyIndicator
   */
  showBusyIndicator?: boolean;
}
