import { DELogicContext } from '../../de-logic-context';
import { DELogicNode } from '../de-logic-node';

/**
 * 启动节点
 *
 * @author lxm
 * @date 2023-02-09 21:02:30
 * @export
 * @class StartNode
 * @extends {DELogicNode}
 */
export class StartNode extends DELogicNode {
  async exec(_ctx: DELogicContext): Promise<void> {
    // 启动节点，无任何操作
    ibiz.log.debug(
      ibiz.i18n.t('runtime.deLogic.deLogicNode.startupNode', {
        id: this.model.id,
      }),
    );
  }
}
