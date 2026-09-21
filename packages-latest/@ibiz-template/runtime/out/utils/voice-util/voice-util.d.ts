import { IVoiceUtil } from '../../interface';
/**
 * 语音工具类
 *
 * @author ljx
 * @date 2024-12-20 15:07:31
 * @export
 * @class IVoiceUtil
 */
export declare class VoiceUtil implements IVoiceUtil {
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
//# sourceMappingURL=voice-util.d.ts.map