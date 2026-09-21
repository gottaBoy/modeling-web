/**
 * 文本工具类
 *
 * @author zhanghengfeng
 * @date 2023-08-24 14:08:27
 * @export
 * @class TextUtil
 */
export class TextUtil {
    constructor() {
        /**
         * input元素，用于存储拷贝的文本
         *
         * @author zhanghengfeng
         * @date 2023-08-31 20:08:06
         * @private
         * @type {(HTMLInputElement | null)}
         */
        this.inputElement = null;
    }
    /**
     * 值格式化
     *
     * @author zhanghengfeng
     * @date 2023-08-24 14:08:27
     * @param {string} value
     * @param {string} _code
     * @return {*}  {string}
     */
    format(value, _code) {
        return value;
    }
    /**
     * 拷贝文本
     *
     * @author zhanghengfeng
     * @date 2023-08-31 11:08:51
     * @param {string} value
     * @return {*}  {boolean}
     */
    copy(value) {
        if (!this.inputElement) {
            this.inputElement = document.createElement('input');
            this.inputElement.style.position = 'absolute';
            this.inputElement.style.left = '-9999px';
            document.body.appendChild(this.inputElement);
        }
        this.inputElement.value = value;
        this.inputElement.select();
        return document.execCommand('copy');
    }
    /**
     * 获取主题色
     *
     * @private
     * @return {*}  {(string | null)}
     * @memberof TextUtil
     */
    getThemeVar() {
        const root = document.documentElement;
        if (!root) {
            return null;
        }
        const style = getComputedStyle(root);
        const primary = style.getPropertyValue('--ibiz-color-primary');
        return primary;
    }
    /**
     * 文本是否包含中文字符
     *
     * @param {string} str 字符串
     * @return {*}  {boolean}
     * @memberof TextUtil
     */
    isChineseCharacter(str) {
        const chinesePattern = /[\u4e00-\u9fa5]/;
        return chinesePattern.test(str);
    }
    /**
     * 文本是否同时存在中文和英文
     *
     * @param {string} str 字符串
     * @return {*}  {boolean}
     * @memberof TextUtil
     */
    hasChineseAndEnglish(str) {
        const regex = /[\u4e00-\u9fa5]+.*[a-zA-Z]+|[a-zA-Z]+.*[\u4e00-\u9fa5]+/;
        return regex.test(str);
    }
    /**
     * 字符串转16进制颜色
     *
     * @param {string} text 文本
     * @return {*}  {string}
     * @memberof TextUtil
     */
    stringToHexColor(text) {
        if (!text)
            return '';
        // 计算字符串的哈希值
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            if (this.isChineseCharacter(text)) {
                // eslint-disable-next-line no-bitwise
                hash = text.charCodeAt(i) + ((hash << 5) - hash);
                // eslint-disable-next-line operator-assignment, no-bitwise
                hash = hash & hash;
            }
            else {
                const charCode = text.charCodeAt(i);
                hash += charCode.toString(16);
            }
        }
        // 将哈希值转换为16进制颜色代码
        const trimmedHash = String(hash).substring(0, 6);
        let r = parseInt(trimmedHash.substring(0, 2), 16);
        let g = parseInt(trimmedHash.substring(2, 4), 16);
        let b = parseInt(trimmedHash.substring(4, 6), 16);
        if (r < 0) {
            r = 10;
        }
        if (g < 0) {
            g = 10;
        }
        if (b < 0) {
            b = 10;
        }
        const colorCode = `#${r.toString(16).padStart(2, '0')}${g
            .toString(16)
            .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        if (colorCode === '#FFFFFF') {
            return this.getThemeVar() || colorCode;
        }
        return colorCode;
    }
    /**
     * 文本缩写
     *
     * @param {string} text 字符串
     * @return {*}  {(string | void)}
     * @memberof TextUtil
     */
    abbreviation(text) {
        if (text && text.toString().length < 2) {
            return text;
        }
        if (text && text.toString().length >= 2) {
            // 大于两个字符
            const tag = this.hasChineseAndEnglish(text);
            // 存在中英文混合情况，按顺序取第一个英文与第一个中文
            if (tag) {
                const engChar = text.split('').find((char) => {
                    return /[a-zA-Z]/.test(char);
                }) || '';
                const chineseStr = text.split('').find((char) => {
                    return /[\u4E00-\u9FA5]/.test(char);
                }) || '';
                return `${engChar}${chineseStr}`.toLowerCase();
            }
            // 只存在英文，取前两个
            const engTag = /[a-zA-Z]/.test(text);
            if (engTag) {
                return text
                    .split('')
                    .filter((char) => {
                    return /[a-zA-Z]/.test(char);
                })
                    .slice(0, 2)
                    .join('')
                    .toUpperCase();
            }
            // 只存在中文，取最后两个
            const chineseTag = /[\u4E00-\u9FA5]/.test(text);
            if (chineseTag) {
                return text
                    .split('')
                    .filter((char) => {
                    return /[\u4E00-\u9FA5]/.test(char);
                })
                    .slice(-2)
                    .join('');
            }
            return text.replace(/\s+/g, '').substring(0, 2);
        }
    }
}
