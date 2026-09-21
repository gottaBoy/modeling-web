import { IAppUITheme } from '@ibiz/model-core';
import { CustomThemeUtil } from './custom-theme-util';
import { defaultType, QXEventEx } from '../../controller';
import { IApiThemeUtil } from '../../interface';
/**
 * @description 主题工具类
 * @export
 * @class ThemeUtil
 * @implements {IApiThemeUtil}
 */
export declare class ThemeUtil implements IApiThemeUtil {
    /**
     * @description 主题设置元素 html
     * @protected
     * @type {HTMLElement}
     * @memberof ThemeUtil
     */
    protected html: HTMLElement;
    /**
     * @description 自定义主题工具类
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
     * @description 插件主题
     * @type {IAppUITheme[]}
     * @memberof ThemeUtil
     */
    pluginTheme: IAppUITheme[];
    /**
     * @description 加载主题插件
     * @param {IAppUITheme} theme
     * @param {('COLOR' | 'ICON')} [type='COLOR'] 颜色主题|图标主题，默认值为颜色主题
     * @returns {*}  {Promise<void>}
     * @memberof ThemeUtil
     */
    loadTheme(theme: IAppUITheme, type?: 'COLOR' | 'ICON'): Promise<void>;
    /**
     * @description 设置额外修改的主题参数
     * @protected
     * @param {IAppUITheme} theme
     * @param {Record<string, string>} params
     * @returns {*}  {void}
     * @memberof ThemeUtil
     */
    protected setThemeParams(theme: IAppUITheme, params: Record<string, string>): void;
    /**
     * @description 设置主题
     * @param {string} tag
     * @memberof ThemeUtil
     */
    setTheme(tag: string): void;
    /**
     * @description 获取当前主题
     * @returns {*}  {string}
     * @memberof ThemeUtil
     */
    getTheme(): string;
    /**
     * @description 自定义主题
     * @memberof ThemeUtil
     */
    customTheme(): void;
    /**
     * @description 获取存储的主题标识
     * @private
     * @returns {*}  {(string | null)}
     * @memberof ThemeUtil
     */
    private getStorageThemeTag;
    /**
     * @description 设置存储的主题标识
     * @private
     * @param {string} themeTag
     * @memberof ThemeUtil
     */
    private setStorageThemeTag;
    /**
     * @description 初始化自定义主题
     * @param {boolean} [needLoad=true]
     * @returns {*}  {Promise<void>}
     * @memberof ThemeUtil
     */
    initCustomTheme(needLoad?: boolean): Promise<void>;
    /**
     * @description 获取自定义主题
     * @returns {*}  {IData}
     * @memberof ThemeUtil
     */
    getCustomTheme(): IData;
    /**
     * @description 预览自定义主题
     * @param {string} themeTag
     * @param {Record<string, string>} [themeVars={}]
     * @param {boolean} [isLoad=true]
     * @returns {*}  {Promise<IData>}
     * @memberof ThemeUtil
     */
    previewCustomTheme(themeTag: string, themeVars?: Record<string, string>, isLoad?: boolean): Promise<IData>;
    /**
     * @description 清除自定义主题
     * @param {string} themeTag
     * @returns {*}  {Promise<void>}
     * @memberof ThemeUtil
     */
    clearCustomThemeParams(themeTag: string): Promise<void>;
    /**
     * @description 重置自定义主题
     * @param {string} themeTag
     * @param {boolean} isShare
     * @returns {*}  {Promise<IData>}
     * @memberof ThemeUtil
     */
    resetCustomTheme(themeTag: string, isShare: boolean): Promise<IData>;
    /**
     * @description 保存自定义主题
     * @param {string} themeTag
     * @param {Record<string, string>} themeVars
     * @param {boolean} isShare
     * @returns {*}  {Promise<IData>}
     * @memberof ThemeUtil
     */
    saveCustomTheme(themeTag: string, themeVars: Record<string, string>, isShare: boolean): Promise<IData>;
    /**
     * @description 分享自定义主题
     * @param {string} themeTag
     * @param {Record<string, string>} themeVars
     * @returns {*}  {(Promise<string | undefined>)}
     * @memberof ThemeUtil
     */
    shareCustomTheme(themeTag: string, themeVars: Record<string, string>): Promise<string | undefined>;
    /**
     * @description 获取分享主题
     * @param {string} userId
     * @param {string} themeId
     * @returns {*}  {Promise<IData>}
     * @memberof ThemeUtil
     */
    getShareTheme(userId: string, themeId: string): Promise<IData>;
}
//# sourceMappingURL=theme-util.d.ts.map