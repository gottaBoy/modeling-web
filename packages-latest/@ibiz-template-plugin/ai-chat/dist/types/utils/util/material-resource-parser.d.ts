import { IMaterial } from '../../interface';

/**
 * 素材资源解析器
 *
 * @author tony001
 * @date 2025-03-03 11:03:59
 * @export
 * @class MaterialResourceParser
 */
export declare class MaterialResourceParser {
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
     * @return {*}  {IMaterial[]}
     */
    static parse(xmlString: string): IMaterial[];
    /**
     * 混合内容解析
     *
     * @author tony001
     * @date 2025-03-03 13:03:35
     * @static
     * @param {string} input  包含 XML 和其他文本的混合字符串
     * @return {*}  {{
     *     resources: IMaterial[];
     *     remainingText: string;
     *     hasResources: boolean;
     *     error?: string;
     *   }}
     */
    static parseMixedContent(input: string): {
        /** 解析出的资源对象数组 */
        resources: IMaterial[];
        /** 去除 XML 后的剩余文本 */
        remainingText: string;
        /** 是否存在有效资源标签 */
        hasResources: boolean;
        /** 解析错误信息 (可选) */
        error?: string;
    };
    /**
     * 数据对象转 XML 字符串
     *
     * @author tony001
     * @date 2025-03-03 11:03:51
     * @static
     * @param {IMaterial[]} resources
     * @return {*}  {string}
     */
    static stringify(resources: IMaterial[]): string;
}
