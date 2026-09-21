/* eslint-disable @typescript-eslint/no-explicit-any */
import { eq, findIndex, isArray } from 'lodash-es';
import { HelperUtil } from '../../utils';
import { HelperBase } from '../helper-base';
/**
 * 比较数组或对象是否存在某个属性的值
 *
 * @author zk
 * @date 2023-06-15 09:06:37
 * @export
 * @class HelperHaCtrl
 * @extends {HelperBase}
 */
export class HelperEqPropertyValue extends HelperBase {
    constructor(hbs) {
        super(hbs, 'eqPropertyValue');
    }
    onExecute(obj, key, val, options) {
        // 数组
        let bol = false;
        if (isArray(obj)) {
            bol = !eq(findIndex(obj, o => eq(o[key], val)), -1);
        }
        else {
            bol =
                // eslint-disable-next-line no-prototype-builtins
                obj.hasOwnProperty(key) &&
                    (bol = eq(obj[key], val));
        }
        return HelperUtil.handleJudgmentExecute(this, bol, options);
    }
}
