/**
 * 视图参数类
 * @author lxm
 * @date 2023-10-27 03:39:12
 * @export
 * @class IBizParams
 * @implements {IParams}
 */
export declare class IBizParams implements IParams {
    [key: string | symbol]: any;
    /**
     * 自身的属性
     * @author lxm
     * @date 2023-10-27 04:09:25
     * @protected
     * @type {IParams}
     */
    protected _params: IParams;
    /**
     * 父视图参数
     * @author lxm
     * @date 2023-10-27 04:08:59
     * @protected
     * @type {IParams}
     */
    protected _parent?: IParams;
    constructor(params?: IParams, parent?: IParams);
    /**
     * 创建代理
     *
     * @author lxm
     * @date 2023-10-27 03:53:14
     * @protected
     * @return {*}  {IBizParams}
     */
    protected createProxy(): IBizParams;
    /**
     * 在不改变对象引用的情况下，重置视图参数
     * 等效于重新实例化，但是引用不变
     * @author lxm
     * @date 2023-10-27 05:24:45
     * @param {IParams} [params]
     * @param {IParams} [parent]
     */
    reset(params?: IParams, parent?: IParams): void;
    /**
     * 销毁上下文，避免内存泄漏
     *
     * @author lxm
     * @date 2023-10-27 03:57:44
     */
    destroy(): void;
}
//# sourceMappingURL=params.d.ts.map