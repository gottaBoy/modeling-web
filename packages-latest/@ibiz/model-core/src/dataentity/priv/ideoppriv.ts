import { IModelObject } from '../../imodel-object';

/**
 *
 * 实体操作标识模型对象接口
 * @export
 * @interface IDEOPPriv
 */
export interface IDEOPPriv extends IModelObject {
  /**
   * 逻辑名称
   * @type {string}
   * 来源  getLogicName
   */
  logicName?: string;

  /**
   * 映射实体名称
   * @type {string}
   * 来源  getMapPSDEName
   */
  mapDEName?: string;

  /**
   * 映射实体操作标识
   * @type {string}
   * 来源  getMapPSDEOPPrivName
   */
  mapDEOPPrivName?: string;

  /**
   * 统一资源代码
   * @type {string}
   * 来源  getMapSysUniResCode
   */
  mapSysUniResCode?: string;

  /**
   * 映射系统统一资源
   * @type {boolean}
   * @default false
   * 来源  isMapSysUniRes
   */
  mapSysUniResMode?: boolean;
}
