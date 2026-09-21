import { CoreConst } from '../../constant';

/**
 * @description 获取所有的访问数据键名称
 * @returns {string[]} 包含所有访问数据键名称的数组，如果出现错误则返回空数组
 */
function getAccessStoreAreakeys(): string[] {
  try {
    const key = CoreConst.ACCESS_STORE_AREA_KEYS;
    let cookieAlls;
    switch (ibiz.env.accessStoreArea) {
      case 'LOCALSTORAGE':
        cookieAlls = localStorage.getItem(key);
        break;
      case 'SESSIONSTORAGE':
        cookieAlls = sessionStorage.getItem(key);
        break;
      default:
        break;
    }
    return JSON.parse(cookieAlls || '[]');
  } catch (error) {
    ibiz.log.error(error);
    return [];
  }
}

/**
 * @description 将新的访问数据键名称添加到已有的名称列表中
 * @param {string} name 要添加的访问数据键名称
 */
function setAccessStoreAreakeys(name: string): void {
  try {
    const cookieAlls: string[] = [
      ...new Set(getAccessStoreAreakeys().concat([name])),
    ];
    const key = CoreConst.ACCESS_STORE_AREA_KEYS;
    switch (ibiz.env.accessStoreArea) {
      case 'LOCALSTORAGE':
        return localStorage.setItem(key, JSON.stringify(cookieAlls));
      case 'SESSIONSTORAGE':
        return sessionStorage.setItem(key, JSON.stringify(cookieAlls));
      default:
        break;
    }
  } catch (error) {
    ibiz.log.error(error);
  }
}

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
export function setCookie(
  name: string,
  value: string,
  day = 0,
  isDomain = false,
  path = '/',
  childDoMain: string = '',
): void {
  let domain = '';
  setAccessStoreAreakeys(name);
  switch (ibiz.env.accessStoreArea) {
    case 'LOCALSTORAGE':
      return localStorage.setItem(name, value);
    case 'SESSIONSTORAGE':
      return sessionStorage.setItem(name, value);
    default:
      // 设置cookie到主域下
      if (isDomain) {
        // 是否为ip正则
        const regExpr =
          /^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/;
        // 为ip时忽略
        if (!regExpr.test(window.location.hostname)) {
          const host = window.location.hostname;
          if (host.indexOf('.') !== host.lastIndexOf('.')) {
            domain = `;domain=${host.substring(host.indexOf('.'), host.length)}`;
          }
        }
      } else if (childDoMain) {
        domain = `;domain=${childDoMain}`;
      }
      // 当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
      if (day !== 0) {
        const expires = day * 24 * 60 * 60 * 1000;
        const date = new Date(new Date().getTime() + expires);
        document.cookie = `${name}=${escape(
          value,
        )};path=${path};expires=${date.toUTCString()}${domain}`;
      } else {
        document.cookie = `${name}=${escape(value)};path=${path}${domain}`;
      }
      break;
  }
}

/**
 * @description 设置应用cookie
 * @export
 * @param {string} name 名称
 * @param {string} value 值
 * @param {number} [day=0] 过期天数
 */
export function setAppCookie(
  name: string,
  value: string,
  day: number = 0,
): void {
  if (
    ibiz.env.cookieDomain &&
    window.location.href.indexOf(ibiz.env.cookieDomain) !== -1
  ) {
    setCookie(name, value, day, false, '/', ibiz.env.cookieDomain);
  } else {
    setCookie(name, value, day, true);
  }
}

/**
 * @description 清除应用cookie
 * @export
 * @param {string} cookieName
 */
export function clearAppCookie(cookieName: string): void {
  if (
    ibiz.env.cookieDomain &&
    window.location.href.indexOf(ibiz.env.cookieDomain) !== -1
  ) {
    setCookie(cookieName, '', -1, false, '/', ibiz.env.cookieDomain);
  } else {
    setCookie(cookieName, '', -1, true);
  }
}
/**
 * @description 获取cookie
 * @export
 * @param {string} name
 * @returns {*}  {(string | null)}
 */
export function getAppCookie(name: string): string | null {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  const arr = document.cookie.match(reg);
  switch (ibiz.env.accessStoreArea) {
    case 'LOCALSTORAGE':
      return localStorage.getItem(name);
    case 'SESSIONSTORAGE':
      return sessionStorage.getItem(name);
    default:
      if (arr && arr.length > 1) {
        return unescape(arr[2]);
      }
      return null;
  }
}

/**
 * @description 重置应用cookie
 * @export
 */
export function resetAppCookie(): void {
  const cookies = document.cookie.split(';');
  const cookieAlls = getAccessStoreAreakeys().concat([
    CoreConst.ACCESS_STORE_AREA_KEYS,
  ]);
  switch (ibiz.env.accessStoreArea) {
    case 'LOCALSTORAGE':
      for (const name of cookieAlls) {
        localStorage.removeItem(name);
      }
      break;
    case 'SESSIONSTORAGE':
      for (const name of cookieAlls) {
        sessionStorage.removeItem(name);
      }
      break;
    default:
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        document.cookie = `${cookieName}=${cookieValue};expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=${window.location.host}`;
      }
      break;
  }
}
