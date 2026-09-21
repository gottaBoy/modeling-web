/** 默认配置参数 */
declare const IterateOpts: {
    /** 子集合属性数组 */
    childrenFields: string[];
    /** 是否跳出当前操作 */
    isBreak: boolean;
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
 * @description 递归执行，处理对象结构
 * @export
 * @param {IData} parent
 * @param {((item: any, _parent?: any) => boolean | void)} callback
 * @param {Partial<typeof IterateOpts>} [opts]
 */
export declare function _recursiveExecute(parent: IData, callback: (item: any, _parent?: any) => boolean | void, opts?: Partial<typeof IterateOpts>): void;
/**
 * @description 递归执行，处理对象结构
 * @export
 * @param {IData} parent
 * @param {((item: any, _parent: any) => boolean | void)} callback
 * @param {Partial<typeof IterateOpts>} [opts]
 */
export declare function recursiveExecute(parent: IData, callback: (item: any, _parent: any) => boolean | void, opts?: Partial<typeof IterateOpts>): void;
/** 默认配置参数 */
declare const CompareOpts: {
    /** 比较的属性 */
    compareField: string;
    /** 子集合属性数组 */
    childrenFields: string[];
    /** 是否跳出当前操作 */
    isBreak: boolean;
};
type ICompareOpts = Partial<typeof CompareOpts> & {
    /**
     * 自定义比较回调
     * @author lxm
     * @date 2023-04-23 09:06:42
     */
    compareCallback?: (child: IData, key: string, compareField: string) => boolean;
};
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
export declare function findRecursiveChild(parent: IData, key: string, opts?: ICompareOpts): IData | undefined;
export {};
//# sourceMappingURL=find-recursive-child.d.ts.map