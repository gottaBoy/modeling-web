/* eslint-disable no-prototype-builtins */
import { ModelError, RuntimeModelError } from '@ibiz-template/core';
import { IDELogicLinkSingleCond } from '@ibiz/model-core';
import { testCond } from '../../../utils';
import { UILogicContext } from '../../ui-logic-context';
import { handleSrcVal } from '../../utils';
import { UILogicLinkCond } from '../ui-logic-link-cond/ui-logic-link-cond';
import { IUILogicLinkSingleCond } from '../../../interface';

/**
 * 界面逻辑连接条件项
 *
 * @author chitanda
 * @date 2023-02-10 15:02:34
 * @export
 * @class UILogicLinkSingleCond
 * @extends {UILogicLinkCond}
 */
export class UILogicLinkSingleCond
  extends UILogicLinkCond
  implements IUILogicLinkSingleCond
{
  /**
   * 源参数
   *
   * @author chitanda
   * @date 2023-02-15 18:02:51
   * @type {string}
   */
  readonly srcParam?: string;

  /**
   * 目标参数
   *
   * @author chitanda
   * @date 2023-02-15 18:02:36
   * @type {string}
   */
  readonly dstParam: string;

  get dstField(): string {
    return this.model.dstFieldName!;
  }

  get op(): string {
    return this.model.condOP!;
  }

  get type(): string | undefined {
    return this.model.paramType;
  }

  get value(): string | undefined {
    return this.model.paramValue;
  }

  constructor(public model: IDELogicLinkSingleCond) {
    super();
    this.srcParam = model.srcLogicParamId;
    this.dstParam = model.dstLogicParamId!;
  }

  /**
   * 执行逻辑检测
   *
   * @author chitanda
   * @date 2023-02-15 18:02:05
   * @param {UILogicContext} ctx
   * @param {IContext} context
   * @param {IData} data
   * @return {*}  {boolean}
   */
  test(ctx: UILogicContext, context: IContext, data: IData): boolean {
    const dstVal = handleSrcVal(ctx, {
      srcDEUILogicParamId: this.dstParam,
      srcFieldName: this.dstField,
    }) as string;
    let result: boolean = false;
    let compareValue;
    if (this.op === 'CONTAINS') {
      const dstObj: unknown = ctx.params[this.dstParam];
      if (dstObj && typeof dstObj === 'object' && this.dstField) {
        result = dstObj.hasOwnProperty(this.dstField);
      }
      ibiz.log.debug(
        ibiz.i18n.t('runtime.uiLogic.interfaceConnectionConditionalContains', {
          name: this.model.name,
          dstField: this.dstField,
        }),
        dstVal,
        ibiz.i18n.t('runtime.deLogic.deLogicLink.comparisonCondition', {
          op: this.op,
        }),
        ibiz.i18n.t('runtime.deLogic.deLogicLink.compareResults'),
        result,
      );
      return result;
    }
    try {
      switch (this.type) {
        case 'ENTITYFIELD': {
          if (!this.value) {
            throw new RuntimeModelError(
              this.model,
              ibiz.i18n.t('runtime.uiLogic.currentConditionValue'),
            );
          }
          // 数据对象属性
          const value =
            data[this.value] != null ? data[this.value] : context[this.value];
          compareValue = value;
          result = testCond(dstVal, this.op, value);
          break;
        }
        case 'SRCENTITYFIELD': {
          if (!this.value) {
            throw new RuntimeModelError(
              this.model,
              ibiz.i18n.t('runtime.uiLogic.sourceDataObjectAttribute'),
            );
          }
          // 源数据对象属性
          const srcVal = handleSrcVal(ctx, {
            srcDEUILogicParamId: this.srcParam,
            srcFieldName: this.value,
          }) as string;
          compareValue = srcVal;
          result = testCond(dstVal, this.op, srcVal);
          break;
        }
        case 'CURTIME': // 当前时间
          throw new ModelError(
            this.model,
            ibiz.i18n.t('runtime.uiLogic.currentTime'),
          );
        default: // 直接使用目标对象参数属性和值做对比
          compareValue = this.value;
          result = testCond(dstVal, this.op, this.value);
      }
    } catch (error) {
      ibiz.log.error(error);
    }
    ibiz.log.debug(
      ibiz.i18n.t('runtime.uiLogic.interfaceConnectionConditionalTypeName', {
        name: this.model.name,
        type: this.type,
        dstField: this.dstField,
      }),
      dstVal,
      ibiz.i18n.t('runtime.deLogic.deLogicLink.comparisonCondition', {
        op: this.op,
      }),
      ibiz.i18n.t('runtime.deLogic.deLogicLink.comparisonValue'),
      compareValue,
      ibiz.i18n.t('runtime.deLogic.deLogicLink.compareResults'),
      result,
    );
    return result;
  }
}
