import { PanelItemState } from '@ibiz-template/runtime';

/**
 * 二维码数据接口
 *
 * @export
 * @interface IQrcode
 */
export interface IQrcode {
  /**
   * @description 过期时间（秒）
   * @exposedoc
   * @type {number}
   * @memberof IQrcode
   */
  expirein: number;

  /**
   * @description 票据
   * @exposedoc
   * @type {string}
   * @memberof IQrcode
   */
  ticket: string;

  /**
   * @description 二维码地址
   * @exposedoc
   * @type {string}
   * @memberof IQrcode
   */
  url: string;
}

/**
 * @description 微信公众号扫码登录UI状态对象
 * @exposedoc
 * @export
 * @class AuthWxmpQrcodeState
 * @extends {PanelItemState}
 */
export class AuthWxmpQrcodeState extends PanelItemState {
  /**
   * @description 二维码
   * @exposedoc
   * @type {IQrcode}
   * @memberof AuthWxmpQrcodeState
   */
  qrcode?: IQrcode;

  /**
   * @description 提示
   * @exposedoc
   * @type {string}
   * @memberof AuthWxmpQrcodeState
   */
  tips?: string;
}
