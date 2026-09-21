import { IDEFormItemVR, IDEGridEditItemVR, IEditor } from '@ibiz/model-core';
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
export declare function generateRules(itemVRs: IDEFormItemVR[] | IDEGridEditItemVR[], name: string, valueItemName?: string): IData[];
/**
 * 生成编辑器相关的值规则
 * @author lxm
 * @date 2023-10-18 03:36:39
 * @export
 * @param {IEditor} editor
 * @return {*}  {IData[]}
 */
export declare function generateEditorRules(editor: IEditor): IData[];
//# sourceMappingURL=value-rule.d.ts.map