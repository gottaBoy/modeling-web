import { IDEUILogicLink } from '@ibiz/model-core';
import { IUILogicLinkGroupCond } from './i-ui-logic-link-cond';
import { IUILogicNode } from './i-ui-logic-node';
import { IUILogicContext } from './i-ui-logic-context';
/**
 * @description 界面逻辑连线接口
 * @export
 * @interface IUILogicLink
 */
export interface IUILogicLink {
    /**
     * @description 源节点
     * @type {(IUILogicNode | null)}
     * @memberof IUILogicLink
     */
    srcNode: IUILogicNode | null;
    /**
     * @description 目标节点
     * @type {(IUILogicNode | null)}
     * @memberof IUILogicLink
     */
    dstNode: IUILogicNode | null;
    /**
     * @description 模型
     * @type {IDEUILogicLink}
     * @memberof IUILogicLink
     */
    model: IDEUILogicLink;
    /**
     * @description 连接条件组
     * @type {(IUILogicLinkGroupCond | null)}
     * @memberof IUILogicLink
     */
    groupCond: IUILogicLinkGroupCond | null;
    /**
     * @description 执行连接
     * @param {IUILogicContext} ctx 界面逻辑执行上下文
     * @returns {*}  {Promise<boolean>}
     * @memberof IUILogicLink
     */
    exec(ctx: IUILogicContext): Promise<boolean>;
}
//# sourceMappingURL=i-ui-logic-link.d.ts.map