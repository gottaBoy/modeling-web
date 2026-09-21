import { ConfigService, UtilService } from '../../../service';
export class MobCustomDashboardController {
    constructor(model, dashboard) {
        this.model = model;
        this.dashboard = dashboard;
        /**
         * @description 忽略的门户部件类型列表
         * @type {string[]}
         * @memberof MobCustomDashboardController
         */
        this.ignoreType = ['CONTAINER'];
        /**
         * @description 自定义定制范围类型（public：公开，personal：个人，data：数据，默认是按照个人区分，配置了应用功能组件才生效）
         * @type {('public' | 'personal' | 'data')}
         * @memberof MobCustomDashboardController
         */
        this.type = 'personal';
        /**
         * @description 所属数据类型（仅限自定义定制为data类型时生效，配置了应用功能组件才生效）
         * @type {string}
         * @memberof MobCustomDashboardController
         */
        this.ownerType = '';
        /**
         * @description 所属数据标识（仅限自定义定制为data类型时生效，配置了应用功能组件才生效）
         * @type {string}
         * @memberof MobCustomDashboardController
         */
        this.ownerId = '';
        /**
         * @description 多数据模式，启用时请求参数从上下文中获取srfdynadashboardid的值
         * @type {boolean}
         * @memberof MobCustomDashboardController
         */
        this.multiMode = false;
        this.context = dashboard.context;
        this.params = dashboard.params;
        this.init(dashboard.controlParams);
    }
    /**
     * @description 初始化
     * @private
     * @param {IData} controlParams
     * @memberof MobCustomDashboardController
     */
    init(controlParams) {
        var _a, _b;
        // 默认走个人
        this.type = 'personal';
        this.ownerId = this.context.srfpersonid;
        // 识别动态控件参数
        if (controlParams.type) {
            this.type = controlParams.type;
        }
        if (controlParams.owner_type) {
            this.ownerType = controlParams.owner_type;
        }
        if (controlParams.owner_id) {
            this.ownerId = this.context[controlParams.owner_id];
        }
        if (controlParams.multimode === 'true') {
            this.multiMode = true;
        }
        // 配置了应用功能组件则走应用功能组件服务存储，否则走rt的config存储
        if (this.model.appDynaDashboardUtilId) {
            const app = ibiz.hub.getApp(this.context.srfappid);
            this.util = new UtilService(app.getAppUtil(this.model.appDynaDashboardUtilId));
        }
        else {
            this.config = new ConfigService(this.model.appId, 'dynadashboard', `dashboard_${((_a = this.model.appDataEntityId) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || 'app'}_${(_b = this.model.codeName) === null || _b === void 0 ? void 0 : _b.toLowerCase()}`);
        }
    }
    /**
     * @description 获取资源标识（仅用于功能组件服务）
     * @private
     * @returns {*}  {string}
     * @memberof MobCustomDashboardController
     */
    getResourceTag() {
        var _a, _b;
        // 启用多数据模式，直接返回上下文中srfdynadashboardid作为路径参数
        if (this.multiMode) {
            return this.context.srfdynadashboardid;
        }
        const base = `${this.context.srfappid}_dashboard_${((_a = this.model.appDataEntityId) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || 'app'}_${(_b = this.model.codeName) === null || _b === void 0 ? void 0 : _b.toLowerCase()}`;
        switch (this.type) {
            case 'personal':
                return `${base}_${this.context.srfpersonid}`;
            case 'data':
                return `${base}_${this.ownerType}_${this.ownerId}`;
            default:
                return base;
        }
    }
    /**
     * @description 更新门户部件状态
     * @memberof MobCustomDashboardController
     */
    updatePortletState() {
        if (this.portlets) {
            const portlets = new Set(this.portlets);
            Object.entries(this.dashboard.portlets).forEach(([key, portlet]) => {
                if (this.ignoreType.includes(portlet.model.portletType)) {
                    return;
                }
                portlet.state.visible = portlets.has(key);
            });
        }
    }
    /**
     * @description 加载门户部件数据
     * @returns {*}  {Promise<void>}
     * @memberof MobCustomDashboardController
     */
    async load() {
        let res;
        if (this.util) {
            res = await this.util.load(this.getResourceTag(), this.context, this.params);
        }
        else if (this.config) {
            res = await this.config.load();
        }
        if (res && Array.isArray(res.portlets)) {
            this.portlets = res.portlets;
            this.updatePortletState();
        }
    }
    /**
     * @description 保存门户部件数据
     * @param {string[]} portlets
     * @returns {*}  {Promise<void>}
     * @memberof MobCustomDashboardController
     */
    async save(portlets) {
        const data = {
            portlets,
        };
        if (this.util) {
            const res = await this.util.save(this.getResourceTag(), this.context, Object.assign(Object.assign({}, this.params), { type: this.type, ownerType: this.ownerType, ownerId: this.ownerId, modelId: this.model.id }), data);
            if (res && res.ok) {
                this.portlets = portlets;
                this.updatePortletState();
            }
        }
        else if (this.config) {
            const res = await this.config.save(data);
            if (res) {
                this.portlets = portlets;
                this.updatePortletState();
            }
        }
    }
}
