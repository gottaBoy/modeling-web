import { IAppMenu, IAppMenuItem } from '@ibiz/model-core';
import { IAppService, IAppMenuState, IAppMenuEvent, IAppMenuController, IAppMenuItemProvider } from '../../../interface';
import { CTX } from '../../ctx';
import { AppCounter } from '../../../service';
import { ControlController } from '../../common';
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
     * @description 计数器对象
     * @type {AppCounter}
     * @memberof AppMenuController
     */
    counter?: AppCounter;
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
    /**
     * @description 控制移动端每行显示的菜单项个数，当前菜单为图标菜单时生效
     * @readonly
     * @type {number}
     * @memberof AppMenuController
     */
    get columnNum(): number;
    /**
     * @description 控制移动端定制按钮在屏幕中的位置，当前菜单为图标菜单、列表菜单时生效
     * @readonly
     * @type {('LEFTSTART'
     *     | 'LEFT'
     *     | 'LEFTEND'
     *     | 'RIGHT'
     *     | 'RIGHTSTART'
     *     | 'RIGHTEND')}
     * @memberof AppMenuController
     */
    get customizedAlign(): 'LEFTSTART' | 'LEFT' | 'LEFTEND' | 'RIGHT' | 'RIGHTSTART' | 'RIGHTEND';
    constructor(model: IAppMenu, context: IContext, params: IParams, ctx: CTX);
    protected onCreated(): Promise<void>;
    /**
     * @description 生命周期-加载完成
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof AppMenuController
     */
    protected onMounted(): Promise<void>;
    /**
     * 加载自定义菜单模型
     *
     * @private
     * @return {*}  {Promise<void>}
     * @memberof AppMenuController
     */
    private loadCustomMenusModel;
    /**
     * @description 保存自定义菜单模型
     * @param {Array<{ id: string; order: number; hidden: boolean }>} items 有权限的菜单项集合
     * @returns {*}  {Promise<void>}
     * @memberof AppMenuController
     */
    saveMobCustomMenusModel(items: Array<{
        id: string;
        order: number;
        hidden: boolean;
    }>): Promise<void>;
    /**
     * @description 计数器对象数据改变
     * @param {IData} data
     * @memberof AppMenuController
     */
    onCounterChange(data: IData): void;
    /**
     * @description 初始化计数器对象
     * @returns {*}  {void}
     * @memberof AppMenuController
     */
    initCounter(): void;
    /**
     * 初始化移动端菜单项
     *
     * @memberof AppMenuController
     */
    initMobMenuItems(): void;
    /**
     * @description 检查移动端菜单项是否有效（可显示）
     * @private
     * @param {IAppMenuItem} menuItem 待检查的移动端菜单项
     * @returns {*}  {boolean}
     * @memberof AppMenuController
     */
    isMobMenuItemValid(menuItem: IAppMenuItem): boolean;
    /**
     * @description 计算移动端菜单经过权限计算后可显示的菜单项集合
     * @private
     * @param {IAppMenuItem[]} items 原始菜单项数组
     * @param {boolean} [needRecursive] 是否需要递归处理子项
     * @returns {*}  {IAppMenuItem[]}
     * @memberof AppMenuController
     */
    private calcMobAuthedMenuItems;
    /**
     * @description 计算移动端自定义模式下可见的菜单项
     * @private
     * @param {IAppMenuItem[]} items 原始菜单项数组
     * @param {IData} [idMap] 菜单项ID映射表
     * @returns {*}  {IAppMenuItem[]}
     * @memberof AppMenuController
     */
    private calcMobCustomVisibleItems;
    /**
     * @description 计算移动端自定义模式下菜单项的排序
     * @private
     * @param {IAppMenuItem[]} items
     * @param {IData} [idMap]
     * @returns {*}  {IAppMenuItem[]}
     * @memberof AppMenuController
     */
    private calcMobCustomSorteItems;
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
     * @description 转换各类多语言
     * @protected
     * @memberof AppMenuController
     */
    protected convertMultipleLanguages(): void;
    /**
     * @description 获取默认打开菜单项
     * @returns {*}  {(IAppMenuItem | undefined)}
     * @memberof AppMenuController
     */
    getDefaultOpenMenuItem(): IAppMenuItem | undefined;
    /**
     * @description 获取默认打开视图
     * @returns {*}  {(string | undefined)}
     * @memberof AppMenuController
     */
    getDefaultOpenView(): string | undefined;
    /**
     * @description 生命周期-销毁完成
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof AppMenuController
     */
    protected onDestroyed(): Promise<void>;
}
//# sourceMappingURL=app-menu.controller.d.ts.map