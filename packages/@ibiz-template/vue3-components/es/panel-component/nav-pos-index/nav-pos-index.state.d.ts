import { INavViewMsg, PanelItemState } from '@ibiz-template/runtime';
/**
 * 导航占位状态
 *
 * @author lxm
 * @date 2023-02-07 06:04:27
 * @export
 * @class NavPosIndexState
 * @extends {PanelItemState}
 */
export declare class NavPosIndexState extends PanelItemState {
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
     * 导航的视图的操作顺序
     * @author lxm
     * @date 2023-05-25 06:25:34
     * @type {string[]}
     */
    operateSort: string[];
}
