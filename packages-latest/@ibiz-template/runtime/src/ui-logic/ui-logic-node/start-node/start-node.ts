import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';

/**
 * 启动节点
 *
 * @author chitanda
 * @date 2023-02-09 21:02:30
 * @export
 * @class StartNode
 * @extends {UILogicNode}
 */
export class StartNode extends UILogicNode {
  async exec(_ctx: UILogicContext): Promise<void> {
    // 启动节点，无任何操作
    ibiz.log.debug(
      ibiz.i18n.t('runtime.uiLogic.interfaceLogicNodeStartupNode', {
        id: this.model.id,
      }),
    );
  }
}
