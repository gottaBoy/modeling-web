import { IApiRawValueUtil } from '../../interface';
/**
 * @description 直接值工具类
 * @export
 * @class RawValueUtil
 * @implements {IApiRawValueUtil}
 */
export declare class RawValueUtil implements IApiRawValueUtil {
    /**
     * @description 字符串是否完全由整数/浮点数组成
     * @param {string} str
     * @returns {*}  {boolean}
     * @memberof RawValueUtil
     */
    isNumber(str: string): boolean;
    /**
     * @description 转换直接值
     * @param {(string | undefined)} val
     * @returns {*}  {(number | boolean | string | undefined)}
     * @memberof RawValueUtil
     */
    format(val: string | undefined): number | boolean | string | undefined;
}
//# sourceMappingURL=raw-value-util.d.ts.map