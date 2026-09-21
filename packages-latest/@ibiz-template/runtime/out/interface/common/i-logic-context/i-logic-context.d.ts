import { IApiLogicContext } from '../../api';
/**
 * @description 逻辑执行上下文接口
 * @export
 * @interface ILogicContext
 */
export interface ILogicContext extends IApiLogicContext {
    /**
     * @description 上下文
     * @type {IContext}
     * @memberof ILogicContext
     */
    readonly context: IContext;
    /**
     * @description 数据
     * @type {IData[]}
     * @memberof ILogicContext
     */
    readonly data: IData[];
    /**
     * @description 视图参数
     * @type {IParams}
     * @memberof ILogicContext
     */
    readonly viewParam: IParams;
}
//# sourceMappingURL=i-logic-context.d.ts.map