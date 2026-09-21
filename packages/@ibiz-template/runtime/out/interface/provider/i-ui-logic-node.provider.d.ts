import { IDEUIPFPluginLogic } from '@ibiz/model-core';
import { IUILogicContext } from '../ui-logic';
/**
 * 界面逻辑前端节点适配器
 *
 * @author chitanda
 * @date 2023-11-01 17:11:16
 * @export
 * @interface IUILogicNodeProvider
 */
export interface IUILogicNodeProvider {
    /**
     * 执行界面逻辑 节点
     *
     * @author chitanda
     * @date 2023-11-01 18:11:17
     * @param {IDEUIPFPluginLogic} model
     * @param {IUILogicContext} ctx
     * @return {*}  {Promise<unknown>}
     */
    exec(model: IDEUIPFPluginLogic, ctx: IUILogicContext): Promise<unknown>;
}
//# sourceMappingURL=i-ui-logic-node.provider.d.ts.map