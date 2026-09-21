import { RuntimeError } from '@ibiz-template/core';
import {
  IDEFVRCondition,
  IDEFVRGroupCondition,
  IDEFVRRegExCondition,
  IDEFVRSimpleCondition,
  IDEFVRSingleCondition,
  IDEFVRStringLengthCondition,
  IDEFVRSysValueRuleCondition,
  IDEFVRValueRange2Condition,
  ISysValueRule,
} from '@ibiz/model-core';
import { isNilOrEmpty } from 'qx-util';
import { isEmpty, isNil } from 'ramda';
import { ScriptFactory } from '../script';
import { testCond } from './verify';

function isGroupCondition(
  condition: IDEFVRCondition,
): condition is IDEFVRGroupCondition {
  return condition.condType === 'GROUP';
}

function isSimpleCondition(
  condition: IDEFVRCondition,
): condition is IDEFVRSimpleCondition {
  return condition.condType === 'SIMPLE';
}

function isValueRange2Condition(
  condition: IDEFVRCondition,
): condition is IDEFVRValueRange2Condition {
  return condition.condType === 'VALUERANGE2';
}

function isRegExCondition(
  condition: IDEFVRCondition,
): condition is IDEFVRRegExCondition {
  return condition.condType === 'REGEX';
}

function isStringLengthCondition(
  condition: IDEFVRCondition,
): condition is IDEFVRStringLengthCondition {
  return condition.condType === 'STRINGLENGTH';
}

function isSysValueRuleCondition(
  condition: IDEFVRCondition,
): condition is IDEFVRSysValueRuleCondition {
  return condition.condType === 'SYSVALUERULE';
}

/**
 * 校验属性值规则
 *
 * @param {string} name 校验属性值所在字段的名称
 * @param {*} data 数据对象
 * @param {*} condition 规则条件
 * @returns {{ isPast: boolean, infoMessage: string }}
 * @memberof Verify
 */
export function verifyDeRules(
  name: string,
  data: IData,
  condition: IDEFVRCondition,
): { isPast: boolean; infoMessage: string } {
  const flag = { isPast: true, infoMessage: condition.ruleInfo! };
  if (isGroupCondition(condition)) {
    const childRules = condition.conds;
    if (childRules && childRules.length > 0) {
      flag.isPast = logicForEach(
        childRules,
        (item: IDEFVRCondition) => {
          const { isPast, infoMessage } = verifyDeRules(name, data, item);
          // 每次都把分组的结果信息改为该条件的信息，短路后是最后一个条件的信息
          flag.infoMessage = infoMessage;
          return isPast;
        },
        condition.condOp,
        !!condition.notMode,
      );
      // 分组结果为false时，如果是AND分组且取反，或是OR分组未取反，提示分组信息
      if (
        !flag.isPast &&
        ((condition.condOp === 'AND' && condition.notMode) ||
          (condition.condOp === 'OR' && !condition.notMode))
      ) {
        flag.infoMessage = condition.ruleInfo!;
      }
    }
  } else {
    name = (condition as IDEFVRSingleCondition)?.defname!.toLowerCase() || name;
    try {
      // 常规规则
      if (isSimpleCondition(condition)) {
        flag.isPast = !checkFieldSimpleRule(
          data[name],
          condition.condOp!,
          condition.paramValue!,
          condition.ruleInfo!,
          condition.paramType!,
          data,
          condition.keyCond!,
        );
        // 数值范围
      } else if (isValueRange2Condition(condition)) {
        flag.isPast = !checkFieldValueRangeRule(
          data[name],
          condition.minValue!,
          condition.includeMinValue!,
          condition.maxValue!,
          condition.includeMaxValue!,
          condition.ruleInfo!,
          condition.keyCond!,
        );
        // 正则式
      } else if (isRegExCondition(condition)) {
        flag.isPast = !checkFieldRegExRule(
          data[name],
          condition.regExCode!,
          condition.ruleInfo!,
          condition.keyCond!,
        );
        // 长度
      } else if (isStringLengthCondition(condition)) {
        flag.isPast = !checkFieldStringLengthRule(
          data[name],
          condition.minValue!,
          condition.includeMinValue!,
          condition.maxValue!,
          condition.includeMaxValue!,
          condition.ruleInfo!,
          condition.keyCond!,
        );
        // 系统值规则
      } else if (
        isSysValueRuleCondition(condition) &&
        condition?.sysValueRule
      ) {
        const { ruleType, regExCode, scriptCode, ruleInfo } =
          condition.sysValueRule as ISysValueRule;
        flag.infoMessage = condition.ruleInfo || ruleInfo!;
        if (ruleType === 'REG') {
          flag.isPast = !checkFieldRegExRule(
            data[name],
            regExCode!,
            flag.infoMessage!,
            condition.keyCond!,
          );
        } else if (ruleType === 'SCRIPT') {
          const { isPast, infoMessage } = checkFieldScriptRule(
            data[name],
            data,
            scriptCode!,
            flag.infoMessage!,
            condition.keyCond!,
          );
          flag.isPast = isPast;
          flag.infoMessage = infoMessage || flag.infoMessage!;
        }
      }
    } catch (error) {
      flag.isPast = false;
    }
    // 取反
    flag.isPast = condition.notMode ? !flag.isPast : flag.isPast;
  }
  return flag;
}

