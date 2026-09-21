import { IApiEditViewCall } from './i-api-edit-view.call';

/**
 * @description 实体工作流动态启动视图能力
 * @export
 * @interface IApiWFDynaStartViewCall
 * @extends {IApiEditViewCall}
 */
export interface IApiWFDynaStartViewCall extends IApiEditViewCall {
  /**
   * @description 确定
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiWFDynaStartViewCall
   */
  Ok: {
    args: undefined;
  };
  /**
   * @description 取消
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiWFDynaStartViewCall
   */
  Cancel: {
    args: undefined;
  };
}
