import { RuntimeModelError, RuntimeError } from '@ibiz-template/core';
import { RemotePluginItem } from '@ibiz-template/runtime';
import path, { p as pathBrowserify } from '../../node_modules/.pnpm/path-browserify@1.0.1/node_modules/path-browserify/index.mjs';
import '../../hooks/index.mjs';
import { AppHooks } from '../../hooks/app/app.hooks.mjs';

"use strict";
class PluginFactory {
  constructor() {
    /**
     * 是否为 http || https 开头
     *
     * @author chitanda
     * @date 2022-11-07 14:11:28
     * @protected
     */
    this.urlReg = /^http[s]?:\/\/[^\s]*/;
    /**
     * 是否已经加载过文件缓存
     *
     * @author chitanda
     * @date 2022-10-31 14:10:17
     * @protected
     * @type {Map<string, boolean>}
     */
    this.cache = /* @__PURE__ */ new Map();
    /**
     * 插件缓存
     *
     * @author chitanda
     * @date 2022-10-31 14:10:28
     * @protected
     * @type {Map<string, RemotePluginItem>}
     */
    this.pluginCache = /* @__PURE__ */ new Map();
    /**
     * 所有的插件
     *
     * @author chitanda
     * @date 2023-02-02 16:02:55
     * @protected
     * @type {Plugin[]}
     */
    this.pluginCodes = [];
    /**
     * 预定义插件集合
     *
     * @author chitanda
     * @date 2023-03-09 17:03:46
     * @protected
     * @type {Map<string, IPluginItem>}
     */
    this.predefinedPlugins = /* @__PURE__ */ new Map();
    /**
     * 忽略加载的插件规则，支持正则。配配规则为插件包地址，如：@ibiz-template-vue/vue3-plugin-*
     *
     * @author chitanda
     * @date 2023-12-04 15:12:58
     * @protected
     * @type {((string | RegExp)[])}
     */
    this.ignoreRules = [];
    /**
     * 插件加载队列
     *
     * @author chitanda
     * @date 2023-12-05 16:12:04
     * @protected
     * @type {Map<string, Promise<boolean>>}
     */
    this.loadQueue = /* @__PURE__ */ new Map();
  }
  /**
   * 是否忽略插件加载
   *
   * @author chitanda
   * @date 2023-12-04 16:12:48
   * @protected
   * @param {string} pluginPath
   * @return {*}  {boolean}
   */
  isIgnore(pluginPath) {
    return this.ignoreRules.some((rule) => {
      if (typeof rule === "string") {
        return pluginPath === rule;
      }
      return rule.test(pluginPath);
    });
  }
  /**
   * 设置本地开发忽略远程加载的插件
   *
   * @author chitanda
   * @date 2023-12-04 17:12:49
   * @param {(string | RegExp)} rule
   */
  setDevIgnore(rule) {
    this.ignoreRules.push(rule);
  }
  /**
   * 注册视图默认插件
   *
   * @author chitanda
   * @date 2023-02-06 21:02:10
   * @param {IPluginItem} plugin
   */
  registerPredefinedPlugin(plugin) {
    this.predefinedPlugins.set(plugin.name, plugin);
  }
  /**
   * 给入应用实例，将已经加载的过插件注入。主要用于多实例的情况
   *
   * @author chitanda
   * @date 2023-02-02 16:02:51
   * @param {App} app
   */
  register(app) {
    this.pluginCodes.forEach((plugin) => {
      app.use(plugin);
    });
  }
  /**
   * 加载预置插件
   *
   * @author chitanda
   * @date 2023-03-09 18:03:48
   * @param {string} name
   * @return {*}  {Promise<void>}
   */
  async loadPredefinedPlugin(name) {
    if (this.predefinedPlugins.has(name)) {
      const plugin = this.predefinedPlugins.get(name);
      if (plugin) {
        await this.loadPluginRef(plugin.name, plugin.path);
      }
    }
  }
  /**
   * 插件刚加载完成回来，设置到目前所有的 vue 实例当中
   *
   * @author chitanda
   * @date 2023-02-02 17:02:38
   * @protected
   * @param {Plugin} code
   */
  setPluginCode(code) {
    this.pluginCodes.push(code);
    AppHooks.useComponent.callSync(null, code);
  }
  /**
   * 加载插件
   *
   * @author chitanda
   * @date 2022-10-31 14:10:13
   * @param {ISysPFPlugin} plugin
   * @return {*}  {Promise<boolean>}
   */
  async loadPlugin(plugin) {
    if (plugin.runtimeObject === true) {
      const pluginRef = plugin;
      if (pluginRef) {
        const rtObjectName = pluginRef.rtobjectName;
        const rtObjectRepo = pluginRef.rtobjectRepo;
        if (this.isIgnore(rtObjectRepo)) {
          return true;
        }
        if (this.pluginCache.has(rtObjectName)) {
          return true;
        }
        if (this.loadQueue.has(rtObjectRepo)) {
          const p = await this.loadQueue.get(rtObjectRepo);
          try {
            const result = await p;
            return result;
          } catch (error) {
            return false;
          }
        }
        try {
          const p = this.loadPluginRef(
            pluginRef.rtobjectName,
            pluginRef.rtobjectRepo
          );
          this.loadQueue.set(rtObjectRepo, p);
          const result = await p;
          return result;
        } catch (error) {
          throw new RuntimeModelError(
            pluginRef,
            ibiz.i18n.t("vue3Util.plugin.failureConfigurationLoad")
          );
        } finally {
          this.loadQueue.delete(rtObjectRepo);
        }
      }
    }
    return false;
  }
  /**
   * 加载应用插件
   *
   * @author chitanda
   * @date 2022-10-31 16:10:57
   * @param {IPSAppPFPluginRef} pluginRef
   * @return {*}  {Promise<boolean>}
   */
  async loadPluginRef(rtObjectName, rtObjectRepo) {
    if (this.isIgnore(rtObjectRepo)) {
      return true;
    }
    if (this.pluginCache.has(rtObjectName)) {
      return true;
    }
    let configData = null;
    {
      const pluginPath = rtObjectRepo;
      const configUrl = this.urlReg.test(pluginPath) ? "".concat(pluginPath, "/package.json") : "".concat(ibiz.env.pluginBaseUrl, "/").concat(pathBrowserify.join(pluginPath, "package.json"));
      const res = await ibiz.net.axios({
        method: "get",
        headers: { "Access-Control-Allow-Origin": "*" },
        url: configUrl
      });
      if (res.status !== 200) {
        throw new Error(
          ibiz.i18n.t("vue3Util.plugin.failureConfigurationLoad")
        );
      }
      configData = res.data;
    }
    const remotePlugin = new RemotePluginItem(
      rtObjectName,
      rtObjectRepo,
      configData
    );
    if (remotePlugin) {
      await this.loadPluginExternal(remotePlugin.config);
      try {
        await this.loadScript(remotePlugin);
        this.pluginCache.set(rtObjectName, remotePlugin);
        return true;
      } catch (error) {
        ibiz.log.error(error);
      }
    }
    return false;
  }
  /**
   * 加载插件
   *
   * @author chitanda
   * @date 2022-11-02 14:11:31
   * @protected
   * @param {RemotePluginItem} remotePlugin
   * @return {*}  {Promise<void>}
   */
  async loadScript(remotePlugin) {
    const pluginPath = remotePlugin.repo;
    const { name, system, styles = [] } = remotePlugin.config;
    let scriptUrl = "";
    scriptUrl = pathBrowserify.join(pluginPath, system);
    if (scriptUrl) {
      if (this.cache.has(scriptUrl)) {
        return;
      }
      let data = null;
      const url = this.parseUrl(scriptUrl);
      const styleUrls = (typeof styles === "string" ? [styles] : styles).map(
        (styleUrl) => this.parseUrl(path.join(pluginPath, styleUrl))
      );
      System.addImportMap({
        imports: {
          [name]: url
        },
        styles: {
          [name]: styleUrls
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      });
      data = await System.import(name);
      if (data) {
        if (data.default) {
          this.setPluginCode(data.default);
        } else {
          throw new RuntimeError(
            ibiz.i18n.t("vue3Util.plugin.failedRemotePluginLoad")
          );
        }
        this.cache.set(scriptUrl, true);
      } else {
        throw new RuntimeError(
          ibiz.i18n.t("vue3Util.plugin.fileContentFormat")
        );
      }
    }
  }
  /**
   * 编译请求文件地址
   *
   * @author chitanda
   * @date 2024-01-11 16:01:19
   * @protected
   * @param {string} pathUrl
   * @param {string} [baseUrl=ibiz.env.pluginBaseUrl]
   * @return {*}  {string}
   */
  parseUrl(pathUrl, baseUrl = ibiz.env.pluginBaseUrl) {
    if (this.urlReg.test(pathUrl)) {
      return pathUrl;
    }
    let url = "";
    if (this.urlReg.test(baseUrl)) {
      if (pathUrl.startsWith("/")) {
        url = baseUrl + pathUrl;
      } else {
        url = "".concat(baseUrl, "/").concat(pathUrl);
      }
    } else {
      url = "".concat(pathBrowserify.join(baseUrl, pathUrl));
    }
    const { origin, pathname } = window.location;
    if (pathname.endsWith("/") && url.startsWith("/")) {
      url = url.substring(1);
    }
    if (this.urlReg.test(url) === false) {
      url = "".concat(origin).concat(pathname).concat(url);
    }
    return url;
  }
  /**
   * 加载插件的外部依赖
   *
   * @author chitanda
   * @date 2024-01-19 19:01:39
   * @protected
   * @param {RemotePluginConfig} config
   * @return {*}  {Promise<void>}
   */
  async loadPluginExternal(config) {
    if (!config["systemjs-importmap"]) {
      return;
    }
    const importMap = this.handleSystemImportMap(config["systemjs-importmap"]);
    if (importMap.packages) {
      const pkgs = importMap.packages;
      for (const key in pkgs) {
        const pkgPath = pkgs[key];
        const res = await ibiz.net.axios({
          method: "get",
          headers: { "Access-Control-Allow-Origin": "*" },
          url: pkgPath
        });
        if (res.status !== 200) {
          throw new Error(
            ibiz.i18n.t("vue3Util.plugin.failureConfigurationLoad")
          );
        }
        await this.loadPluginExternal(res.data);
      }
    }
    System.addImportMap(importMap);
  }
  /**
   * 处理 systemjs importmap 配置
   *
   * @author chitanda
   * @date 2024-01-11 20:01:07
   * @protected
   * @param {ISystemImportMap} importMap
   * @return {*}  {IParams}
   */
  handleSystemImportMap(importMap) {
    if (importMap) {
      if (importMap.packages) {
        const pkgs = importMap.packages;
        for (const key in pkgs) {
          if (Object.prototype.hasOwnProperty.call(pkgs, key)) {
            const url = pkgs[key];
            pkgs[key] = this.parseUrl(url, importMap.baseUrl);
          }
        }
      }
      if (importMap.imports) {
        const imps = importMap.imports;
        for (const key in imps) {
          if (Object.prototype.hasOwnProperty.call(imps, key)) {
            const url = imps[key];
            imps[key] = this.parseUrl(url, importMap.baseUrl);
          }
        }
      }
      if (importMap.styles) {
        const styles = importMap.styles;
        for (const key in styles) {
          if (Object.prototype.hasOwnProperty.call(styles, key)) {
            const urls = styles[key];
            if (typeof urls === "string") {
              styles[key] = this.parseUrl(urls, importMap.baseUrl);
            } else {
              styles[key] = urls.map(
                (url) => this.parseUrl(url, importMap.baseUrl)
              );
            }
          }
        }
      }
      return importMap;
    }
    return null;
  }
}

export { PluginFactory };
