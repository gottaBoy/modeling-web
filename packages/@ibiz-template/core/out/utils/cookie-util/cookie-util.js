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
export function setCookie(name, value, day = 0, isDomain = false, path = '/', childDoMain = '') {
    let domain = '';
    // 设置cookie到主域下
    if (isDomain) {
        // 是否为ip正则
        const regExpr = /^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/;
        // 为ip时忽略
        if (!regExpr.test(window.location.hostname)) {
            const host = window.location.hostname;
            if (host.indexOf('.') !== host.lastIndexOf('.')) {
                domain = `;domain=${host.substring(host.indexOf('.'), host.length)}`;
            }
        }
    }
    else if (childDoMain) {
        domain = `;domain=${childDoMain}`;
    }
    // 当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
    if (day !== 0) {
        const expires = day * 24 * 60 * 60 * 1000;
        const date = new Date(new Date().getTime() + expires);
        document.cookie = `${name}=${escape(value)};path=${path};expires=${date.toUTCString()}${domain}`;
    }
    else {
        document.cookie = `${name}=${escape(value)};path=${path}${domain}`;
    }
}
/**
 * 设置应用cookie
 *
 * @static
 * @param {*} name 名称
 * @param {*} value 值
 * @param {*} day 过期天数
 * @memberof Util
 */
export function setAppCookie(name, value, day = 0) {
    if (ibiz.env.cookieDomain &&
        window.location.href.indexOf(ibiz.env.cookieDomain) !== -1) {
        setCookie(name, value, day, false, '/', ibiz.env.cookieDomain);
    }
    else {
        setCookie(name, value, day, true);
    }
}
/**
 * 清除应用cookie
 *
 * @static
 * @param {string} cookieName
 * @memberof Util
 */
export function clearAppCookie(cookieName) {
    if (ibiz.env.cookieDomain &&
        window.location.href.indexOf(ibiz.env.cookieDomain) !== -1) {
        setCookie(cookieName, '', -1, false, '/', ibiz.env.cookieDomain);
    }
    else {
        setCookie(cookieName, '', -1, true);
    }
}
/**
 * 获取cookie
 *
 * @static
 * @param {string} name
 * @return {*}  {*}
 * @memberof Util
 */
export function getAppCookie(name) {
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    const arr = document.cookie.match(reg);
    if (arr && arr.length > 1) {
        return unescape(arr[2]);
    }
    return null;
}
/**
 * 重置应用cookie
 *
 * @author tony001
 * @date 2025-01-07 16:01:18
 * @export
 */
export function resetAppCookie() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        document.cookie = `${cookieName}=${cookieValue};expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=${window.location.host}`;
    }
}
