import { IApiMobWFDynaEditViewCall } from './i-api-mob-wf-dyna-edit-view.call';

/**
 * @description 实体移动端工作流动态启动视图能力
 * @export
 * @interface IApiMobWFDynaStartViewCall
 * @extends {IApiMobWFDynaEditViewCall}
 */
export interface IApiMobWFDynaStartViewCall extends IApiMobWFDynaEditViewCall {
  /**
   * @description 确定
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobWFDynaStartViewCall
   */
  Ok: {
    args: undefined;
  };
  /**
   * @description 取消
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobWFDynaStartViewCall
   */
  Cancel: {
    args: undefined;
  };
}
