import { cloneDeepWith, cloneWith, isFunction, isObject } from 'lodash-es';
import { mergeDeepRight } from 'ramda';
/**
 * 自定义克隆逻辑，有clone方法的拿clone方法，否则直接用lodash的clone
 * @author lxm
 * @date 2023-10-25 06:12:23
 * @param {unknown} value
 * @return {*}  {unknown}
 */
function customizeFn(value) {
    if (isObject(value) && isFunction(value.clone)) {
        return value.clone();
    }
}
const DefaultCloneOpts = {
    deep: true,
};
/**
 * 克隆方法（如果对象有clone方法会用clone方法调用clone）
 * @author lxm
 * @date 2023-10-25 06:24:18
 * @export
 * @template T
 * @param {readonly} value
 * @param {*} T
 * @param {*} []
 * @param {CloneOpts} [opts]
 * @return {*}  {T[]}
 */
export function clone(value, opts) {
    const options = mergeDeepRight(DefaultCloneOpts, opts || {});
    if (options.deep) {
        return cloneDeepWith(value, customizeFn);
    }
    return cloneWith(value, customizeFn);
}
