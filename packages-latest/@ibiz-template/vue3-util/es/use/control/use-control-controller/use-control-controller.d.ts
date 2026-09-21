import { ControlController, IControlController } from '@ibiz-template/runtime';
export interface extraOptions {
    /**
     * 排除监听的props里的key
     * @author lxm
     * @date 2023-11-22 06:11:45
     * @type {string[]}
     */
    excludePropsKeys: string[];
}
/**
 * 初始化部件控制器
 *
 * @author chitanda
 * @date 2022-08-15 17:08:47
 * @export
 * @template T
 * @param {() => T} fn
 * @return {*}  {T}
 */
export declare function useControlController<T extends IControlController>(fn: (...args: ConstructorParameters<typeof ControlController>) => T, opts?: Partial<extraOptions>): T;
//# sourceMappingURL=use-control-controller.d.ts.map