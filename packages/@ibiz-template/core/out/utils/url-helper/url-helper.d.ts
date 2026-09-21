/**
 * 路径解析助手
 *
 * @author lxm
 * @date 2022-10-11 14:10:12
 * @export
 * @class UrlHelper
 */
export declare class UrlHelper {
    /**
     * 路由路径前面的基础路径
     * 如：http://172.16.103.120:30061/portalwebapp/#/index/appportalview?params=123
     * 返回：http://172.16.103.120:30061/portalwebapp/#
     *
     * @author lxm
     * @date 2022-10-11 20:10:29
     * @returns {*}
     */
    static get routeBase(): string;
    /**
     * 应用的的基础路径
     * 如：http://172.16.103.120:30061/portalwebapp/#/index/appportalview?params=123
     * 返回：http://172.16.103.120:30061/portalwebapp
     *
     * @author lxm
     * @date 2022-10-11 20:10:29
     * @returns {*}
     */
    static get appBase(): string;
    /**
     * #开始到末尾，即路由地址
     * 如：http://172.16.103.120:30061/portalwebapp/#/index/appportalview?params=123
     * 返回：/index/appportalview?params=123
     *
     * @author lxm
     * @date 2022-10-11 16:10:40
     * @returns {*}
     */
    static get routePath(): string;
    /**
     * 当前地址的全路径，包含域名和参数
     * 如：http://172.16.103.120:30061/portalwebapp/#/index/appportalview?params=123
     *
     * @author lxm
     * @date 2022-10-11 21:10:39
     * @readonly
     * @static
     */
    static get fullPath(): string;
}
//# sourceMappingURL=url-helper.d.ts.map