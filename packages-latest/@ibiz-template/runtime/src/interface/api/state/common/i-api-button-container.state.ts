/* eslint-disable @typescript-eslint/no-explicit-any */

import { IApiContext, IApiData } from '@ibiz-template/core';

/**
 * @description 按钮容器的状态
 * @export
 * @interface IApiButtonContainerState
 */
export interface IApiButtonContainerState {
  /**
   * @description 是否显示，直接修改值界面即可生效
   * @type {boolean}
   * @memberof IApiButtonContainerState
   */
  visible: boolean;

  /**
   * @description 是否禁用，直接修改值界面即可生效
   * @type {boolean}
   * @memberof IApiButtonContainerState
   */
  disabled: boolean;

  /**
   * @description 设置当前执行的按钮,name为按钮标识
   * @param {string} name
   * @memberof IApiButtonContainerState
   */
  setLoading(name: string): void;

  /**
   * @description 更新子的状态
   * @param {IApiContext} context 上下文
   * @param {IApiData} [data] 实体数据
   * @param {string} [appDeId] 实体标识
   * @param {IData[]} [selections] 选中数据集合
   * @returns {*}  {Promise<void>}
   * @memberof IApiButtonContainerState
   */
  update(
    context: IApiContext,
    data?: IApiData,
    appDeId?: string,
    selections?: IData[],
  ): Promise<void>;

  [p: string]: any;
}
