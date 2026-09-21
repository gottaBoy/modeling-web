/**
 * @description 微应用对象接口
 * @export
 * @interface IApiMicroApp
 */
export interface IApiMicroApp {
  /**
   * @description 应用标识
   * @type {string}
   * @memberof IApiMicroApp
   */
  id: string;
  /**
   * @description 应用标题
   * @type {string}
   * @memberof IApiMicroApp
   */
  caption: string;

  /**
   * @description 排序
   * @type {number}
   * @memberof IApiMicroApp
   */
  order: number;

  /**
   * @description 数据id，功能组件服务模式必须设置、引用子应用集模式可不设置
   * @type {string}
   * @memberof IApiMicroApp
   */
  dataId?: string;

  /**
   * @description  应用首页视图名称，功能组件服务模式必须设置、引用子应用集模式可不设置
   * @type {string}
   * @memberof IApiMicroApp
   */
  indexViewName?: string;

  /**
   * @description 应用首页视图权限标识
   * @type {string}
   * @memberof IApiMicroApp
   */
  indexAuthTag?: string;

  /**
   * @description 应用图标
   * @type {string}
   * @memberof IApiMicroApp
   */
  icon?: string;
}
