import { IMicroAppConfig, IMicroAppConfigCenter } from '../interface';

/**
 * @description 微应用配置中心
 * @export
 * @class MicroAppConfigCenter
 * @implements {IMicroAppConfigCenter}
 */
export class MicroAppConfigCenter implements IMicroAppConfigCenter {
  /**
   * @description 已注册的微应用
   * @protected
   * @type {Map<string, IMicroAppConfig>}
   * @memberof MicroAppConfigCenter
   */
  protected apps: Map<string, IMicroAppConfig> = new Map();

  /**
   * @description 注册微应用
   * @param {IMicroAppConfig[]} apps
   * @returns {*}  {void}
   * @memberof MicroAppConfigCenter
   */
  public registerMicroApps(apps: IMicroAppConfig[]): void {
    if (!apps || apps.length === 0) {
      return;
    }
    apps.forEach(app => {
      this.apps.set(app.name, app);
    });
  }

  /**
   * @description 获取微应用列表
   * @returns {*}  {IMicroAppConfig[]}
   * @memberof MicroAppConfigCenter
   */
  public getMicroApps(): IMicroAppConfig[] {
    return Array.from(this.apps.values());
  }

  /**
   * @description 获取指定名称的微应用
   * @param {string} name
   * @returns {*}  {(IMicroAppConfig | undefined)}
   * @memberof MicroAppConfigCenter
   */
  public getMicroApp(name: string): IMicroAppConfig | undefined {
    return this.apps.get(name);
  }

  /**
   * @description 获取插件基础路径
   * @param {string} name
   * @returns {*}  {string}
   * @memberof MicroAppConfigCenter
   */
  getPluginBaseUrl(name: string): string {
    if (ibiz.env.runContainer === 'FULLCODE' && name !== ibiz.env.appId) {
      const microAppConfig = this.getMicroApp(name);
      if (microAppConfig && microAppConfig.pluginBaseUrl) {
        const microAppPluginBaseUrl = new URL(
          microAppConfig.pluginBaseUrl,
          microAppConfig.entry,
        ).href;
        return `${microAppPluginBaseUrl}`;
      }
    }
    return ibiz.env.pluginBaseUrl;
  }
}
