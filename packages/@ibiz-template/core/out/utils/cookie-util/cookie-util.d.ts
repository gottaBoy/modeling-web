/**
 * 设置cookie
 *
 * @static
 * @param {*} name 名称
 * @param {*} value 值
 * @param {*} day 过期天数
 * @param {boolean} [isDomain=false] 是否设置在主域下
 * @param {string} [path='/'] 默认归属路径
 * @param {string} [childDoMain=''] 子域,如果外部有传递，则需把cookie数据设置到传入子域上
 * @memberof Util
 */
export declare function setCookie(name: string, value: string, day?: number, isDomain?: boolean, path?: string, childDoMain?: string): void;
/**
 * 设置应用cookie
 *
 * @static
 * @param {*} name 名称
 * @param {*} value 值
 * @param {*} day 过期天数
 * @memberof Util
 */
export declare function setAppCookie(name: string, value: string, day?: number): void;
/**
 * 清除应用cookie
 *
 * @static
 * @param {string} cookieName
 * @memberof Util
 */
export declare function clearAppCookie(cookieName: string): void;
/**
 * 获取cookie
 *
 * @static
 * @param {string} name
 * @return {*}  {*}
 * @memberof Util
 */
export declare function getAppCookie(name: string): string | null;
/**
 * 重置应用cookie
 *
 * @author tony001
 * @date 2025-01-07 16:01:18
 * @export
 */
export declare function resetAppCookie(): void;
//# sourceMappingURL=cookie-util.d.ts.map