import { PanelItemState } from '@ibiz-template/runtime';
/**
 * 二维码数据接口
 *
 * @export
 * @interface IQrcode
 */
export interface IQrcode {
    /**
     * 过期时间（秒）
     *
     * @type {number}
     * @memberof IQrcode
     */
    expirein: number;
    /**
     * 票据
     *
     * @type {string}
     * @memberof IQrcode
     */
    ticket: string;
    /**
     * 二维码地址
     *
     * @type {string}
     * @memberof IQrcode
     */
    url: string;
}
/**
 * 微信公众号扫码登录UI状态对象
 *
 * @export
 * @class AuthWxmpQrcodeState
 * @extends {PanelItemState}
 */
export declare class AuthWxmpQrcodeState extends PanelItemState {
    /**
     * 二维码
     *
     * @type {IQrcode}
     * @memberof AuthWxmpQrcodeState
     */
    qrcode?: IQrcode;
    /**
     * 提示
     *
     * @type {string}
     * @memberof AuthWxmpQrcodeState
     */
    tips?: string;
}
//# sourceMappingURL=auth-wxmp-qrcode.state.d.ts.map