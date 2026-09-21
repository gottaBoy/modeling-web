import { reactive } from 'vue';
import { IPanelRawItem } from '@ibiz/model-core';
import {
  ControllerEvent,
  IAppLoginViewEvent,
  PanelItemController,
  PanelNotifyState,
} from '@ibiz-template/runtime';
import axios, { AxiosRequestConfig } from 'axios';
import { AuthCaptchaState } from './auth-captcha.state';

/**
 * @description 主要是用于加载图片验证码。
 * @export
 * @class AuthCaptchaController
 * @extends {PanelItemController<IPanelRawItem>}
 */
export class AuthCaptchaController extends PanelItemController<IPanelRawItem> {
  /**
   * @description 人机识别状态对象
   * @exposedoc
   * @type {AuthCaptchaState}
   * @memberof AuthCaptchaController
   */
  declare state: AuthCaptchaState;

  /**
   * 验证码数据
   *
   * @private
   * @memberof AuthCaptchaController
   */
  private captcha = reactive({
    'Captcha-State': '',
    'Captcha-Code': '',
  });

  /**
   * 创建人机识别状态对象
   *
   * @protected
   * @return {*}  {AuthCaptchaState}
   * @memberof AuthCaptchaController
   */
  protected createState(): AuthCaptchaState {
    return new AuthCaptchaState(this.parent?.state);
  }

  /**
   * 面板状态变更通知
   *
   * @param {PanelNotifyState} _state
   * @return {*}  {Promise<void>}
   * @memberof AuthCaptchaController
   */
  async panelStateNotify(_state: PanelNotifyState): Promise<void> {
    super.panelStateNotify(_state);
    this.data.captcha = this.captcha;
  }

  /**
   * 初始化
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof AuthCaptchaController
   */
  protected async onInit(): Promise<void> {
    super.onInit();
    await this.loadCaptcha();
    (this.panel.view.evt as ControllerEvent<IAppLoginViewEvent>).on(
      'onAfterLogin',
      evt => {
        if (
          !evt.ok &&
          (!evt.panelDataParent ||
            evt.panelDataParent === this.dataParent.model.id)
        ) {
          this.loadCaptcha();
          this.state.code = '';
        }
      },
    );
  }

  /**
   * 值校验
   *
   * @return {*}  {Promise<boolean>}
   * @memberof AuthCaptchaController
   */
  async validate(): Promise<boolean> {
    // 人机识别目前仅支持空值校验
    if (this.state.code) {
      this.state.error = undefined;
      return true;
    }
    this.state.error = '请输入验证码';
    return false;
  }

  /**
   * 值改变
   *
   * @memberof AuthCaptchaController
   */
  onChange(): void {
    Object.assign(this.captcha, {
      'Captcha-State': this.state.state,
      'Captcha-Code': this.state.code,
    });
  }

  /**
   * @description 加载验证码
   * @exposedoc
   * @return {*}  {Promise<void>}ss
   * @memberof AuthCaptchaController
   */
  async loadCaptcha(): Promise<void> {
    this.state.loading = true;
    const requestConfig: AxiosRequestConfig = {
      url: `${ibiz.env.baseUrl}/${ibiz.env.appId}/auths/captcha`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'application/json',
      },
      data: {},
    };
    try {
      const res = await axios(requestConfig);
      if (res.status === 200 && res.data) {
        this.state.state = res.data.state;
        this.state.image = res.data.image;
      }
    } catch (error) {
      this.state.state = '';
      this.state.image = '';
    } finally {
      this.state.loading = false;
      this.onChange();
    }
  }
}
