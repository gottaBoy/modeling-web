import { clone } from 'ramda';
import { CustomThemeUtil } from './custom-theme-util';
import { QXEventEx } from '../../controller';
/**
 * @description 主题工具类
 * @export
 * @class ThemeUtil
 * @implements {IApiThemeUtil}
 */
export class ThemeUtil {
    constructor() {
        /**
         * @description 主题设置元素 html
         * @protected
         * @type {HTMLElement}
         * @memberof ThemeUtil
         */
        this.html = document.getElementsByTagName('html')[0];
        /**
         * @description 自定义主题工具类
         * @protected
         * @type {CustomThemeUtil}
         * @memberof ThemeUtil
         */
        this.customUtil = {};
        /**
         * @description 事件对象
         * @memberof ThemeUtil
         */
        this.evt = new QXEventEx();
        /**
         * @description 插件主题
         * @type {IAppUITheme[]}
         * @memberof ThemeUtil
         */
        this.pluginTheme = [];
    }
    /**
     * @description 加载主题插件
     * @param {IAppUITheme} theme
     * @param {('COLOR' | 'ICON')} [type='COLOR'] 颜色主题|图标主题，默认值为颜色主题
     * @returns {*}  {Promise<void>}
     * @memberof ThemeUtil
     */
    async loadTheme(theme, type = 'COLOR') {
        const data = clone(theme.themeParams || {});
        const path = data['theme-package-path'] || theme.themeUrl;
        delete data.appId;
        delete data['theme-package-path'];
        await ibiz.plugin.loadPlugin({
            runtimeObject: true,
            rtobjectName: theme.themeTag,
            rtobjectRepo: path,
        });
        if (type === 'COLOR') {
            this.setThemeParams(theme, data);
            this.setTheme(theme.themeTag);
            // 只计算颜色主题插件
            this.pluginTheme.push(theme);
        }
        else {
            this.html.classList.add(theme.themeTag);
        }
    }
    /**
     * @description 设置额外修改的主题参数
     * @protected
     * @param {IAppUITheme} theme
     * @param {Record<string, string>} params
     * @returns {*}  {void}
     * @memberof ThemeUtil
     */
    setThemeParams(theme, params) {
        const themeStyle = document.getElementById(theme.themeTag);
        if (themeStyle) {
            return;
        }
        let content = `:root.${theme.themeTag}{`;
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                const val = params[key];
                content += `${key}: ${val}${val.endsWith(';') ? '' : ';'}`;
            }
        }
        content += '}';
        const script = document.createElement('style');
        script.id = theme.themeTag;
        script.type = 'text/css';
        script.innerHTML = content;
        document.head.appendChild(script);
    }
    /**
     * @description 设置主题
     * @param {string} tag
     * @memberof ThemeUtil
     */
    setTheme(tag) {
        const theme = this.getTheme();
        this.html.classList.remove(theme);
        this.html.setAttribute('theme', tag);
        this.html.classList.add(tag);
        this.evt.emit('onChange', tag);
    }
    /**
     * @description 获取当前主题
     * @returns {*}  {string}
     * @memberof ThemeUtil
     */
    getTheme() {
        return this.html.getAttribute('theme');
    }
    /**
     * @description 自定义主题
     * @memberof ThemeUtil
     */
    customTheme() {
        ibiz.overlay.drawer('IBizCustomTheme', undefined, {
            width: 30,
            placement: 'right',
        });
    }
    /**
     * @description 获取存储的主题标识
     * @private
     * @returns {*}  {(string | null)}
     * @memberof ThemeUtil
     */
    getStorageThemeTag() {
        const storageThemeKey = `${ibiz.env.appId}_theme_${ibiz.appData.context.srfuserid}`;
        return localStorage.getItem(storageThemeKey);
    }
    /**
     * @description 设置存储的主题标识
     * @private
     * @param {string} themeTag
     * @memberof ThemeUtil
     */
    setStorageThemeTag(themeTag) {
        const storageThemeKey = `${ibiz.env.appId}_theme_${ibiz.appData.context.srfuserid}`;
        localStorage.setItem(storageThemeKey, themeTag);
    }
    /**
     * @description 初始化自定义主题
     * @param {boolean} [needLoad=true]
     * @returns {*}  {Promise<void>}
     * @memberof ThemeUtil
     */
    async initCustomTheme(needLoad = true) {
        const themeTag = this.getStorageThemeTag();
        if (themeTag) {
            this.setTheme(themeTag);
        }
        this.customUtil = new CustomThemeUtil(this);
        if (needLoad) {
            await this.customUtil.init();
        }
    }
    /**
     * @description 获取自定义主题
     * @returns {*}  {IData}
     * @memberof ThemeUtil
     */
    getCustomTheme() {
        return {
            themeTag: this.getTheme(),
            themeVars: this.customUtil.themeVars,
        };
    }
    /**
     * @description 预览自定义主题
     * @param {string} themeTag
     * @param {Record<string, string>} [themeVars={}]
     * @param {boolean} [isLoad=true]
     * @returns {*}  {Promise<IData>}
     * @memberof ThemeUtil
     */
    async previewCustomTheme(themeTag, themeVars = {}, isLoad = true) {
        this.setTheme(themeTag);
        return this.customUtil.previewCustomTheme(themeTag, themeVars, isLoad);
    }
    /**
     * @description 清除自定义主题
     * @param {string} themeTag
     * @returns {*}  {Promise<void>}
     * @memberof ThemeUtil
     */
    async clearCustomThemeParams(themeTag) {
        this.customUtil.clearCustomThemeParams(themeTag);
    }
    /**
     * @description 重置自定义主题
     * @param {string} themeTag
     * @param {boolean} isShare
     * @returns {*}  {Promise<IData>}
     * @memberof ThemeUtil
     */
    async resetCustomTheme(themeTag, isShare) {
        return this.customUtil.resetCustomTheme(themeTag, isShare);
    }
    /**
     * @description 保存自定义主题
     * @param {string} themeTag
     * @param {Record<string, string>} themeVars
     * @param {boolean} isShare
     * @returns {*}  {Promise<IData>}
     * @memberof ThemeUtil
     */
    async saveCustomTheme(themeTag, themeVars, isShare) {
        this.setStorageThemeTag(themeTag);
        return this.customUtil.saveCustomTheme(themeTag, themeVars, isShare);
    }
    /**
     * @description 分享自定义主题
     * @param {string} themeTag
     * @param {Record<string, string>} themeVars
     * @returns {*}  {(Promise<string | undefined>)}
     * @memberof ThemeUtil
     */
    async shareCustomTheme(themeTag, themeVars) {
        throw new Error('Method not implemented.');
    }
    /**
     * @description 获取分享主题
     * @param {string} userId
     * @param {string} themeId
     * @returns {*}  {Promise<IData>}
     * @memberof ThemeUtil
     */
    async getShareTheme(userId, themeId) {
        throw new Error('Method not implemented.');
    }
}
