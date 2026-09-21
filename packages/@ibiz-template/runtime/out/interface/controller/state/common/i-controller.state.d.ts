/**
 * 控制器基类UI状态
 *
 * @export
 * @class ControlState
 */
export interface IControllerState {
    /**
     * 控制器是否走完created生命周期
     *
     * @author lxm
     * @date 2022-08-18 22:08:23
     * @type {boolean}
     */
    isCreated: boolean;
    /**
     * 控制器是否走完mounted生命周期
     *
     * @author lxm
     * @date 2022-08-18 22:08:23
     * @type {boolean}
     */
    isMounted: boolean;
    /**
     * 控制器是否走完destroy生命周期
     *
     * @author lxm
     * @date 2022-08-18 22:08:23
     * @type {boolean}
     */
    isDestroyed: boolean;
    /**
     * 上下文
     *
     * @author tony001
     * @date 2024-04-16 16:04:24
     * @type {IContext}
     */
    context: IContext;
}
//# sourceMappingURL=i-controller.state.d.ts.map