export interface IUILogicContext {
    /**
     * 上一次返回值
     */
    lastReturn: unknown;
    /**
     * 上下文
     */
    readonly context: IContext;
    /**
     * 数据
     */
    readonly data: IData;
    /**
     * 视图参数
     */
    readonly viewParam: IParams;
    /**
     * 界面逻辑参数
     *
     * @author chitanda
     * @date 2023-11-01 17:11:52
     * @type {Record<string, unknown>}
     */
    readonly params: Record<string, unknown>;
    /**
     * UI 逻辑执行返回值
     *
     * @author chitanda
     * @date 2023-11-01 17:11:29
     * @type {unknown}
     */
    result: unknown;
    /**
     * 是否存在结束节点
     *
     * @author chitanda
     * @date 2023-11-01 17:11:57
     * @type {boolean}
     */
    isEndNode: boolean;
    /**
     * 默认参数节点名称
     *
     * @default 'Default'
     * @author chitanda
     * @date 2023-11-01 17:11:31
     * @type {string}
     */
    defaultParamName: string;
    /**
     * 重置实体逻辑参数
     *
     * @author chitanda
     * @date 2023-11-01 17:11:18
     * @param {string} name
     */
    resetParam(name: string): void;
    /**
     * 设置上一次返回值
     *
     * @author chitanda
     * @date 2023-11-01 17:11:31
     * @param {string} name
     */
    renewParam(name: string): void;
    /**
     * 设置上一次返回值
     *
     * @author chitanda
     * @date 2023-11-01 17:11:48
     * @param {unknown} value
     */
    setLastReturn(value: unknown): void;
    /**
     * 是否是实体参数变量（即后台数据对象）
     *
     * @author chitanda
     * @date 2023-11-01 17:11:01
     * @param {string} paramId
     * @return {*}  {boolean}
     */
    isEntityParam(paramId: string): boolean;
}
//# sourceMappingURL=i-ui-logic-context.d.ts.map