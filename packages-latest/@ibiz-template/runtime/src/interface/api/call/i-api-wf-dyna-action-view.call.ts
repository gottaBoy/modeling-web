import { IApiEditViewCall } from './i-api-edit-view.call';

/**
 * @description 实体工作流动态操作视图能力
 * @export
 * @interface IApiWFDynaActionViewCall
 * @extends {IApiEditViewCall}
 */
export interface IApiWFDynaActionViewCall extends IApiEditViewCall {
  /**
   * @description 确定
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiWFDynaActionViewCall
   */
  Ok: {
    args: undefined;
  };
  /**
   * @description 取消
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiWFDynaActionViewCall
   */
  Cancel: {
    args: undefined;
  };
}
