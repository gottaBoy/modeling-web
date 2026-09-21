import { IApiViewCall } from './i-api-view.call';

/**
 * @description 实体自定义视图能力
 * @export
 * @interface IApiCustomViewCall
 * @extends {IApiViewCall}
 */
export interface IApiCustomViewCall extends IApiViewCall {
  /**
   * @description 刷新视图
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiCustomViewCall
   */
  Refresh: {
    args: undefined;
  };
}
