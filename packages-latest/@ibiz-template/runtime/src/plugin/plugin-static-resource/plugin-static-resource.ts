import path from 'path-browserify';

/**
 * 插件静态资源工具类
 *
 * @author chitanda
 * @date 2022-11-03 10:11:08
 * @export
 * @class PluginStaticResource
 */
export class PluginStaticResource {
  /**
   * 是否为 http || https 开头
   *
   * @author chitanda
   * @date 2022-11-07 14:11:28
   * @protected
   */
  protected urlReg = /^http[s]?:\/\/[^\s]*/;

  /**
   * 计算出的静态资源跟路径
   *
   * @author chitanda
   * @date 2022-11-03 10:11:08
   * @protected
   * @type {string}
   */
  protected baseDir: string;

  /**
   * 已经输出过路径的 style 标签
   *
   * @author chitanda
   * @date 2023-03-23 10:03:38
   * @protected
   * @type {Map<string, null>}
   */
  protected styleElementMap: Map<string, null> = new Map();

  /**
   * mete 路径解析对象
   *
   * @author chitanda
   * @date 2023-07-06 20:07:36
   * @protected
   * @type {URL}
   */
  protected url: URL;

  /**
   * 插件静态资源工具类.
   *
   * @author chitanda
   * @date 2022-11-03 10:11:41
   * @param {string} mateUrl import.mate.url
   */
  constructor(mateUrl: string) {
    this.url = new URL(mateUrl);
    this.baseDir = path.dirname(this.url.pathname || this.url.hostname);
  }

  /**
   * 合并输出静态资源目录
   *
   * @author chitanda
   * @date 2022-11-03 10:11:39
   * @param {string} pathStr
   * @return {*}  {string}
   */
  dir(pathStr: string): string {
    if (this.urlReg.test(pathStr)) {
      return pathStr;
    }
    return this.url.origin + path.resolve(this.baseDir, pathStr);
  }

  /**
   * 加载样式静态资源
   *
   * @author chitanda
   * @date 2023-03-23 10:03:49
   * @param {string[]} urls
   * @return {*}  {Promise<void>}
   */
  async loadStyle(urls: string[]): Promise<void> {
    const all = urls.map(styleUrl => {
      const url = this.urlReg.test(styleUrl) ? styleUrl : this.dir(styleUrl);
      if (this.styleElementMap.has(url)) {
        return false;
      }
      this.styleElementMap.set(url, null);
      return new Promise((resolve, reject) => {
        const linkDom = document.createElement('link');
        linkDom.setAttribute('type', 'text/css');
        linkDom.setAttribute('rel', 'stylesheet');
        linkDom.setAttribute('href', url);
        linkDom.onload = resolve;
        linkDom.onerror = reject;
        document.head.appendChild(linkDom);
      });
    });
    try {
      await Promise.all(all);
    } catch (error) {
      ibiz.log.error(error);
    }
  }
}
