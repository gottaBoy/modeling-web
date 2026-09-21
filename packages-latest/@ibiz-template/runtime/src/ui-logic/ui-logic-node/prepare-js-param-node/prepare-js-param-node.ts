/* eslint-disable no-await-in-loop */
import { ModelError, RuntimeError } from '@ibiz-template/core';
import { IDEUILogicNodeParam } from '@ibiz/model-core';
import { clone } from 'ramda';
import { ScriptFactory } from '../../../utils';
import { UILogicContext } from '../../ui-logic-context';
import { handleSrcVal } from '../../utils';
import { UILogicNode } from '../ui-logic-node';

/**
 * 准备参数
 *
 * @author chitanda
 * @date 2023-02-09 21:02:20
 * @export
 * @class PrepareJSParamNode
 * @extends {UILogicNode}
 */
export class PrepareJSParamNode extends UILogicNode {
  async exec(ctx: UILogicContext): Promise<void> {
    const nodeParams = this.model.deuilogicNodeParams;
    if (!nodeParams?.length) {
      return;
    }
    for (const nodeParam of nodeParams) {
      // 记录下原值(仅仅debug模式才会使用，优化拷贝数据耗时问题)
      let originValue;
      if (nodeParam.dstDEUILogicParamId && ibiz.env.logLevel === 'DEBUG') {
        originValue = clone(ctx.params[nodeParam.dstDEUILogicParamId]);
      }
      switch (nodeParam.paramAction) {
        // 设置变量
        case 'SETPARAMVALUE':
          await this.setParamValue(nodeParam, ctx);
          break;
        // 重置变量
        case 'RESETPARAM':
          await this.resetParam(nodeParam, ctx);
          break;
        // 拷贝变量
        case 'COPYPARAM':
          await this.copyParam(nodeParam, ctx);
          break;
        // 绑定参数
        case 'BINDPARAM':
          await this.bindParam(nodeParam, ctx);
          break;
        // 重新建立变量
        case 'RENEWPARAM':
          await this.renewParam(nodeParam, ctx);
          break;
        // 附加到数组变量
        case 'APPENDPARAM':
          await this.appendParam(nodeParam, ctx);
          break;
        // 排序数组变量
        case 'SORTPARAM':
          await this.sortParam(nodeParam, ctx);
          break;
        default:
          throw new ModelError(
            nodeParam,
            ibiz.i18n.t('runtime.deLogic.deLogicNode.noSupportedLogic', {
              paramAction: nodeParam.paramAction,
            }),
          );
      }
      ibiz.log.debug(
        ibiz.i18n.t('runtime.uiLogic.interfaceLogicNodePreparationParameter', {
          id: this.model.id,
          paramAction: nodeParam.paramAction,
          dstDEUILogicParamId: nodeParam.dstDEUILogicParamId,
        }),
        originValue,
        ibiz.i18n.t('runtime.deLogic.deLogicNode.targetParameter'),
        ctx.params[nodeParam.dstDEUILogicParamId!],
      );
    }
  }

  /**
   * 设置变量
   * @author lxm
   * @date 2023-03-17 03:34:02
   * @protected
   * @param {IPSDELogicNodeParam} nodeParam
   * @param {UILogicContext} ctx
   */
  protected setParamValue(
    nodeParam: IDEUILogicNodeParam,
    ctx: UILogicContext,
  ): void {
    const { dstFieldName, dstDEUILogicParamId } = nodeParam;

    if (!dstDEUILogicParamId) {
      throw new RuntimeError(ibiz.i18n.t('runtime.uiLogic.noTargetParameter'));
    }

    // 目标参数
    let dstField = dstFieldName;

    // 实体参数对象转小写
    if (ctx.isEntityParam(dstDEUILogicParamId!)) {
      dstField = dstField?.toLowerCase();
    }

    // 源参数
    const srcVal = handleSrcVal(ctx, nodeParam);
    if (dstField) {
      // 赋值属性的时候支持脚本写法
      try {
        ScriptFactory.execScriptFn(
          { srcVal, dstParam: ctx.params[dstDEUILogicParamId] },
          `dstParam.${dstFieldName} = srcVal`,
          {
            singleRowReturn: false,
            isAsync: false,
          },
        );
      } catch (error) {
        ibiz.log.error(
          ibiz.i18n.t('runtime.uiLogic.targetParameter', { dstFieldName }),
          ctx.params[dstDEUILogicParamId],
        );
        throw error;
      }
    } else {
      ctx.params[dstDEUILogicParamId!] = srcVal;
    }
  }

