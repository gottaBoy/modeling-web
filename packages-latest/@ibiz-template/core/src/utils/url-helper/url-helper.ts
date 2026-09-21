/**
 * @description 路径解析助手
 * @export
 * @class UrlHelper
 */
export class UrlHelper {
  /**
   * @description 路由路径前面的基础路径。如：http://172.16.103.120:30061/portalwebapp/#/index/appportalview?params=123，返回：http://172.16.103.120:30061/portalwebapp/#
   * @readonly
   * @static
   * @type {string}
   * @memberof UrlHelper
   */
  static get routeBase(): string {
    const hashIndex = window.location.href.lastIndexOf('#/');
    return window.location.href.slice(0, hashIndex + 1);
  }

  /**
   * @description 应用的的基础路径。如：http://172.16.103.120:30061/portalwebapp/#/index/appportalview?params=123，返回：http://172.16.103.120:30061/portalwebapp
   * @readonly
   * @static
   * @type {string}
   * @memberof UrlHelper
   */
  static get appBase(): string {
    const { origin, pathname } = window.location;
    return `${origin}${pathname}`.replace(/\/$/, '');
  }

  /**
   * @description #开始到末尾，即路由地址。如：http://172.16.103.120:30061/portalwebapp/#/index/appportalview?params=123，返回：/index/appportalview?params=123
   * @readonly
   * @static
   * @type {string}
   * @memberof UrlHelper
   */
  static get routePath(): string {
    return window.location.hash.replace('#', '');
  }

  /**
   * @description 当前地址的全路径，包含域名和参数。如：http://172.16.103.120:30061/portalwebapp/#/index/appportalview?params=123
   * @readonly
   * @static
   * @type {string}
   * @memberof UrlHelper
   */
  static get fullPath(): string {
    return window.location.href;
  }
}