/**
 * 遍历数据并进行逻辑判断，支持&&和||，支持短路
 *
 * @param {IDEFVRCondition[]} array 数组
 * @param {Function} callback 回调函数
 * @param {string} [operateTag='AND'] 与或操作标识,支持AND、OR
 * @param {boolean} [isReverse=false] 是否取反
 * @returns {boolean}
 * @memberof Verify
 */
function logicForEach(
  array: IDEFVRCondition[],
  callback: (item: IDEFVRCondition, index: number) => boolean,
  operateTag: string = 'AND',
  isReverse: boolean = false,
): boolean {
  if (!(array?.length > 0)) {
    return false;
  }
  let result: boolean = operateTag === 'AND';
  for (let i = 0, len = array.length; i < len; i++) {
    const temp = callback(array[i], i);
    if (operateTag === 'AND') {
      if (!temp) {
        result = false;
        break;
      }
    } else if (operateTag === 'OR') {
      if (temp) {
        result = true;
        break;
      }
    }
  }
  return isReverse ? !result : result;
}

/**
 * 检查属性常规条件
 *
 * @static
 * @param {*} value 属性值
 * @param {string} op 检测条件
 * @param {*} value2 预定义值
 * @param {string} errorInfo 错误信息
 * @param {string} paramType 参数类型
 * @param {*} form 表单对象
 * @param {boolean} primaryModel 是否必须条件
 * @returns {boolean}
 * @memberof Verify
 */
function checkFieldSimpleRule(
  value: string,
  op: string,
  value2: string,
  errorInfo: string,
  paramType: string,
  form: IData,
  primaryModel: boolean,
): boolean {
  if (Object.is(paramType, 'CURTIME')) {
    value2 = `${new Date()}`;
  }
  if (Object.is(paramType, 'ENTITYFIELD')) {
    value2 = value2 ? value2.toLowerCase() : '';
    const _value2Field = form[value2] ? form[value2] : value2;
    value2 = _value2Field;
  }
  if (isNil(errorInfo) || isEmpty(errorInfo)) {
    errorInfo = ibiz.i18n.t('runtime.utils.verify.contentConform');
  }
  const result = testCond(value, op, value2);
  if (!result) {
    if (primaryModel) {
      throw new RuntimeError(errorInfo);
    }
  }
  return !result;
}

/**
 * 检查属性字符长度规则
 *
 * @static
 * @param {*} viewValue
 * @param {number} minLength
 * @param {boolean} indexOfMin
 * @param {number} maxLength
 * @param {boolean} indexOfMax
 * @param {string} errorInfo
 * @param {boolean} primaryModel
 * @returns {boolean}
 * @memberof Verify
 */
function checkFieldStringLengthRule(
  viewValue: string,
  minLength: number,
  indexOfMin: boolean,
  maxLength: number,
  indexOfMax: boolean,
  errorInfo: string,
  primaryModel: boolean,
): boolean {
  if (isNilOrEmpty(errorInfo)) {
    errorInfo = ibiz.i18n.t('runtime.utils.verify.scopeRules');
  }

  const judge = isNilOrEmpty(viewValue);
  if (judge) {
    if (primaryModel) {
      throw new RuntimeError(ibiz.i18n.t('runtime.utils.verify.valueNull'));
    }
    errorInfo = ibiz.i18n.t('runtime.utils.verify.valueNull');
    return true;
  }

  const viewValueLength: number = viewValue.length;

  // 小于等于
  if (minLength !== null) {
    if (indexOfMin) {
      if (viewValueLength < minLength) {
        if (primaryModel) {
          throw new RuntimeError(errorInfo);
        }
        return true;
      }
    } else if (viewValueLength <= minLength) {
      if (primaryModel) {
        throw new RuntimeError(errorInfo);
      }
      return true;
    }
  }

  //  大于等于
  if (maxLength !== null) {
    if (indexOfMax) {
      if (viewValueLength > maxLength) {
        if (primaryModel) {
          throw new RuntimeError(errorInfo);
        }
        return true;
      }
    } else if (viewValueLength >= maxLength) {
      if (primaryModel) {
        throw new RuntimeError(errorInfo);
      }
      return true;
    }
  }
  errorInfo = '';
  return false;
}

/**
 * 检查属性值正则式规则
 *
 * @static
 * @param {string} viewValue 属性值
 * @param {*} strReg 验证正则
 * @param {string} errorInfo 错误信息
 * @param {boolean} primaryModel 是否关键条件
 * @returns {boolean}
 * @memberof Verify
 */
