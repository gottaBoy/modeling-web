import { ILogicLinkCond } from '../common';
import { IDeLogicContext } from './i-de-logic-context';
/**
 * @description 实体逻辑连接条件接口
 * @export
 * @interface IDeLogicLinkCond
 */
export interface IDeLogicLinkCond extends ILogicLinkCond {
    /**
     * @description 条件判断
     * @param {IDeLogicContext} ctx 实体逻辑执行上下文
     * @param {IContext} context 上下文
     * @param {IData} data 数据
     * @returns {*}  {boolean}
     * @memberof IDeLogicLinkCond
     */
    test(ctx: IDeLogicContext, context: IContext, data: IData): boolean;
}
/**
 * @description 实体逻辑连接条件项接口
 * @export
 * @interface IDeLogicLinkSingleCond
 */
export interface IDeLogicLinkSingleCond extends IDeLogicLinkCond {
}
/**
 * @description 实体逻辑连接条件组接口
 * @export
 * @interface IDeLogicLinkGroupCond
 */
export interface IDeLogicLinkGroupCond extends IDeLogicLinkCond {
}
//# sourceMappingURL=i-de-logic-link-cond.d.ts.map