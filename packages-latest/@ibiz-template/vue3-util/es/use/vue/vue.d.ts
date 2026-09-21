import { ComponentPublicInstance, VNode, WatchOptions } from 'vue';
/**
 * 获取组件的props,只能在setup里使用
 *
 * @author chitanda
 * @date 2022-08-14 16:08:19
 * @export
 * @return {*}
 */
export declare function useProps(): IData;
/**
 * 如果是reactive代理过的对象，返回原始对象
 *
 * @author lxm
 * @date 2023-02-15 10:56:00
 * @export
 * @param {*} val
 * @returns {*}
 */
export declare function getOrigin<T = any>(val: T): T;
/**
 * 监听props的属性
 *
 * @author lxm
 * @date 2022-08-22 22:08:11
 * @export
 * @param {string} key props的属性名
 * @param {(newVal: T, oldVal: T) => void} callback 监听回调
 * @param {(WatchOptions | undefined)} [options] 监听参数
 */
export declare function usePropsWatch<T = unknown>(key: string, callback: (newVal?: T, oldVal?: T) => void, options?: WatchOptions | undefined): void;
/**
 * 获取force方法
 *
 * @author lxm
 * @date 2022-08-24 11:08:56
 * @export
 * @returns {*}  {(callback?: () => void) => void} callback回调会在这次更新渲染完成之后执行
 */
export declare function useForce(): (callback?: () => void) => void;
/**
 * controller的force执行时,一起执行自己的force
 *
 * @author lxm
 * @date 2022-08-22 23:08:36
 * @export
 * @param {{
 *   force: (callback?: () => void) => void;
 * }} controller
 */
export declare function useForceTogether(vue: ComponentPublicInstance, controller: {
    force: (callback?: () => void) => void;
}): void;
/**
 * 控制器通用的vue实例能力绑定
 *
 * @author lxm
 * @date 2022-09-15 09:09:06
 * @export
 * @param {Vue} vue
 * @param {IData} controller
 */
export declare function useController(controller: IData): void;
/** 全局唯一的空节点 */
export declare const EmptyVNode: VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>;
/**
 * 配合EmptyVNode，判断是否是空节点
 * @author lxm
 * @date 2023-03-28 02:20:06
 * @export
 * @param {(VNode[] | VNode)} nodes
 * @return {*}  {boolean}
 */
export declare function isEmptyVNode(nodes: VNode[] | VNode): boolean;
/**
 * @description 过滤attr中指定属性，如果存在自定义过滤回调，则不针对filterKeys的值进行过滤
 * @export
 * @param {Record<string, string>} attrs 所有属性
 * @param {(key: string) => boolean} [filter] 自定义过滤回调
 * @param {string[]} [filterKeys=['class', 'style']] 需要过滤掉的属性
 * @returns {*}  {Record<string, string>}
 */
export declare function useFilterAttribute(attrs: Record<string, string>, filter?: (key: string) => boolean, filterKeys?: string[]): Record<string, string>;
//# sourceMappingURL=vue.d.ts.map