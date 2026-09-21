import { IApiContext, IApiData, IApiParams } from '@ibiz-template/core';

/**
 * @description 重绘数据
 * @export
 * @interface IApiRedrawData
 */
export interface IApiRedrawData {
  /**
   * @description 上下文
   * @type {IApiContext}
   * @memberof IApiRedrawData
   */
  context: IApiContext;
  /**
   * @description 视图参数
   * @type {IApiParams}
   * @memberof IApiRedrawData
   */
  params: IApiParams;
  /**
   * @description 重绘数据
   * @type {IApiData[]}
   * @memberof IApiRedrawData
   */
  data?: IApiData[];
  /**
   * @description 是否重载模型
   * @type {boolean}
   * @memberof IApiRedrawData
   */
  isReloadModel?: boolean;
}
