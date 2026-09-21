import { IControlState } from './i-control.state';
export interface IExpBarControlState extends IControlState {
    /**
     *
     * @author zk
     * @date 2023-05-30 04:05:58
     * @type {string}
     * @memberof IExpBarControlState
     */
    srfnav: string;
    /**
     * 查询条件
     * @author lxm
     * @date 2023-08-02 07:38:49
     * @type {string}
     */
    query: string;
    /**
     * 占位符
     *
     * @type {string}
     * @memberof IExpBarControlState
     */
    placeHolder: string;
}
//# sourceMappingURL=i-exp-bar-control.state.d.ts.map