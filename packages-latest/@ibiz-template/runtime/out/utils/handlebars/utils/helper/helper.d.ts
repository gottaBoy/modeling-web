/**
 * 助手工具类
 *
 * @author chitanda
 * @date 2021-12-29 17:12:32
 * @export
 * @class HelperUtil
 */
export declare class HelperUtil {
    /**
     * 当前所有助手 tag 名称
     *
     * @author chitanda
     * @date 2021-12-30 10:12:39
     * @protected
     * @type {string[]}
     */
    protected static helperNames: string[];
    /**
     * 判断字符串是否为助手
     *
     * @author chitanda
     * @date 2021-12-30 10:12:26
     * @static
     * @param {string} name
     * @return {*}  {boolean}
     */
    static isHelperName(name: string): boolean;
    /**
     * 判断类助手统一结果调用处理
     *
     * @author chitanda
     * @date 2021-12-29 17:12:23
     * @static
     * @param {unknown} context 执行上下文
     * @param {boolean} bol 判断结果
     * @param {Handlebars.HelperOptions} options
     * @return {*}  {(string | boolean)}
     */
    static handleJudgmentExecute(context: unknown, bol: boolean, options: Handlebars.HelperOptions): string | boolean;
}
//# sourceMappingURL=helper.d.ts.map