/**
 * 插件静态资源工具类
 *
 * @author chitanda
 * @date 2022-11-03 10:11:08
 * @export
 * @class PluginStaticResource
 */
export declare class PluginStaticResource {
    /**
     * 计算出的静态资源跟路径
     *
     * @author chitanda
     * @date 2022-11-03 10:11:08
     * @protected
     * @type {string}
     */
    protected baseDir: string;
    /**
     * 已经输出过路径的 style 标签
     *
     * @author chitanda
     * @date 2023-03-23 10:03:38
     * @protected
     * @type {Map<string, null>}
     */
    protected styleElementMap: Map<string, null>;
    /**
     * mete 路径解析对象
     *
     * @author chitanda
     * @date 2023-07-06 20:07:36
     * @protected
     * @type {URL}
     */
    protected url: URL;
    /**
     * 插件静态资源工具类.
     *
     * @author chitanda
     * @date 2022-11-03 10:11:41
     * @param {string} mateUrl import.mate.url
     */
    constructor(mateUrl: string);
    /**
     * 合并输出静态资源目录
     *
     * @author chitanda
     * @date 2022-11-03 10:11:39
     * @param {string} pathStr
     * @return {*}  {string}
     */
    dir(pathStr: string): string;
    /**
     * 加载样式静态资源
     *
     * @author chitanda
     * @date 2023-03-23 10:03:49
     * @param {string[]} urls
     * @return {*}  {Promise<void>}
     */
    loadStyle(urls: string[]): Promise<void>;
}
