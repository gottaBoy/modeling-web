import { ModelError } from '@ibiz-template/core';
import { UILogicLinkGroupCond } from './ui-logic-link-group-cond/ui-logic-link-group-cond';
/**
 * 界面逻辑连接
 *
 * @author chitanda
 * @date 2023-02-08 16:02:10
 * @export
 * @class UILogicLink
 */
export class UILogicLink {
    /**
     * Creates an instance of UILogicLink.
     *
     * @author chitanda
     * @date 2023-02-08 16:02:19
     * @param {UILogicLinkModel} model
     */
    constructor(model) {
        this.model = model;
        /**
         * 源节点
         *
         * @author chitanda
         * @date 2023-02-08 21:02:53
         * @type {UILogicNode}
         */
        this.srcNode = null;
        /**
         * 目标节点
         *
         * @author chitanda
         * @date 2023-02-08 21:02:59
         * @type {UILogicNode}
         */
        this.dstNode = null;
        /**
         * @description 连接条件组
         * @type {(IUILogicLinkGroupCond  | null)}
         * @memberof UILogicLink
         */
        this.groupCond = null;
        const { linkMode, deuilogicLinkGroupCond } = this.model;
        if ((linkMode || 0) === 0) {
            if (deuilogicLinkGroupCond) {
                this.groupCond = new UILogicLinkGroupCond(deuilogicLinkGroupCond);
            }
        }
    }
    /**
     * 执行连接
     *
     * @author chitanda
     * @date 2023-02-08 22:02:18
     * @param {UILogicContext} ctx
     * @param {IContext} context
     * @param {IData} data
     * @param {IParams} [opt]
     * @return {*}  {Promise<boolean>} 是否连接成功
     */
    async exec(ctx) {
        const { linkMode } = this.model;
        const { context, data } = ctx;
        switch (linkMode || 0) {
            case 0: {
                // 常规
                if (this.groupCond) {
                    return this.groupCond.test(ctx, context, data && data.length > 0 ? data[0] : {});
                }
                return true;
            }
            case 1: // 默认连接
                return true;
            case 2: // 异步结束
                throw new ModelError(this.model, ibiz.i18n.t('runtime.uiLogic.asynchronousTermination'));
            case 3: // 异步拒绝
                throw new ModelError(this.model, ibiz.i18n.t('runtime.uiLogic.asynchronousRejection'));
            case 9: // 异常处理
                throw new ModelError(this.model, ibiz.i18n.t('runtime.uiLogic.exceptionHandling'));
            default:
                throw new ModelError(this.model, ibiz.i18n.t('runtime.uiLogic.logicalLinkTypes', { linkMode }));
        }
    }
}
