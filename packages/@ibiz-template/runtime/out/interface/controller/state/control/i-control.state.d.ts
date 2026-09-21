import { IControllerState } from '../common/i-controller.state';
export interface IControlState extends IControllerState {
    /**
     * 当前部件是否为激活状态(缓存下的激活状态，一般与框架的生命周期相同)
     *
     * @author chitanda
     * @date 2023-12-13 11:12:30
     * @type {boolean}
     */
    activated: boolean;
    /**
     * 是否是简单模式
     * @author zjm
     * @date 2023-03-06 09:07:20
     * @type {boolean}
     * @memberof IControlState
     */
    isSimple: boolean;
    /**
     * 部件是否正在加载
     * @author lxm
     * @date 2023-06-30 05:26:24
     * @type {boolean}
     */
    isLoading: boolean;
    /**
     * 默认加载
     * @author lxm
     * @date 2023-07-28 04:29:49
     * @type {boolean}
     */
    loadDefault: boolean;
}
//# sourceMappingURL=i-control.state.d.ts.map