/* eslint-disable no-shadow */
/**
 * 搭载平台类型
 *
 * @author zk
 * @date 2023-11-20 03:11:28
 * @export
 * @enum {number}
 */
export enum PlatformType {
  /**
   * IOS
   */
  IOS = 'IOS',

  /**
   * 安卓
   */
  ANDROID = 'Android',

  /**
   * 微信
   */
  WECHAT = 'WeChat',

  /**
   * 腾讯QQ
   */
  QQ = 'QQ',

  /**
   * 钉钉
   */
  DINGTALK = 'DingTalk',

  /**
   * 浏览器
   */
  BROWSER = 'Browser',

  /**
   * 微信小程序
   */
  WCMP = 'WeChatMiniProgram',

  /**
   * 桌面端
   */
  DESKTOP = 'Desktop',
}
