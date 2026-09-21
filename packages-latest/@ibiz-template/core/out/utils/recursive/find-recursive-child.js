/* eslint-disable @typescript-eslint/no-explicit-any */
import { mergeDeepRight } from 'ramda';
/** 默认配置参数 */
const IterateOpts = {
    /** 子集合属性数组 */
    childrenFields: ['children'],
    /** 是否跳出当前操作 */
    isBreak: false,
};
const ReturnError = new Error('中断操作');
/**
 * @description 获取子属性集合
 * @param {IData} parent
 * @param {string[]} fields 子集合可能的属性名称
 * @returns {*}  {(IData[] | undefined)}
 */
function getChildField(parent, fields) {
    var _a;
    for (const field of fields) {
        if ((_a = parent[field]) === null || _a === void 0 ? void 0 : _a.length) {
            return parent[field];
        }
    }
}
/**
 * @description 获取子属性对象
 * @param {IData} parent
 * @param {string[]} fields
 * @returns {*}  {(IData[] | undefined)}
 */
function getChildFieldObj(parent, fields) {
    for (const field of fields) {
        if (parent[field]) {
            return parent[field];
        }
    }
}
function _recursiveIterate(parent, callback, opts) {
    const { childrenFields } = mergeDeepRight(IterateOpts, opts || {});
    const children = getChildField(parent, childrenFields);
    if (children === null || children === void 0 ? void 0 : children.length) {
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            // 递归自身的子成员
            const result = callback(child, parent);
            // 回调返回true若未启用跳出当次操作则退出，启用跳出当次操作则跳出本次循环
            if (result) {
                if (opts === null || opts === void 0 ? void 0 : opts.isBreak) {
                    break;
                }
                throw ReturnError;
            }
            // 递归孙的成员
            recursiveIterate(child, callback, opts);
        }
    }
}
/**
 * @description 递归遍历子元素，递归遍历子元素 用法：传入数组和回调函数 无返回值
 * @example
 * ```
 * const parent = {
 *       name: 'parent',
 *       children: [
 *           {
 *               name: 'child1',
 *               children: [{ name: 'grandchild1' }, { name: 'grandchild2' }],
 *           },
 *           { name: 'child2', children: [{ name: 'grandchild3' }] },
 *       ],
 *    };
 *
 * const result: string[] = [];
 *
 * recursiveIterate(parent, item => {
 *     result.push(item.name);
 * });
 *
 * result // => ['child1', 'grandchild1', 'grandchild2', 'child2', 'grandchild3']
 * ```
 * @export
 * @param {IData} parent 父元素
 * @param {(item: any) => boolean} callback 每一个子元素的回调
 * @param {Partial<typeof IterateOpts>} [opts]
 */
export function recursiveIterate(parent, callback, opts) {
    try {
        _recursiveIterate(parent, callback, opts);
    }
    catch (error) {
        if (error !== ReturnError) {
            throw error;
        }
    }
}
/**
 * @description 递归执行，处理对象结构
 * @export
 * @param {IData} parent
 * @param {((item: any, _parent?: any) => boolean | void)} callback
 * @param {Partial<typeof IterateOpts>} [opts]
 */
export function _recursiveExecute(parent, callback, opts) {
    const { childrenFields } = mergeDeepRight(IterateOpts, opts || {});
    const children = getChildFieldObj(parent, childrenFields);
    if (children) {
        for (let i = 0; i < Object.values(children).length; i++) {
            const child = Object.values(children)[i];
            const result = callback(child, parent);
            // 回调返回true若未启用跳出当次操作则退出，启用跳出当次操作则跳出本次循环
            if (result) {
                if (opts === null || opts === void 0 ? void 0 : opts.isBreak) {
                    break;
                }
                throw ReturnError;
            }
            // 递归孙的成员
            _recursiveExecute(child, callback, opts);
        }
    }
}
/**
 * @description 递归执行，处理对象结构
 * @export
 * @param {IData} parent
 * @param {((item: any, _parent: any) => boolean | void)} callback
 * @param {Partial<typeof IterateOpts>} [opts]
 */
export function recursiveExecute(parent, callback, opts) {
    try {
        _recursiveExecute(parent, callback, opts);
    }
    catch (error) {
        if (error !== ReturnError) {
            throw error;
        }
    }
}
/** 默认配置参数 */
const CompareOpts = Object.assign(Object.assign({}, IterateOpts), { 
    /** 比较的属性 */
    compareField: 'name' });
/**
 * @description 递归查找子元素，递归查找子元素 用法：传入数组和查找条件 返回值匹配的子元素或undefined
 * @example
 * ```
 *  const parent = {
 *      name: 'parent',
 *      children: [
 *          {
 *              name: 'child1',
 *              children: [{ name: 'grandchild1' }, { name: 'grandchild2' }],
 *          },
 *          { name: 'child2', children: [{ name: 'grandchild3' }] },
 *      ],
 *  };
 *
 *  const result = findRecursiveChild(parent, 'child1');
 *
 *  result // => { name: 'child1', children: [{ name: 'grandchild1' }, { name: 'grandchild2' }] }
 * ```
 * @export
 * @param {IData} parent 父对象
 * @param {string} key 子元素的比较属性的值
 * @param {ICompareOpts} [opts]
 * @return {*}  {(IData | undefined)}
 */
export function findRecursiveChild(parent, key, opts) {
    const { compareField, compareCallback } = mergeDeepRight(CompareOpts, opts || {});
    // 默认比较方法
    const _compareCallback = compareCallback ||
        ((child) => {
            return child[compareField] === key;
        });
    // 递归遍历，找到后中断遍历，返回找到项
    let find;
    recursiveIterate(parent, item => {
        if (_compareCallback(item, key, compareField)) {
            find = item;
            return true;
        }
    }, opts);
    return find;
}
