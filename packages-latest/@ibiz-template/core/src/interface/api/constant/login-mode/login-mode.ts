/* eslint-disable no-shadow */
/**
 * @description 登录模式
 * @export
 * @enum {number}
 */
export enum LoginMode {
  /**
   * 默认标准登录
   */
  DEFAULT = 'DEFAULT',
  /**
   * 自定义登录
   */
  CUSTOM = 'CUSTOM',
  /**
   * 中央认证登录
   */
  CAS = 'CAS',

  /**
   * oauth登录
   */
  OAUTH = 'OAUTH',
}
