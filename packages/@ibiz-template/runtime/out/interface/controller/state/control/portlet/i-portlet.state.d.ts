import { IButtonContainerState } from '../../../common';
import { IColState } from '../../common';
export interface IPortletState extends IColState {
    /**
     * 界面行为组状态
     *
     * @type {(IButtonContainerState | null)}
     * @memberof PortletPartState
     */
    actionGroupState: IButtonContainerState | null;
    /**
     * 类名集合
     * @author lxm
     * @date 2023-07-24 12:51:22
     * @type {IPortletClass}
     */
    class: IPortletClass;
    /**
     * 上下文
     *
     * @author zzq
     * @date 2024-04-25 16:04:24
     * @type {IContext}
     */
    context: IContext;
    /**
     * 门户标题
     *
     * @type {string | undefined}
     * @memberof PortletPartState
     */
    title: string | undefined;
}
export interface IPortletClass {
    /**
     * 容器样式
     * @author lxm
     * @date 2023-08-02 06:25:51
     * @type {string[]}
     */
    container: string[];
    /**
     * 容器动态样式
     * @author lxm
     * @date 2023-08-02 06:25:57
     * @type {string[]}
     */
    containerDyna: string[];
}
//# sourceMappingURL=i-portlet.state.d.ts.map