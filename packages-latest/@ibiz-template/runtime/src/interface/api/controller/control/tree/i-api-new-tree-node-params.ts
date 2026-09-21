import { IApiParams } from '@ibiz-template/core';

/**
 * @description 树节点新建参数接口
 * @export
 * @interface IApiNewTreeNodeParams
 */
export interface IApiNewTreeNodeParams {
  /**
   * @description 新建节点的父节点数据标识，若未设置此值，则新建节点默认以根节点为父节点
   * @type {string}
   * @memberof IApiNewTreeNodeParams
   */
  parentKey?: string;

  /**
   * @description 新建目标节点的模型标识，通过该标识创建指定节点数据
   * @type {string}
   * @memberof IApiNewTreeNodeParams
   */
  nodeType: string;

  /**
   * @description 新增节点默认值，如果有值，则会被添加到新增节点的请求参数中
   * @type {IApiParams}
   * @memberof IApiNewTreeNodeParams
   */
  defaultValue?: IApiParams;
}
