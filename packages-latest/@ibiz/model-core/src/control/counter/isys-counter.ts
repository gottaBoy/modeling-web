import { INavigateParamContainer } from '../inavigate-param-container';

/**
 *
 * 系统计数器模型对象接口
 * @export
 * @interface ISysCounter
 */
export interface ISysCounter extends INavigateParamContainer {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 计数器数据
   * @type {string}
   * 来源  getCounterData
   */
  counterData?: string;

  /**
   * 计数器数据2
   * @type {string}
   * 来源  getCounterData2
   */
  counterData2?: string;

  /**
   * 计数器类型
   * @description 值模式 [云平台计数器类型]
   * @type {string}
   * 来源  getCounterType
   */
  counterType?: string;

  /**
   * 自定义查询条件
   * @type {string}
   * 来源  getCustomCond
   */
  customCond?: string;

  /**
   * 预置计数器标识
   * @type {string}
   * 来源  getPSCounterId
   */
  counterId?: string;

  /**
   * 前端模板插件对象
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;

  /**
   * 刷新间隔（ms）
   * @type {number}
   * @default 0
   * 来源  getTimer
   */
  timer?: number;

  /**
   * 计数器标记
   * @type {string}
   * 来源  getUniqueTag
   */
  uniqueTag?: string;
}
