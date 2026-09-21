/* eslint-disable @typescript-eslint/no-explicit-any */
import { mergeDeepRight } from 'ramda';
/** 默认配置参数 */
const IterateOpts = {
    /** 子集合属性数组 */
    childrenFields: ['children'],
};
const BreakError = new Error('中断操作');
/**
 * 获取子属性集合
 * @author lxm
 * @date 2023-04-20 08:54:32
 * @param {IData} parent
 * @param {string[]} fields 子集合可能的属性名称
 * @return {*}  {(IData[] | undefined)}
 */
function getChildField(parent, fields) {
    var _a;
    for (const field of fields) {
        if ((_a = parent[field]) === null || _a === void 0 ? void 0 : _a.length) {
            return parent[field];
        }
    }
}
function _recursiveIterate(parent, callback, opts) {
    const { childrenFields } = mergeDeepRight(IterateOpts, opts || {});
    const children = getChildField(parent, childrenFields);
    if (children === null || children === void 0 ? void 0 : children.length) {
        for (const child of children) {
            // 递归自身的子成员
            const isBreak = callback(child, parent);
            // 如果回调返回true则退出
            if (isBreak) {
                throw BreakError;
            }
            // 递归孙的成员
            recursiveIterate(child, callback, opts);
        }
    }
}
/**
 * 递归遍历子元素
 *
 * @description 递归遍历子元素 用法：传入数组和回调函数 无返回值
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
 * @author lxm
 * @date 2023-04-23 09:07:06
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
        if (error !== BreakError) {
            throw error;
        }
    }
}
/** 默认配置参数 */
const CompareOpts = Object.assign(Object.assign({}, IterateOpts), { 
    /** 比较的属性 */
    compareField: 'name' });
/**
 * 递归查找子元素
 *
 * @description 递归查找子元素 用法：传入数组和查找条件 返回值匹配的子元素或undefined
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
 * @author lxm
 * @date 2023-04-20 08:53:35
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
