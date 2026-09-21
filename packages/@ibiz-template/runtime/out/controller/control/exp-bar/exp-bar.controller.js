import { RuntimeError, RuntimeModelError } from '@ibiz-template/core';
import { calcDeCodeNameById } from '../../../model';
import { calcNavParams } from '../../../utils';
import { ControlController } from '../../common';
import { hasSubRoute } from '../../utils';
/**
 * 导航部件控制器
 *
 * @author zk
 * @date 2023-05-29 04:05:46
 * @export
 * @class ExpBarControlController
 * @extends {ControlController<T, S, E>}
 * @implements {IExpBarControlController<T, S, E>}
 * @template T
 * @template S
 * @template E
 */
export class ExpBarControlController extends ControlController {
    constructor() {
        super(...arguments);
        /**
         * 导航栏key名称 默认srfkey 多导航视图类 由子类重写
         *
         * @author zk
         * @date 2023-07-10 03:07:53
         * @memberof ExpBarControlController
         */
        this.navKeyName = 'srfkey';
        /**
         * 导航栈
         * - 缓存用户操作过程中已激活的导航数据
         * @type {IData[]}
         * @memberof ExpBarControlController
         */
        this.navStack = [];
    }
    get _evt() {
        return this.evt;
    }
    /**
     * 当前路由视图的层级
     *
     * @author zk
     * @date 2023-07-11 10:07:20
     * @readonly
     * @type {(number | undefined)}
     * @memberof ExpBarControlController
     */
    get routeDepth() {
        return this.view.modal.routeDepth;
    }
    initState() {
        super.initState();
        this.state.query = '';
    }
    /**
     * 加载
     *
     * @author zk
     * @date 2023-05-29 05:05:17
     * @return {*}  {Promise<IData[]>}
     * @memberof ExpBarControlController
     */
    load() {
        return this.xDataController.load({ isInitialLoad: true });
    }
    /**
     * 多数据部件控制器
     *
     * @author zk
     * @date 2023-05-29 03:05:07
     * @readonly
     * @type {IGridController}
     * @memberof ExpBarControlController
     */
    get xDataController() {
        const controller = this.view.getController(this.model.xdataControlName);
        if (!controller) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.controller.control.expBar.unableMore', {
                xdataControlName: this.model.xdataControlName,
            }));
        }
        return controller;
    }
    /**
     * 工具栏
     * @author lxm
     * @date 2023-07-31 07:01:25
     * @readonly
     * @type {(IToolbarController | undefined)}
     */
    get toolbarController() {
        const controller = this.view.getController(`${this.model.xdataControlName.split('_')[0]}_toolbar`);
        return controller;
    }
    /**
     * 多数据部件模型
     *
     * @author zk
     * @date 2023-05-29 03:05:15
     * @readonly
     * @type {(IDEGrid | null)}
     * @memberof ExpBarControlController
     */
    get XDataModel() {
        var _a;
        const control = (_a = this.model.controls) === null || _a === void 0 ? void 0 : _a.find((item) => {
            return item.name === this.model.xdataControlName;
        });
        return control;
    }
    /**
     * 是否缓存
     *
     * @author zk
     * @date 2023-09-27 09:09:59
     * @readonly
     * @type {boolean}
     * @memberof ExpBarControlController
     */
    get isCache() {
        if (this.controlParams.expcache === 'CACHE') {
            return true;
        }
        if (this.controlParams.expcache === 'NO_CACHE') {
            return false;
        }
        return ibiz.config.view.expCacheMode.includes(this.model.controlType);
    }
    /**
     * 创建完成
     *
     * @author zk
     * @date 2023-05-29 10:05:22
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof ExpBarControlController
     */
    async onCreated() {
        var _a;
        await super.onCreated();
        this.childNames.push(this.model.xdataControlName);
        const appDataEntity = await ibiz.hub.getAppDataEntity(this.model.appDataEntityId, this.context.srfappid);
        if (appDataEntity) {
            const searchFields = (_a = appDataEntity.appDEFields) === null || _a === void 0 ? void 0 : _a.filter(field => {
                return field.enableQuickSearch;
            });
            const placeHolders = [];
            searchFields === null || searchFields === void 0 ? void 0 : searchFields.forEach(searchField => {
                if ((searchField === null || searchField === void 0 ? void 0 : searchField.lnlanguageRes) && searchField.lnlanguageRes.lanResTag) {
                    placeHolders.push(ibiz.i18n.t(searchField.lnlanguageRes.lanResTag, searchField.logicName));
                }
                else if (searchField === null || searchField === void 0 ? void 0 : searchField.logicName) {
                    placeHolders.push(searchField.logicName);
                }
            });
            if (placeHolders.length > 0) {
                this.state.placeHolder = placeHolders.join('、');
            }
        }
    }
    /**
     * 组件挂载
     *
     * @author zk
     * @date 2023-05-29 09:05:55
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof ExpBarControlController
     */
    async onMounted() {
        super.onMounted();
        if (this.xDataController) {
            this.xDataController.evt.on('onActive', event => {
                this.xDataActive(event);
            });
            this.xDataController.evt.on('onLoadSuccess', event => {
                this.xDataLoadSuccess(event);
            });
            this.xDataController.evt.on('onRemoveSuccess', () => {
                this.navDataByStack();
            });
        }
        if (this.toolbarController) {
            this.xDataController.evt.on('onSelectionChange', async (event) => {
                // 更新工具栏状态
                this.toolbarController.calcButtonState(event.data[0], this.model.appDataEntityId);
            });
        }
        // 如果外面没有配置默认不加载的话，默认部件自己加载
        if (this.state.loadDefault) {
            this.load();
        }
    }
    /**
     * 多数据部件加载成功 设置默认选中
     *
     * @author zk
     * @date 2023-05-30 04:05:40
     * @memberof ExpBarControlController
     */
    xDataLoadSuccess(event) {
        if (event.isInitialLoad) {
            // 只处理默认第一次加载
            if (this.state.srfnav && this.routeDepth) {
                // 路由srfnav回显
                this.navBySrfnav();
            }
            else {
                // 默认选中第一条并导航
                this.navByFirstItem();
            }
        }
        else {
            this.navDataByStack();
        }
    }
    /**
     * 默认通过路由上的srfnav导航
     * @author lxm
     * @date 2023-08-10 04:04:08
     * @protected
     */
    navBySrfnav() {
        var _a;
        // 找到选中项，如果没有就模拟选中数据
        const selectItem = (_a = this.xDataController) === null || _a === void 0 ? void 0 : _a.state.items.find(item => item[this.navKeyName] === this.state.srfnav);
        // 是否是路由模式且有子路由
        const routeAndHasSub = this.routeDepth && hasSubRoute(this.routeDepth);
        if (routeAndHasSub) {
            if (selectItem) {
                // 在多数据部件里面选项设置回显。
                this.xDataController.setSelection([selectItem]);
            }
            // 此时不需要导航占位push路由，只要有个key触发绘制下级视图就行。
            this._evt.emit('onNavViewChange', {
                navViewMsg: {
                    key: this.state.srfnav,
                    isRoutePushed: true,
                    isCache: this.isCache,
                },
                context: this.context,
            });
            return;
        }
        if (selectItem) {
            // 非路由模式,或者有路由模式下有srfnav没有子路由时，需要在多数据部件里面选项设置回显。
            this.xDataController.setActive(selectItem);
            this.xDataController.setSelection([selectItem]);
        }
        else {
            // 找不到匹配的选中项的情况，告诉导航占位显示404
            this._evt.emit('onNavViewChange', {
                navViewMsg: {
                    key: this.state.srfnav,
                    is404: true,
                    isCache: this.isCache,
                },
                context: this.context,
            });
        }
    }
    /**
     * 导航页面首次打开且没有回显时，
     * 默认取第一条数据进行导航
     * 对于不同的导航，第一条可导航的数据可能定义不同，可以重写改方法。
     * @author lxm
     * @date 2023-08-10 03:58:15
     * @protected
     */
    navByFirstItem() {
        const data = this.xDataController.state.items[0];
        if (!data) {
            // 导航视图传空让他导航占位绘制空界面
            this.state.srfnav = '';
            this._evt.emit('onNavViewChange', {
                navViewMsg: {
                    key: '',
                    isCache: this.isCache,
                },
            });
            return;
        }
        // 默认选中并激活第一项
        this.xDataController.setActive(data);
        this.xDataController.setSelection([data]);
    }
    /**
     * 根据栈数据导航数据
     *
     * @memberof ExpBarControlController
     */
    navDataByStack() {
        const { items } = this.xDataController.state;
        const preNav = this.navStack.find(nav => items.find(item => nav[this.navKeyName] === item[this.navKeyName]));
        const navData = preNav
            ? items.find(item => preNav[this.navKeyName] === item[this.navKeyName])
            : items[0];
        if (navData) {
            this.xDataController.setActive(navData);
            this.xDataController.setSelection([navData]);
        }
        else {
            this.navStack = [];
            this.xDataController.setSelection([]);
            this.state.srfnav = '';
            this._evt.emit('onNavViewChange', {
                navViewMsg: {
                    key: '',
                    isCache: this.isCache,
                },
            });
        }
    }
    /**
     * 多数据激活
     *
     * @author zk
     * @date 2023-05-29 03:05:36
     * @param {IData} data
     * @memberof ExpBarControlController
     */
    xDataActive(event) {
        const { data, context, params } = event;
        const navViewMsg = this.getNavViewMsg(data[0], context, params);
        // 缓存用户导航数据，放置在最前
        this.navStack.unshift(data[0]);
        this._evt.emit('onNavViewChange', { navViewMsg });
    }
    /**
     * 解析参数
     *
     * @author zk
     * @date 2023-05-29 04:05:52
     * @param {IDETabViewPanel} tabViewPanel
     * @return {*}
     * @memberof ExpBarControlController
     */
    prepareParams(XDataModel, data, context, params) {
        const { navDER, navFilter, navigateContexts, navigateParams, appDataEntityId, } = XDataModel;
        const model = {
            deName: appDataEntityId ? calcDeCodeNameById(appDataEntityId) : undefined,
            navFilter,
            pickupDEFName: navDER === null || navDER === void 0 ? void 0 : navDER.pickupDEFName,
            navContexts: navigateContexts,
            navParams: navigateParams,
        };
        const originParams = {
            context,
            params,
            data,
        };
        const { resultContext, resultParams } = calcNavParams(model, originParams);
        // 合并SrfNav
        const tempContext = Object.assign(context.clone(), resultContext, {
            currentSrfNav: data[this.navKeyName],
        });
        this.state.srfnav = data[this.navKeyName];
        const tempParams = Object.assign({}, resultParams);
        return { context: tempContext, params: tempParams };
    }
    /**
     * 计算导航视图
     *
     * @author zk
     * @date 2023-05-30 03:05:19
     * @return {*}  {Promise<IAppView>}
     * @memberof ExpBarControlController
     */
    calcViewModelId() {
        var _a;
        if (['GRID', 'DATAVIEW', 'LIST'].includes(((_a = this.XDataModel) === null || _a === void 0 ? void 0 : _a.controlType) || '')) {
            return this.XDataModel.navAppViewId;
        }
        throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.expBar.multiNode'));
    }
    /**
     * 获取导航视图
     *
     * @author zk
     * @date 2023-06-29 03:06:41
     * @param {IDETabViewPanel} tabViewPanel
     * @return {*}  {Promise<INavViewMsg>}
     * @memberof TabExpPanelController
     */
    getNavViewMsg(data, context, params) {
        const viewModelId = this.calcViewModelId();
        const result = this.prepareParams(this.XDataModel, data, context, params);
        return {
            key: data[this.navKeyName],
            context: result.context,
            params: result.params,
            viewId: viewModelId,
            isCache: this.isCache,
        };
    }
    /**
     * 是否显示部件头部
     * @author lxm
     * @date 2023-08-02 07:54:18
     * @protected
     * @return {*}  {boolean}
     */
    calcControlHeaderVisible() {
        const hasToolbar = !!this.toolbarController;
        if (!hasToolbar && this.layoutPanel) {
            const controller = this.layoutPanel.panelItems.control_toolbar;
            if (controller) {
                controller.state.visible = false;
            }
        }
        return (hasToolbar ||
            !!(this.model.showTitleBar && this.model.title) ||
            !!this.model.enableSearch);
    }
    setLayoutPanel(panel) {
        super.setLayoutPanel(panel);
        panel.evt.on('onMounted', () => {
            const showHeader = this.calcControlHeaderVisible();
            if (!showHeader) {
                const controller = this.layoutPanel.panelItems.control_header;
                if (controller) {
                    controller.state.visible = false;
                }
            }
        });
    }
    /**
     * 路由变更处理回调
     * @author lxm
     * @date 2023-09-14 07:03:39
     * @param {{ srfnav?: string; path: string }} info 当前系统的路由的从一级到最后一级的所有路径。
     */
    async onRouterChange(info) {
        if (this.state.srfnav !== info.srfnav) {
            this.state.srfnav = info.srfnav;
            this.navBySrfnav();
        }
    }
}
