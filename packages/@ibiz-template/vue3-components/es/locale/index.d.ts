import { I18n } from '@ibiz-template/core';
declare const i18n: import("vue-i18n").I18n<{}, {}, {}, string, false>;
export declare class IBizI18n implements I18n {
    /**
     * html元素
     *
     * @author tony001
     * @date 2024-05-20 22:05:58
     * @protected
     * @type {HTMLElement}
     */
    protected html: HTMLElement;
    /**
     * 默认语言
     *
     * @author tony001
     * @date 2024-05-20 22:05:13
     * @protected
     * @type {string}
     */
    protected defaultLang: string;
    /**
     * 语言资源映射表
     *
     * @author tony001
     * @date 2024-05-20 22:05:38
     * @protected
     */
    protected langMap: Map<string, () => Promise<IData>>;
    /**
     * Creates an instance of IBizI18n.
     * @author tony001
     * @date 2024-05-20 22:05:50
     */
    constructor();
    /**
     * 初始化加载默认多语言文件
     *
     * @author chitanda
     * @date 2023-08-24 17:08:04
     * @return {*}  {Promise<void>}
     */
    init(): Promise<void>;
    /**
     * 设置异步加载的多语言模块
     *
     * @author chitanda
     * @date 2023-08-24 23:08:01
     * @param {Record<string, () => Promise<IData>>} languages
     */
    setLangConfigs(languages: Record<string, () => Promise<IData>>): void;
    /**
     * 设置语言
     *
     * @author chitanda
     * @date 2023-08-24 16:08:42
     * @param {string} lang
     */
    setLang(lang: string): void;
    /**
     * 获取语言
     *
     * @author tony001
     * @date 2024-05-20 22:05:05
     * @return {*}  {string}
     */
    getLang(): string;
    /**
     * 格式化
     *
     * @author tony001
     * @date 2024-05-20 22:05:00
     * @param {string} tag
     * @param {(IParams | undefined)} [options]
     * @return {*}  {string}
     */
    t(tag: string, options?: IParams | undefined): string;
    /**
     * 格式化
     *
     * @author tony001
     * @date 2024-05-20 22:05:05
     * @param {string} tag
     * @param {(string | undefined)} [defaultMsg]
     * @param {IParams} [options]
     * @return {*}  {string}
     */
    t(tag: string, defaultMsg?: string | undefined, options?: IParams): string;
    /**
     * 合并语言资源
     *
     * @author tony001
     * @date 2024-05-20 22:05:01
     * @param {IParams} data
     */
    mergeLocaleMessage(data: IParams): void;
    /**
     * 合并指定语言资源
     *
     * @author tony001
     * @date 2024-05-20 22:05:21
     * @param {string} lang
     * @param {IParams} data
     */
    mergeLocaleMessage(lang: string, data: IParams): void;
}
declare const iBizI18n: IBizI18n;
export { i18n, iBizI18n };
