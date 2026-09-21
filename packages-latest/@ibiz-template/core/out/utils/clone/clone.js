import { cloneDeepWith, cloneWith, isFunction, isObject } from 'lodash-es';
import { mergeDeepRight } from 'ramda';
/**
 * @description 自定义克隆逻辑，有clone方法的拿clone方法，否则直接用lodash的clone
 * @template T
 * @param {T} value
 * @returns {*}  {(T | undefined)}
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
 * @description 克隆方法（如果对象有clone方法会用clone方法调用clone）
 * @export
 * @template T
 * @param {T} value
 * @param {CloneOpts} [opts]
 * @returns {*}  {T}
 */
export function clone(value, opts) {
    const options = mergeDeepRight(DefaultCloneOpts, opts || {});
    if (options.deep) {
        return cloneDeepWith(value, customizeFn);
    }
    return cloneWith(value, customizeFn);
}
