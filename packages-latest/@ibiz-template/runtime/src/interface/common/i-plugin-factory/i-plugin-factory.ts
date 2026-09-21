import { ISysPFPlugin } from '@ibiz/model-core';
import { IPluginItem } from '../i-plugin-item/i-plugin-item';

/**
 * 插件工厂
 *
 * @author chitanda
 * @date 2022-10-21 16:10:19
 * @export
 * @interface IPluginFactory
 */
export interface IPluginFactory {
  /**
   * 设置本地开发忽略远程加载插件
   *
   * @author chitanda
   * @date 2023-12-04 17:12:40
   * @param {(string | RegExp)} rule
   */
  setDevIgnore(rule: string | RegExp): void;
  /**
   * @description 加载插件
   * @param {ISysPFPlugin} plugin
   * @param {string} [appId]
   * @returns {*}  {Promise<boolean>}
   * @memberof IPluginFactory
   */
  loadPlugin(plugin: ISysPFPlugin, appId?: string): Promise<boolean>;
  /**
   * @description 加载应用引用插件
   * @param {string} rtObjectName
   * @param {string} rtObjectRepo
   * @param {string} [appId]
   * @param {IParams} [extraParams]
   * @returns {*}  {Promise<boolean>}
   * @memberof IPluginFactory
   */
  loadPluginRef(
    rtObjectName: string,
    rtObjectRepo: string,
    appId?: string,
    extraParams?: IParams,
  ): Promise<boolean>;
  /**
   * 给入应用实例，将已经加载的过插件注入。主要用于多实例的情况
   *
   * @author chitanda
   * @date 2023-02-02 16:02:39
   * @param {unknown} app
   */
  register(app: unknown): void;
  /**
   * 注册默认视图插件
   *
   * @author chitanda
   * @date 2023-02-06 21:02:06
   * @param {IPluginItem} plugin 其中 Name 将作为插件标识
   */
  registerPredefinedPlugin(plugin: IPluginItem): void;
  /**
   * 加载指定标识视图插件
   *
   * @author chitanda
   * @date 2023-03-09 18:03:44
   * @param {string} name 插件标识
   * @return {*}  {Promise<void>}
   */
  loadPredefinedPlugin(name: string): Promise<void>;
}
