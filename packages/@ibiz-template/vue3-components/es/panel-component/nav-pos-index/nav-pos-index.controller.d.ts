import { EventBase, IAppMenuController, IModal, IModalData, PanelItemController } from '@ibiz-template/runtime';
import { IPanelRawItem } from '@ibiz/model-core';
import { Router } from 'vue-router';
import { NavTabsController } from '../nav-tabs/nav-tabs.controller';
import { NavPosIndexState } from './nav-pos-index.state';
import { NavBreadcrumbController } from '../nav-breadcrumb';
/**
 * 导航占位控制器
 *
 * @export
 * @class NavPosIndexController
 * @extends {PanelItemController}
 */
export declare class NavPosIndexController extends PanelItemController<IPanelRawItem> {
    state: NavPosIndexState;
    /**
     * 导航视图的modal
     * @author lxm
     * @date 2023-05-12 09:47:52
     * @type {{ [key: string]: IModal }}
     */
    viewModals: {
        [key: string]: IModal;
    };
    /**
     * router对象
     * @author lxm
     * @date 2023-05-25 08:02:43
     * @type {Router}
     */
    router?: Router;
    /**
     * 是否关闭后自动跳转上一个页面
     * @author lxm
     * @date 2023-05-25 08:43:49
     * @type {boolean}
     */
    autoGoLast: boolean;
    /**
     * 无缓存
     * @author lxm
     * @date 2024-04-22 04:12:41
     * @readonly
     * @type {boolean}
     */
    noCache: boolean;
    protected createState(): NavPosIndexState;
    setRouter(router: Router): void;
    /**
     * 当前视图的路由层级，非路由模式不存在。
     * @author lxm
     * @date 2023-05-09 12:46:26
     * @readonly
     */
    get routeDepth(): number | undefined;
    /**
     * 导航标签页控制器
     * @author lxm
     * @date 2023-05-10 08:41:54
     * @readonly
     * @type {(NavTabsController | undefined)}
     */
    get navTabs(): NavTabsController | undefined;
    /**
     * @description 面包屑控制器
     * @readonly
     * @type {(NavBreadcrumbController | undefined)}
     * @memberof NavPosIndexController
     */
    get navBreadcrumb(): NavBreadcrumbController | undefined;
    /**
     * 应用菜单控制器
     * @author lxm
     * @date 2023-05-10 08:41:42
     * @readonly
     * @type {(IAppMenuController | undefined)}
     */
    get appmenu(): IAppMenuController | undefined;
    /**
     * 自定义补充参数
     *
     * @author zk
     * @date 2023-09-27 03:09:02
     * @type {IData}
     * @memberof NavPosController
     */
    rawItemParams: IData;
    /**
     * @description 当前导航key
     * @type {string}
     * @memberof NavPosIndexController
     */
    currentKey: string;
    protected onInit(): Promise<void>;
    /**
     * 改变显示视图
     * @author lxm
     * @date 2023-05-25 01:28:49
     * @param {string} key
     */
    changeView(key: string): void;
    /**
     * 路由变更,新视图进缓存并初始化，已有的就只切换。
     * @author lxm
     * @date 2023-05-25 03:07:07
     * @param {{ currentKey: string; fullPath: string }} { currentKey }
     * @return {*}
     */
    onRouteChange({ currentKey, fullPath, }: {
        currentKey: string;
        fullPath: string;
    }): void;
    /**
     * 监听视图创建，获取并监听视图控制器
     * @author lxm
     * @date 2023-05-25 03:03:22
     * @param {EventBase} event
     */
    onViewCreated(event: EventBase): void;
    /**
     * 删除单个缓存
     * @author lxm
     * @date 2023-05-09 02:19:09
     * @param {string} key
     */
    removeCache(key: string): void;
    /**
     * 清空缓存
     * @author lxm
     * @date 2023-05-09 02:19:55
     */
    clearCache(): void;
    /**
     * 关闭视图
     * 走modal的dismiss,会走一遍视图内部的校验，不通过则不会关闭
     * @author lxm
     * @date 2023-05-25 03:10:23
     * @param {string} keys
     */
    closeViewByKeys(keys: string[]): Promise<void>;
    /**
     * 自身的dismiss相关操作
     *
     * @author chitanda
     * @date 2023-07-12 22:07:09
     * @protected
     * @param {string} key
     * @param {IModalData} modal
     * @return {*}
     */
    protected dismiss(key: string, modal: IModalData): void;
    /**
     * 返回上一个页面或上一层空白路由
     * @author lxm
     * @date 2023-05-25 06:46:27
     * @protected
     */
    protected goLast(): void;
    /**
     * 处理自定义补充参数 [{key:'name',value:'data'}] => {name:'data'}
     *
     * @author zk
     * @date 2023-09-27 03:09:55
     * @protected
     * @memberof NavPosController
     */
    protected handleRawItemParams(): void;
}
