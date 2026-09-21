import { IExpBarControlState } from './i-exp-bar-control.state';
/**
 * 树导航栏UI状态
 *
 * @export
 * @interface ITreeExpBarState
 * @extends {IExpBarControlState}
 */
export interface ITreeExpBarState extends IExpBarControlState {
    /**
     * 不需要配置导航视图
     * 没有配置导航视图的情况下也正常抛出导航事件，由外部决定导航参数用在哪个导航视图里。
     * @author lxm
     * @date 2023-08-22 03:39:14
     * @type {boolean}
     */
    noNeedNavView: boolean;
}
//# sourceMappingURL=i-tree-exp-bar.state.d.ts.map