import { clone } from 'ramda';
import { CustomThemeUtil } from './custom-theme-util';
import { QXEventEx } from '../../controller';
/**
 * 主题工具类
 *
 * @author chitanda
 * @date 2023-12-02 23:12:15
 * @export
 * @class ThemeUtil
 */
export class ThemeUtil {
    constructor() {
        /**
         * 主题设置元素 html
         *
         * @author chitanda
         * @date 2023-12-02 23:12:26
         * @protected
         * @type {HTMLElement}
         */
        this.html = document.getElementsByTagName('html')[0];
        /**
         * 自定义主题工具类
         *
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
    }
    /**
     * 加载主题插件
     *
     * @author tony001
     * @date 2024-12-17 16:12:10
     * @param {IAppUITheme} theme
     * @param {('COLOR' | 'ICON')} [type='COLOR'] 颜色主题|图标主题，默认值为颜色主题
     * @return {*}  {Promise<void>}
     */
    async loadTheme(theme, type = 'COLOR') {
        const data = clone(theme.themeParams || {});
        const path = data['theme-package-path'];
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
        }
        else {
            this.html.classList.add(theme.themeTag);
        }
    }
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
     * 设置主题
     *
     * @author chitanda
     * @date 2023-12-02 23:12:37
     * @param {string} tag
     */
    setTheme(tag) {
        const theme = this.getTheme();
        this.html.classList.remove(theme);
        this.html.setAttribute('theme', tag);
        this.html.classList.add(tag);
        this.evt.emit('onChange', tag);
    }
    /**
     * 获取当前主题
     *
     * @author chitanda
     * @date 2023-12-02 23:12:10
     * @return {*}  {string}
     */
    getTheme() {
        return this.html.getAttribute('theme');
    }
    /**
     * 自定义主题
     *
     * @memberof ThemeUtil
     */
    customTheme() {
        ibiz.overlay.drawer('IBizCustomTheme', undefined, {
            width: 30,
            placement: 'right',
        });
    }
    /**
     * 获取存储的主题标识
     *
     * @author tony001
     * @date 2024-12-26 16:12:42
     * @private
     * @return {*}  {(string | null)}
     */
    getStorageThemeTag() {
        const storageThemeKey = `${ibiz.env.appId}_theme_${ibiz.appData.context.srfuserid}`;
        return localStorage.getItem(storageThemeKey);
    }
    /**
     * 设置存储的主题标识
     *
     * @author tony001
     * @date 2024-12-26 16:12:18
     * @private
     * @param {string} themeTag
     */
    setStorageThemeTag(themeTag) {
        const storageThemeKey = `${ibiz.env.appId}_theme_${ibiz.appData.context.srfuserid}`;
        localStorage.setItem(storageThemeKey, themeTag);
    }
    /**
     * 初始化自定义主题
     *
     * @return {*}  {Promise<void>}
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
     * 获取自定义主题
     *
     * @return {*}  {ICustomThemeState}
     * @memberof ThemeUtil
     */
    getCustomTheme() {
        return {
            themeTag: this.getTheme(),
            themeVars: this.customUtil.themeVars,
        };
    }
    /**
     * 预览自定义主题
     *
     * @author tony001
     * @date 2024-12-26 16:12:18
     * @param {string} themeTag
     * @param {Record<string, string>} [themeVars={}]
     * @return {*}  {Promise<IData>}
     */
    async previewCustomTheme(themeTag, themeVars = {}, isLoad = true) {
        this.setTheme(themeTag);
        return this.customUtil.previewCustomTheme(themeTag, themeVars, isLoad);
    }
    /**
     * 清除自定义主题
     *
     * @author tony001
     * @date 2024-12-26 17:12:05
     * @param {string} themeTag
     */
    async clearCustomThemeParams(themeTag) {
        this.customUtil.clearCustomThemeParams(themeTag);
    }
    /**
     * 重置自定义主题
     *
     * @author tony001
     * @date 2024-12-27 20:12:11
     * @param {string} themeTag
     * @param {boolean} isShare
     * @return {*}  {Promise<IData>}
     */
    async resetCustomTheme(themeTag, isShare) {
        return this.customUtil.resetCustomTheme(themeTag, isShare);
    }
    /**
     * 保存自定义主题
     *
     * @author tony001
     * @date 2024-12-26 17:12:15
     * @param {string} themeTag
     * @param {Record<string, string>} themeVars
     * @return {*}  {Promise<IData>}
     */
    async saveCustomTheme(themeTag, themeVars, isShare) {
        this.setStorageThemeTag(themeTag);
        return this.customUtil.saveCustomTheme(themeTag, themeVars, isShare);
    }
    /**
     * 分享自定义主题
     *
     * @param {string} themeTag
     * @param {Record<string, string>} themeVars
     * @return {*}  {(Promise<string | undefined>)}
     * @memberof ThemeUtil
     */
    async shareCustomTheme(themeTag, themeVars) {
        throw new Error('Method not implemented.');
    }
    /**
     * 获取分享主题
     *
     * @param {string} userId
     * @param {string} themeId
     * @return {*}  {Promise<IData>}
     * @memberof ThemeUtil
     */
    async getShareTheme(userId, themeId) {
        throw new Error('Method not implemented.');
    }
}
