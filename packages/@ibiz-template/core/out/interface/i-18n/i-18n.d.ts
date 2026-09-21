/**
 * 多语言接口
 *
 * @author chitanda
 * @date 2023-08-11 16:08:21
 * @export
 * @interface I18n
 */
export interface I18n {
    /**
     * 异步初始化，加载多语言文件
     *
     * @author chitanda
     * @date 2023-08-24 17:08:03
     * @return {*}  {Promise<void>}
     */
    init(): Promise<void>;
    /**
     * 设置异步加载的多语言模块
     *
     * @author chitanda
     * @date 2023-08-24 23:08:28
     * @param {Record<string, () => Promise<IData>>} languages
     */
    setLangConfigs(languages: Record<string, () => Promise<IData>>): void;
    /**
     * 设置当前语言
     *
     * @author chitanda
     * @date 2023-08-24 16:08:11
     * @param {string} lang
     */
    setLang(lang: string): void;
    /**
     * 获取当前语言
     *
     * @author chitanda
     * @date 2023-08-24 16:08:04
     * @return {*}  {string}
     */
    getLang(): string;
    /**
     * 消息格式化
     *
     * @author chitanda
     * @date 2023-08-11 16:08:40
     * @param {string} tag
     * @param {IParams} [options]
     * @return {*}  {string}
     */
    t(tag: string, options?: IParams): string;
    /**
     * 消息格式化
     *
     * @author chitanda
     * @date 2023-08-11 16:08:42
     * @param {string} tag
     * @param {string} [defaultMsg]
     * @param {IParams} [options]
     * @return {*}  {string}
     */
    t(tag: string, defaultMsg?: string, options?: IParams): string;
    /**
     * 合并指定语言语言资源
     *
     * @author tony001
     * @date 2024-05-20 22:05:03
     * @param {string} lang
     * @param {IParams} data
     */
    mergeLocaleMessage(lang: string, data: IParams): void;
    /**
     * 合并语言资源
     *
     * @author tony001
     * @date 2024-05-20 22:05:29
     * @param {IParams} data
     */
    mergeLocaleMessage(data: IParams): void;
}
//# sourceMappingURL=i-18n.d.ts.map