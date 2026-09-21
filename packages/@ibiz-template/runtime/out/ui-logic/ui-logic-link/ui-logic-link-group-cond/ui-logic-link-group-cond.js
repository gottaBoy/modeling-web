import { RuntimeModelError } from '@ibiz-template/core';
import { UILogicLinkCond } from '../ui-logic-link-cond/ui-logic-link-cond';
import { UILogicLinkSingleCond } from '../ui-logic-link-single-cond/ui-logic-link-single-cond';
/**
 * 界面逻辑连接条件组
 *
 * @author chitanda
 * @date 2023-02-10 15:02:21
 * @export
 * @class UILogicLinkGroupCond
 * @extends {UILogicLinkCond}
 */
export class UILogicLinkGroupCond extends UILogicLinkCond {
    /**
     * 操作标识
     *
     * @author chitanda
     * @date 2023-02-15 17:02:04
     * @readonly
     * @protected
     * @type {('AND' | 'OR')}
     */
    get op() {
        return this.model.groupOP;
    }
    /**
     * 结果是否取反值
     *
     * @author chitanda
     * @date 2023-02-15 17:02:10
     * @readonly
     * @protected
     * @type {boolean}
     */
    get notMode() {
        return this.model.notMode === true;
    }
    constructor(model) {
        super();
        this.model = model;
        const conds = model.deuilogicLinkConds || [];
        this.conds = conds.map(cond => {
            return cond.logicType === 'SINGLE'
                ? new UILogicLinkSingleCond(cond)
                : new UILogicLinkGroupCond(cond);
        });
    }
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
    test(ctx, context, data) {
        let bol = this.op !== 'OR';
        if (this.conds.length === 0) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.uiLogic.interfaceConnectionConditional'));
        }
        for (let i = 0; i < this.conds.length; i++) {
            const cond = this.conds[i];
            const judge = cond.test(ctx, context, data);
            // 当判断条件为 AND 时，只要有一个条件未满足则为失败
            if (this.op === 'AND' && judge === false) {
                bol = false;
                break;
            }
            // 当判断条件为 OR 时，只要有一个条件满足则为成功
            if (this.op === 'OR' && judge === true) {
                bol = true;
                break;
            }
        }
        const result = this.notMode ? !bol : bol;
        ibiz.log.debug(ibiz.i18n.t('runtime.uiLogic.connectionConditionGroup', {
            name: this.model.name,
            id: this.model.id,
        }), result);
        return result;
    }
}
