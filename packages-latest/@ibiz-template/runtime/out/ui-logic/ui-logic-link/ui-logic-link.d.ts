import { IDEUILogicLink } from '@ibiz/model-core';
import { UILogicContext } from '../ui-logic-context';
import { UILogicNode } from '../ui-logic-node/ui-logic-node';
import { IUILogicLink, IUILogicLinkGroupCond } from '../../interface';
/**
 * 界面逻辑连接
 *
 * @author chitanda
 * @date 2023-02-08 16:02:10
 * @export
 * @class UILogicLink
 */
export declare class UILogicLink implements IUILogicLink {
    model: IDEUILogicLink;
    /**
     * 源节点
     *
     * @author chitanda
     * @date 2023-02-08 21:02:53
     * @type {UILogicNode}
     */
    srcNode: UILogicNode | null;
    /**
     * 目标节点
     *
     * @author chitanda
     * @date 2023-02-08 21:02:59
     * @type {UILogicNode}
     */
    dstNode: UILogicNode | null;
    /**
     * @description 连接条件组
     * @type {(IUILogicLinkGroupCond  | null)}
     * @memberof UILogicLink
     */
    groupCond: IUILogicLinkGroupCond | null;
    /**
     * Creates an instance of UILogicLink.
     *
     * @author chitanda
     * @date 2023-02-08 16:02:19
     * @param {UILogicLinkModel} model
     */
    constructor(model: IDEUILogicLink);
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
    exec(ctx: UILogicContext): Promise<boolean>;
}
//# sourceMappingURL=ui-logic-link.d.ts.map