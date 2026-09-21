import { PanelItemState } from '@ibiz-template/runtime';
import { ISysImage } from '@ibiz/model-core';
export interface TabMsg {
    key: string;
    caption?: string;
    dataInfo?: string;
    sysImage?: ISysImage;
}
/**
 * 导航标签页占位状态
 *
 * @author lxm
 * @date 2023-02-07 06:04:27
 * @export
 * @class NavTabsState
 * @extends {PanelItemState}
 */
export declare class NavTabsState extends PanelItemState {
    /**
     * 当前路由key
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-10-20 16:23:42
     */
    currentKey: string;
    /**
     * 分页标签项
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-10-20 16:23:26
     */
    tabItems: TabMsg[];
    /**
     * 当前激活tab
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-10-20 16:23:17
     */
    activeTab: string;
}
