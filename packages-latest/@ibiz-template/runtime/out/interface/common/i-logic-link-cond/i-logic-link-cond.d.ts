import { ILogicContext } from '../i-logic-context/i-logic-context';
/**
 * @description 逻辑连接条件接口
 * @export
 * @interface ILogicLinkCond
 */
export interface ILogicLinkCond {
    /**
     * @description 条件判断
     * @param {ILogicContext} ctx 逻辑执行上下文
     * @param {IContext} context 上下文
     * @param {IData} data 数据
     * @returns {*}  {boolean}
     * @memberof ILogicLinkCond
     */
    test(ctx: ILogicContext, context: IContext, data: IData): boolean;
}
//# sourceMappingURL=i-logic-link-cond.d.ts.map