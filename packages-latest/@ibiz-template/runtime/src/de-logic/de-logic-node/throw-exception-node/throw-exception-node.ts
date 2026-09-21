import { HttpError } from '@ibiz-template/core';
import { IDEThrowExceptionLogic } from '@ibiz/model-core';
import { DELogicContext } from '../../de-logic-context';
import { DELogicNode } from '../de-logic-node';

/**
 * 抛出异常节点
 *
 * @author lxm
 * @date 2023-02-09 21:02:00
 * @export
 * @class ThrowExceptionNode
 * @extends {DELogicNode}
 */
export class ThrowExceptionNode extends DELogicNode {
  declare model: IDEThrowExceptionLogic;

  async exec(_ctx: DELogicContext): Promise<void> {
    const { errorCode, errorInfo } = this.model;

    ibiz.log.debug(
      ibiz.i18n.t('runtime.deLogic.deLogicNode.throwsException', {
        id: this.model.id,
        errorCode,
        errorInfo,
      }),
    );
    throw new HttpError({
      response: {
        status: errorCode!,
        statusText: errorInfo!,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  }
}
