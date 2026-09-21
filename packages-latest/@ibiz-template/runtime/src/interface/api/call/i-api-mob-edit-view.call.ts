import { IApiViewCall } from './i-api-view.call';

/**
 * @description 实体移动端编辑视图能力
 * @export
 * @interface IApiMobEditViewCall
 * @extends {IApiViewCall}
 */
export interface IApiMobEditViewCall extends IApiViewCall {
  /**
   * @description 保存
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobEditViewCall
   */
  Save: {
    args: undefined;
  };
  /**
   * @description 保存并关闭
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobEditViewCall
   */
  SaveAndExit: {
    args: undefined;
  };
  /**
   * @description 删除并关闭
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobEditViewCall
   */
  RemoveAndExit: {
    args: undefined;
  };
  /**
   * @description 保存并新建
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobEditViewCall
   */
  SaveAndNew: {
    args: undefined;
  };
  /**
   * @description 刷新视图
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobEditViewCall
   */
  Refresh: {
    args: undefined;
  };
  /**
   * @description 工作流启动
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobEditViewCall
   */
  SaveAndStart: {
    args: undefined;
  };
  /**
   * @description 工作流提交
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobEditViewCall
   */
  ViewWFStep: {
    args: undefined;
  };
  /**
   * @description 流程撤回
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiMobEditViewCall
   */
  WFWithdraw: {
    args: undefined;
  };
}
