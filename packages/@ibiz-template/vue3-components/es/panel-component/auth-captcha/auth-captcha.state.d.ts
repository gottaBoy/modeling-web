import { PanelItemState } from '@ibiz-template/runtime';
/**
 * 人机识别状态
 *
 * @export
 * @class AuthCaptchaState
 * @extends {PanelItemState}
 */
export declare class AuthCaptchaState extends PanelItemState {
    /**
     * 验证码
     *
     * @type {string}
     * @memberof AuthCaptchaState
     */
    code: string;
    /**
     * 验证图片
     *
     * @type {string}
     * @memberof AuthCaptchaState
     */
    image: string;
    /**
     * 验证UUID码
     *
     * @type {string}
     * @memberof AuthCaptchaState
     */
    state: string;
    /**
     * 加载状态
     *
     * @type {boolean}
     * @memberof AuthCaptchaState
     */
    loading: boolean;
    /**
     * 错误信息
     *
     * @type {string}
     * @memberof AuthCaptchaState
     */
    error?: string;
}
