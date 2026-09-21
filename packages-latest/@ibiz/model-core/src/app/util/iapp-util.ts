import { IModelObject } from '../../imodel-object';

/**
 *
 * 应用功能配置模型对象接口
 * 子接口类型识别属性[utilType]
 * @export
 * @interface IAppUtil
 */
export interface IAppUtil extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 前端扩展插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;

  /**
   * 功能实体10名称
   * @type {string}
   * 来源  getUtilPSDE10Name
   */
  utilDE10Name?: string;

  /**
   * 功能实体2名称
   * @type {string}
   * 来源  getUtilPSDE2Name
   */
  utilDE2Name?: string;

  /**
   * 功能实体3名称
   * @type {string}
   * 来源  getUtilPSDE3Name
   */
  utilDE3Name?: string;

  /**
   * 功能实体4名称
   * @type {string}
   * 来源  getUtilPSDE4Name
   */
  utilDE4Name?: string;

  /**
   * 功能实体5名称
   * @type {string}
   * 来源  getUtilPSDE5Name
   */
  utilDE5Name?: string;

  /**
   * 功能实体6名称
   * @type {string}
   * 来源  getUtilPSDE6Name
   */
  utilDE6Name?: string;

  /**
   * 功能实体7名称
   * @type {string}
   * 来源  getUtilPSDE7Name
   */
  utilDE7Name?: string;

  /**
   * 功能实体8名称
   * @type {string}
   * 来源  getUtilPSDE8Name
   */
  utilDE8Name?: string;

  /**
   * 功能实体9名称
   * @type {string}
   * 来源  getUtilPSDE9Name
   */
  utilDE9Name?: string;

  /**
   * 功能实体名称
   * @type {string}
   * 来源  getUtilPSDEName
   */
  utilDEName?: string;

  /**
   * 动态功能参数集合
   * @type {IModel}
   * 来源  getUtilParams
   */
  utilParams?: IModel;

  /**
   * 功能标记
   * @type {string}
   * 来源  getUtilTag
   */
  utilTag?: string;

  /**
   * 功能类型
   * @description 值模式 [应用功能配置类型] {FILTERSTORAGE：搜索条件存储、 DYNADASHBOARD：动态数据看板、 DYNACHART：动态图表、 DYNAREPORT：动态报表、 DRAFTSTORAGE：表单草稿存储、 USER：用户自定义 }
   * @type {( string | 'FILTERSTORAGE' | 'DYNADASHBOARD' | 'DYNACHART' | 'DYNAREPORT' | 'DRAFTSTORAGE' | 'USER')}
   * 来源  getUtilType
   */
  utilType?:
    | string
    | 'FILTERSTORAGE'
    | 'DYNADASHBOARD'
    | 'DYNACHART'
    | 'DYNAREPORT'
    | 'DRAFTSTORAGE'
    | 'USER';
}
