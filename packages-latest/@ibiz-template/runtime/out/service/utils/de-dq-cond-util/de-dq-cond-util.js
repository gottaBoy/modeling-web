import { ModelError } from '@ibiz-template/core';
import { PSDEDQCondEngine } from '../de-dq-cond/ps-de-dq-cond-engine';
/**
 * 获取查询条件工具类
 *
 * @author chitanda
 * @date 2022-08-25 17:08:44
 * @export
 * @class DEDQCondUtil
 */
export class DEDQCondUtil {
    /**
     * 根据数据查询获取查询
     *
     * @author chitanda
     * @date 2022-08-25 17:08:04
     * @static
     * @param {IAppDEDataSet} dataSet
     * @return {*}  {PSDEDQCondEngine}
     */
    static getCond(dataSet) {
        if (this.map.has(dataSet)) {
            return this.map.get(dataSet);
        }
        const groups = dataSet.dedqgroupConditions;
        if (groups) {
            const cond = new PSDEDQCondEngine();
            if (groups.length === 1) {
                cond.parse(this.calcCond(groups)[0]);
            }
            else if (groups.length > 1) {
                cond.parse(['AND', this.calcCond(groups)][0]);
            }
            this.map.set(dataSet, cond);
            return cond;
        }
        return null;
    }
    /**
     * 计算查询条件
     *
     * @author chitanda
     * @date 2022-08-25 17:08:39
     * @protected
     * @static
     * @param {IDEDQCondition[]} items
     * @return {*}  {unknown[]}
     */
    static calcCond(items) {
        const arr = [];
        items.forEach(item => {
            const condArr = [];
            if (item.condType === 'GROUP') {
                const cond = item;
                // 是否取反
                if (cond.notMode) {
                    condArr.push('!');
                }
                // 分组模式 AND、OR
                condArr.push(item.condOp);
                // 填充子条件
                const children = cond.dedqconditions;
                if (children) {
                    const child = this.calcCond(children);
                    condArr.push(child);
                }
            }
            else if (item.condType === 'SINGLE') {
                const cond = item;
                condArr.push(cond.condOp);
                condArr.push(cond.fieldName);
                if (cond.condValue) {
                    if (cond.vartypeId) {
                        const tempCondValue = {
                            type: cond.vartypeId,
                            value: cond.condValue,
                        };
                        if (cond.ignoreEmpty) {
                            Object.assign(tempCondValue, { ignoreEmpty: cond.ignoreEmpty });
                        }
                        condArr.push(tempCondValue);
                    }
                    else {
                        condArr.push(cond.condValue);
                    }
                }
                else {
                    // 无条件值为空字符串
                    condArr.push('');
                }
            }
            else {
                throw new ModelError(item, ibiz.i18n.t('runtime.service.unsupportedQueryTypes', {
                    condType: item.condType,
                }));
            }
            arr.push(condArr);
        });
        return arr;
    }
}
/**
 * 查询条件缓存
 *
 * @author chitanda
 * @date 2022-08-25 17:08:57
 * @protected
 * @static
 * @type {WeakMap<IAppDEDataSet, PSDEDQCondEngine>}
 */
DEDQCondUtil.map = new WeakMap();
