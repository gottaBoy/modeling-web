import { findRecursiveChild, RuntimeError, RuntimeModelError, } from '@ibiz-template/core';
import { AppFuncCommand } from '../../../command';
import { ControlController } from '../../common';
import { getAppMenuItemProvider } from '../../../register';
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
export class AppMenuController extends ControlController {
    initState() {
        super.initState();
        this.state.menuItemsState = {};
        this.state.mobMenuItems = [];
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
        await super.onCreated();
        this.app = await ibiz.hub.getApp(this.context.srfappid);
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
     * 初始化移动端菜单项
     *
     * @memberof AppMenuController
     */
    initMobMenuItems() {
        var _a;
        // 所有可见菜单项
        const menuItems = ((_a = this.model.appMenuItems) === null || _a === void 0 ? void 0 : _a.filter(item => item.hidden !== true &&
            item.itemType === 'MENUITEM' &&
            this.state.menuItemsState[item.id].visible)) || [];
        let mobMenuItems = [];
        if (this.model.enableCustomized) {
            if (this.saveConfigs.length > 0) {
                this.saveConfigs.forEach(item => {
                    const menu = menuItems.find(_item => item.id === _item.id);
                    if (menu)
                        mobMenuItems.push(menu);
                });
            }
            else {
                mobMenuItems = menuItems.slice(0, 4);
            }
        }
        else {
            mobMenuItems = menuItems;
        }
        this.state.mobMenuItems = mobMenuItems;
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
            const provider = await getAppMenuItemProvider(item);
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
        await ibiz.commands.execute(AppFuncCommand.TAG, menuItem.appFuncId, tempContext, this.params, opts);
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
        flattenMenus(this.model.appMenuItems);
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
        const { counters } = this.ctx.view;
        if (counters[id]) {
            return counters[id];
        }
        return null;
    }
    /**
     * 转换各类多语言
     *
     * @date 2023-05-18 02:57:00
     * @protected
     */
    convertMultipleLanguages() {
        const convertItemCaption = (menuItems) => {
            menuItems.forEach((item) => {
                var _a;
                if (item.capLanguageRes && item.capLanguageRes.lanResTag) {
                    item.caption = ibiz.i18n.t(item.capLanguageRes.lanResTag, item.caption);
                }
                if ((_a = item.appMenuItems) === null || _a === void 0 ? void 0 : _a.length) {
                    convertItemCaption(item.appMenuItems);
                }
            });
        };
        if (this.model.appMenuItems && this.model.appMenuItems.length > 0) {
            convertItemCaption(this.model.appMenuItems);
        }
    }
}
