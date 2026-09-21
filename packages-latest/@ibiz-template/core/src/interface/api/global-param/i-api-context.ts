/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @description 应用上下文
 * @export
 * @interface IApiContext
 */
export interface IApiContext {
  [key: string | symbol]: any;

  /**
   * @description 界面域标识，每个独立路由导航的视图生成
   * @type {string}
   * @memberof IApiContext
   */
  srfsessionid: string;

  /**
   * @description 应用标识
   * @type {string}
   * @memberof IApiContext
   */
  srfappid: string;

  /**
   * @description 是否简单模式，简单模式下服务层会以界面数据为准，不会进行 DTO 处理
   * @type {boolean}
   * @memberof IApiContext
   */
  srfsimple?: boolean;

  /**
   * @description 编辑视图上一个，下一步等功能数据来源的多数据部件标识
   * @type {string}
   * @memberof IApiContext
   */
  srfnavctrlid?: string;
}
