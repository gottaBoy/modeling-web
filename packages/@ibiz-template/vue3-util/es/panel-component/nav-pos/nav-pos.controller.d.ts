import { EventBase, IModal, IPanelItemNavPosController, INavViewMsg, PanelItemController } from '@ibiz-template/runtime';
import { IPanelRawItem } from '@ibiz/model-core';
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';
import { NavPosState } from './nav-pos.state';
/**
 * 导航占位控制器
 *
 * @export
 * @class NavPosController
 * @extends {PanelItemController}
 */
export declare class NavPosController extends PanelItemController<IPanelRawItem> implements IPanelItemNavPosController {
    /**
     * 导航占位状态
     *
     * @type {NavPosState}
     * @memberof NavPosController
     */
    state: NavPosState;
    /**
     * 导航视图的modal
     *
     * @type {{ [key: string]: IModal }}
     * @memberof NavPosController
     */
    viewModals: {
        [key: string]: IModal;
    };
    /**
     * 当前导航视图
     *
     * @type {INavViewMsg}
     * @memberof NavPosController
     */
    curNavViewMsg: INavViewMsg;
    /**
     * Router 对象
     *
     * @type {Router}
     * @memberof NavPosController
     */
    router: Router;
    /**
     * 关联部件标识集合
     * @author lxm
     * @date 2023-08-10 07:35:08
     * @type {string[]}
     */
    refCtrlKeys: string[];
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
     * 是否忽略嵌入视图key
     *
     * @type {boolean}
     * @memberof NavPosController
     */
    ignoreEmbedKey: boolean;
    /**
     * Route 对象
     *
     * @author zk
     * @date 2023-06-29 04:06:59
     * @type {RouteLocationNormalizedLoaded}
     * @memberof NavPosController
     */
    get route(): RouteLocationNormalizedLoaded;
    /**
     * 导航项是否缓存
     *
     * @author zk
     * @date 2023-09-27 03:09:49
     * @param {INavViewMsg} navViewMsg
     * @return {*}  {boolean}
     * @memberof NavPosController
     */
    getExpItemIsCache(navViewMsg: INavViewMsg): boolean;
    /**
     * 设置 Router 对象
     *
     * @param {Router} router
     * @memberof NavPosController
     */
    setRouter(router: Router): void;
    protected onInit(): Promise<void>;
    /**
     * 创建导航占位状态对象
     *
     * @protected
     * @return {*}  {NavPosState}
     * @memberof NavPosController
     */
    protected createState(): NavPosState;
    /**
     * 当前路由视图的层级
     *
     * @readonly
     * @type {(number | undefined)}
     * @memberof NavPosController
     */
    get routeDepth(): number | undefined;
    /**
     * 计算缓存 key 标识
     *
     * @author chitanda
     * @date 2023-12-03 13:12:25
     * @protected
     * @param {INavViewMsg} msg
     * @return {*}  {string}
     */
    protected calcCacheKey(msg: INavViewMsg): string;
    /**
     * 路由改变
     *
     * @memberof NavPosController
     */
    onRouteChange(route: RouteLocationNormalizedLoaded): void;
    /**
     * 设置导航视图信息
     *
     * @author zk
     * @date 2023-06-29 02:06:41
     * @param {INavViewMsg} navViewMsg 导航视图信息
     * @memberof NavPosController
     */
    setNavViewMsgs(navViewMsg: INavViewMsg): void;
    /**
     * 自身的dismiss相关操作
     *
     * @param {string} key
     * @memberof NavPosController
     */
    dismiss(key: string): void;
    /**
     * 监听视图创建
     *
     * @param {EventBase} event
     * @memberof NavPosController
     */
    onViewCreated(event: EventBase): void;
    toBlankRoute(): void;
    /**
     * 打开视图
     *
     * @param {INavViewMsg} openViewMsg
     * @memberof NavPosController
     */
    openView(openViewMsg: INavViewMsg): void;
    /**
     * 通过路由打开视图
     *
     * @param {INavViewMsg} openViewMsg
     * @memberof NavPosController
     */
    openViewByPath(openViewMsg: INavViewMsg): Promise<void>;
    /**
     * 通过模型绘制视图
     *
     * @param {INavViewMsg} openViewMsg
     * @memberof NavPosController
     */
    openViewByModel(openViewMsg: INavViewMsg): void;
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
//# sourceMappingURL=nav-pos.controller.d.ts.map