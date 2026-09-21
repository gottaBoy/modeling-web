import { IApiMobWFDynaEditViewCall } from './i-api-mob-wf-dyna-edit-view.call';

/**
 * @description 实体移动端工作流动态操作视图能力
 * @export
 * @interface IApiMobWFDynaActionViewCall
 * @extends {IApiMobWFDynaEditViewCall}
 */
export interface IApiMobWFDynaActionViewCall extends IApiMobWFDynaEditViewCall {
  /**
   * @description 确定
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobWFDynaActionViewCall
   */
  Ok: {
    args: undefined;
  };
  /**
   * @description 取消
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobWFDynaActionViewCall
   */
  Cancel: {
    args: undefined;
  };
}
