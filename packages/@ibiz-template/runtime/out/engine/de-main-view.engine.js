import { ViewMode } from '../constant';
import { calcDeCodeNameById } from '../model';
import { ViewEngineBase } from './view-base.engine';
/**
 * 实体主数据视图引擎
 *
 * @export
 * @class DEMainViewEngine
 * @extends {ViewEngineBase}
 */
export class DEMainViewEngine extends ViewEngineBase {
    constructor() {
        super(...arguments);
        /**
         * 标记数据行为类型
         *
         * @protected
         * @type {MarkOpenDataActionType[]}
         * @memberof DEMainViewEngine
         */
        this.doActions = [];
        /**
         * 标记模式
         *
         * @protected
         * @type {string[]}
         * @memberof DEMainViewEngine
         */
        this.markModes = [];
        /**
         * 是否打开刷新提示消息框
         *
         * @protected
         * @type {boolean}
         * @memberof DEMainViewEngine
         */
        this.hasOpenConfirm = false;
        /**
         * 是否已监听数据标记行为
         *
         * @protected
         * @type {boolean}
         * @memberof DEMainViewEngine
         */
        this.hasSubscribe = false;
    }
    /**
     * 协同消息占位
     *
     * @readonly
     * @type {(IPanelItemCoopPosController | undefined)}
     * @memberof DEMainViewEngine
     */
    get coopPos() {
        var _a;
        return (_a = this.view.layoutPanel) === null || _a === void 0 ? void 0 : _a.panelItems.coop_pos;
    }
    /**
     * 视图created生命周期执行逻辑
     *
     * @return {*}  {Promise<void>}
     * @memberof DEMainViewEngine
     */
    async onCreated() {
        await super.onCreated();
        this.markOpenDataCallback = this.markOpenDataCallback.bind(this);
        if (this.view.model.appDataEntityId) {
            this.deName = calcDeCodeNameById(this.view.model.appDataEntityId);
        }
    }
    /**
     * 视图mounted生命周期执行逻辑
     *
     * @return {*}  {Promise<void>}
     * @memberof DEMainViewEngine
     */
    async onMounted() {
        await super.onMounted();
        this.initMarkOpenData();
    }
    /**
     * 刷新确认
     *
     * @protected
     * @return {*}  {Promise<boolean>}
     * @memberof DEMainViewEngine
     */
    async reloadConfirm() {
        const result = await ibiz.confirm.info({
            title: ibiz.i18n.t('viewEngine.refreshPrompt'),
            desc: ibiz.i18n.t('viewEngine.refreshPagePrompt'),
        });
        return result;
    }
    /**
     * 刷新
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof DEMainViewEngine
     */
    async refresh() { }
    /**
     * 标记打开数据模式回调
     *
     * @protected
     * @param {IMarkOpenData} data
     * @param {string} dataInfo
     * @return {*}  {Promise<void>}
     * @memberof DEMainViewEngine
     */
    async markOpenDataCallback(data, dataInfo) {
        // 非激活不触发提示
        if (!this.view.state.activated) {
            return;
        }
        let actionMsg = '';
        switch (data.action) {
            case 'VIEW':
                actionMsg = ibiz.i18n.t('viewEngine.browseMsg');
                break;
            case 'EDIT':
                actionMsg = ibiz.i18n.t('viewEngine.editMsg');
                break;
            case 'UPDATE':
                actionMsg = ibiz.i18n.t('viewEngine.updateMsg');
                break;
            default:
                break;
        }
        const message = `${data.username} ${actionMsg} ${this.view.state.caption}${dataInfo ? '-' + dataInfo : ''}`;
        if (this.coopPos) {
            this.coopPos.updateMessage({
                title: message,
                data,
            });
        }
        else {
            ibiz.message.notice({
                message,
                showClose: true,
                duration: 3,
                styleType: 'alert',
            });
        }
        if (this.hasOpenConfirm === false &&
            data.action === 'UPDATE' &&
            this.markModes.includes('NOTICERELOAD')) {
            this.hasOpenConfirm = true;
            const isReload = await this.reloadConfirm();
            if (isReload) {
                this.refresh();
            }
            this.hasOpenConfirm = false;
        }
    }
    /**
     * 初始化标记打开数据相关逻辑
     *
     * @protected
     * @return {*}  {void}
     * @memberof DEMainViewEngine
     */
    initMarkOpenData() {
        var _a;
        // 非路由的视图不需要触发（防止多个界面同时操作一条数据，消息重复）
        const markOpenDataMode = this.view.model.markOpenDataMode;
        if (![ViewMode.ROUTE, ViewMode.ROUTE_MODAL].includes(this.view.modal.mode) ||
            !markOpenDataMode) {
            return;
        }
        this.markModes = markOpenDataMode.split(';');
        // 初始化协同消息占位消息模式
        (_a = this.coopPos) === null || _a === void 0 ? void 0 : _a.initMessageModes(this.markModes);
        this.doActions = [];
        // OPENDATA：登记打开数据、 EDITDATA：登记更新数据、 DISPLAYOPPERSON：显示操作人员、 NOTICERELOAD：提示刷新数据
        if (this.markModes.includes('EDITDATA') ||
            this.markModes.includes('DISPLAYOPPERSON') ||
            this.markModes.includes('NOTICERELOAD')) {
            this.doActions.push('EDIT', 'VIEW', 'UPDATE', 'CLOSE');
        }
        else if (this.markModes.includes('OPENDATA')) {
            this.doActions.push('VIEW', 'CLOSE');
        }
        if (this.doActions.length !== 0) {
            this.doMarkDataAction();
        }
    }
    /**
     * 发送标记数据行为
     *
     * @protected
     * @param {string} key
     * @memberof DEMainViewEngine
     */
    async sendMarkDataAction(action, key) {
        var _a;
        let markKey = `${(_a = this.view.model.codeName) === null || _a === void 0 ? void 0 : _a.toLowerCase()}@${key}`;
        // 视图上配置了srfmarkopendatakey，则以其为准
        if (this.view.params.srfmarkopendatakey) {
            markKey = this.view.params.srfmarkopendatakey;
        }
        return ibiz.markOpenData.action(this.deName, markKey, action);
    }
    /**
     * 监听标记数据行为
     * - 只存在一个监听
     * @protected
     * @param {string} key
     * @param {MarkOpenDataCallbackFun} callback
     * @return {*}  {Promise<void>}
     * @memberof DEMainViewEngine
     */
    async subscribeMarkDataAction(key, callback) {
        var _a;
        // 只存在一个监听
        if (!this.hasSubscribe) {
            let markKey = `${(_a = this.view.model.codeName) === null || _a === void 0 ? void 0 : _a.toLowerCase()}@${key}`;
            // 视图上配置了srfmarkopendatakey，则以其为准
            if (this.view.params.srfmarkopendatakey) {
                markKey = this.view.params.srfmarkopendatakey;
            }
            ibiz.markOpenData.subscribe(this.deName, markKey, callback);
            this.view.evt.on('onDestroyed', () => {
                ibiz.markOpenData.unsubscribe(this.deName, markKey, callback);
            });
            this.hasSubscribe = true;
        }
    }
    /**
     * 执行标记数据行为
     * - 子类实现
     * @protected
     * @memberof DEMainViewEngine
     */
    doMarkDataAction() { }
}
