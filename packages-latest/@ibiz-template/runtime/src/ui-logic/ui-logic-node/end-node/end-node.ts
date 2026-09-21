import { ModelError } from '@ibiz-template/core';
import { IDEUIEndLogic } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';

/**
 * 结束节点
 *
 * @author chitanda
 * @date 2023-02-09 21:02:00
 * @export
 * @class EndNode
 * @extends {UILogicNode}
 */
export class EndNode extends UILogicNode {
  declare model: IDEUIEndLogic;

  async exec(ctx: UILogicContext): Promise<void> {
    ctx.isEndNode = true;
    const { returnType, rawValue, returnParamId } = this.model;

    // 没配置不做处理
    if (!returnType) {
      return;
    }

    switch (returnType) {
      case 'NONEVALUE': // 无值（NONE）
        ctx.result = undefined;
        break;
      case 'NULLVALUE': // 空值（NULL）
        ctx.result = null;
        break;
      case 'SRCVALUE': // 直接值
        ctx.result = ibiz.util.rawValue.format(rawValue);
        break;
      case 'LOGICPARAM': // 逻辑参数对象
        ctx.result = ctx.params[returnParamId!];
        break;
      case 'LOGICPARAMFIELD': // 逻辑参数属性
      case 'BREAK': // 跳出循环（BREAK）
      default:
        throw new ModelError(
          this.model,
          ibiz.i18n.t('runtime.uiLogic.unsupportedEndNode', { returnType }),
        );
    }

    ibiz.log.debug(
      ibiz.i18n.t('runtime.uiLogic.interfaceLogicNodeEndNode', {
        id: this.model.id,
        returnType,
      }),
      ctx.result,
    );
  }
}
