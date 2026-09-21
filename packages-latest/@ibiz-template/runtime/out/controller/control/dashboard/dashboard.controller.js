import { clone } from 'ramda';
import { recursiveIterate } from '@ibiz-template/core';
import { ControlType } from '../../../constant';
import { getPortletProvider } from '../../../register';
import { handleAllSettled } from '../../../utils';
import { ControlController } from '../../common';
import { getOriginData } from '../../utils';
import { deepFillSubAppId, filterPortletByConfig, filterPortletByID, generateCacheKy, getFilterSearchConds, getPortletModelByID, } from './dashboard.util';
/**
 * 数据看板部件控制器
 * @author lxm
 * @date 2023-07-07 03:27:29
 * @export
 * @class DashboardController
 * @extends {ControlController<IDashboard, IDashboardState, IDashboardEvent>}
 * @implements {IDashboardController}
 */
export class DashboardController extends ControlController {
    constructor() {
        super(...arguments);
        /**
         * 所有数据看板成员的适配器
         *
         * @author lxm
         * @date 2022-08-24 20:08:07
         * @type {{ [key: string]: IPortletProvider }}
         */
        this.providers = {};
        /**
         * 门户部件控制器
         *
         * @author lxm
         * @date 2022-10-20 22:10:26
         * @type {{ [key: string]: IPortletController }}
         */
        this.portlets = {};
        /**
         * 动态门户部件Map
         *
         * @author tony001
         * @date 2024-07-09 17:07:57
         * @type {Map<string, IData>}
         */
        this.dynaPortletMap = new Map();
        this.enableAnchorCtrls = [];
    }
    /**
     * 初始化状态
     *
     * @author tony001
     * @date 2024-07-26 14:07:19
     * @protected
     */
    initState() {
        super.initState();
    }
    // 创建完成
    async onCreated() {
        await super.onCreated();
        await this.initPortlets(this.model.controls);
        // 实体门户视图监听视图数据变更，刷新界面行为组的状态。
        const { appDataEntityId } = this.view.model;
        if (appDataEntityId) {
            this.view.evt.on('onDataChange', event => {
                const data = getOriginData(event.data);
                if (data) {
                    this.dataChangeNotify(data);
                }
            });
        }
    }
    /**
     * 设置自定义数据看板部件控制器
     *
     * @author tony001
     * @date 2024-07-26 14:07:21
     * @param {CustomDashboardController} customDashboard
     */
    setCustomDashboard(customDashboard) {
        this.customDashboard = customDashboard;
    }
    /**
     * 获取自定义数据看板部件控制器
     *
     * @author tony001
     * @date 2024-07-26 21:07:32
     * @return {*}  {(CustomDashboardController | undefined)}
     */
    getCustomDashboard() {
        return this.customDashboard;
    }
    /**
     * @description 设置移动端自定义数据看板部件控制器
     * @param {MobCustomDashboardController} mobCustomDashboard
     * @memberof DashboardController
     */
    setMobCustomDashboard(mobCustomDashboard) {
        this.mobCustomDashboard = mobCustomDashboard;
    }
    /**
     * @description 获取移动端自定义数据看板部件控制器
     * @returns {*}  {(MobCustomDashboardController | undefined)}
     * @memberof DashboardController
     */
    getMobCustomDashboard() {
        return this.mobCustomDashboard;
    }
    /**
     * 初始化子门户部件
     *
     * @author lxm
     * @date 2022-10-21 03:10:49
     * @param {PortletPartModel[]} portletModels
     * @param {ContainerPortletController} [parent]
     * @returns {*}  {Promise<void>}
     */
    async initPortlets(portletModels, parent) {
        if (!(portletModels === null || portletModels === void 0 ? void 0 : portletModels.length)) {
            return;
        }
        // 这块只初始化子门户部件，忽略子门户部件里面嵌入的部件
        const ignorePortletTypes = [
            ControlType.CHART,
            ControlType.APP_MENU,
            ControlType.TOOLBAR,
            ControlType.LIST,
            ControlType.REPORT_PANEL,
        ];
        await Promise.all(portletModels.map(async (portlet) => {
            var _a;
            if (portlet.controlType &&
                ignorePortletTypes.includes(portlet.controlType)) {
                return;
            }
            if (portlet.enableAnchor) {
                this.enableAnchorCtrls.push(portlet);
            }
            const provider = await getPortletProvider(portlet);
            if (provider) {
                this.providers[portlet.id] = provider;
                const controller = await provider.createController(portlet, this, parent);
                this.portlets[portlet.id] = controller;
                if ((_a = portlet.controls) === null || _a === void 0 ? void 0 : _a.length) {
                    await this.initPortlets(portlet.controls, controller);
                }
            }
        }));
        if (!parent) {
            this.evt.emit('onInitPortlets', undefined);
        }
    }
    /**
     * 初始化
     *
     * @param {IData} [config={}]
     * @return {*}  {Promise<void>}
     * @memberof DashboardController
     */
    async initPortletsConfig(config = {}) {
        Object.keys(config).forEach((key) => {
            const portlet = this.portlets[key];
            if (portlet) {
                portlet.config = config[key];
                portlet.state.title = portlet.config.srftitle;
                Object.assign(portlet.params, portlet.config);
            }
        });
    }
    /**
     * 重置门户
     *
     * @return {*}  {Promise<void>}
     * @memberof DashboardController
     */
    async resetPortlets() {
        Object.keys(this.portlets).forEach((key) => {
            const portlet = this.portlets[key];
            portlet.resetConfig();
        });
        this.evt.emit('onResetPortlet', undefined);
    }
    /**
     * 加载动态
     *
     * @author tony001
     * @date 2024-06-27 16:06:21
     * @return {*}  {Promise<IData[]>}
     */
    async loadAllDynaPortlet() {
        var _a;
        const app = ibiz.hub.getApp(this.model.appId);
        const result = [];
        // 存在动态代码表标识
        if (this.controlParams.dynamiccodelist) {
            const dynamicCodeListTag = this.controlParams.dynamiccodelist;
            const codeListItems = await app.codeList.get(dynamicCodeListTag, this.context, this.params);
            if (codeListItems && codeListItems.length > 0) {
                codeListItems.forEach(item => {
                    result.push(Object.assign(Object.assign({}, item.data), { psappportletid: item.value, psappportletname: item.text }));
                });
            }
        }
        else {
            const res = await app.deService.exec('psappportlet', 'fetchdefault', this.context, {
                size: 1000,
                n_pssysappid_eq: app.model.codeName,
                n_dynamodelflag_noteq: 0,
            });
            if (res && ((_a = res.data) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                res.data.forEach((item) => {
                    result.push({
                        psappportletid: item.psappportletid,
                        codename: item.codename,
                        psappportletname: item.psappportletname,
                        groupcodename: 'Ungroup',
                        groupname: ibiz.i18n.t('runtime.controller.control.dashboard.unGroup'),
                    });
                });
            }
        }
        return result;
    }
    /**
     * 通过指定标识加载门户部件
     *
     * @author tony001
     * @date 2024-06-27 17:06:12
     * @param {string} id
     * @return {*}  {(Promise<IDBPortletPart | undefined>)}
     */
    async loadDynaPortletById(id) {
        var _a;
        const app = ibiz.hub.getApp(this.model.appId);
        const tempContext = clone(this.context);
        Object.assign(tempContext, { psappportlet: id });
        const res = await app.deService.exec('psappportlet', 'get', tempContext, this.params);
        this.dynaPortletMap.set(id, res.data);
        if (res && res.data && res.data.controlmodel) {
            const controlModel = JSON.parse(res.data.controlmodel);
            const result = (await ibiz.hub.translationModelToDsl(controlModel, 'CTRL'));
            const appId = res.data.pssysappid;
            if (appId) {
                const mainApp = ibiz.hub.getApp(ibiz.env.appId);
                const targetApp = (_a = mainApp.model.subAppRefs) === null || _a === void 0 ? void 0 : _a.find(subAppRef => {
                    var _a;
                    return (_a = subAppRef.id) === null || _a === void 0 ? void 0 : _a.endsWith(appId);
                });
                if (targetApp && targetApp.id) {
                    deepFillSubAppId(result, targetApp.id);
                }
            }
            return result;
        }
    }
    /**
     * 通知所有表单成员表单操作过程中的数据变更
     *
     * @author lxm
     * @date 2022-09-20 18:09:40
     * @param {string[]} names
     */
    async dataChangeNotify(data) {
        // 通知所有成员项去处理成员项相关逻辑
        await handleAllSettled(Object.values(this.portlets).map(async (portlet) => {
            return portlet.dataChangeNotify(data);
        }));
    }
    /**
     * 打开过滤器设计界面
     *
     * @author tony001
     * @date 2024-07-26 11:07:02
     * @param {{ id: string }} { id } 过滤部件标识
     * @return {*}  {Promise<void>}
     */
    async openFilterDesignPage(args) {
        let isNewFilter = true;
        const filterDesignParams = {};
        if (args && args.id) {
            isNewFilter = false;
            const targetPorlet = this.portlets[args.id];
            if (targetPorlet)
                filterDesignParams.filter = targetPorlet;
        }
        if (this.model.dashboardStyle) {
            filterDesignParams.dashboardStyle = this.model.dashboardStyle;
        }
        const items = [];
        Object.values(this.portlets).forEach((portlet) => {
            if (portlet.model &&
                portlet.model.portletType !== 'FILTER' &&
                portlet.model.portletType !== 'RAWITEM' &&
                portlet.model.portletType !== 'CONTAINER') {
                items.push(portlet.model);
            }
        });
        filterDesignParams.items = items;
        const modal = ibiz.overlay.createModal('iBizFilterPortletDesign', Object.assign({ dismiss: (_data) => modal.dismiss(_data), context: this.context, viewParams: this.params }, filterDesignParams), {
            width: '90%',
            height: '90%',
            footerHide: true,
        });
        modal.present();
        const result = await modal.onWillDismiss();
        const { ok, data } = result;
        if (!ok || !data)
            return;
        const { model, config, searchconds } = data[0];
        await this.saveFilterData(model, config, searchconds, isNewFilter);
    }
    /**
     * 保存过滤器数据
     *
     * @author tony001
     * @date 2024-07-26 16:07:01
     * @protected
     * @param {IModel} model
     * @param {IData} config
     * @param {boolean} isNewFilter
     */
    async saveFilterData(model, config, searchconds, isNewFilter) {
        var _a;
        if (!this.customDashboard)
            return;
        const app = ibiz.hub.getApp(this.model.appId);
        // 新建
        if (isNewFilter) {
            // 仿真过滤器占位
            const portletCat = (_a = app.model.appPortletCats) === null || _a === void 0 ? void 0 : _a.find(cat => { var _a; return cat.codeName === ((_a = model.appPortletCat) === null || _a === void 0 ? void 0 : _a.codeName); });
            const mockFilter = {
                type: 'app',
                portletCodeName: model.codeName,
                portletName: model.title,
                groupCodeName: (portletCat === null || portletCat === void 0 ? void 0 : portletCat.codeName) || '',
                groupName: (portletCat === null || portletCat === void 0 ? void 0 : portletCat.name) || '',
                appCodeName: model.appDataEntityId,
                appName: app.model.name,
                w: 12,
                h: 3,
                x: 0,
                y: 0,
                i: model.codeName,
            };
            // 修改原门户部件占位位置,统一下调3个单元
            const { customModelData } = this.customDashboard;
            if (customModelData && customModelData.length > 0) {
                customModelData.forEach((item) => {
                    item.y += 3;
                });
            }
            this.customDashboard.customModelData.unshift(mockFilter);
        }
        // 设置缓存
        const searchCondCacheKey = generateCacheKy(this.context, this, model.id);
        if (searchconds) {
            localStorage.setItem(searchCondCacheKey, JSON.stringify(searchconds));
        }
        else {
            localStorage.removeItem(searchCondCacheKey);
        }
        // 存数
        const result = await this.customDashboard.saveCustomModelData(this.customDashboard.customModelData, { [model.id]: { srftitle: model.title } }, { [model.id]: { config, searchconds } });
        this.evt.emit('onSavePortlet', result);
    }
    /**
     * 刷新数据
     *
     * @author tony001
     * @date 2024-07-28 09:07:21
     * @return {*}  {Promise<void>}
     */
    async refresh(args) {
        Object.assign(this.params, args);
        await handleAllSettled(Object.values(this.portlets).map(async (portlet) => {
            return portlet.refresh();
        }));
    }
    /**
     * 通过门户部件标识获取参数
     *
     * @author tony001
     * @date 2024-07-28 12:07:41
     * @param {string} id
     * @return {*}  {IParams}
     */
    getExtendParamsById(id) {
        const params = {
            condop: 'AND',
            condtype: 'GROUP',
            searchconds: [],
        };
        const result = {};
        if (this.customDashboard) {
            const targetPorlet = this.portlets[id];
            const portletFilterkeys = Object.keys(this.customDashboard.portletFilter);
            if (!targetPorlet) {
                // 未初始化完成
                if (portletFilterkeys && portletFilterkeys.length > 0) {
                    portletFilterkeys.forEach((key) => {
                        var _a, _b;
                        const filterParam = this.customDashboard.portletFilter[key];
                        const { config, searchconds } = filterParam;
                        const app = ibiz.hub.getApp(this.model.appId);
                        const targetFilter = (_a = app.model.appPortlets) === null || _a === void 0 ? void 0 : _a.find((portletModel) => {
                            return portletModel.id === key;
                        });
                        if (targetFilter && targetFilter.control) {
                            const targetFilterModel = targetFilter.control;
                            // 计算用户定义过滤参数
                            const searchCondCacheKey = generateCacheKy(this.context, this, targetFilterModel.id);
                            const cacheSearchConds = localStorage.getItem(searchCondCacheKey);
                            const userSearchConds = cacheSearchConds
                                ? JSON.parse(cacheSearchConds)
                                : searchconds;
                            // 聚合所有条件
                            const allSearchConds = getFilterSearchConds(userSearchConds, targetFilterModel.filterDEDQConditions);
                            if (config && allSearchConds) {
                                const model = getPortletModelByID(id, this.context, (_b = this.customDashboard) === null || _b === void 0 ? void 0 : _b.customModelData);
                                if (model) {
                                    const effectivePortlets = filterPortletByID(key, this.context, [model], this.model.dashboardStyle === 'BIREPORTDASHBOARD' ||
                                        this.model.dashboardStyle === 'BIREPORTDASHBOARD2');
                                    if (effectivePortlets &&
                                        effectivePortlets.find(item => {
                                            return item.id === id;
                                        })) {
                                        const effectivePortletIDs = filterPortletByConfig(config, [
                                            id,
                                        ]);
                                        if (effectivePortletIDs &&
                                            effectivePortletIDs.length === 1) {
                                            params.searchconds.push(allSearchConds);
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
            }
            else {
                // 初始化完成
                // 过滤器类型或者找不到不做处理
                if (targetPorlet.model.portletType === 'FILTER') {
                    return result;
                }
                const filterPortlets = Object.values(this.portlets).filter((portlet) => {
                    return portlet.model.portletType === 'FILTER';
                });
                if (filterPortlets.length > 0) {
                    filterPortlets.forEach((portlet) => {
                        const { filterConfig, model } = portlet;
                        const filterSearchConds = portlet.getSearchConds();
                        if (filterConfig && filterSearchConds) {
                            const models = Object.values(this.portlets).map(item => {
                                return item.model;
                            });
                            const effectivePortlets = filterPortletByID(model.id, this.context, models, this.model.dashboardStyle === 'BIREPORTDASHBOARD' ||
                                this.model.dashboardStyle === 'BIREPORTDASHBOARD2');
                            if (effectivePortlets &&
                                effectivePortlets.find(item => {
                                    return item.id === id;
                                })) {
                                const effectivePortletIDs = filterPortletByConfig(filterConfig, [id]);
                                if (effectivePortletIDs && effectivePortletIDs.length === 1) {
                                    params.searchconds.push(filterSearchConds);
                                }
                            }
                        }
                    });
                }
            }
        }
        if (params.searchconds && params.searchconds.length > 0) {
            result.params = [params];
        }
        return result;
    }
    /**
     * @description 获取门户部件
     * @template K
     * @param {K} type 门户部件类型
     * @param {string} id 门户部件标识
     * @returns {*}  {IApiPortletTypeMapping[K]}
     * @memberof IDashboardController
     */
    getPortlet(type, id) {
        return this.portlets[id];
    }
    /**
     * @description 转换各类多语言
     * @protected
     * @memberof IDashboardController
     */
    convertMultipleLanguages() {
        recursiveIterate(this.model, (item) => {
            var _a;
            if ((_a = item.titleLanguageRes) === null || _a === void 0 ? void 0 : _a.lanResTag) {
                item.title = ibiz.i18n.t(item.titleLanguageRes.lanResTag, item.title);
            }
        }, {
            childrenFields: ['controls'],
        });
    }
}
