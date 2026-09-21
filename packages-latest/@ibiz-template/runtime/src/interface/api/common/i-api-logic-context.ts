import { IApiContext, IApiData, IApiParams } from '@ibiz-template/core';

/**
 * @description 逻辑执行上下文接口
 * @export
 * @interface IApiLogicContext
 */
export interface IApiLogicContext {
  /**
   * @description 上下文
   * @type {IApiContext}
   * @memberof IApiLogicContext
   */
  readonly context: IApiContext;
  /**
   * @description 数据
   * @type {IApiData[]}
   * @memberof IApiLogicContext
   */
  readonly data: IApiData[];
  /**
   * @description 视图参数
   * @type {IApiParams}
   * @memberof IApiLogicContext
   */
  readonly viewParam: IApiParams;
  /**
   * @description 界面逻辑参数
   * @type {Record<string, unknown>}
   * @memberof IApiLogicContext
   */
  readonly params: Record<string, unknown>;
  /**
   * @description 上一次返回值
   * @type {unknown}
   * @memberof IApiLogicContext
   */
  lastReturn: unknown;
  /**
   * @description 逻辑执行返回值
   * @type {unknown}
   * @memberof IApiLogicContext
   */
  result: unknown;
  /**
   * @description 是否存在结束节点
   * @type {boolean}
   * @memberof IApiLogicContext
   */
  isEndNode: boolean;
  /**
   * @description 默认参数节点名称
   * @default 'Default'
   * @type {string}
   * @memberof IApiLogicContext
   */
  defaultParamName: string;
  /**
   * @description 重置实体逻辑参数
   * @param {string} name
   * @memberof IApiLogicContext
   */
  resetParam(name: string): void;
  /**
   * @description 重新建立变量
   * @param {string} name
   * @memberof IApiLogicContext
   */
  renewParam(name: string): void;
  /**
   * @description 设置上一次返回值
   * @param {unknown} value
   * @memberof IApiLogicContext
   */
  setLastReturn(value: unknown): void;
  /**
   * @description 是否是实体参数变量（即后台数据对象）
   * @param {string} paramId
   * @returns {*}  {boolean}
   * @memberof IApiLogicContext
   */
  isEntityParam(paramId: string): boolean;
}
