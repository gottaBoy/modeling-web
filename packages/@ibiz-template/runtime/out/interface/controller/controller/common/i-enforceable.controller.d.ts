/**
 * 可以调用force的控制器接口
 * @author lxm
 * @date 2023-05-25 01:53:36
 * @export
 * @interface IEnforceableController
 */
export interface IEnforceableController {
    /**
     * 强制更新，触发render函数
     *
     * @author chitanda
     * @param {() => void} [callback] 更新之后，组件渲染完成后的回调
     * @date 2022-07-24 14:07:38
     */
    force(_callback?: () => void): void;
}
//# sourceMappingURL=i-enforceable.controller.d.ts.map