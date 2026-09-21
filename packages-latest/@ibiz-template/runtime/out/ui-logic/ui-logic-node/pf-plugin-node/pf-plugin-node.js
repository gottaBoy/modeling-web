import { UILogicNode } from '../ui-logic-node';
import { getUILogicNodePluginProvider } from '../../../register';
/**
 * 前端插件节点
 *
 * @author chitanda
 * @date 2023-11-01 18:11:55
 * @export
 * @class PFPluginNode
 * @extends {UILogicNode}
 */
export class PFPluginNode extends UILogicNode {
    async exec(ctx) {
        ibiz.log.debug(ibiz.i18n.t('runtime.uiLogic.interfaceLogicNodeFrontendPlugin', {
            id: this.model.id,
            sysPFPluginId: this.model.sysPFPluginId,
        }));
        const provider = await getUILogicNodePluginProvider(this.model);
        if (provider) {
            await provider.exec(ctx);
        }
    }
}