  /**
   * 拷贝变量
   * @author lxm
   * @date 2023-03-24 09:50:02
   * @protected
   * @param {IDEUILogicNodeParam} nodeParam
   * @param {UILogicContext} ctx
   * @return {*}  {*}
   */
  protected copyParam(
    nodeParam: IDEUILogicNodeParam,
    ctx: UILogicContext,
  ): void {
    const { dstDEUILogicParamId } = nodeParam;
    const srcVal = handleSrcVal(ctx, nodeParam);
    ctx.params[dstDEUILogicParamId!] = clone(srcVal);
  }

  /**
   * 绑定参数
   * @author lxm
   * @date 2023-06-13 05:43:43
   * @protected
   * @param {IDEUILogicNodeParam} nodeParam
   * @param {UILogicContext} ctx
   */
  protected bindParam(
    nodeParam: IDEUILogicNodeParam,
    ctx: UILogicContext,
  ): void {
    const srcVal = handleSrcVal(ctx, nodeParam);
    ctx.params[nodeParam.dstDEUILogicParamId!] = srcVal;
  }

  /**
   * 重置变量
   * @author lxm
   * @date 2023-03-24 09:46:57
   * @protected
   * @param {IDEUILogicNodeParam} nodeParam
   * @param {UILogicContext} ctx
   */
  protected resetParam(
    nodeParam: IDEUILogicNodeParam,
    ctx: UILogicContext,
  ): void {
    const { dstDEUILogicParamId } = nodeParam;
    ctx.resetParam(dstDEUILogicParamId!);
  }

  /**
   * 重新建立变量
   * @author lxm
   * @date 2023-03-24 09:46:47
   * @protected
   * @param {IDEUILogicNodeParam} nodeParam
   * @param {UILogicContext} ctx
   */
  protected renewParam(
    nodeParam: IDEUILogicNodeParam,
    ctx: UILogicContext,
  ): void {
    const { dstDEUILogicParamId } = nodeParam;
    ctx.renewParam(dstDEUILogicParamId!);
  }

  /**
   * 附加到数组变量
   * @author lxm
   * @date 2023-03-24 09:46:47
   * @protected
   * @param {IDEUILogicNodeParam} nodeParam
   * @param {UILogicContext} ctx
   */
  protected appendParam(
    nodeParam: IDEUILogicNodeParam,
    ctx: UILogicContext,
  ): void {
    const { dstDEUILogicParamId, dstIndex, srcIndex, srcSize } = nodeParam;
    const srcVal = handleSrcVal(ctx, nodeParam) as IData[];
    const insertIndex = dstIndex || 0;
    const _srcIndex = srcIndex || 0;
    const _srcSize = srcSize || srcVal.length;
    ctx.params[dstDEUILogicParamId!].splice(
      insertIndex,
      0,
      ...srcVal.slice(_srcIndex, _srcSize),
    );
  }

  /**
   * 排序数组变量
   * @author lxm
   * @date 2023-03-24 10:23:01
   * @protected
   * @param {IDEUILogicNodeParam} nodeParam
   * @param {UILogicContext} ctx
   */
  protected sortParam(
    nodeParam: IDEUILogicNodeParam,
    ctx: UILogicContext,
  ): void {
    const { dstDEUILogicParamId, dstFieldName, dstSortDir } = nodeParam;
    const key = dstFieldName!;
    const arr = ctx.params[dstDEUILogicParamId!] as IData[];
    arr.sort((a, b) => {
      return dstSortDir === 'ASC' ? a[key] - b[key] : b[key] - a[key];
    });
  }
}
