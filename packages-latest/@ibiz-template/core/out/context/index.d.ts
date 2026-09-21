import { IIBizContext } from '../interface';
/**
 * @description 上下文处理类
 * @export
 * @class IBizContext
 * @implements {IIBizContext}
 */
export declare class IBizContext implements IIBizContext {
    [key: string | symbol]: any;
    /**
     * @description 当前所归属的应用
     * @type {string}
     * @memberof IBizContext
     */
    srfappid: string;
    /**
     * @description 界面域标识，每个独立路由导航的视图生成
     * @type {string}
     * @memberof IBizContext
     */
    srfsessionid: string;
    /**
     * @description clone 后引用的上下文实例，需要在实例销毁时，同时销毁
     * @protected
     * @type {IBizContext[]}
     * @memberof IBizContext
     */
    protected _associationContext: IBizContext[];
    /**
     * @description 修改的父上下文
     * @protected
     * @type {IData}
     * @memberof IBizContext
     */
    protected _context: IData;
    /**
     * @description 父的上下文源对象
     * @type {IContext}
     * @memberof IBizContext
     */
    _parent?: IContext;
    /**
     * Creates an instance of IBizContext.
     * @param {IData} [context={}] 自身的上下文
     * @param {IContext} [parent] 父的上下文源对象
     * @memberof IBizContext
     */
    private constructor();
    /**
     * @description 初始化上下文，并关联父上下文
     * @private
     * @param {IContext} parent
     * @memberof IBizContext
     */
    private initWithParent;
    /**
     * @description 返回自身独有的上下文，和父有差异的
     * @returns {*}  {IData}
     * @memberof IBizContext
     */
    getOwnContext(): IData;
    /**
     * @description 销毁当前上下文对象
     * @memberof IBizContext
     */
    destroy(): void;
    /**
     * @description 在非视图中，需要断开视图上下文联系时。只能使用 clone 创建新的局部上下文
     * @returns {*}  {IBizContext}
     * @memberof IBizContext
     */
    clone(): IBizContext;
    /**
     * @description 深度克隆，只返回现有数据
     * @returns {*}  {IData}
     * @memberof IBizContext
     */
    deepClone(): IData;
    /**
     * @description 在不改变对象引用的情况下，重置上下文,等效于重新实例化，但是引用不变
     * @param {IData} [context={}]
     * @param {IContext} [parent]
     * @memberof IBizContext
     */
    reset(context?: IData, parent?: IContext): void;
    /**
     * @description 上下文只有在视图初始化时，调用 create 方法
     * @static
     * @param {IData} [context]
     * @param {IContext} [parent]
     * @returns {*}  {IBizContext}
     * @memberof IBizContext
     */
    static create(context?: IData, parent?: IContext): IBizContext;
}
//# sourceMappingURL=index.d.ts.map