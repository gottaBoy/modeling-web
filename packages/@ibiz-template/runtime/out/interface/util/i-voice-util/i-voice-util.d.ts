/**
 * 语音工具类
 *
 * @author ljx
 * @date 2024-12-20 15:07:31
 * @export
 * @interface IVoiceUtil
 */
export interface IVoiceUtil {
    /**
     * 文字转语音
     *
     * @author ljx
     * @date 2024-12-20 15:07:31
     * @param {string} text
     * @param {IParams} options
     * @return {*}  {Promise<boolean>}
     */
    textToSpeech(text: string, options?: IParams): Promise<boolean>;
    /**
     * 语音转文字
     *
     * @author ljx
     * @date 2024-12-20 15:07:31
     */
    speechToText(): void;
}
//# sourceMappingURL=i-voice-util.d.ts.map