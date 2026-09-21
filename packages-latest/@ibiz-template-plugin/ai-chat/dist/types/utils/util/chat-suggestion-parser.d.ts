import { IChatSuggestion } from '../../interface';

/**
 * 聊天建议解析器
 *
 * @author tony001
 * @date 2025-03-18 14:03:51
 * @export
 * @class ChatSuggestionParser
 */
export declare class ChatSuggestionParser {
    /**
     * 从XML元素中提取CDATA内容
     *
     * @author tony001
     * @date 2025-03-03 15:03:43
     * @private
     * @static
     * @param {(Element | null)} element
     * @return {*}  {(string | null)}
     */
    private static getCdataContent;
    /**
     *  XML 字符串转数据对象
     *
     * @author tony001
     * @date 2025-03-03 11:03:17
     * @static
     * @param {string} xmlString
     * @return {*}  {IChatSuggestion[]}
     */
    static parse(xmlString: string): IChatSuggestion[];
    /**
     * 混合内容解析
     *
     * @author tony001
     * @date 2025-03-03 13:03:35
     * @static
     * @param {string} input  包含 XML 和其他文本的混合字符串
     * @return {*}  {{
     *     suggestions: IChatSuggestion[];
     *     remainingText: string;
     *     hasSuggestions: boolean;
     *     error?: string;
     *   }}
     */
    static parseMixedContent(input: string): {
        /** 解析出的建议对象数组 */
        suggestions: IChatSuggestion[];
        /** 去除 XML 后的剩余文本 */
        remainingText: string;
        /** 是否存在有效建议标签 */
        hasSuggestions: boolean;
        /** 解析错误信息 (可选) */
        error?: string;
    };
    /**
     * 数据对象转 XML 字符串
     *
     * @author tony001
     * @date 2025-03-03 11:03:51
     * @static
     * @param {IChatSuggestion[]} suggestions
     * @return {*}  {string}
     */
    static stringify(suggestions: IChatSuggestion[]): string;
}
