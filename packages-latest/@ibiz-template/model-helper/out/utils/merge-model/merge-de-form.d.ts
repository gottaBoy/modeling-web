import { IDEForm } from '@ibiz/model-core';
/** 默认配置参数 */
declare const IterateOpts: {
    /** 子集合属性数组 */
    childrenFields: string[];
};
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
export declare function recursiveIterate(parent: IData, callback: (item: any, _parent: any) => boolean | void, opts?: Partial<typeof IterateOpts>): void;
/**
 * @description 合并子应用表单
 * @export
 * @param {(IDEForm | undefined)} dst 主应用表单模型
 * @param {(IDEForm | undefined)} src 子应用表单模型
 * @returns {*}  {void}
 */
export declare function mergeAppDEForm(dst: IDEForm | undefined, src: IDEForm | undefined): void;
/**
 * 获取存在基于数据关系部件构建的分页部件的数据关系标识
 * @param form 表单模型
 * @returns 数据关系标识集合
 */
export declare function getFormdataRelationTags(form: IDEForm | undefined): string[];
/**
 * @description 合并存在数据关系标识的表单分页部件，子应用表单codename和主应用表单表单分页部件数据关系标识相同
 * @export
 * @param {string} dataRelationTag 数据关系标识
 * @param {(IDEForm | undefined)} dst 主应用表单模型
 * @param {(IDEForm | undefined)} src 子应用表单模型
 * @returns {*}  {void}
 */
export declare function mergeFormDRTabpanel(dataRelationTag: string, dst: IDEForm | undefined, src: IDEForm | undefined): void;
export {};
//# sourceMappingURL=merge-de-form.d.ts.map