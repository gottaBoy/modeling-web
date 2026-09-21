import { RuntimeModelError } from '@ibiz-template/core';
import {
  IDELogicLinkSingleCond,
  IDEUILogicLinkGroupCond,
} from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicLinkCond } from '../ui-logic-link-cond/ui-logic-link-cond';
import { UILogicLinkSingleCond } from '../ui-logic-link-single-cond/ui-logic-link-single-cond';
import { IUILogicLinkGroupCond } from '../../../interface';

/**
 * 界面逻辑连接条件组
 *
 * @author chitanda
 * @date 2023-02-10 15:02:21
 * @export
 * @class UILogicLinkGroupCond
 * @extends {UILogicLinkCond}
 */
export class UILogicLinkGroupCond
  extends UILogicLinkCond
  implements IUILogicLinkGroupCond
{
  /**
   * 操作标识
   *
   * @author chitanda
   * @date 2023-02-15 17:02:04
   * @readonly
   * @protected
   * @type {('AND' | 'OR')}
   */
  protected get op(): 'AND' | 'OR' {
    return this.model.groupOP as 'AND' | 'OR';
  }

  /**
   * 结果是否取反值
   *
   * @author chitanda
   * @date 2023-02-15 17:02:10
   * @readonly
   * @protected
   * @type {boolean}
   */
  protected get notMode(): boolean {
    return this.model.notMode === true;
  }

  /**
   * 子条件
   *
   * @author chitanda
   * @date 2023-02-15 18:02:18
   * @protected
   * @type {((UILogicLinkSingleCond | UILogicLinkGroupCond)[])}
   */
  protected conds: (UILogicLinkSingleCond | UILogicLinkGroupCond)[];

  constructor(public model: IDEUILogicLinkGroupCond) {
    super();
    const conds = model.deuilogicLinkConds || [];
    this.conds = conds.map(cond => {
      return cond.logicType === 'SINGLE'
        ? new UILogicLinkSingleCond(cond as IDELogicLinkSingleCond)
        : new UILogicLinkGroupCond(cond as IDEUILogicLinkGroupCond);
    });
  }

  /**
   * 条件判断
   *
   * @author chitanda
   * @date 2023-02-15 17:02:19
   * @param {UILogicContext} ctx
   * @param {IContext} context
   * @param {IData} data
   * @return {*}  {boolean}
   */
  test(ctx: UILogicContext, context: IContext, data: IData): boolean {
    let bol = this.op !== 'OR';
    if (this.conds.length === 0) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.uiLogic.interfaceConnectionConditional'),
      );
    }
    for (let i = 0; i < this.conds.length; i++) {
      const cond = this.conds[i];
      const judge = cond.test(ctx, context, data);
      // 当判断条件为 AND 时，只要有一个条件未满足则为失败
      if (this.op === 'AND' && judge === false) {
        bol = false;
        break;
      }
      // 当判断条件为 OR 时，只要有一个条件满足则为成功
      if (this.op === 'OR' && judge === true) {
        bol = true;
        break;
      }
    }
    const result = this.notMode ? !bol : bol;
    ibiz.log.debug(
      ibiz.i18n.t('runtime.uiLogic.connectionConditionGroup', {
        name: this.model.name,
        id: this.model.id,
      }),
      result,
    );
    return result;
  }
}
