/**
 * 文本工具类
 *
 * @author zhanghengfeng
 * @date 2023-08-24 14:08:27
 * @export
 * @class TextUtil
 */
export declare class TextUtil {
    /**
     * input元素，用于存储拷贝的文本
     *
     * @author zhanghengfeng
     * @date 2023-08-31 20:08:06
     * @private
     * @type {(HTMLInputElement | null)}
     */
    private inputElement;
    /**
     * 值格式化
     *
     * @author zhanghengfeng
     * @date 2023-08-24 14:08:27
     * @param {string} value
     * @param {string} _code
     * @return {*}  {string}
     */
    format(value: string, _code: string): string;
    /**
     * 拷贝文本
     *
     * @author zhanghengfeng
     * @date 2023-08-31 11:08:51
     * @param {string} value
     * @return {*}  {boolean}
     */
    copy(value: string): boolean;
    /**
     * 获取主题色
     *
     * @private
     * @return {*}  {(string | null)}
     * @memberof TextUtil
     */
    private getThemeVar;
    /**
     * 文本是否包含中文字符
     *
     * @param {string} str 字符串
     * @return {*}  {boolean}
     * @memberof TextUtil
     */
    isChineseCharacter(str: string): boolean;
    /**
     * 文本是否同时存在中文和英文
     *
     * @param {string} str 字符串
     * @return {*}  {boolean}
     * @memberof TextUtil
     */
    hasChineseAndEnglish(str: string): boolean;
    /**
     * 字符串转16进制颜色
     *
     * @param {string} text 文本
     * @return {*}  {string}
     * @memberof TextUtil
     */
    stringToHexColor(text: string): string;
    /**
     * 文本缩写
     *
     * @param {string} text 字符串
     * @return {*}  {(string | void)}
     * @memberof TextUtil
     */
    abbreviation(text: string): string | void;
}
//# sourceMappingURL=text-util.d.ts.map