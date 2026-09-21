import { IPanelRawItem } from '@ibiz/model-core';
import { PanelItemController, PanelNotifyState } from '@ibiz-template/runtime';
import { AuthCaptchaState } from './auth-captcha.state';
/**
 * 人机识别控制器
 *
 * @export
 * @class AuthCaptchaController
 * @extends {PanelItemController<IPanelRawItem>}
 */
export declare class AuthCaptchaController extends PanelItemController<IPanelRawItem> {
    /**
     * 人机识别状态对象
     *
     * @type {AuthCaptchaState}
     * @memberof AuthCaptchaController
     */
    state: AuthCaptchaState;
    /**
     * 验证码数据
     *
     * @private
     * @memberof AuthCaptchaController
     */
    private captcha;
    /**
     * 创建人机识别状态对象
     *
     * @protected
     * @return {*}  {AuthCaptchaState}
     * @memberof AuthCaptchaController
     */
    protected createState(): AuthCaptchaState;
    /**
     * 面板状态变更通知
     *
     * @param {PanelNotifyState} _state
     * @return {*}  {Promise<void>}
     * @memberof AuthCaptchaController
     */
    panelStateNotify(_state: PanelNotifyState): Promise<void>;
    /**
     * 初始化
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof AuthCaptchaController
     */
    protected onInit(): Promise<void>;
    /**
     * 值校验
     *
     * @return {*}  {Promise<boolean>}
     * @memberof AuthCaptchaController
     */
    validate(): Promise<boolean>;
    /**
     * 值改变
     *
     * @memberof AuthCaptchaController
     */
    onChange(): void;
    /**
     * 加载验证码
     *
     * @return {*}  {Promise<void>}ss
     * @memberof AuthCaptchaController
     */
    loadCaptcha(): Promise<void>;
}
