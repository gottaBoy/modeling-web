import {
  IApiActionBarPortletController,
  IApiChartPortletController,
  IApiFilterPortletController,
  IApiHtmlPortletController,
  IApiListPortletController,
  IApiMenuPortletController,
  IApiPortletContainerController,
  IApiRawItemPortletController,
  IApiReportPortletController,
  IApiViewPortletController,
} from '../control';

/**
 * @description 门户部件映射
 * @export
 * @interface IApiPortletTypeMapping
 */
export interface IApiPortletTypeMapping {
  /**
   * @description 操作栏
   * @type {IApiActionBarPortletController}
   * @memberof IApiPortletTypeMapping
   */
  ACTIONBAR: IApiActionBarPortletController;

  /**
   * @description 图表
   * @type {IApiChartPortletController}
   * @memberof IApiPortletTypeMapping
   */
  CHART: IApiChartPortletController;

  /**
   * @description 容器
   * @type {IApiPortletContainerController}
   * @memberof IApiPortletTypeMapping
   */
  CONTAINER: IApiPortletContainerController;

  /**
   * @description 过滤器
   * @type {IApiFilterPortletController}
   * @memberof IApiPortletTypeMapping
   */
  FILTER: IApiFilterPortletController;

  /**
   * @description 网页
   * @type {IApiHtmlPortletController}
   * @memberof IApiPortletTypeMapping
   */
  HTML: IApiHtmlPortletController;

  /**
   * @description 列表
   * @type {IApiListPortletController}
   * @memberof IApiPortletTypeMapping
   */
  LIST: IApiListPortletController;

  /**
   * @description 菜单
   * @type {IApiMenuPortletController}
   * @memberof IApiPortletTypeMapping
   */
  APPMENU: IApiMenuPortletController;

  /**
   * @description 直接内容
   * @type {IApiRawItemPortletController}
   * @memberof IApiPortletTypeMapping
   */
  RAWITEM: IApiRawItemPortletController;

  /**
   * @description 报表
   * @type {IApiReportPortletController}
   * @memberof IApiPortletTypeMapping
   */
  REPORT: IApiReportPortletController;

  /**
   * @description 视图
   * @type {IApiViewPortletController}
   * @memberof IApiPortletTypeMapping
   */
  VIEW: IApiViewPortletController;
}
