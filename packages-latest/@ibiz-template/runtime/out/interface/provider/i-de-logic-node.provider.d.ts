import { IDELogicNode } from '@ibiz/model-core';
import { IDeLogicContext, IDeLogicLink } from '../de-logic';
/**
 * @description 实体逻辑前端节点适配器
 * @export
 * @interface IDELogicNodeProvider
 */
export interface IDELogicNodeProvider {
    /**
     * @description 逻辑连线
     * @type {IDeLogicLink[]}
     * @memberof IDELogicNodeProvider
     */
    links: IDeLogicLink[];
    /**
     * @description 节点模型
     * @type {IDELogicNode}
     * @memberof IDELogicNodeProvider
     */
    model: IDELogicNode;
    /**
     * @description 执行实体逻辑
     * @param {IDeLogicContext} ctx 实体逻辑执行上下文
     * @returns {*}  {Promise<void>}
     * @memberof IDELogicNodeProvider
     */
    exec(ctx: IDeLogicContext): Promise<void>;
}
//# sourceMappingURL=i-de-logic-node.provider.d.ts.map