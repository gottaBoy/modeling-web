import { ModelError } from '@ibiz-template/core';
import { IDEEndLogic } from '@ibiz/model-core';
import { DELogicContext } from '../../de-logic-context';
import { DELogicNode } from '../de-logic-node';

/**
 * 结束节点
 *
 * @author lxm
 * @date 2023-02-09 21:02:00
 * @export
 * @class EndNode
 * @extends {DELogicNode}
 */
export class EndNode extends DELogicNode {
  declare model: IDEEndLogic;

  async exec(ctx: DELogicContext): Promise<void> {
    ctx.isEndNode = true;
    const { returnParamId, returnType, rawValue } = this.model;

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
          ibiz.i18n.t('runtime.deLogic.deLogicNode.unsupportedReturnType', {
            returnType,
          }),
        );
    }

    ibiz.log.debug(
      ibiz.i18n.t('runtime.deLogic.deLogicNode.endNode', {
        id: this.model.id,
        returnType,
      }),
      ctx.result,
    );
  }
}
