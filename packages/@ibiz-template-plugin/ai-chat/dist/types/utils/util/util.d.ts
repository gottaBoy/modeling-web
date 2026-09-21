/**
 * 创建UUID
 *
 * @author chitanda
 * @date 2023-10-13 16:10:17
 * @export
 * @return {*}  {string}
 */
export declare function createUUID(): string;
/**
 * 判断字符串是否是svg的格式
 *
 * @author tony001
 * @date 2025-03-12 17:03:40
 * @export
 * @param {string} str
 * @return {*}  {boolean}
 */
export declare function isSvg(str: string): boolean;
export declare class TextUtil {
    /**
     * input元素，用于存储拷贝的文本
     *
     * @author zhanghengfeng
     * @date 2023-08-31 20:08:06
     * @private
     * @type {(HTMLInputElement | null)}
     */
    static inputElement: HTMLInputElement | null;
    /**
     * 拷贝文本
     *
     * @author zhanghengfeng
     * @date 2023-08-31 11:08:51
     * @param {string} value
     * @return {*}  {boolean}
     */
    static copy(value: string): boolean;
}
