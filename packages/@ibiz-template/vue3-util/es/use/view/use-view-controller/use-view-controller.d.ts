import { IViewController, ViewController } from '@ibiz-template/runtime';
/**
 * 初始化视图控制器
 *
 * @description 此视图暂时控制器实例化只用于路由一级视图
 * @author chitanda
 * @date 2022-08-15 15:08:04
 * @export
 * @template T
 * @param {(context: IContext, params: IParams, ctx?: CTX) => T} fn
 * @return {*}  {T}
 */
export declare function useViewController<T extends IViewController>(fn: (...args: ConstructorParameters<typeof ViewController>) => T): T;
//# sourceMappingURL=use-view-controller.d.ts.map