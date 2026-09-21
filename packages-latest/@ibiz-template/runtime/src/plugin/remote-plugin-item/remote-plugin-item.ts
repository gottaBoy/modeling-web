/**
 * systemjs importmap 配置定义
 *
 * @author chitanda
 * @date 2024-01-11 20:01:45
 * @export
 * @interface ISystemImportMap
 */
export interface ISystemImportMap {
  /**
   * 基础路径
   *
   * @author chitanda
   * @date 2024-01-11 20:01:53
   * @type {string}
   */
  baseUrl?: string;
  /**
   * package.json 清单
   *
   * @author chitanda
   * @date 2024-01-11 20:01:57
   * @type {{ [key: string]: string }}
   */
  packages: { [key: string]: string };
  /**
   * 脚本
   *
   * @author chitanda
   * @date 2024-01-11 20:01:57
   * @type {{ [key: string]: string }}
   */
  imports: { [key: string]: string };
  /**
   * 样式
   *
   * @author chitanda
   * @date 2024-01-11 20:01:38
   * @type {({ [key: string]: string | string[] })}
   */
  styles: { [key: string]: string | string[] };
}

/**
 * 远程插件配置
 *
 * @author chitanda
 * @date 2022-10-31 16:10:34
 * @export
 * @interface RemotePluginConfig
 */
export interface RemotePluginConfig {
  /**
   * 所有配置文件基础路径
   *
   * @author chitanda
   * @date 2022-11-02 14:11:06
   * @type {string}
   */
  baseUrl: string;
  /**
   * 包名称
   *
   * @author chitanda
   * @date 2022-10-31 16:10:42
   * @type {string}
   */
  name: string;
  /**
   * 版本
   *
   * @author chitanda
   * @date 2022-11-02 15:11:03
   * @type {string}
   */
  version: string;
  /**
   * system js 入口脚本
   *
   * @author chitanda
   * @date 2022-11-02 15:11:28
   * @type {string}
   */
  system: string;
  /**
   * 模块文件 入口脚本
   *
   * @author chitanda
   * @date 2022-11-02 16:11:50
   * @type {string}
   */
  module: string;
  /**
   * 样式地址
   *
   * @author chitanda
   * @date 2022-10-31 16:10:46
   * @type {(string | string[])}
   */
  styles: string | string[];
  /**
   * 是否为应用级
   *
   * @author chitanda
   * @date 2022-10-31 16:10:51
   * @type {boolean}
   */
  app?: boolean;
  /**
   * 额外的 systemjs 模块声明
   *
   * @author chitanda
   * @date 2024-01-11 20:01:37
   * @type {ISystemImportMap}
   */
  'systemjs-importmap'?: ISystemImportMap;
  /**
   * @description 应用标识（由运行时拼接，方便全代码微应用模式使用）
   * @type {string}
   * @memberof RemotePluginConfig
   */
  appId: string;

  /**
   * @description 扩展参数
   * @type {IParams}
   * @memberof RemotePluginConfig
   */
  extraParams: IParams;
}

/**
 * 远程插件项
 *
 * @author chitanda
 * @date 2022-10-31 12:10:41
 * @export
 * @class RemotePluginItem
 */
export class RemotePluginItem {
  /**
   * 唯一标识
   *
   * @author chitanda
   * @date 2022-10-31 12:10:48
   * @type {string}
   */
  readonly tag: string;

  /**
   * 插件模型
   *
   * @author chitanda
   * @date 2023-01-30 15:01:37
   * @type {IAppPFPluginRef}
   */
  readonly repo: string;

  /**
   * 配置参数
   *
   * @author chitanda
   * @date 2022-11-02 15:11:38
   * @type {RemotePluginConfig}
   */
  readonly config: RemotePluginConfig;

  /**
   * Creates an instance of RemotePluginItem.
   *
   * @author chitanda
   * @date 2023-02-02 15:02:13
   * @param {string} tag 插件标识名称
   * @param {string} repo 插件路径
   * @param {RemotePluginConfig} config
   */
  constructor(tag: string, repo: string, config: RemotePluginConfig) {
    this.tag = tag;
    this.repo = repo;
    this.config = config;
  }
}
