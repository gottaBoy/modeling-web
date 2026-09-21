import { ModelError } from '@ibiz-template/core';
import { IDELogicNodeParam } from '@ibiz/model-core';
import { clone } from 'ramda';
import { DELogicContext } from '../../de-logic-context';
import { handleSrcVal } from '../../utils';
import { DELogicNode } from '../de-logic-node';

/**
 * 准备参数
 *
 * @author lxm
 * @date 2023-02-09 21:02:20
 * @export
 * @class PrepareParamNode
 * @extends {DELogicNode}
 */
export class PrepareParamNode extends DELogicNode {
  async exec(ctx: DELogicContext): Promise<void> {
    const nodeParams = this.model.delogicNodeParams;
    if (nodeParams?.length) {
      await Promise.all(
        nodeParams.map(nodeParam => {
          let result;
          // 记录下原值(仅仅debug模式才会使用，优化拷贝数据耗时问题)
          let originValue;
          if (nodeParam.dstDELogicParamId && ibiz.env.logLevel === 'DEBUG') {
            originValue = clone(ctx.params[nodeParam.dstDELogicParamId]);
          }
          switch (nodeParam.paramAction) {
            // 设置变量
            case 'SETPARAMVALUE':
              result = this.setParamValue(nodeParam, ctx);
              break;
            // 重置变量
            case 'RESETPARAM':
              result = this.resetParam(nodeParam, ctx);
              break;
            // 拷贝变量
            case 'COPYPARAM':
              result = this.copyParam(nodeParam, ctx);
              break;
            // 绑定参数
            case 'BINDPARAM':
              result = this.bindParam(nodeParam, ctx);
              break;
            // 重新建立变量
            case 'RENEWPARAM':
              result = this.renewParam(nodeParam, ctx);
              break;
            // 附加到数组变量
            case 'APPENDPARAM':
              result = this.appendParam(nodeParam, ctx);
              break;
            // 排序数组变量
            case 'SORTPARAM':
              result = this.sortParam(nodeParam, ctx);
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
            ibiz.i18n.t('runtime.deLogic.deLogicNode.preparationParameter', {
              id: this.model.id,
              paramAction: nodeParam.paramAction,
              dstDELogicParamId: nodeParam.dstDELogicParamId,
            }),
            originValue,
            ibiz.i18n.t('runtime.deLogic.deLogicNode.targetParameter'),
            ctx.params[nodeParam.dstDELogicParamId!],
          );
          return result;
        }),
      );
    }
  }

  /**
   * 拷贝变量
   * @author lxm
   * @date 2023-03-24 09:50:02
   * @protected
   * @param {IDELogicNodeParam} nodeParam
   * @param {DELogicContext} ctx
   * @return {*}  {*}
   */
  protected copyParam(nodeParam: IDELogicNodeParam, ctx: DELogicContext): void {
    const { dstDELogicParamId } = nodeParam;
    const srcVal = handleSrcVal(ctx, nodeParam);
    ctx.params[dstDELogicParamId!] = clone(srcVal);
  }

  /**
   * 绑定参数
   * @author lxm
   * @date 2023-06-13 05:43:43
   * @protected
   * @param {IDELogicNodeParam} nodeParam
   * @param {DELogicContext} ctx
   */
  protected bindParam(nodeParam: IDELogicNodeParam, ctx: DELogicContext): void {
    const srcVal = handleSrcVal(ctx, nodeParam);
    ctx.params[nodeParam.dstDELogicParamId!] = srcVal;
  }

  /**
   * 设置变量
   * @author lxm
   * @date 2023-03-17 03:34:02
   * @protected
   * @param {IDELogicNodeParam} nodeParam
   * @param {DELogicContext} ctx
   */
  protected setParamValue(
    nodeParam: IDELogicNodeParam,
    ctx: DELogicContext,
  ): void {
    const { dstFieldName, dstDELogicParamId } = nodeParam;
    // 目标参数
    let dstField = dstFieldName;

    // 实体参数对象转小写
    if (ctx.isEntityParam(dstDELogicParamId!)) {
      dstField = dstField?.toLowerCase();
    }

    // 源参数
    const srcVal = handleSrcVal(ctx, nodeParam);
    if (dstField) {
      ctx.params[dstDELogicParamId!][dstField] = srcVal;
    } else {
      ctx.params[dstDELogicParamId!] = srcVal;
    }
  }

  /**
   * 重置变量
   * @author lxm
   * @date 2023-03-24 09:46:57
   * @protected
   * @param {IDELogicNodeParam} nodeParam
   * @param {DELogicContext} ctx
   */
  protected resetParam(
    nodeParam: IDELogicNodeParam,
    ctx: DELogicContext,
  ): void {
    const { dstDELogicParamId } = nodeParam;
    ctx.resetParam(dstDELogicParamId!);
  }

  /**
   * 重新建立变量
   * @author lxm
   * @date 2023-03-24 09:46:47
   * @protected
   * @param {IDELogicNodeParam} nodeParam
   * @param {DELogicContext} ctx
   */
  protected renewParam(
    nodeParam: IDELogicNodeParam,
    ctx: DELogicContext,
  ): void {
    const { dstDELogicParamId } = nodeParam;
    ctx.renewParam(dstDELogicParamId!);
  }

  /**
   * 附加到数组变量
   * @author lxm
   * @date 2023-03-24 09:46:47
   * @protected
   * @param {IDELogicNodeParam} nodeParam
   * @param {DELogicContext} ctx
   */
  protected appendParam(
    nodeParam: IDELogicNodeParam,
    ctx: DELogicContext,
  ): void {
    const { dstDELogicParamId, dstIndex, srcIndex, srcSize } = nodeParam;
    const srcVal = handleSrcVal(ctx, nodeParam) as IData[];
    const insertIndex = dstIndex || 0;
    const _srcIndex = srcIndex || 0;
    const _srcSize = srcSize || srcVal.length;
    ctx.params[dstDELogicParamId!].splice(
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
   * @param {IDELogicNodeParam} nodeParam
   * @param {DELogicContext} ctx
   */
  protected sortParam(nodeParam: IDELogicNodeParam, ctx: DELogicContext): void {
    const { dstDELogicParamId, dstFieldName, dstSortDir } = nodeParam;
    const key = dstFieldName!.toLowerCase();
    const arr = ctx.params[dstDELogicParamId!] as IData[];
    arr.sort((a, b) => {
      return dstSortDir === 'ASC' ? a[key] - b[key] : b[key] - a[key];
    });
  }
}