function checkFieldRegExRule(
  viewValue: string,
  strReg: string | RegExp,
  errorInfo: string,
  primaryModel: boolean,
): boolean {
  if (isNilOrEmpty(errorInfo)) {
    errorInfo = ibiz.i18n.t('runtime.utils.verify.regularRules');
  }
  const judge = isNilOrEmpty(viewValue);
  if (judge) {
    if (primaryModel) {
      throw new RuntimeError(ibiz.i18n.t('runtime.utils.verify.valueNull'));
    }
    errorInfo = ibiz.i18n.t('runtime.utils.verify.valueNull');
    return true;
  }
  const regExp = new RegExp(strReg);
  if (!regExp.test(viewValue)) {
    if (primaryModel) {
      throw new RuntimeError(errorInfo);
    }
    return true;
  }

  errorInfo = '';
  return false;
}

/**
 * 检查属性值范围规则
 *
 * @static
 * @param {string} viewValue 属性值
 * @param {*} minNumber 最小数值
 * @param {boolean} indexOfMin 是否包含最小数值
 * @param {*} maxNumber 最大数值
 * @param {boolean} indexOfMax 是否包含最大数值
 * @param {string} errorInfo 错误信息
 * @param {boolean} primaryModel 是否关键条件
 * @returns {boolean}
 * @memberof Verify
 */
function checkFieldValueRangeRule(
  viewValue: string,
  minNumber: number,
  indexOfMin: boolean,
  maxNumber: number,
  indexOfMax: boolean,
  errorInfo: string,
  primaryModel: boolean,
): boolean {
  if (isNilOrEmpty(errorInfo)) {
    errorInfo = ibiz.i18n.t('runtime.utils.verify.rangeRules');
  }

  const isEmptyVal = isNilOrEmpty(viewValue);
  if (isEmptyVal) {
    if (primaryModel) {
      throw new RuntimeError(ibiz.i18n.t('runtime.utils.verify.valueNull'));
    }
    errorInfo = ibiz.i18n.t('runtime.utils.verify.valueNull');
    return true;
  }

  const valueFormat = checkFieldRegExRule(
    viewValue,
    /^-?\d*\.?\d+$/,
    '',
    primaryModel,
  );
  if (valueFormat) {
    return true;
  }

  const data = Number.parseFloat(viewValue);

  // 小于等于
  if (minNumber !== null) {
    if (indexOfMin) {
      if (data < minNumber) {
        if (primaryModel) {
          throw new RuntimeError(errorInfo);
        }
        return true;
      }
    } else if (data <= minNumber) {
      if (primaryModel) {
        throw new RuntimeError(errorInfo);
      }
      return true;
    }
  }

  // //大于等于
  if (maxNumber != null) {
    if (indexOfMax) {
      if (data > maxNumber) {
        if (primaryModel) {
          throw new RuntimeError(errorInfo);
        }
        return true;
      }
    } else if (data >= maxNumber) {
      if (primaryModel) {
        throw new RuntimeError(errorInfo);
      }
      return true;
    }
  }

  errorInfo = '';
  return false;
}

/**
 * 检查脚本值规则
 *
 * @static
 * @param {string} value 属性值
 * @param {*} data 数据对象
 * @param {*} scriptCode 脚本内容
 * @param {string} errorInfo 错误信息
 * @param {boolean} primaryModel 是否关键条件
 * @returns {boolean}
 * @memberof Verify
 */
function checkFieldScriptRule(
  value: string,
  data: IData,
  scriptCode: string,
  errorInfo: string,
  primaryModel: boolean,
): { isPast: boolean; infoMessage: string } {
  if (isNilOrEmpty(errorInfo)) {
    errorInfo = ibiz.i18n.t('runtime.utils.verify.scriptRules');
  }
  // 脚本准备参数
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const source = data;
  let selfError = '';
  let resultBoolean: boolean = true;
  // 脚本回调
  const callback = (error: IData[] | IData): void => {
    resultBoolean = false;
    // 脚本回调多个错误信息
    if (error?.length > 0) {
      error.forEach((item: IData) => {
        if (item?.message) {
          selfError += item.message;
        }
      });
      // 脚本回调单个错误信息
    } else if ((error as IData)?.message) {
      selfError = (error as IData).message;
    }
  };

  try {
    // 避免脚本内变量冲突
    const result = ScriptFactory.execScriptFn(
      { value, data: source },
      scriptCode,
      { isAsync: false },
    );
    if (typeof result === 'boolean') {
      resultBoolean = result;
    }
  } catch (error) {
    ibiz.log.error(error);
    callback(error as IData[] | IData);
  }

  errorInfo = '';
  if (!resultBoolean && primaryModel) {
    throw new RuntimeError(errorInfo);
  }
  return { isPast: resultBoolean, infoMessage: selfError || errorInfo };
}
