import { IAjaxControl } from '../iajax-control';

/**
 *
 * 自定义部件模型对象接口
 * 继承父接口类型值[CUSTOM]
 * @export
 * @interface ICustomControl
 */
export interface ICustomControl extends IAjaxControl {
  /**
   * 自定义标记
   * @type {string}
   * 来源  getCustomTag
   */
  customTag?: string;

  /**
   * 自定义标记2
   * @type {string}
   * 来源  getCustomTag2
   */
  customTag2?: string;

  /**
   * 前端应用插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;

  /**
   * 预置类型
   * @type {string}
   * 来源  getPredefinedType
   */
  predefinedType?: string;
}
