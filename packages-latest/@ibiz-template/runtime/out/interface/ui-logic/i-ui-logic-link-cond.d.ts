import { ILogicLinkCond } from '../common';
import { IUILogicContext } from './i-ui-logic-context';
/**
 * @description 界面逻辑连接条件接口
 * @export
 * @interface IUILogicLinkCond
 */
export interface IUILogicLinkCond extends ILogicLinkCond {
    /**
     * @description 条件判断
     * @param {IUILogicContext} ctx 界面逻辑执行上下文
     * @param {IContext} context 上下文
     * @param {IData} data 数据
     * @returns {*}  {boolean}
     * @memberof IUILogicLinkCond
     */
    test(ctx: IUILogicContext, context: IContext, data: IData): boolean;
}
/**
 * @description 界面逻辑连接条件项接口
 * @export
 * @interface IUILogicLinkSingleCond
 */
export interface IUILogicLinkSingleCond extends IUILogicLinkCond {
}
/**
 * @description 界面逻辑连接条件组接口
 * @export
 * @interface IUILogicLinkGroupCond
 */
export interface IUILogicLinkGroupCond extends IUILogicLinkCond {
}
//# sourceMappingURL=i-ui-logic-link-cond.d.ts.map