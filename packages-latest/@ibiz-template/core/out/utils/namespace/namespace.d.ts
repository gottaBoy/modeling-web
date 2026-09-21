export declare const defaultNamespace = "ibiz";
/**
 * @description 全局样式处理命名空间
 * @export
 * @class Namespace
 */
export declare class Namespace {
    protected block: string;
    /**
     * @description 命名空间
     * @type {string}
     * @memberof Namespace
     */
    namespace: string;
    /**
     * Creates an instance of Namespace.
     * @param {string} block 当前命名空间的根模块,例如组件的名称
     * @param {string} [namespace] 指定命名空间，未指定使用默认值 ibiz
     * @memberof Namespace
     */
    constructor(block: string, namespace?: string);
    /**
     * @description namespace-block、namespace-block-blockSuffix
     * @param {string} [blockSuffix='']
     * @returns {*}  {string}
     * @memberof Namespace
     */
    b(blockSuffix?: string): string;
    /**
     * @description namespace-block__element
     * @param {string} [element]
     * @returns {*}  {string}
     * @memberof Namespace
     */
    e(element?: string): string;
    /**
     * @description namespace-block--modifier
     * @param {string} [modifier]
     * @returns {*}  {string}
     * @memberof Namespace
     */
    m(modifier?: string): string;
    /**
     * @description namespace-block-blockSuffix__element
     * @param {string} [blockSuffix]
     * @param {string} [element]
     * @returns {*}  {string}
     * @memberof Namespace
     */
    be(blockSuffix?: string, element?: string): string;
    /**
     * @description namespace-block__element--modifier
     * @param {string} [element]
     * @param {string} [modifier]
     * @returns {*}  {string}
     * @memberof Namespace
     */
    em(element?: string, modifier?: string): string;
    /**
     * @description namespace-block-blockSuffix--modifier
     * @param {string} [blockSuffix]
     * @param {string} [modifier]
     * @returns {*}  {string}
     * @memberof Namespace
     */
    bm(blockSuffix?: string, modifier?: string): string;
    /**
     * @description namespace-block-blockSuffix__element--modifier
     * @param {string} [blockSuffix]
     * @param {string} [element]
     * @param {string} [modifier]
     * @returns {*}  {string}
     * @memberof Namespace
     */
    bem(blockSuffix?: string, element?: string, modifier?: string): string;
    /**
     * @description 返回状态类
     * @param {string} name
     * @param {boolean} [state]
     * @example
     * ```typescript
     * is('loading', false) => '';
     * is('loading', true) => 'is-loading';
     * ```
     * @returns {*}  {string}
     * @memberof Namespace
     */
    is(name: string, state?: boolean): string;
    /**
     * @description 生成使用到的 css 变量 style 对象
     * @param {Record<string, string>} object
     * @returns {*}  {Record<string, string>}
     * @memberof Namespace
     */
    cssVar(object: Record<string, string>): Record<string, string>;
    /**
     * @description 生成使用到的 css block 变量 style 对象
     * @param {Record<string, string>} object
     * @returns {*}  {Record<string, string>}
     * @memberof Namespace
     */
    cssVarBlock(object: Record<string, string>): Record<string, string>;
    /**
     * @description 生成 css var 变量名称
     * @param {string} name
     * @returns {*}  {string}
     * @memberof Namespace
     */
    cssVarName(name: string): string;
    /**
     * @description 生成块 css var 变量名称
     * @param {string} name
     * @returns {*}  {string}
     * @memberof Namespace
     */
    cssVarBlockName(name: string): string;
}
//# sourceMappingURL=namespace.d.ts.map