/**
 * @description 微应用配置(仅全代码使用)
 * @export
 * @interface IMicroAppConfig
 */
export interface IMicroAppConfig {
  /**
   * @description 微应用名称
   * @type {string}
   * @memberof IMicroAppConfig
   */
  name: string;

  /**
   * @description 微应用访问地址
   * @type {string}
   * @memberof IMicroAppConfig
   */
  entry: string;

  /**
   * @description 微应用数据请求基础路径
   * @type {string}
   * @memberof IMicroAppConfig
   */
  baseUrl: string;

  /**
   * @description 微应用插件请求基础路径
   * @type {string}
   * @memberof IMicroAppConfig
   */
  pluginBaseUrl: string;
}
