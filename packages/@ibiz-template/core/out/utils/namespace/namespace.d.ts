export declare const defaultNamespace = "ibiz";
/**
 * 全局样式处理命名空间
 *
 * @author chitanda
 * @date 2022-09-06 11:09:50
 * @export
 * @class Namespace
 */
export declare class Namespace {
    protected block: string;
    /**
     * 命名空间
     *
     * @author chitanda
     * @date 2022-09-06 12:09:01
     * @type {string}
     */
    namespace: string;
    /**
     * Creates an instance of Namespace.
     *
     * @author chitanda
     * @date 2022-09-06 12:09:12
     * @param {string} block 当前命名空间的根模块,例如组件的名称
     * @param {string} [namespace] 指定命名空间，未指定使用默认值 ibiz
     */
    constructor(block: string, namespace?: string);
    /**
     * namespace-block
     * namespace-block-blockSuffix
     *
     * @author chitanda
     * @date 2022-09-06 12:09:08
     * @param {string} [blockSuffix='']
     * @return {*}  {string}
     */
    b(blockSuffix?: string): string;
    /**
     * namespace-block__element
     *
     * @author chitanda
     * @date 2022-09-06 12:09:48
     * @param {string} [element]
     * @return {*}  {string}
     */
    e(element?: string): string;
    /**
     * namespace-block--modifier
     *
     * @author chitanda
     * @date 2022-09-06 12:09:37
     * @param {string} [modifier]
     * @return {*}  {string}
     */
    m(modifier?: string): string;
    /**
     * namespace-block-blockSuffix__element
     *
     * @author chitanda
     * @date 2022-09-06 12:09:52
     * @param {string} [blockSuffix]
     * @param {string} [element]
     * @return {*}  {string}
     */
    be(blockSuffix?: string, element?: string): string;
    /**
     * namespace-block__element--modifier
     *
     * @author chitanda
     * @date 2022-09-06 12:09:19
     * @param {string} [element]
     * @param {string} [modifier]
     * @return {*}  {string}
     */
    em(element?: string, modifier?: string): string;
    /**
     * namespace-block-blockSuffix--modifier
     *
     * @author chitanda
     * @date 2022-09-06 12:09:59
     * @param {string} [blockSuffix]
     * @param {string} [modifier]
     * @return {*}  {string}
     */
    bm(blockSuffix?: string, modifier?: string): string;
    /**
     * namespace-block-blockSuffix__element--modifier
     *
     * @author chitanda
     * @date 2022-09-06 12:09:37
     * @param {string} [blockSuffix]
     * @param {string} [element]
     * @param {string} [modifier]
     * @return {*}  {string}
     */
    bem(blockSuffix?: string, element?: string, modifier?: string): string;
    /**
     * 返回状态 class
     *
     * is('loading', false) => '';
     * is('loading', true) => 'is-loading';
     *
     * @author chitanda
     * @date 2022-09-06 12:09:57
     * @param {string} name
     * @param {boolean} [state]
     * @return {*}  {string}
     */
    is(name: string, state?: boolean): string;
    /**
     * 生成使用到的 css 变量 style 对象
     *
     * @author chitanda
     * @date 2022-09-06 15:09:41
     * @param {Record<string, string>} object
     * @return {*}  {Record<string, string>}
     */
    cssVar(object: Record<string, string>): Record<string, string>;
    /**
     * 生成使用到的 css block 变量 style 对象
     *
     * @author chitanda
     * @date 2022-09-06 15:09:03
     * @param {Record<string, string>} object
     * @return {*}  {Record<string, string>}
     */
    cssVarBlock(object: Record<string, string>): Record<string, string>;
    /**
     * 生成 css var 变量名称
     *
     * @author chitanda
     * @date 2022-09-06 15:09:21
     * @param {string} name
     * @return {*}  {string}
     */
    cssVarName(name: string): string;
    /**
     * 生成块 css var 变量名称
     *
     * @author chitanda
     * @date 2022-09-06 15:09:35
     * @param {string} name
     * @return {*}  {string}
     */
    cssVarBlockName(name: string): string;
}
//# sourceMappingURL=namespace.d.ts.map