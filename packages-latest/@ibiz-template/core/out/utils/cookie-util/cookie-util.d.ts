/**
 * @description 设置cookie
 * @export
 * @param {string} name    cookie名称
 * @param {string} value   cookie值
 * @param {number} [day=0] 过期天数
 * @param {boolean} [isDomain=false] 是否设置在主域下
 * @param {string} [path='/'] 默认归属路径
 * @param {string} [childDoMain=''] 子域,如果外部有传递，则需把cookie数据设置到传入子域上
 */
export declare function setCookie(name: string, value: string, day?: number, isDomain?: boolean, path?: string, childDoMain?: string): void;
/**
 * @description 设置应用cookie
 * @export
 * @param {string} name 名称
 * @param {string} value 值
 * @param {number} [day=0] 过期天数
 */
export declare function setAppCookie(name: string, value: string, day?: number): void;
/**
 * @description 清除应用cookie
 * @export
 * @param {string} cookieName
 */
export declare function clearAppCookie(cookieName: string): void;
/**
 * @description 获取cookie
 * @export
 * @param {string} name
 * @returns {*}  {(string | null)}
 */
export declare function getAppCookie(name: string): string | null;
/**
 * @description 重置应用cookie
 * @export
 */
export declare function resetAppCookie(): void;
//# sourceMappingURL=cookie-util.d.ts.map