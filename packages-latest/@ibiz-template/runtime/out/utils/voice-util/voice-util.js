import { RuntimeError } from '@ibiz-template/core';
/**
 * 语音工具类
 *
 * @author ljx
 * @date 2024-12-20 15:07:31
 * @export
 * @class IVoiceUtil
 */
export class VoiceUtil {
    /**
     * 文字转语音
     *
     * @author ljx
     * @date 2024-12-20 15:07:31
     * @param {string} text
     * @param {IParams} options
     * @return {*}  {Promise<boolean>}
     */
    textToSpeech(text, options = {}) {
        return new Promise(resolve => {
            if ('SpeechSynthesisUtterance' in window) {
                // 定义发音请求
                const utterance = new SpeechSynthesisUtterance(text);
                Object.assign(utterance, Object.assign({ onend: () => resolve(true), onerror: () => resolve(false) }, options));
                // 播放语音
                window.speechSynthesis.speak(utterance);
            }
            else {
                ibiz.log.error(ibiz.i18n.t('runtime.controller.utils.voiceUtil.textToSpeechError'));
                resolve(false);
            }
        });
    }
    /**
     * 语音转文字
     *
     * @author ljx
     * @date 2024-12-20 15:07:31
     */
    speechToText() {
        throw new RuntimeError(ibiz.i18n.t('runtime.common.unrealized'));
    }
}
