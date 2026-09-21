/* eslint-disable @typescript-eslint/no-unused-vars */
import { RuntimeError } from '@ibiz-template/core';
import {
  IDEFormItemVR,
  IDEGridEditItemVR,
  IEditor,
  INumberEditor,
  ITextEditor,
} from '@ibiz/model-core';
import { isNilOrEmpty, isNumber } from 'qx-util';
import { isNil } from 'ramda';
import { ScriptFactory, verifyDeRules } from '../../../utils';

/**
 * 生成值规则
 *
 * @author lxm
 * @date 2022-09-02 09:09:02
 * @export
 * @param {IPSDEFormItemVR[]} itemVRs 项值规则集合
 * @param {string} name 值属性名称
 * @param {string} valueItemName 值项名称
 * @returns {*}  {IData[]}
 */
export function generateRules(
  itemVRs: IDEFormItemVR[] | IDEGridEditItemVR[],
  name: string,
  valueItemName?: string,
): IData[] {
  const rules: IData[] = [];
  itemVRs.forEach(item => {
    const { valueRuleType } = item;
    const sysRule = item.sysValueRule;
    const deRule = item.defvalueRule;
    // 系统值规则
    if (valueRuleType === 'SYSVALUERULE' && sysRule) {
      // 正则值规则
      if (sysRule.ruleType === 'REG' || sysRule.ruleType === 'REGEX') {
        rules.push({
          pattern: new RegExp(sysRule.regExCode!),
          message: sysRule.ruleInfo,
          trigger: 'change blur',
        });
        // 脚本值规则
      } else if (sysRule.ruleType === 'SCRIPT') {
        rules.push({
          validator: (
            rule: IData,
            value: IData,
            callback: () => boolean,
            source: IData,
          ) => {
            // 空值时不校验
            if (!value) {
              return true;
            }
            try {
              ScriptFactory.execScriptFn(
                { rule, value, callback, source },
                sysRule.scriptCode!,
                { isAsync: false },
              );
            } catch (error) {
              console.error(error);
              return false;
            }
            return true;
          },
          trigger: 'change blur',
        });
      }
      // 属性值规则
    } else if (valueRuleType === 'DEFVALUERULE' && deRule) {
      // 有值项的情况，校验值项的值
      const valueName = valueItemName || name;
      rules.push({
        validator: (
          rule: IData,
          value: IData,
          callback: (params: Error[] | Error) => boolean,
          source: IData,
        ) => {
          // 空值时不校验
          if (isNilOrEmpty(source[valueName])) {
            return true;
          }
          const { isPast, infoMessage } = verifyDeRules(
            valueName,
            source,
            deRule.groupCond!,
          );
          if (!isPast) {
            callback(new RuntimeError(infoMessage || deRule.ruleInfo!));
          }
          return true;
        },
        trigger: 'change blur',
      });
    }
  });
  return rules;
}

/**
 * 生成编辑器相关的值规则
 * @author lxm
 * @date 2023-10-18 03:36:39
 * @export
 * @param {IEditor} editor
 * @return {*}  {IData[]}
 */
export function generateEditorRules(editor: IEditor): IData[] {
  const rules: IData[] = [];
  const { maxLength, minLength } = editor as ITextEditor;
  const { maxValue, minValue } = editor as INumberEditor;

  if (maxLength) {
    rules.push({
      validator: (
        rule: IData,
        value: IData,
        callback: (params: Error[] | Error) => boolean,
      ) => {
        if (!isNil(value) && value.length > maxLength) {
          callback(
            new Error(
              ibiz.i18n.t('runtime.controller.utils.valueRule.maxLength', {
                maxLength,
                length: value.length,
              }),
            ),
          );
        } else {
          return true;
        }
      },
    });
  }

  if (minLength) {
    rules.push({
      validator: (
        rule: IData,
        value: IData,
        callback: (params: Error[] | Error) => boolean,
      ) => {
        if (!isNil(value) && value.length < minLength) {
          callback(
            new Error(
              ibiz.i18n.t('runtime.controller.utils.valueRule.minLength', {
                minLength,
                length: value.length,
              }),
            ),
          );
        } else {
          return true;
        }
      },
    });
  }

  if (!isNil(maxValue)) {
    rules.push({
      validator: (
        rule: IData,
        value: number,
        callback: (params: Error[] | Error) => boolean,
      ) => {
        if (!isNil(value) && isNumber(value) && value > maxValue) {
          callback(
            new Error(
              ibiz.i18n.t('runtime.controller.utils.valueRule.maxValue', {
                maxValue,
              }),
            ),
          );
        } else {
          return true;
        }
      },
    });
  }

  if (!isNil(minValue)) {
    rules.push({
      validator: (
        rule: IData,
        value: number,
        callback: (params: Error[] | Error) => boolean,
      ) => {
        if (!isNil(value) && isNumber(value) && value < minValue) {
          callback(
            new Error(
              ibiz.i18n.t('runtime.controller.utils.valueRule.minValue', {
                minValue,
              }),
            ),
          );
        } else {
          return true;
        }
      },
    });
  }

  return rules;
}
