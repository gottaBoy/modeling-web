import { IDEFVRCondition } from '@ibiz/model-core';
/**
 * 校验属性值规则
 *
 * @param {string} name 校验属性值所在字段的名称
 * @param {*} data 数据对象
 * @param {*} condition 规则条件
 * @returns {{ isPast: boolean, infoMessage: string }}
 * @memberof Verify
 */
export declare function verifyDeRules(name: string, data: IData, condition: IDEFVRCondition): {
    isPast: boolean;
    infoMessage: string;
};
//# sourceMappingURL=de-rule-verify.d.ts.map