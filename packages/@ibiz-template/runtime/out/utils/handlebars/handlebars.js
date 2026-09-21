import { installHelpers } from './helpers';
/**
 * handlebars 渲染工具类
 *
 * @author chitanda
 * @date 2023-08-28 17:08:13
 * @export
 * @class HandlebarsUtil
 */
export class HandlebarsUtil {
    constructor() {
        /**
         * 如果已经在请求中，则不再重复请求
         *
         * @author chitanda
         * @date 2023-08-30 11:08:58
         * @protected
         * @type {(Promise<unknown> | null)}
         */
        this.p = null;
    }
    /**
     * handlebars 是否已经初始化
     *
     * @author chitanda
     * @date 2023-08-28 18:08:01
     * @readonly
     * @type {boolean}
     */
    get isInit() {
        return !!this.hsb;
    }
    /**
     * 异步加载，初始化 handlebars
     *
     * @author chitanda
     * @date 2023-08-28 17:08:24
     * @return {*}  {Promise<unknown>}
     */
    async init() {
        if (this.isInit) {
            return;
        }
        if (this.p) {
            return this.p;
        }
        this.p = import('handlebars');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const module = (await this.p);
        this.hsb = module.default || module;
        this.p = null;
        installHelpers(this.hsb);
        return this.hsb;
    }
    /**
     * 异步绘制模板，返回渲染后的字符串
     *
     * @author chitanda
     * @date 2023-08-28 18:08:10
     * @param {string} template
     * @param {IData} data
     * @return {*}  {Promise<string>}
     */
    async render(template, data) {
        if (!this.hsb) {
            await this.init();
        }
        const tmp = this.hsb.compile(template);
        return tmp(data);
    }
    /**
     * 同步绘制模板，返回渲染后的字符串
     *
     * @description 需要自己保证 handlebars 已经加载
     * @author chitanda
     * @date 2023-08-28 18:08:14
     * @param {string} template
     * @param {IData} data
     * @return {*}  {string}
     */
    syncRender(template, data) {
        if (!this.hsb) {
            throw new Error(ibiz.i18n.t('runtime.utils.handlebars.noInitHandlebars'));
        }
        const tmp = this.hsb.compile(template);
        return tmp(data);
    }
}
