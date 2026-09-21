export declare enum Locale {
    ZH_CN = "zh-CN",
    EN = "en"
}
declare class I18n {
    /**
     * @description 区域
     * @private
     * @memberof I18n
     */
    private locale;
    /**
     * @description 语言
     * @private
     * @memberof I18n
     */
    private language;
    /**
     * @description 区域
     * @param {Locale} locale
     * @memberof I18n
     */
    setLocale(locale: Locale): void;
    /**
     * @description 设置语言
     * @param {Record<string, any>} language
     * @memberof I18n
     */
    setLanguage(language: Record<string, any>): void;
    /**
     * @description 翻译函数，会自动响应语言变化
     */
    t: import('@preact/signals').ReadonlySignal<(tag: string, params?: Record<string, any>) => string>;
}
declare const i18n: I18n;
export { i18n };
