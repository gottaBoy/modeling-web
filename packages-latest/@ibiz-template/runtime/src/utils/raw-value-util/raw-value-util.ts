import { IApiRawValueUtil } from '../../interface';

/**
 * @description 直接值工具类
 * @export
 * @class RawValueUtil
 * @implements {IApiRawValueUtil}
 */
export class RawValueUtil implements IApiRawValueUtil {
  /**
   * @description 字符串是否完全由整数/浮点数组成
   * @param {string} str
   * @returns {*}  {boolean}
   * @memberof RawValueUtil
   */
  isNumber(str: string): boolean {
    return /^-?\d+(\.\d+)?$/.test(str);
  }

  /**
   * @description 转换直接值
   * @param {(string | undefined)} val
   * @returns {*}  {(number | boolean | string | undefined)}
   * @memberof RawValueUtil
   */
  format(val: string | undefined): number | boolean | string | undefined {
    let tempVal: number | boolean | string | undefined = val;
    if (val !== undefined) {
      if (val === 'true' || val === 'false') {
        // 布尔值处理
        tempVal = val === 'true';
      } else if (this.isNumber(val)) {
        // 数值处理
        tempVal = parseFloat(val);
      }
    }
    return tempVal;
  }
}
