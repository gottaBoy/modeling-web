import { IAppUITheme } from '@ibiz/model-core';
import { CustomThemeUtil } from './custom-theme-util';
import { defaultType, QXEventEx } from '../../controller';
/**
 * 主题工具类
 *
 * @author chitanda
 * @date 2023-12-02 23:12:15
 * @export
 * @class ThemeUtil
 */
export declare class ThemeUtil {
    /**
     * 主题设置元素 html
     *
     * @author chitanda
     * @date 2023-12-02 23:12:26
     * @protected
     * @type {HTMLElement}
     */
    protected html: HTMLElement;
    /**
     * 自定义主题工具类
     *
     * @protected
     * @type {CustomThemeUtil}
     * @memberof ThemeUtil
     */
    protected customUtil: CustomThemeUtil;
    /**
     * @description 事件对象
     * @memberof ThemeUtil
     */
    readonly evt: QXEventEx<defaultType>;
    /**
     * 加载主题插件
     *
     * @author tony001
     * @date 2024-12-17 16:12:10
     * @param {IAppUITheme} theme
     * @param {('COLOR' | 'ICON')} [type='COLOR'] 颜色主题|图标主题，默认值为颜色主题
     * @return {*}  {Promise<void>}
     */
    loadTheme(theme: IAppUITheme, type?: 'COLOR' | 'ICON'): Promise<void>;
    /**
     * 设置额外修改的主题参数
     *
     * @author chitanda
     * @date 2023-12-05 11:12:00
     * @protected
     * @param {IAppUITheme} theme
     * @param {Record<string, string>} params
     * @return {*}  {void}
     */
    protected setThemeParams(theme: IAppUITheme, params: Record<string, string>): void;
    /**
     * 设置主题
     *
     * @author chitanda
     * @date 2023-12-02 23:12:37
     * @param {string} tag
     */
    setTheme(tag: string): void;
    /**
     * 获取当前主题
     *
     * @author chitanda
     * @date 2023-12-02 23:12:10
     * @return {*}  {string}
     */
    getTheme(): string;
    /**
     * 自定义主题
     *
     * @memberof ThemeUtil
     */
    customTheme(): void;
    /**
     * 获取存储的主题标识
     *
     * @author tony001
     * @date 2024-12-26 16:12:42
     * @private
     * @return {*}  {(string | null)}
     */
    private getStorageThemeTag;
    /**
     * 设置存储的主题标识
     *
     * @author tony001
     * @date 2024-12-26 16:12:18
     * @private
     * @param {string} themeTag
     */
    private setStorageThemeTag;
    /**
     * 初始化自定义主题
     *
     * @return {*}  {Promise<void>}
     * @memberof ThemeUtil
     */
    initCustomTheme(needLoad?: boolean): Promise<void>;
    /**
     * 获取自定义主题
     *
     * @return {*}  {ICustomThemeState}
     * @memberof ThemeUtil
     */
    getCustomTheme(): IData;
    /**
     * 预览自定义主题
     *
     * @author tony001
     * @date 2024-12-26 16:12:18
     * @param {string} themeTag
     * @param {Record<string, string>} [themeVars={}]
     * @return {*}  {Promise<IData>}
     */
    previewCustomTheme(themeTag: string, themeVars?: Record<string, string>, isLoad?: boolean): Promise<IData>;
    /**
     * 清除自定义主题
     *
     * @author tony001
     * @date 2024-12-26 17:12:05
     * @param {string} themeTag
     */
    clearCustomThemeParams(themeTag: string): Promise<void>;
    /**
     * 重置自定义主题
     *
     * @author tony001
     * @date 2024-12-27 20:12:11
     * @param {string} themeTag
     * @param {boolean} isShare
     * @return {*}  {Promise<IData>}
     */
    resetCustomTheme(themeTag: string, isShare: boolean): Promise<IData>;
    /**
     * 保存自定义主题
     *
     * @author tony001
     * @date 2024-12-26 17:12:15
     * @param {string} themeTag
     * @param {Record<string, string>} themeVars
     * @return {*}  {Promise<IData>}
     */
    saveCustomTheme(themeTag: string, themeVars: Record<string, string>, isShare: boolean): Promise<IData>;
    /**
     * 分享自定义主题
     *
     * @param {string} themeTag
     * @param {Record<string, string>} themeVars
     * @return {*}  {(Promise<string | undefined>)}
     * @memberof ThemeUtil
     */
    shareCustomTheme(themeTag: string, themeVars: Record<string, string>): Promise<string | undefined>;
    /**
     * 获取分享主题
     *
     * @param {string} userId
     * @param {string} themeId
     * @return {*}  {Promise<IData>}
     * @memberof ThemeUtil
     */
    getShareTheme(userId: string, themeId: string): Promise<IData>;
}
//# sourceMappingURL=theme-util.d.ts.map