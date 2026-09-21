import { IViewConfig } from '@ibiz-template/runtime';

/**
 * 路由壳绘制需要的视图数据
 *
 * @author lxm
 * @date 2022-08-17 22:08:18
 * @export
 * @interface IRouteViewData
 */
export interface IRouteViewData {
  /**
   * 视图Config
   * @author lxm
   * @date 2023-04-19 01:44:13
   * @type {IViewConfig}
   */
  viewConfig?: IViewConfig;

  /**
   *视图上下文
   *
   * @author lxm
   * @date 2022-08-17 23:08:15
   * @type {IParams}
   */
  context?: IParams;

  /**
   *视图参数
   *
   * @author lxm
   * @date 2022-08-17 23:08:25
   * @type {IParams}
   */
  params?: IParams;

  /**
   * 视图导航参数
   * @author lxm
   * @date 2023-03-14 08:41:50
   * @type {string}
   */
  srfnav?: string;
}

/**
 * 路由路径每一级路径节点
 *
 * @author lxm
 * @date 2022-08-18 11:08:24
 * @export
 * @interface IRoutePathNode
 */
export interface IRoutePathNode {
  /**
   * 视图名称
   *
   * @author lxm
   * @date 2022-08-18 11:08:42
   * @type {string}
   */
  viewName: string;

  /**
   * 上下文参数
   *
   * @author lxm
   * @date 2022-08-18 11:08:53
   * @type {IParams}
   */
  context?: IParams;

  /**
   * 视图参数对象
   *
   * @author lxm
   * @date 2022-08-18 11:08:25
   * @type {IParams}
   */
  params?: IParams;

  /**
   * 视图导航参数（视图自身解析的额外路由参数）
   * @author lxm
   * @date 2023-03-14 08:39:36
   * @type {string}
   */
  srfnav?: string;
}

/**
 * 路由路径对象，按照路径定义描述
 *
 * @author lxm
 * @date 2022-08-18 11:08:40
 * @export
 * @interface IRoutePath
 */
export interface IRoutePath {
  /**
   * 应用上下文
   *
   * @type {IParams}
   * @memberof IRoutePath
   */
  appContext?: IParams;

  /**
   *
   * @author lxm
   * @date 2022-08-18 11:08:48
   * @type {IRoutePathNode[]}
   */
  pathNodes: IRoutePathNode[];
}
