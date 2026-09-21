/**
 * 导航视图需要使用到的相关信息
 * @author lxm
 * @date 2023-08-10 05:46:21
 * @export
 * @interface INavViewMsg
 */
export interface INavViewMsg {
  /**
   * 视图唯一标识
   * @author lxm
   * @date 2023-05-25 07:01:28
   * @type {string}
   */
  key: string;

  /**
   * 最新的路由全路径
   * @author lxm
   * @date 2023-05-25 07:03:29
   * @type {string}
   */
  fullPath?: string;

  /**
   * 上下文
   * @author lxm
   * @date 2023-05-25 07:04:39
   * @type {IContext}
   */
  context?: IContext;

  /**
   * 视图参数
   * @author lxm
   * @date 2023-05-25 07:04:38
   * @type {IParams}
   */
  params?: IParams;

  /**
   * 视图模型
   * @author lxm
   * @date 2023-05-25 07:06:33
   * @type {IAppView}
   */
  viewId?: string;

  /**
   * 是否路由已经跳转
   *
   * @author zk
   * @date 2023-09-26 06:09:17
   * @type {string}
   * @memberof INavViewMsg
   */
  isRoutePushed?: boolean;

  /**
   * 是否缓存
   *
   * @author zk
   * @date 2023-09-26 06:09:17
   * @type {string}
   * @memberof INavViewMsg
   */
  isCache?: boolean;

  /**
   * 视图打开参数
   *
   * @author zk
   * @date 2024-02-06 02:02:15
   * @type {boolean}
   * @memberof INavViewMsg
   */
  modalOptions?: IData;

  /**
   * 是否404
   *
   * @author zk
   * @date 2023-09-26 06:09:17
   * @type {string}
   * @memberof INavViewMsg
   */
  is404?: boolean;
}
