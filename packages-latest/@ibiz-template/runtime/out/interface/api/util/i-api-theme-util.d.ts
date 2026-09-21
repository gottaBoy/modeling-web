/**
 * @description 主题工具
 * @export
 * @interface IApiThemeUtil
 */
export interface IApiThemeUtil {
    /**
     * @description 根据主题标识切换当前应用主题
     * @param {string} tag 主题标识
     * @memberof IApiThemeUtil
     */
    setTheme(tag: string): void;
    /**
     * @description 获取当前正在使用的主题标识
     * @returns {*}  {string}
     * @memberof IApiThemeUtil
     */
    getTheme(): string;
    /**
     * @description 打开自定义主题配置界面
     * @memberof IApiThemeUtil
     */
    customTheme(): void;
}
//# sourceMappingURL=i-api-theme-util.d.ts.map