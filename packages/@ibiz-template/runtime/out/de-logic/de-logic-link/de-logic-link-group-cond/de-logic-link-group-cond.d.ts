import { IDELogicLinkGroupCond } from '@ibiz/model-core';
import { DELogicContext } from '../../de-logic-context';
import { DELogicLinkCond } from '../de-logic-link-cond/de-logic-link-cond';
import { DELogicLinkSingleCond } from '../de-logic-link-single-cond/de-logic-link-single-cond';
/**
 * 界面逻辑连接条件组
 *
 * @author lxm
 * @date 2023-02-10 15:02:21
 * @export
 * @class DELogicLinkGroupCond
 * @extends {DELogicLinkCond}
 */
export declare class DELogicLinkGroupCond extends DELogicLinkCond {
    model: IDELogicLinkGroupCond;
    /**
     * 操作标识
     *
     * @author lxm
     * @date 2023-02-15 17:02:04
     * @readonly
     * @protected
     * @type {('AND' | 'OR')}
     */
    protected get op(): 'AND' | 'OR';
    /**
     * 结果是否取反值
     *
     * @author lxm
     * @date 2023-02-15 17:02:10
     * @readonly
     * @protected
     * @type {boolean}
     */
    protected get notMode(): boolean;
    /**
     * 子条件
     *
     * @author lxm
     * @date 2023-02-15 18:02:18
     * @protected
     * @type {((DELogicLinkSingleCond | DELogicLinkGroupCond)[])}
     */
    protected conds: (DELogicLinkSingleCond | DELogicLinkGroupCond)[];
    constructor(model: IDELogicLinkGroupCond);
    /**
     * 条件判断
     *
     * @author lxm
     * @date 2023-02-15 17:02:19
     * @param {DELogicContext} ctx
     * @param {IContext} context
     * @param {IData} data
     * @return {*}  {boolean}
     */
    test(ctx: DELogicContext, context: IContext, data: IData): boolean;
}
//# sourceMappingURL=de-logic-link-group-cond.d.ts.map