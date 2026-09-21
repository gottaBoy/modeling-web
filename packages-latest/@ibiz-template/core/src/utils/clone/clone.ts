import { cloneDeepWith, cloneWith, isFunction, isObject } from 'lodash-es';
import { mergeDeepRight } from 'ramda';

export type CloneOpts = {
  deep?: boolean;
};

/**
 * @description 自定义克隆逻辑，有clone方法的拿clone方法，否则直接用lodash的clone
 * @template T
 * @param {T} value
 * @returns {*}  {(T | undefined)}
 */
function customizeFn<T>(value: T): T | undefined {
  if (isObject(value) && isFunction((value as IData).clone)) {
    return (value as IData).clone();
  }
}

const DefaultCloneOpts: CloneOpts = {
  deep: true,
} as const;

/**
 * @description 克隆方法（如果对象有clone方法会用clone方法调用clone）
 * @export
 * @template T
 * @param {T} value
 * @param {CloneOpts} [opts]
 * @returns {*}  {T}
 */
export function clone<T>(value: T, opts?: CloneOpts): T {
  const options = mergeDeepRight(DefaultCloneOpts, opts || {})!;
  if (options.deep) {
    return cloneDeepWith(value, customizeFn);
  }
  return cloneWith(value, customizeFn);
}
