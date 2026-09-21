import { ModelError } from '@ibiz-template/core';
import { clone } from 'ramda';
import { ScriptFactory } from '../../utils';
import { DELogicContext } from '../de-logic-context';

type SrcValParams = {
  /**
   * 源值类型
   */
  srcValueType?: string;
  /**
   * 源属性名称
   */
  srcFieldName?: string;
  /**
   * 直接值
   */
  srcValue?: string;
  /**
   * 源参数对象id
   */
  srcDELogicParamId?: string;

  /**
   * 目标逻辑参数
   *
   */
  dstDELogicParamId?: string;

  /**
   * 目标属性名称
   *
   */
  dstFieldName?: string;

  /**
   * 表达式
   *
   */
  expression?: string;
};

/**
 * 解析模型并获取源参数或其中的某个属性
 * @author lxm
 * @date 2023-06-13 11:20:39
 * @export
 * @param {SrcValParams} srcValParams
 * @param {DELogicContext} ctx
 * @return {*}
 */
export function handleSrcVal(
  ctx: DELogicContext,
  srcValParams: SrcValParams,
): unknown {
  const { srcDELogicParamId, srcFieldName, srcValue, expression } =
    srcValParams;
  // 没有源值类型就是逻辑参数
  const srcValueType = srcValParams.srcValueType || 'SRCDLPARAM';
  // 取属性值
  let srcField = srcFieldName;

  let value: unknown;
  switch (srcValueType) {
    // 源逻辑参数
    case 'SRCDLPARAM':
      value = ctx.params[srcDELogicParamId!];
      // 如果是实体参数对象则转换成小写。
      if (ctx.isEntityParam(srcDELogicParamId!)) {
        srcField = srcField?.toLowerCase();
      }
      break;
    // 空值类型
    case 'NULLVALUE':
      return null;
    // 无值类型
    case 'NONEVALUE':
      return undefined;
    // 直接值
    case 'SRCVALUE':
      return ibiz.util.rawValue.format(srcValue);
    case 'WEBCONTEXT': // 网页请求上下文
    case 'VIEWPARAM': // 视图参数
      value = ctx.parameters.params;
      break;
    case 'APPLICATION': // 系统全局对象
    case 'SESSION': // 用户全局对象
    case 'APPDATA': // 应用上下文
    case 'DATACONTEXT': // 数据上下文
      value = ctx.parameters.context;
      break;
    // 当前环境参数
    case 'ENVPARAM':
      value = clone(ibiz.env);
      break;
    case 'EXPRESSION':
      if (!expression) {
        throw new ModelError(
          srcValParams,
          ibiz.i18n.t('runtime.deLogic.deLogicNode.expressionEmpty'),
        );
      }
      value = ScriptFactory.execScriptFn(ctx, expression!, {
        singleRowReturn: true,
        isAsync: false,
      });
      break;
    default:
      throw new ModelError(
        srcValParams,
        ibiz.i18n.t('runtime.deLogic.deLogicNode.sourceValueType', {
          srcValueType,
        }),
      );
  }

  if (value && srcField) {
    try {
      if (Array.isArray(value)) {
        value = value[Number(srcField)];
      } else {
        value = ScriptFactory.execScriptFn(
          { srcValue: value },
          `srcValue.${srcField}`,
          {
            singleRowReturn: true,
            isAsync: false,
          },
        );
      }
    } catch (error) {
      ibiz.log.error(
        ibiz.i18n.t('runtime.deLogic.deLogicNode.fetchingAttribute', {
          srcField,
        }),
        value,
      );
      throw error;
    }
  }

  return value;
}
