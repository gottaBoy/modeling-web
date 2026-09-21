import { PanelItemState } from '@ibiz-template/runtime';

/**
 * 人机识别状态
 * @description 人机识别状态
 * @export
 * @primary
 * @class AuthCaptchaState
 * @extends {PanelItemState}
 */
export class AuthCaptchaState extends PanelItemState {
  /**
   * @description 验证码
   * @exposedoc
   * @description ''
   * @type {string}
   * @memberof AuthCaptchaState
   */
  code: string = '';

  /**
   * @description 验证图片
   * @exposedoc
   * @type {string}
   * @memberof AuthCaptchaState
   */
  image: string = '';

  /**
   * @description 验证UUID码
   * @exposedoc
   * @type {string}
   * @memberof AuthCaptchaState
   */
  state: string = '';

  /**
   * @description 加载状态
   * @exposedoc
   * @type {boolean}
   * @memberof AuthCaptchaState
   */
  loading: boolean = false;

  /**
   * @description 错误信息
   * @type {string}
   * @exposedoc
   * @memberof AuthCaptchaState
   */
  error?: string;
}
