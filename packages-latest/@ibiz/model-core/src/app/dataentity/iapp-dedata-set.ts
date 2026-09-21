import { IAppDEMethod } from './iapp-demethod';
import { IDEDQCondition } from '../../dataentity/ds/idedqcondition';
import { IDEDQGroupCondition } from '../../dataentity/ds/idedqgroup-condition';

/**
 *
 * 应用实体数据集模型对象接口
 * @export
 * @interface IAppDEDataSet
 */
export interface IAppDEDataSet extends IAppDEMethod {
  /**
   * 上下文数据条件
   *
   * @type {IDEDQCondition[]}
   * 来源  getADPSDEDQConditions
   */
  addedqconditions?: IDEDQCondition[];

  /**
   * 执行之后代码
   * @type {string}
   * 来源  getAfterCode
   */
  afterCode?: string;

  /**
   * 执行之前代码
   * @type {string}
   * 来源  getBeforeCode
   */
  beforeCode?: string;

  /**
   * 数据集标识
   * @type {string}
   * 来源  getDataSetName
   */
  dataSetName?: string;

  /**
   * 数据集标记
   * @type {string}
   * 来源  getDataSetTag
   */
  dataSetTag?: string;

  /**
   * 结果集类型
   * @description 值模式 [实体数据集类型] {DATAQUERY：数据查询、 INDEXDE：索引实体、 MULTIFORM：多表单、 CODELIST：代码表、 DELOGIC：实体逻辑、 SCRIPT：脚本代码、 REMOTE：远程接口数据集 }
   * @type {( string | 'DATAQUERY' | 'INDEXDE' | 'MULTIFORM' | 'CODELIST' | 'DELOGIC' | 'SCRIPT' | 'REMOTE')}
   * @default REMOTE
   * 来源  getDataSetType
   */
  dataSetType?:
    | string
    | 'DATAQUERY'
    | 'INDEXDE'
    | 'MULTIFORM'
    | 'CODELIST'
    | 'DELOGIC'
    | 'SCRIPT'
    | 'REMOTE';

  /**
   * 应用代码表
   *
   * @type {string}
   * 来源  getPSAppCodeList
   */
  appCodeListId?: string;

  /**
   * 实体处理逻辑
   *
   * @type {string}
   * 来源  getPSAppDELogic
   */
  appDELogicId?: string;

  /**
   * 本地过滤条件
   *
   * @type {IDEDQGroupCondition[]}
   * 来源  getPSDEDQGroupConditions
   */
  dedqgroupConditions?: IDEDQGroupCondition[];

  /**
   * 预定义类型
   * @description 值模式 [实体结果集类型] {CODELIST：代码表、 INDEXDE：索引实体、 MULTIFORM：多表单、 DELOGIC：实体处理逻辑、 SCRIPT：脚本代码、 REMOTE：远程接口数据集 }
   * @type {( string | 'CODELIST' | 'INDEXDE' | 'MULTIFORM' | 'DELOGIC' | 'SCRIPT' | 'REMOTE')}
   * 来源  getPredefinedType
   */
  predefinedType?:
    | string
    | 'CODELIST'
    | 'INDEXDE'
    | 'MULTIFORM'
    | 'DELOGIC'
    | 'SCRIPT'
    | 'REMOTE';

  /**
   * 脚本代码
   * @type {string}
   * 来源  getScriptCode
   */
  scriptCode?: string;

  /**
   * 自定义代码
   * @type {boolean}
   * @default false
   * 来源  isCustomCode
   */
  customCode?: boolean;
}
