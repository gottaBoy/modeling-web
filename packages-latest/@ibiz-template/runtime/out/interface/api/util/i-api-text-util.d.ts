/**
 * @description 文本工具
 * @export
 * @interface IApiTextUtil
 */
export interface IApiTextUtil {
    /**
     * @description 按指定格式规则格式化文本（遵循 Excel 格式化规则）
     * @param {string} value 文本值
     * @param {string} format 格式
     * @returns {*}  {string}
     * @memberof IApiTextUtil
     */
    format(value: string, format: string): string;
    /**
     * @description 将文本复制到系统剪贴板，成功返回 true
     * @param {string} value 拷贝文本值
     * @returns {*}  {boolean}
     * @memberof IApiTextUtil
     */
    copy(value: string): boolean;
    /**
     * @description 判断字符串中是否包含中文字符
     * @param {string} str 文本
     * @returns {*}  {boolean}
     * @memberof IApiTextUtil
     */
    isChineseCharacter(str: string): boolean;
    /**
     * @description 判断字符串是否同时包含中文和英文字符
     * @param {string} str 文本
     * @returns {*}  {boolean}
     * @memberof IApiTextUtil
     */
    hasChineseAndEnglish(str: string): boolean;
    /**
     * @description 根据文本内容生成对应的十六进制颜色值
     * @param {string} text 颜色字符串
     * @returns {*}  {string}
     * @memberof IApiTextUtil
     */
    stringToHexColor(text: string): string;
    /**
     * @description 生成文本缩写（通常用于头像或标识展示）
     * @param {string} text 文本
     * @returns {*}  {(string | void)}
     * @memberof IApiTextUtil
     */
    abbreviation(text: string): string | void;
}
//# sourceMappingURL=i-api-text-util.d.ts.map