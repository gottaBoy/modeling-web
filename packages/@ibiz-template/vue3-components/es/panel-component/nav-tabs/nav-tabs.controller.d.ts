import { PanelItemController } from '@ibiz-template/runtime';
import { IPanelRawItem, ISysImage } from '@ibiz/model-core';
import { NavPosIndexController } from '../nav-pos-index';
import { NavTabsState, TabMsg } from './nav-tabs.state';
/**
 * 导航占位控制器
 *
 * @export
 * @class NavTabsController
 * @extends {PanelItemController}
 */
export declare class NavTabsController extends PanelItemController<IPanelRawItem> {
    state: NavTabsState;
    protected createState(): NavTabsState;
    /**
     * 当前视图的路由层级，非路由模式不存在。
     * @author lxm
     * @date 2023-05-09 12:46:26
     * @readonly
     */
    get routeDepth(): number | undefined;
    /**
     * 导航占位控制器
     * @author lxm
     * @date 2023-05-09 02:35:48
     * @readonly
     * @type {(NavPosIndexController | undefined)}
     */
    get navPos(): NavPosIndexController | undefined;
    /**
     * 获取tabItem
     * @author lxm
     * @date 2023-05-09 02:04:11
     * @param {string} key
     * @return {*}
     */
    findTabItem(key: string): TabMsg | undefined;
    /**
     * 点击处理
     * @author lxm
     * @date 2023-05-25 01:31:04
     * @param {string} key
     */
    onTabClick(key: string): void;
    /**
     * 更新视图信息
     * @author lxm
     * @date 2023-05-09 01:40:34
     * @param {string} key
     * @param {{ caption?: string; dataInfo?: string; sysImage?: ISysImage }} info
     */
    updateViewInfo(key: string, info: {
        caption?: string;
        dataInfo?: string;
        sysImage?: ISysImage;
    }): void;
    /**
     * 删除某个key对应的数据
     * 仅处理组件自身维护的数据
     * @author lxm
     * @date 2023-05-25 03:18:20
     * @param {string} key
     */
    removeCache(key: string): void;
    /**
     * 删除分页
     * @author lxm
     * @date 2023-05-09 02:08:46
     * @param {string} key
     */
    onTabRemove(key: string): void;
    /**
     * 删除其他所有的标签页
     * @author lxm
     * @date 2023-05-09 02:19:55
     */
    removeOther(): void;
    /**
     * 删除所有的标签页
     * @author lxm
     * @date 2023-05-09 02:50:01
     */
    removeAll(): void;
    /**
     * 刷新项（解决主信息更新之后界面ui未刷新）
     *
     * @author tony001
     * @date 2024-06-28 08:06:11
     */
    refreshItemUI(key: string): void;
}
