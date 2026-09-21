import { IAppMenu, IAppMenuItem } from '@ibiz/model-core';
import { IAppMenuState, IAppMenuEvent, IAppMenuController, IAppService, IAppMenuItemProvider } from '../../../interface';
import { AppCounter } from '../../../service';
import { ControlController } from '../../common';
import { CTX } from '../../ctx';
import { CustomAppMenuController } from './custom-app-menu.controller';
/**
 * 应用菜单控制器
 *
 * @author chitanda
 * @date 2022-07-24 15:07:07
 * @export
 * @class AppMenuController
 * @extends {ControlController}
 */
export declare class AppMenuController extends ControlController<IAppMenu, IAppMenuState, IAppMenuEvent> implements IAppMenuController {
    app: IAppService;
    protected initState(): void;
    /**
     * 所有菜单项，平铺开
     * @author lxm
     * @date 2023-12-29 02:43:35
     * @type {IAppMenuItem[]}
     */
    allAppMenuItems: IAppMenuItem[];
    /**
     * 菜单项适配器集合
     * @author lxm
     * @date 2023-07-19 04:14:50
     * @type {{ [key: string]: IProvider }}
     */
    itemProviders: {
        [key: string]: IAppMenuItemProvider;
    };
    /**
     * 自定义菜单控制器
     *
     * @type {(CustomAppMenuController | null)}
     * @memberof AppMenuController
     */
    customController: CustomAppMenuController | null;
    /**
     * 自定义配置
     *
     * @type {IData[]}
     * @memberof AppMenuController
     */
    saveConfigs: IData[];
    /**
     * 视图层级
     *
     * @readonly
     * @type {(number | undefined)}
     * @memberof AppMenuController
     */
    get routeDepth(): number | undefined;
    constructor(model: IAppMenu, context: IContext, params: IParams, ctx: CTX);
    protected onCreated(): Promise<void>;
    /**
     * 加载自定义菜单模型
     *
     * @private
     * @return {*}  {Promise<void>}
     * @memberof AppMenuController
     */
    private loadCustomMenusModel;
    /**
     * 初始化移动端菜单项
     *
     * @memberof AppMenuController
     */
    initMobMenuItems(): void;
    /**
     * 初始化菜单项的适配器
     * @author lxm
     * @date 2023-12-29 02:50:20
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected initAppMenuItemProviders(): Promise<void>;
    /**
     * 菜单项点击回调，触发对应的应用功能
     *
     * @author chitanda
     * @date 2022-12-22 14:12:53
     * @param {string} id
     * @return {*}  {Promise<void>}
     */
    onClickMenuItem(id: string, event?: MouseEvent, useDepth?: boolean, opts?: IData): Promise<void>;
    /**
     * 初始化菜单项状态
     *
     * @author lxm
     * @date 2022-10-12 20:10:37
     * @param {AppMenuItemModel} menu
     */
    initMenuItemState(menu: IAppMenuItem): {
        visible: boolean;
        permitted: boolean;
    };
    /**
     * 所有项平铺
     * @author lxm
     * @date 2023-12-29 02:42:39
     * @protected
     */
    protected flattenAllItems(): void;
    /**
     * 所有项平铺
     * @return {*}
     * @author: zhujiamin
     * @Date: 2022-09-09 16:48:21
     */
    getAllItems(): IAppMenuItem[];
    /**
     * 根据id去视图控制器里取得计数器对象
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-07-10 15:14:21
     */
    getCounter(id: string): AppCounter | null;
    /**
     * 转换各类多语言
     *
     * @date 2023-05-18 02:57:00
     * @protected
     */
    protected convertMultipleLanguages(): void;
}
//# sourceMappingURL=app-menu.controller.d.ts.map