import { IApiTextUtil } from '../../interface';
/**
 * @description 文本工具类
 * @export
 * @class TextUtil
 * @implements {IApiTextUtil}
 */
export declare class TextUtil implements IApiTextUtil {
    /**
     * @description input元素，用于存储拷贝的文本
     * @private
     * @type {(HTMLInputElement | null)}
     * @memberof TextUtil
     */
    private inputElement;
    /**
     * @description 值格式化
     * @param {string} value
     * @param {string} _code
     * @returns {*}  {string}
     * @memberof TextUtil
     */
    format(value: string, _code: string): string;
    /**
     * @description 拷贝文本
     * @param {string} value
     * @returns {*}  {boolean}
     * @memberof TextUtil
     */
    copy(value: string): boolean;
    /**
     * @description 获取主题色
     * @private
     * @returns {*}  {(string | null)}
     * @memberof TextUtil
     */
    private getThemeVar;
    /**
     * @description 文本是否包含中文字符
     * @param {string} str
     * @returns {*}  {boolean}
     * @memberof TextUtil
     */
    isChineseCharacter(str: string): boolean;
    /**
     * @description 文本是否同时存在中文和英文
     * @param {string} str
     * @returns {*}  {boolean}
     * @memberof TextUtil
     */
    hasChineseAndEnglish(str: string): boolean;
    /**
     * @description 字符串转16进制颜色
     * @param {string} text
     * @returns {*}  {string}
     * @memberof TextUtil
     */
    stringToHexColor(text: string): string;
    /**
     * @description 文本缩写
     * @param {string} text
     * @returns {*}  {(string | void)}
     * @memberof TextUtil
     */
    abbreviation(text: string): string | void;
}
//# sourceMappingURL=text-util.d.ts.map