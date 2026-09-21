import { IDEGridEditItemVR, IDEFormItemVR } from '@ibiz/model-core';

/**
 * 过滤出指定属性列或表单项的值规则模型
 * @author lxm
 * @date 2023-05-31 10:11:30
 * @export
 * @template T
 * @param {T[]} vrs 所有值规则模型集合
 * @param {string} name 属性列或表单项名称
 * @return {*}
 */
export function filterValueRules<T extends IDEGridEditItemVR | IDEFormItemVR>(
  vrs: T[],
  name: string,
): T[] {
  return vrs.filter(vr => {
    const { checkMode } = vr; // 排除后台校验为2
    const belongName =
      (vr as IDEFormItemVR).deformItemName ||
      (vr as IDEGridEditItemVR).degridEditItemName;
    return checkMode !== 2 && belongName?.toLowerCase() === name.toLowerCase();
  });
}
