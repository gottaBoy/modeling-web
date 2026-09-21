import { IApiHandlebarsUtil } from '../../interface';
/**
 * @description handlebars 渲染工具类
 * @export
 * @class HandlebarsUtil
 * @implements {IApiHandlebarsUtil}
 */
export declare class HandlebarsUtil implements IApiHandlebarsUtil {
    protected hsb: any;
    /**
     * @description 如果已经在请求中，则不再重复请求
     * @protected
     * @type {(Promise<unknown> | null)}
     * @memberof HandlebarsUtil
     */
    protected p: Promise<unknown> | null;
    /**
     * @description handlebars 是否已经初始化
     * @readonly
     * @type {boolean}
     * @memberof HandlebarsUtil
     */
    get isInit(): boolean;
    /**
     * @description 异步加载，初始化 handlebars
     * @returns {*}  {Promise<unknown>}
     * @memberof HandlebarsUtil
     */
    init(): Promise<unknown>;
    /**
     * @description 异步绘制模板，返回渲染后的字符串
     * @param {string} template
     * @param {IData} data
     * @returns {*}  {Promise<string>}
     * @memberof HandlebarsUtil
     */
    render(template: string, data: IData): Promise<string>;
    /**
     * @description 同步绘制模板，返回渲染后的字符串
     * @param {string} template
     * @param {IData} data
     * @returns {*}  {string}
     * @memberof HandlebarsUtil
     */
    syncRender(template: string, data: IData): string;
}
//# sourceMappingURL=handlebars.d.ts.map