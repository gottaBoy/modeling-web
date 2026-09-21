import { IDashboard } from '@ibiz/model-core';
import { IApiParams } from '@ibiz-template/core';
import { IApiControlController } from './i-api-control.controller';
import { IApiDashboardState } from '../../state';
import { IApiPortletController } from './portlet';
import { IApiPortletTypeMapping } from '../common';

/**
 * 数据看板
 * @description 通过模块化卡片响应式栅格布局，集中展示各类数据视图、统计图表、看板部件等内容。
 * @primary
 * @export
 * @ctrlparams {name:dynamiccodelist,title:动态代码表标识,parameterType:string,description:`门户部件`动态代码表标识，在看板定制模式启用`支持扩展`时生效。当点击`门户定制`按钮时，会先请求`自定义门户`菜单数据，若存在配置好的动态代码表标识，则依据该代码表所加载的数据进行展示,effectPlatform:web}
 * @ctrlparams {name:categorytag,title:门户部件分类过滤,parameterType:string,description:门户部件分类过滤，在看板定制模式未启用`支持扩展`时生效。在`自定义门户`中，支持配置正则表达式字符串以筛选应用门户部件集合中的代码标识，仅符合匹配条件的门户部件分类会显示在`自定义门户`左侧菜单上,effectPlatform:web}
 * @ctrlparams {name:portletnametag,title:门户部件部件项过滤,parameterType:string,description:门户部件项过滤，在看板定制模式未启用`支持扩展`时生效。在`自定义门户`中，支持配置正则表达式字符串以筛选应用门户部件集合中的代码标识，仅符合匹配条件的门户部件项会显示在`自定义门户`左侧菜单上,effectPlatform:web}
 * @childrenparams {"name":"ACTIONBAR","title":"操作栏","interface":"IApiActionBarPortletController"}
 * @childrenparams {"name":"CHART","title":"图表","interface":"IApiChartPortletController"}
 * @childrenparams {"name":"CONTAINER","title":"容器","interface":"IApiPortletContainerController"}
 * @childrenparams {"name":"FILTER","title":"过滤器","interface":"IApiFilterPortletController"}
 * @childrenparams {"name":"HTML","title":"网页","interface":"IApiHtmlPortletController"}
 * @childrenparams {"name":"LIST","title":"列表","interface":"IApiListPortletController"}
 * @childrenparams {"name":"APPMENU","title":"菜单","interface":"IApiMenuPortletController"}
 * @childrenparams {"name":"RAWITEM","title":"直接内容","interface":"IApiRawItemPortletController"}
 * @childrenparams {"name":"REPORT","title":"报表","interface":"IApiReportPortletController"}
 * @childrenparams {"name":"VIEW","title":"视图","interface":"IApiViewPortletController"}
 * @interface IApiDashboardController
 * @extends {IApiControlController<T, S>}
 * @template T
 * @template S
 */
export interface IApiDashboardController<
  T extends IDashboard = IDashboard,
  S extends IApiDashboardState = IApiDashboardState,
> extends IApiControlController<T, S> {
  /**
   * @description 门户控制器，key为门户部件标识
   * @type {{ [key: string]: IApiPortletController }}
   * @memberof IApiDashboardController
   */
  portlets: { [key: string]: IApiPortletController };

  /**
   * @description 刷新数据
   * @returns {*}  {Promise<void>}
   * @memberof IApiDashboardController
   */
  refresh(): Promise<void>;

  /**
   * @description 重置门户配置
   * @returns {*}  {Promise<void>}
   * @memberof IApiDashboardController
   */
  resetPortlets(): Promise<void>;

  /**
   * @description 打开过滤器设计界面，若不传入id则新建一个过滤器
   * @param {{ id?: string }} [args] { id } 过滤部件标识
   * @returns {*}  {Promise<void>}
   * @memberof IApiDashboardController
   */
  openFilterDesignPage(args?: { id?: string }): Promise<void>;

  /**
   * @description 获取门户部件的搜索参数，返回该门户部件当前适用的查询条件，包含所有影响它的过滤器绑定的数据
   * @param {string} id 门户部件标识
   * @returns {*}  {IApiParams}
   * @memberof IApiDashboardController
   */
  getExtendParamsById(id: string): IApiParams;

  /**
   * @description 获取门户部件
   * @template K
   * @param {K} type 门户部件类型
   * @param {string} id 门户部件标识
   * @returns {*}  {IApiPortletTypeMapping[K]}
   * @memberof IApiDashboardController
   */
  getPortlet<K extends keyof IApiPortletTypeMapping>(
    type: K,
    id: string,
  ): IApiPortletTypeMapping[K];
}
