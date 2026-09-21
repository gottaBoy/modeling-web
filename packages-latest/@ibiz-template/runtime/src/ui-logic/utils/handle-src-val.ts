import { ModelError } from '@ibiz-template/core';
import { clone } from 'ramda';
import { ScriptFactory } from '../../utils';
import { UILogicContext } from '../ui-logic-context';

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
  srcDEUILogicParamId?: string;
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
  ctx: UILogicContext,
  srcValParams: SrcValParams,
): unknown {
  const { srcDEUILogicParamId, srcFieldName, srcValue } = srcValParams;
  // 没有源值类型就是逻辑参数
  const srcValueType = srcValParams.srcValueType || 'SRCDLPARAM';
  // 取属性值
  const srcField = srcFieldName;

  let value: unknown;
  switch (srcValueType) {
    // 源逻辑参数
    case 'SRCDLPARAM':
      value = ctx.params[srcDEUILogicParamId!];
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
        if (
          Number.isNaN(Number(srcField)) &&
          Object.prototype.hasOwnProperty.call(value, srcField)
        ) {
          value = ScriptFactory.execScriptFn(
            { srcValue: value },
            `srcValue.${srcField}`,
            {
              singleRowReturn: true,
              isAsync: false,
            },
          );
        } else {
          value = value[Number(srcField)];
        }
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
