import { RuntimeModelError } from '@ibiz-template/core';
import { UIActionUtil } from '../../../ui-action';
import { UILogicNode } from '../ui-logic-node';
/**
 * 实体界面行为
 *
 * @author chitanda
 * @date 2023-02-09 19:02:09
 * @export
 * @class DEUIActionNode
 * @extends {UILogicNode}
 */
export class DEUIActionNode extends UILogicNode {
    async exec(ctx) {
        const { dstAppDEUIActionId, dstDEUILogicParamId, dstAppDataEntityId } = this.model;
        const { data, parameters } = ctx;
        if (!dstAppDEUIActionId) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.uiLogic.noConfiguredInterfaceBehavior'));
        }
        let actionData = [data];
        if (dstDEUILogicParamId) {
            const param = ctx.params[dstDEUILogicParamId];
            if (param instanceof Array) {
                actionData = param;
            }
            else {
                actionData = [param];
            }
        }
        ibiz.log.debug(ibiz.i18n.t('runtime.uiLogic.interfaceLogicNodeEntityInterfaceAction', {
            id: this.model.id,
            dstAppDEUIActionId,
            dstAppDataEntityId,
            dstDEUILogicParamId,
        }));
        await UIActionUtil.execAndResolved(dstAppDEUIActionId, Object.assign(Object.assign({}, parameters), { context: ctx.context, params: ctx.viewParam, data: actionData }), this.model.appId);
    }
}
