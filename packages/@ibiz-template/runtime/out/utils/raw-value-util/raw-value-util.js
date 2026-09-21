/**
 * 直接值工具类
 *
 * @export
 * @class RawValueUtil
 */
export class RawValueUtil {
    /**
     *  字符串是否完全由整数/浮点数组成
     *
     * @param {string} str
     * @return {*}
     */
    isNumber(str) {
        return /^-?\d+(\.\d+)?$/.test(str);
    }
    /**
     * 转换直接值
     *
     * @param {string} val
     * @return {*}
     */
    format(val) {
        let tempVal = val;
        if (val !== undefined) {
            if (val === 'true' || val === 'false') {
                // 布尔值处理
                tempVal = val === 'true';
            }
            else if (this.isNumber(val)) {
                // 数值处理
                tempVal = parseFloat(val);
            }
        }
        return tempVal;
    }
}
