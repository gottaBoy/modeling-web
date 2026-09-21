import { RuntimeError, recursiveIterate, RuntimeModelError, findRecursiveChild, } from '@ibiz-template/core';
import { AppFuncCommand } from '../../../command';
import { ControlController } from '../../common';
import { getAppMenuItemProvider } from '../../../register';
import { CustomAppMenuController } from './custom-app-menu.controller';
import { calcDynamicMenu } from '../../../utils';
/**
 * 应用菜单控制器
 *
 * @author chitanda
 * @date 2022-07-24 15:07:07
 * @export
 * @class AppMenuController
 * @extends {ControlController}
 */
export class AppMenuController extends ControlController {
    initState() {
        super.initState();
        this.state.menuItemsState = {};
        this.state.mobMenuItems = [];
        this.state.mobAuthedMenuItems = [];
        this.state.counterData = {};
    }
    /**
     * 视图层级
     *
     * @readonly
     * @type {(number | undefined)}
     * @memberof AppMenuController
     */
    get routeDepth() {
        return this.view.modal.routeDepth;
    }
    /**
     * @description 控制移动端每行显示的菜单项个数，当前菜单为图标菜单时生效
     * @readonly
     * @type {number}
     * @memberof AppMenuController
     */
    get columnNum() {
        var _a;
        return Number(((_a = this.model.userParam) === null || _a === void 0 ? void 0 : _a.columnnum) || this.controlParams.columnnum || 4);
    }
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
    get customizedAlign() {
        var _a;
        return (((_a = this.model.userParam) === null || _a === void 0 ? void 0 : _a.customizedalign) ||
            this.controlParams.customizedalign ||
            'RIGHTEND');
    }
    constructor(model, context, params, ctx) {
        super(model, context, params, ctx);
        /**
         * 菜单项适配器集合
         * @author lxm
         * @date 2023-07-19 04:14:50
         * @type {{ [key: string]: IProvider }}
         */
        this.itemProviders = {};
        /**
         * 自定义菜单控制器
         *
         * @type {(CustomAppMenuController | null)}
         * @memberof AppMenuController
         */
        this.customController = null;
        /**
         * 自定义配置
         *
         * @type {IData[]}
         * @memberof AppMenuController
         */
        this.saveConfigs = [];
        this.flattenAllItems();
        if (model.enableCustomized) {
            this.customController = new CustomAppMenuController(model, this);
        }
    }
    async onCreated() {
        var _a;
        this.app = await ibiz.hub.getApp(this.context.srfappid);
        await calcDynamicMenu(this.model, this.context, this.params);
        await super.onCreated();
        await this.initAppMenuItemProviders();
        // 初始化菜单项状态
        (_a = this.model.appMenuItems) === null || _a === void 0 ? void 0 : _a.forEach(item => {
            this.initMenuItemState(item);
        });
        // 加载菜单自定义配置
        if (this.customController) {
            await this.loadCustomMenusModel();
        }
        if (ibiz.env.isMob) {
            this.initMobMenuItems();
        }
    }
    /**
     * @description 生命周期-加载完成
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof AppMenuController
     */
    async onMounted() {
        var _a;
        await super.onMounted();
        this.initCounter();
        (_a = this.counter) === null || _a === void 0 ? void 0 : _a.onChange(this.onCounterChange.bind(this));
    }
    /**
     * 加载自定义菜单模型
     *
     * @private
     * @return {*}  {Promise<void>}
     * @memberof AppMenuController
     */
    async loadCustomMenusModel() {
        const customConfigs = await this.customController.loadCustomModelData();
        if (!customConfigs || customConfigs.length === 0) {
            this.saveConfigs = [];
        }
        else {
            this.saveConfigs = customConfigs;
        }
    }
    /**
     * @description 保存自定义菜单模型
     * @param {Array<{ id: string; order: number; hidden: boolean }>} items 有权限的菜单项集合
     * @returns {*}  {Promise<void>}
     * @memberof AppMenuController
     */
    async saveMobCustomMenusModel(items) {
        await this.customController.saveCustomModelData(items);
        this.saveConfigs = items;
        if (ibiz.env.isMob) {
            this.state.mobAuthedMenuItems = this.calcMobCustomSorteItems(this.state.mobAuthedMenuItems);
            this.state.mobMenuItems = this.calcMobCustomVisibleItems(this.state.mobAuthedMenuItems);
        }
    }
    /**
     * @description 计数器对象数据改变
     * @param {IData} data
     * @memberof AppMenuController
     */
    onCounterChange(data) {
        this.state.counterData = data;
    }
    /**
     * @description 初始化计数器对象
     * @returns {*}  {void}
     * @memberof AppMenuController
     */
    initCounter() {
        if (this.state.isCounterDisabled)
            return;
        const { appCounterRefId } = this.model;
        if (appCounterRefId) {
            this.counter = this.getCounter(appCounterRefId);
        }
    }
    /**
     * 初始化移动端菜单项
     *
     * @memberof AppMenuController
     */
    initMobMenuItems() {
        // 是否为标准菜单
        const isDefaultMenu = !this.model.appMenuStyle;
        // 所有可见菜单项
        let mobAuthedMenuItems = this.calcMobAuthedMenuItems(this.model.appMenuItems || [], isDefaultMenu);
        let mobMenuItems = [];
        if (this.model.enableCustomized) {
            if (this.saveConfigs.length > 0) {
                mobAuthedMenuItems = this.calcMobCustomSorteItems(mobAuthedMenuItems);
                mobMenuItems = this.calcMobCustomVisibleItems(mobAuthedMenuItems);
            }
            else if (isDefaultMenu) {
                // 标准菜单最大显示4个
                mobMenuItems = mobAuthedMenuItems.slice(0, 4);
            }
            else {
                mobMenuItems = mobAuthedMenuItems;
            }
            // 权限计算后的可见项
            this.state.mobAuthedMenuItems = mobAuthedMenuItems;
        }
        else {
            mobMenuItems = mobAuthedMenuItems;
        }
        // 最终显示项
        this.state.mobMenuItems = mobMenuItems;
    }
    /**
     * @description 检查移动端菜单项是否有效（可显示）
     * @private
     * @param {IAppMenuItem} menuItem 待检查的移动端菜单项
     * @returns {*}  {boolean}
     * @memberof AppMenuController
     */
    isMobMenuItemValid(menuItem) {
        return (menuItem.hidden !== true &&
            menuItem.itemType === 'MENUITEM' &&
            this.state.menuItemsState[menuItem.id].visible);
    }
    /**
     * @description 计算移动端菜单经过权限计算后可显示的菜单项集合
     * @private
     * @param {IAppMenuItem[]} items 原始菜单项数组
     * @param {boolean} [needRecursive] 是否需要递归处理子项
     * @returns {*}  {IAppMenuItem[]}
     * @memberof AppMenuController
     */
    calcMobAuthedMenuItems(items, needRecursive) {
        const visibleItems = [];
        items.forEach(item => {
            var _a;
            if (!this.isMobMenuItemValid(item))
                return;
            const itemData = Object.assign({}, item);
            if (((_a = item.appMenuItems) === null || _a === void 0 ? void 0 : _a.length) && needRecursive) {
                const childItems = this.calcMobAuthedMenuItems(item.appMenuItems, needRecursive);
                itemData.appMenuItems = childItems;
            }
            visibleItems.push(itemData);
        });
        return visibleItems;
    }
    /**
     * @description 计算移动端自定义模式下可见的菜单项
     * @private
     * @param {IAppMenuItem[]} items 原始菜单项数组
     * @param {IData} [idMap] 菜单项ID映射表
     * @returns {*}  {IAppMenuItem[]}
     * @memberof AppMenuController
     */
    calcMobCustomVisibleItems(items, idMap) {
        const customItems = [];
        let itemIdMap = idMap;
        if (!itemIdMap) {
            itemIdMap = {};
            this.saveConfigs.forEach(config => {
                itemIdMap[config.id] = config;
            });
        }
        items.forEach(item => {
            var _a;
            if (!itemIdMap[item.id] || itemIdMap[item.id].hidden)
                return;
            const itemData = Object.assign({}, item);
            if ((_a = item.appMenuItems) === null || _a === void 0 ? void 0 : _a.length) {
                const childItems = this.calcMobCustomVisibleItems(item.appMenuItems, itemIdMap);
                itemData.appMenuItems = childItems;
            }
            customItems.push(itemData);
        });
        return customItems;
    }
    /**
     * @description 计算移动端自定义模式下菜单项的排序
     * @private
     * @param {IAppMenuItem[]} items
     * @param {IData} [idMap]
     * @returns {*}  {IAppMenuItem[]}
     * @memberof AppMenuController
     */
    calcMobCustomSorteItems(items, idMap) {
        const customItems = [];
        let itemIdMap = idMap;
        if (!itemIdMap) {
            itemIdMap = {};
            this.saveConfigs.forEach(config => {
                itemIdMap[config.id] = config;
            });
        }
        items.forEach(item => {
            var _a;
            const itemData = Object.assign({}, item);
            if ((_a = item.appMenuItems) === null || _a === void 0 ? void 0 : _a.length) {
                const childItems = this.calcMobCustomSorteItems(item.appMenuItems, itemIdMap);
                itemData.appMenuItems = childItems;
            }
            customItems.push(itemData);
        });
        customItems.sort((a, b) => {
            var _a, _b;
            const orderA = ((_a = itemIdMap[a.id]) === null || _a === void 0 ? void 0 : _a.order) || 0;
            const orderB = ((_b = itemIdMap[b.id]) === null || _b === void 0 ? void 0 : _b.order) || 0;
            return orderA - orderB;
        });
        return customItems;
    }
    /**
     * 初始化菜单项的适配器
     * @author lxm
     * @date 2023-12-29 02:50:20
     * @protected
     * @return {*}  {Promise<void>}
     */
    async initAppMenuItemProviders() {
        await Promise.all(this.allAppMenuItems.map(async (item) => {
            const provider = await getAppMenuItemProvider(item, this.model);
            if (provider) {
                this.itemProviders[item.id] = provider;
            }
        }));
    }
    /**
     * 菜单项点击回调，触发对应的应用功能
     *
     * @author chitanda
     * @date 2022-12-22 14:12:53
     * @param {string} id
     * @return {*}  {Promise<void>}
     */
    async onClickMenuItem(id, event, useDepth = true, opts = {}) {
        const menuItem = findRecursiveChild(this.model, id, {
            compareField: 'id',
            childrenFields: ['appMenuItems'],
        });
        if (!menuItem) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.menu.noFindMenu', { id }));
        }
        this.evt.emit('onClick', {
            eventArg: id,
            event,
        });
        // 如果有适配器，走适配器的点击处理
        const provider = this.itemProviders[id];
        if (provider && provider.onClick) {
            return provider.onClick(menuItem, event, this);
        }
        if (!menuItem.appFuncId) {
            throw new RuntimeModelError(menuItem, ibiz.i18n.t('runtime.controller.control.menu.noConfigured'));
        }
        const tempContext = this.context.clone();
        tempContext.srfappid = menuItem.appId || ibiz.env.appId;
        if (this.routeDepth && useDepth) {
            Object.assign(tempContext, {
                toRouteDepth: this.routeDepth + 1,
            });
        }
        const param = Object.assign({}, this.params);
        if (ibiz.config.appMenu.echoMode === 'MENUITEM')
            Object.assign(param, { srfmenuitem: id });
        await ibiz.commands.execute(AppFuncCommand.TAG, menuItem.appFuncId, tempContext, param, Object.assign(Object.assign({}, opts), { view: this.view }));
    }
    /**
     * 初始化菜单项状态
     *
     * @author lxm
     * @date 2022-10-12 20:10:37
     * @param {AppMenuItemModel} menu
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initMenuItemState(menu) {
        var _a;
        const result = { permitted: true, visible: true };
        if (menu.hidden) {
            result.visible = false;
        }
        else {
            let permitted = true;
            if (menu.accessKey) {
                permitted = this.app.authority.calcByResCode(menu.accessKey);
            }
            let visible = permitted;
            // 有子的计算子状态，如果本身显示但是子都不显示则不显示
            if ((_a = menu.appMenuItems) === null || _a === void 0 ? void 0 : _a.length) {
                const childrenState = menu.appMenuItems.map(child => {
                    return this.initMenuItemState(child).visible;
                });
                visible = visible && childrenState.includes(true);
            }
            result.permitted = permitted;
            result.visible = visible;
        }
        this.state.menuItemsState[menu.id] = result;
        return result;
    }
    /**
     * 所有项平铺
     * @author lxm
     * @date 2023-12-29 02:42:39
     * @protected
     */
    flattenAllItems() {
        const result = [];
        const flattenMenus = (menuItems) => {
            menuItems.forEach(item => {
                result.push(item);
                if (item.appMenuItems && item.appMenuItems.length > 0) {
                    flattenMenus(item.appMenuItems);
                }
            });
        };
        flattenMenus(this.model.appMenuItems || []);
        this.allAppMenuItems = result;
    }
    /**
     * 所有项平铺
     * @return {*}
     * @author: zhujiamin
     * @Date: 2022-09-09 16:48:21
     */
    getAllItems() {
        return this.allAppMenuItems;
    }
    /**
     * 根据id去视图控制器里取得计数器对象
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-07-10 15:14:21
     */
    getCounter(id) {
        if (this.state.isCounterDisabled)
            return null;
        const { counters } = this.ctx.view;
        if (counters[id]) {
            return counters[id];
        }
        return null;
    }
    /**
     * @description 转换各类多语言
     * @protected
     * @memberof AppMenuController
     */
    convertMultipleLanguages() {
        recursiveIterate(this.model, (item) => {
            var _a, _b;
            if ((_a = item.capLanguageRes) === null || _a === void 0 ? void 0 : _a.lanResTag)
                item.caption = ibiz.i18n.t(item.capLanguageRes.lanResTag, item.caption);
            if ((_b = item.tooltipLanguageRes) === null || _b === void 0 ? void 0 : _b.lanResTag)
                item.tooltip = ibiz.i18n.t(item.tooltipLanguageRes.lanResTag, item.tooltip);
        }, {
            childrenFields: ['appMenuItems'],
        });
    }
    /**
     * @description 获取默认打开菜单项
     * @returns {*}  {(IAppMenuItem | undefined)}
     * @memberof AppMenuController
     */
    getDefaultOpenMenuItem() {
        return this.getAllItems().find(item => item.openDefault &&
            !item.hidden &&
            this.state.menuItemsState[item.id].visible);
    }
    /**
     * @description 获取默认打开视图
     * @returns {*}  {(string | undefined)}
     * @memberof AppMenuController
     */
    getDefaultOpenView() {
        const menu = this.getDefaultOpenMenuItem();
        if (!menu || !menu.appFuncId)
            return;
        const appFunc = ibiz.hub.getApp(menu.appId).getAppFunc(menu.appFuncId);
        return (appFunc === null || appFunc === void 0 ? void 0 : appFunc.appFuncType) === 'APPVIEW' ? appFunc.appViewId : undefined;
    }
    /**
     * @description 生命周期-销毁完成
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof AppMenuController
     */
    async onDestroyed() {
        await super.onDestroyed();
        if (this.counter)
            this.counter.destroy();
    }
}
