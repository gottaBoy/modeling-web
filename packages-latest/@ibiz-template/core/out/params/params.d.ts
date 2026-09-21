/**
 * @description 视图参数处理类
 * @export
 * @class IBizParams
 * @implements {IParams}
 */
export declare class IBizParams implements IParams {
    [key: string | symbol]: any;
    /**
     * @description 自身的属性
     * @protected
     * @type {IParams}
     * @memberof IBizParams
     */
    protected _params: IParams;
    /**
     * @description 父视图参数
     * @protected
     * @type {IParams}
     * @memberof IBizParams
     */
    protected _parent?: IParams;
    /**
     * Creates an instance of IBizParams.
     * @param {IParams} [params] 自身的参数
     * @param {IParams} [parent] 父视图参数
     * @memberof IBizParams
     */
    constructor(params?: IParams, parent?: IParams);
    /**
     * @description 创建代理对象
     * @protected
     * @returns {*}  {IBizParams}
     * @memberof IBizParams
     */
    protected createProxy(): IBizParams;
    /**
     * @description 在不改变对象引用的情况下，重置视图参数，等效于重新实例化，但是引用不变
     * @param {IParams} [params] 视图参数
     * @param {IParams} [parent] 父视图参数
     * @memberof IBizParams
     */
    reset(params?: IParams, parent?: IParams): void;
    /**
     * @description 销毁视图参数，避免内存泄漏
     * @memberof IBizParams
     */
    destroy(): void;
}
//# sourceMappingURL=params.d.ts.map