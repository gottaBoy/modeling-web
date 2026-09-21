import { IAppMenuController, PanelItemController } from '@ibiz-template/runtime';
import { IPanelRawItem } from '@ibiz/model-core';
import { Router } from 'vue-router';
import { NavBreadcrumbState } from './nav-breadcrumb.state';
import { NavBreadcrumbService } from './nav-breadcrumb.service';
import { NavPosIndexController } from '../nav-pos-index';
/**
 * @description 面包屑控制器
 * @export
 * @class NavBreadcrumbController
 * @extends {PanelItemController<IPanelRawItem>}
 */
export declare class NavBreadcrumbController extends PanelItemController<IPanelRawItem> {
    state: NavBreadcrumbState;
    protected createState(): NavBreadcrumbState;
    /**
     * @description 面包屑分割符
     * @type {string}
     * @memberof NavBreadcrumbController
     */
    separator: string;
    /**
     * @description 导航模式（路由、菜单、缓存）
     * @type {('router' | 'menu' | 'store')}
     * @memberof NavBreadcrumbController
     */
    navMode: 'router' | 'menu' | 'store';
    /**
     * @description 是否显示应用标题
     * @type {boolean}
     * @memberof NavBreadcrumbController
     */
    showHome: boolean;
    /**
     * @description 面包屑服务
     * @type {NavBreadcrumbService}
     * @memberof NavBreadcrumbController
     */
    service: NavBreadcrumbService;
    /**
     * @description 自定义补充参数
     * @type {IData}
     * @memberof NavBreadcrumbController
     */
    rawItemParams: IData;
    /**
     * @description 应用菜单控制器
     * @readonly
     * @type {(IAppMenuController | undefined)}
     * @memberof NavBreadcrumbController
     */
    get appmenu(): IAppMenuController | undefined;
    /**
     * @description 首页导航栏
     * @readonly
     * @type {(NavPosIndexController | undefined)}
     * @memberof NavBreadcrumbController
     */
    get navPos(): NavPosIndexController | undefined;
    protected onInit(): Promise<void>;
    /**
     * @description 初始化
     * @param {Router} router
     * @memberof NavBreadcrumbController
     */
    onCreated(router: Router): void;
    /**
     * @description 路由改变
     * @param {Router} router
     * @memberof NavBreadcrumbController
     */
    onRouteChange(router: Router): void;
    /**
     * @description 重置面包屑数据
     * @memberof NavBreadcrumbController
     */
    resetBreadcrumbs(): void;
    /**
     * 更新视图信息
     * @author lxm
     * @date 2023-05-09 01:40:34
     * @param {string} key
     * @param {{ caption?: string; dataInfo?: string }} info
     */
    updateViewInfo(fullPath: string, info: {
        viewName: string;
        caption?: string;
        dataInfo?: string;
    }): void;
    /**
     * @description 删除缓存数据
     * @param {string} fullPath
     * @memberof NavBreadcrumbController
     */
    removeCache(fullPath: string): void;
    /**
     * @description 根据路由计算面包屑数据
     * @param {Router} router
     * @memberof NavBreadcrumbController
     */
    protected setBreadcrumbByRouter(router: Router): void;
    /**
     * @description 根据路由设置菜单面包屑导航数据
     * @param {Router} router
     * @memberof NavBreadcrumbController
     */
    protected setBreadcrumbByMenu(router: Router): void;
    /**
     * @description 设置缓存模式面包屑数据
     * @param {Router} router
     * @memberof NavBreadcrumbController
     */
    protected setBreadcrumbByStore(router: Router): void;
    /**
     * @description 处理自定义补充参数
     * @protected
     * @memberof NavBreadcrumbController
     */
    protected handleRawItemParams(): void;
}
