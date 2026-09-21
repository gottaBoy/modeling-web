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
 * 截取最后一个@符号之前的字符串，如果没有@符号，返回原字符串
 * @param str
 * @returns
 */
export declare function getStringBeforeLastAt(str: string): string;
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
/**
 * 获取会话标识(TOPIC:适用于多话题场景；INLINE：适用于ai行内会话场景；TEMP：适用于传统ai编辑器会话场景)
 * @param sessionID
 */
export declare function getChatSessionId(type: 'TOPIC' | 'INLINE' | 'TEMP', sessionID?: string): string;
/**
 * @description 解析url对象查询参数，防止浏览器不支持解析URL
 * @export
 * @param {string} search
 * @return {*}  {any}
 */
export declare function parseSearchParams(search: string): any;
/**
 * 解析预置协议的字符串
 * @export
 * @param {string} urlStr
 * @return {*}  {{
 *   context: any;
 *   params: any;
 *   typeId: string;
 * }}
 */
export declare function parsePredefProtocol(urlStr: string): {
    context: any;
    params: any;
    typeId: string;
};
/**
 * html转md
 * @param html
 * @returns
 */
export declare function html2md(html: string): string;
/**
 * md转html
 * @param md
 * @returns
 */
export declare function md2html(md: string): string;
export declare class TextUtil {
    /**
     * @description textarea元素，用于存储拷贝的文本
     * @static
     * @type {(HTMLTextAreaElement | null)}
     * @memberof TextUtil
     */
    static element: HTMLTextAreaElement | null;
    /**
     * @description 拷贝文本
     * @static
     * @param {string} value
     * @returns {*}  {boolean}
     * @memberof TextUtil
     */
    static copy(value: string): boolean;
}
