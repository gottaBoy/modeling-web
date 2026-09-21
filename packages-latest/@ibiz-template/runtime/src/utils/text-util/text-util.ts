import { IApiTextUtil } from '../../interface';

/**
 * @description 文本工具类
 * @export
 * @class TextUtil
 * @implements {IApiTextUtil}
 */
export class TextUtil implements IApiTextUtil {
  /**
   * @description input元素，用于存储拷贝的文本
   * @private
   * @type {(HTMLInputElement | null)}
   * @memberof TextUtil
   */
  private inputElement: HTMLInputElement | null = null;

  /**
   * @description 值格式化
   * @param {string} value
   * @param {string} _code
   * @returns {*}  {string}
   * @memberof TextUtil
   */
  format(value: string, _code: string): string {
    return value;
  }

  /**
   * @description 拷贝文本
   * @param {string} value
   * @returns {*}  {boolean}
   * @memberof TextUtil
   */
  copy(value: string): boolean {
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
   * @description 获取主题色
   * @private
   * @returns {*}  {(string | null)}
   * @memberof TextUtil
   */
  private getThemeVar(): string | null {
    const root = document.documentElement;
    if (!root) {
      return null;
    }
    const style = getComputedStyle(root);

    const primary = style.getPropertyValue('--ibiz-color-primary');
    return primary;
  }

  /**
   * @description 文本是否包含中文字符
   * @param {string} str
   * @returns {*}  {boolean}
   * @memberof TextUtil
   */
  isChineseCharacter(str: string): boolean {
    const chinesePattern = /[\u4e00-\u9fa5]/;
    return chinesePattern.test(str);
  }

  /**
   * @description 文本是否同时存在中文和英文
   * @param {string} str
   * @returns {*}  {boolean}
   * @memberof TextUtil
   */
  hasChineseAndEnglish(str: string): boolean {
    const regex = /[\u4e00-\u9fa5]+.*[a-zA-Z]+|[a-zA-Z]+.*[\u4e00-\u9fa5]+/;
    return regex.test(str);
  }

  /**
   * @description 字符串转16进制颜色
   * @param {string} text
   * @returns {*}  {string}
   * @memberof TextUtil
   */
  stringToHexColor(text: string): string {
    if (!text) return '';
    // 计算字符串的哈希值
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      if (this.isChineseCharacter(text)) {
        // eslint-disable-next-line no-bitwise
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
        // eslint-disable-next-line operator-assignment, no-bitwise
        hash = hash & hash;
      } else {
        const charCode = text.charCodeAt(i);
        hash += charCode.toString(16) as unknown as number;
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
   * @description 文本缩写
   * @param {string} text
   * @returns {*}  {(string | void)}
   * @memberof TextUtil
   */
  abbreviation(text: string): string | void {
    if (text && text.toString().length < 2) {
      return text;
    }
    if (text && text.toString().length >= 2) {
      // 大于两个字符
      const tag = this.hasChineseAndEnglish(text);
      // 存在中英文混合情况，按顺序取第一个英文与第一个中文
      if (tag) {
        const engChar: string =
          text.split('').find((char: string) => {
            return /[a-zA-Z]/.test(char);
          }) || '';
        const chineseStr: string =
          text.split('').find((char: string) => {
            return /[\u4E00-\u9FA5]/.test(char);
          }) || '';
        return `${engChar}${chineseStr}`.toLowerCase();
      }
      // 只存在英文，取前两个
      const engTag = /[a-zA-Z]/.test(text);
      if (engTag) {
        return text
          .split('')
          .filter((char: string) => {
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
          .filter((char: string) => {
            return /[\u4E00-\u9FA5]/.test(char);
          })
          .slice(-2)
          .join('');
      }
      return text.replace(/\s+/g, '').substring(0, 2);
    }
  }
}
