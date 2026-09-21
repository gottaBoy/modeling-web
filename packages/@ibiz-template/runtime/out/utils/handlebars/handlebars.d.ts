/**
 * handlebars 渲染工具类
 *
 * @author chitanda
 * @date 2023-08-28 17:08:13
 * @export
 * @class HandlebarsUtil
 */
export declare class HandlebarsUtil {
    protected hsb: any;
    /**
     * 如果已经在请求中，则不再重复请求
     *
     * @author chitanda
     * @date 2023-08-30 11:08:58
     * @protected
     * @type {(Promise<unknown> | null)}
     */
    protected p: Promise<unknown> | null;
    /**
     * handlebars 是否已经初始化
     *
     * @author chitanda
     * @date 2023-08-28 18:08:01
     * @readonly
     * @type {boolean}
     */
    get isInit(): boolean;
    /**
     * 异步加载，初始化 handlebars
     *
     * @author chitanda
     * @date 2023-08-28 17:08:24
     * @return {*}  {Promise<unknown>}
     */
    init(): Promise<unknown>;
    /**
     * 异步绘制模板，返回渲染后的字符串
     *
     * @author chitanda
     * @date 2023-08-28 18:08:10
     * @param {string} template
     * @param {IData} data
     * @return {*}  {Promise<string>}
     */
    render(template: string, data: IData): Promise<string>;
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
    syncRender(template: string, data: IData): string;
}
//# sourceMappingURL=handlebars.d.ts.map