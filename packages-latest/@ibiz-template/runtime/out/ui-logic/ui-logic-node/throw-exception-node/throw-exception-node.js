import { RuntimeError } from '@ibiz-template/core';
import { UILogicNode } from '../ui-logic-node';
/**
 * 抛出异常节点
 *
 * @author lxm
 * @date 2023-02-09 21:02:00
 * @export
 * @class ThrowExceptionNode
 * @extends {UILogicNode}
 */
export class ThrowExceptionNode extends UILogicNode {
    async exec(_ctx) {
        const { errorInfo } = this.model;
        ibiz.log.debug(ibiz.i18n.t('runtime.uiLogic.interfaceLogicNodeThrowingExceptions', {
            id: this.model.id,
            errorInfo,
        }));
        throw new RuntimeError(errorInfo);
    }
}
