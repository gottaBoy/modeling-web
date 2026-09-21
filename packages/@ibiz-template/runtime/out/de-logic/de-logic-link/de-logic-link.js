import { DELogicLinkGroupCond } from './de-logic-link-group-cond/de-logic-link-group-cond';
/**
 *
 * @author lxm
 * @date 2023-02-08 16:02:10
 * @export
 * @class DELogicLink
 */
export class DELogicLink {
    /**
     * Creates an instance of DELogicLink.
     *
     * @author lxm
     * @date 2023-02-08 16:02:19
     * @param {DELogicLinkModel} model
     */
    constructor(model) {
        this.model = model;
        /**
         * 源节点
         *
         * @author lxm
         * @date 2023-02-08 21:02:53
         * @type {DELogicNode}
         */
        this.srcNode = null;
        /**
         * 目标节点
         *
         * @author lxm
         * @date 2023-02-08 21:02:59
         * @type {DELogicNode}
         */
        this.dstNode = null;
        /**
         * 连接条件组
         *
         * @author lxm
         * @date 2023-02-15 17:02:49
         * @type {(DELogicLinkGroupCond | null)}
         */
        this.groupCond = null;
        const cond = this.model.delogicLinkGroupCond;
        if (cond) {
            this.groupCond = new DELogicLinkGroupCond(cond);
        }
    }
    /**
     * 执行连接
     *
     * @author lxm
     * @date 2023-02-08 22:02:18
     * @param {DELogicContext} ctx
     * @param {IContext} context
     * @param {IData} data
     * @return {*}  {Promise<boolean>} 是否连接成功
     */
    async exec(ctx) {
        const { defaultLink } = this.model;
        if (defaultLink || !this.groupCond) {
            return true;
        }
        // 常规
        return this.groupCond.test(ctx, ctx.context, ctx.data[0] || {});
    }
}
