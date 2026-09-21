import { IDEUILogicLinkGroupCond } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicLinkCond } from '../ui-logic-link-cond/ui-logic-link-cond';
import { UILogicLinkSingleCond } from '../ui-logic-link-single-cond/ui-logic-link-single-cond';
import { IUILogicLinkGroupCond } from '../../../interface';
/**
 * 界面逻辑连接条件组
 *
 * @author chitanda
 * @date 2023-02-10 15:02:21
 * @export
 * @class UILogicLinkGroupCond
 * @extends {UILogicLinkCond}
 */
export declare class UILogicLinkGroupCond extends UILogicLinkCond implements IUILogicLinkGroupCond {
    model: IDEUILogicLinkGroupCond;
    /**
     * 操作标识
     *
     * @author chitanda
     * @date 2023-02-15 17:02:04
     * @readonly
     * @protected
     * @type {('AND' | 'OR')}
     */
    protected get op(): 'AND' | 'OR';
    /**
     * 结果是否取反值
     *
     * @author chitanda
     * @date 2023-02-15 17:02:10
     * @readonly
     * @protected
     * @type {boolean}
     */
    protected get notMode(): boolean;
    /**
     * 子条件
     *
     * @author chitanda
     * @date 2023-02-15 18:02:18
     * @protected
     * @type {((UILogicLinkSingleCond | UILogicLinkGroupCond)[])}
     */
    protected conds: (UILogicLinkSingleCond | UILogicLinkGroupCond)[];
    constructor(model: IDEUILogicLinkGroupCond);
    /**
     * 条件判断
     *
     * @author chitanda
     * @date 2023-02-15 17:02:19
     * @param {UILogicContext} ctx
     * @param {IContext} context
     * @param {IData} data
     * @return {*}  {boolean}
     */
    test(ctx: UILogicContext, context: IContext, data: IData): boolean;
}
//# sourceMappingURL=ui-logic-link-group-cond.d.ts.map