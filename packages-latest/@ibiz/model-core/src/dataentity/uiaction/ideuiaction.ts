import { IUIAction } from '../../view/iuiaction';

/**
 *
 * 实体界面行为模型对象接口
 * @export
 * @interface IDEUIAction
 */
export interface IDEUIAction extends IUIAction {
  /**
   * 无权限显示模式
   */
  noPrivDisplayMode?: number | 1 | 2 | 6;

  /**
   * 执行之后代码
   * @type {string}
   * 来源  getAfterCode
   */
  afterCode?: string;

  /**
   * 执行之前代码
   * @type {string}
   * 来源  getBeforeCode
   */
  beforeCode?: string;

  /**
   * 前端应用视图
   *
   * @type {string}
   * 来源  getFrontPSAppView
   */
  frontAppViewId?: string;

  /**
   * 应用实体方法
   *
   * @type {string}
   * 来源  getPSAppDEMethod
   */
  appDEMethodId?: string;

  /**
   * 相关实体操作标识
   *
   * @type {string}
   * 来源  getPSDEOPPriv
   */
  deopprivId?: string;

  /**
   * 异步操作行为
   * @type {boolean}
   * @default false
   * 来源  isAsyncAction
   */
  asyncAction?: boolean;

  /**
   * 先保存目标数据
   * @type {boolean}
   * @default false
   * 来源  isSaveTargetFirst
   */
  saveTargetFirst?: boolean;
}
