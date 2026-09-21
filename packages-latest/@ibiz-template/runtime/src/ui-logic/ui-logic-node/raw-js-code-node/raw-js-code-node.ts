import { IDEUIRawCodeLogic } from '@ibiz/model-core';
import { ScriptFactory } from '../../../utils';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';
/**
 * 直接脚本，同步执行方式写法
 * 1）`return new Promise((resolve) => {
 *       uiLogic.reportpanel.openReportDesignPage().then((result) =>{
 *          resolve(result);
 *       })
 *     });`
 * 2）`return await uiLogic.reportpanel.openReportDesignPage()`
 *
 * @author tony001
 * @date 2024-06-25 14:06:02
 * @export
 * @class RawJSCodeNode
 * @extends {UILogicNode}
 */
export class RawJSCodeNode extends UILogicNode {
  declare model: IDEUIRawCodeLogic;

  async exec(ctx: UILogicContext): Promise<void> {
    ibiz.log.debug(
      ibiz.i18n.t('runtime.uiLogic.interfaceLogicNodeDirectCode', {
        id: this.model.id,
      }),
      this.model.code,
    );
    await ScriptFactory.asyncExecScriptFn(
      {
        view: ctx.view,
        context: ctx.context,
        params: ctx.viewParam,
        uiLogic: ctx.params,
      },
      this.model.code || '',
    );
  }
}
