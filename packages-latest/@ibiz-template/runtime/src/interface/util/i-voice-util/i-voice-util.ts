import { IApiVoiceUtil } from '../../api';

/**
 * @description 语音工具类
 * @export
 * @interface IVoiceUtil
 * @extends {IApiVoiceUtil}
 */
export interface IVoiceUtil extends IApiVoiceUtil {
  /**
   * @description 文字转语音
   * @param {string} text
   * @param {IParams} [options]
   * @returns {*}  {Promise<boolean>}
   * @memberof IVoiceUtil
   */
  textToSpeech(text: string, options?: IParams): Promise<boolean>;

  /**
   * @description 语音转文字
   * @memberof IVoiceUtil
   */
  speechToText(): void;
}
