import { INavViewMsg, PanelItemState } from '@ibiz-template/runtime';
/**
 * 导航占位状态
 *
 * @export
 * @class NavPosState
 * @extends {PanelItemState}
 */
export declare class NavPosState extends PanelItemState {
    /**
     * 是否启用缓存
     *
     * @type {boolean}
     * @memberof NavPosState
     */
    cache: boolean;
    /**
     * 是否是路由打开
     *
     * @author zk
     * @date 2023-09-26 04:09:23
     * @type {boolean}
     * @memberof NavPosState
     */
    routeOpen: boolean;
    /**
     * 当前导航视图标识
     * @author lxm
     * @date 2023-05-25 06:24:48
     * @type {string}
     */
    currentKey: string;
    /**
     * 缓存的视图标识
     * @author lxm
     * @date 2023-05-25 06:25:21
     * @type {string[]}
     */
    cacheKeys: string[];
    /**
     * 导航视图详细信息
     * @author lxm
     * @date 2023-05-25 07:07:05
     * @type {INavViewMsg[]}
     */
    navViewMsgs: {
        [p: string]: INavViewMsg;
    };
    /**
     * 视图是否正在加载
     *
     * @type {boolean}
     * @memberof NavPosState
     */
    isLoading: boolean;
}
//# sourceMappingURL=nav-pos.state.d.ts.map