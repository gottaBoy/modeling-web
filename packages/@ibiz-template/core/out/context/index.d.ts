/**
 * 上下文处理类
 *
 * @author chitanda
 * @date 2022-07-14 10:07:24
 * @export
 * @class IBizContext
 */
export declare class IBizContext implements IIBizContext {
    [key: string | symbol]: any;
    /**
     * 当前所归属的应用
     *
     * @author chitanda
     * @date 2023-12-06 21:12:52
     * @type {string}
     */
    srfappid: string;
    /**
     * 界面域标识，每个独立路由导航的视图生成
     *
     * @author chitanda
     * @date 2023-12-22 10:12:06
     * @type {string}
     */
    srfsessionid: string;
    /**
     * clone 后引用的上下文实例，需要在实例销毁时，同时销毁
     *
     * @author chitanda
     * @date 2023-03-13 16:03:31
     * @protected
     * @type {IBizContext[]}
     */
    protected _associationContext: IBizContext[];
    /**
     * 修改的父上下文
     *
     * @author lxm
     * @date 2022-12-08 18:12:16
     * @protected
     * @type {IData}
     */
    protected _context: IData;
    /**
     * 父的上下文源对象
     *
     * @author lxm
     * @date 2022-12-08 18:12:31
     * @type {IContext}
     */
    _parent?: IContext;
    /**
     * Creates an instance of IBizContext.
     *
     * @author chitanda
     * @date 2022-07-14 10:07:15
     * @param {IData} [context={}] 自身的上下文
     * @param {IContext} [parent]
     */
    private constructor();
    private initWithParent;
    /**
     * 返回自身的上下文，独有的和与父有差异的。
     *
     * @author lxm
     * @date 2022-12-08 17:12:26
     * @returns {*}  {IData}
     */
    getOwnContext(): IData;
    /**
     * 销毁当前上下文对象
     *
     * @author chitanda
     * @date 2023-03-13 15:03:04
     */
    destroy(): void;
    /**
     * 在非视图中，需要断开视图上下文联系时。只能使用 clone 创建新的局部上下文
     *
     * @author chitanda
     * @date 2023-03-13 16:03:13
     * @return {*}  {IBizContext}
     */
    clone(): IBizContext;
    /**
     * @description 深度克隆，只返回现有数据
     * @return {*}  {IData}
     * @memberof IBizContext
     */
    deepClone(): IData;
    /**
     * 在不改变对象引用的情况下，重置上下文
     * 等效于重新实例化，但是引用不变
     * @author lxm
     * @date 2023-05-24 10:30:40
     * @param {IData} [context={}]
     * @param {IContext} [parent]
     */
    reset(context?: IData, parent?: IContext): void;
    /**
     * 上下文只有在视图初始化时，调用 create 方法
     *
     * @author chitanda
     * @date 2023-03-13 16:03:32
     * @static
     * @param {IData} [context]
     * @param {IContext} [parent]
     * @return {*}  {IContext}
     */
    static create(context?: IData, parent?: IContext): IBizContext;
}
//# sourceMappingURL=index.d.ts.map