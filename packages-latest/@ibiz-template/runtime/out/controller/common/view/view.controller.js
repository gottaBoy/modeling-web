/* eslint-disable @typescript-eslint/no-explicit-any */
import { notNilEmpty } from 'qx-util';
import { HttpError, IBizContext, Namespace, } from '@ibiz-template/core';
import { isEmpty, isNil, isNotNil } from 'ramda';
import { LoadingState } from '../../utils/loading/loading.state';
import { SysUIActionTag } from '../../../constant';
import { convertNavData, Modal } from '../../../utils';
import { CTX } from '../../ctx';
import { BaseController } from '../base.controller';
import { getControlProvider } from '../../../register';
import { CounterService } from '../../../service';
import { getControlsByView, getCtrlEngines, getViewEngines, getViewLogics, } from '../../../model';
import { ViewMsgController } from '../../utils/view-msg';
/**
 * 视图控制器
 *
 * @author chitanda
 * @date 2022-07-21 15:07:51
 * @export
 * @class ViewController
 */
export class ViewController extends BaseController {
    get _evt() {
        return this.evt;
    }
    /**
     * 超时周期
     * - 默认300秒
     * @readonly
     * @type {number}
     * @memberof ViewController
     */
    get timeoutDuration() {
        return ibiz.config.view.timeoutDuration;
    }
    /**
     * 上层视图控制器
     * @author lxm
     * @date 2023-07-06 09:48:16
     * @readonly
     * @type {(IViewController | undefined)}
     */
    get parentView() {
        var _a;
        return (_a = this.ctx.parent) === null || _a === void 0 ? void 0 : _a.view;
    }
    /**
     * 当前是否为激活状态(缓存下的激活状态，一般与框架的生命周期相同)
     *
     * @author chitanda
     * @date 2023-12-13 11:12:48
     * @readonly
     * @type {boolean}
     */
    get isActive() {
        return this.state.activated;
    }
    /**
     * Creates an instance of ViewController.
     * @author lxm
     * @date 2023-04-20 02:05:33
     * @param {T} model 视图模型
     * @param {IContext} context 上下文
     * @param {IParams} [params] 视图参数
     * @param {CTX} [ctx]
     */
    constructor(model, context, params, ctx) {
        let parentData;
        if (params && params.parentData) {
            try {
                parentData = JSON.parse(params.parentData);
            }
            catch (err) {
                ibiz.log.error(err);
            }
            delete params.parentData;
        }
        // 预置模型合并。
        const _model = ibiz.util.layoutPanel.fill(model);
        super(_model, IBizContext.create({}, context), params || {}, new CTX(ctx));
        this.session = {};
        this.modal = new Modal({});
        this.providers = {};
        this.engines = [];
        // 部件引擎
        this.ctrlEngines = [];
        this.error = {};
        this.slotProps = {};
        this.counters = {};
        /**
         * 视图loading状态控制器
         *
         * @author lxm
         * @date 2022-09-19 14:09:12
         */
        this.viewLoading = new LoadingState();
        /**
         * 视图是否已经关闭
         *
         * @author chitanda
         * @date 2023-07-12 22:07:52
         * @protected
         * @type {boolean}
         */
        this.isCloseView = false;
        /**
         * 操作状态
         *
         * @author tony001
         * @date 2025-01-17 17:01:14
         * @protected
         * @type {('DEFAULT' | 'MANUAL')}
         */
        this.operateState = 'DEFAULT';
        /**
         * 定时器开始时间
         *
         * @protected
         * @type {number}
         * @memberof ViewController
         */
        this.startTime = Date.now();
        /**
         * 用户上次活动时间
         *
         * @protected
         * @type {number}
         * @memberof ViewController
         */
        this.lastActivityTime = Date.now();
        /**
         * @description 是否存在403错误未处理
         * @protected
         * @type {boolean}
         * @memberof ViewController
         */
        this.hasPermErrPending = false;
        if (parentData) {
            this.parentData = parentData;
        }
        // 如果视图有上层ctx，作为上层的子在上层注册自身
        if (ctx) {
            ctx.registerController(this.model.name, this);
        }
        this.ctx.init(this);
        this.initEngines();
        this.handleViewError = this.handleViewError.bind(this);
        // 添加至视图控制器缓存中心
        if (this.model.codeName) {
            ibiz.appUtil.viewCacheCenter.set(this.model.codeName.toLowerCase(), this);
        }
    }
    /**
     * 设置操作状态
     *
     * @author tony001
     * @date 2025-01-17 17:01:13
     * @param {('DEFAULT' | 'MANUAL')} state
     */
    setOperateState(state) {
        this.operateState = state;
        this.lastActivityTime = Date.now();
        // 超时时用户活动则更新用户访问状态
        if (this.lastActivityTime - this.startTime > this.timeoutDuration)
            this.updateAccessState();
    }
    /**
     * 更新用户访问状态
     *
     * @memberof ViewController
     */
    async updateAccessState() {
        // 清除定时器
        clearInterval(this.intervalTimer);
        // 发送更新通知
        await this._evt.emit('onUpdateAccessState', undefined);
    }
    /**
     * 初始化定时器监听用户活动
     *
     * @memberof ViewController
     */
    initTimeoutTimer() {
        // 计时
        let time = 0;
        this.startTime = Date.now();
        this.intervalTimer = setInterval(() => {
            time += 1000;
            if (this.lastActivityTime) {
                const lastActivity = this.lastActivityTime - this.startTime;
                // 如果临界时间用户活动则更新用户访问状态(临界时间60秒)
                if (lastActivity >= this.timeoutDuration - 60 * 1000 &&
                    lastActivity <= this.timeoutDuration) {
                    this.updateAccessState();
                }
            }
            // 超时清除定时器
            if (time > this.timeoutDuration)
                clearInterval(this.intervalTimer);
        }, 1000);
    }
    /**
     * 视图重新激活
     *
     * @author chitanda
     * @date 2023-07-12 17:07:55
     */
    onActivated() {
        this.state.activated = true;
        this._evt.emit('onActivated', undefined);
        ibiz.log.debug(ibiz.i18n.t('runtime.controller.common.view.viewActivation', {
            name: this.model.name,
            id: this.model.id,
        }));
    }
    /**
     * 视图暂时停用
     *
     * @author chitanda
     * @date 2023-07-12 17:07:06
     */
    onDeactivated() {
        this._evt.emit('onDeactivated', undefined);
        this.state.activated = false;
        ibiz.log.debug(ibiz.i18n.t('runtime.controller.common.view.viewPause', {
            name: this.model.name,
            id: this.model.id,
        }));
    }
    /**
     * 初始化引擎
     * @author lxm
     * @date 2023-05-23 06:43:53
     * @protected
     */
    initEngines() {
        // 初始化引擎,没有引擎的默认尝试拿一个视图类型的预置引擎
        const engineModels = getViewEngines(this.model);
        if (engineModels.length) {
            engineModels.forEach(engine => {
                const ins = ibiz.engine.getEngine(engine, this);
                if (ins) {
                    this.engines.push(ins);
                }
                else {
                    ibiz.log.warn(ibiz.i18n.t('runtime.controller.common.view.noFoundViewEngine'), engine);
                }
            });
        }
        else {
            const ins = ibiz.engine.getEngine({
                engineCat: 'VIEW',
                engineType: this.model.viewType,
                appId: this.model.appId,
            }, this);
            if (ins) {
                this.engines.push(ins);
            }
        }
        // 初始化部件引擎
        const ctrlEngines = getCtrlEngines(this.model);
        if (ctrlEngines.length) {
            ctrlEngines.forEach(engine => {
                const ins = ibiz.engine.getCtrlEngine(engine, this);
                if (ins) {
                    this.ctrlEngines.push(ins);
                }
            });
        }
    }
    /**
     * 初始化计数器
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-07-10 14:53:53
     */
    async initCounters() {
        const viewLayoutPanel = this.model.viewLayoutPanel;
        let { appCounterRefs } = viewLayoutPanel;
        // 无预置界面布局未做参数转化
        if (!appCounterRefs) {
            appCounterRefs = this.model.appCounterRefs;
        }
        if (appCounterRefs && appCounterRefs.length > 0) {
            try {
                await Promise.all(appCounterRefs.map(async (counterRef) => {
                    const counter = await CounterService.getCounterByRef(counterRef, this.context, Object.assign({}, this.params));
                    this.counters[counterRef.id] = counter;
                }));
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    initState() {
        super.initState();
        this.state.activated = true;
        this.state.isLoading = false;
        this.state.loadingText = '';
        this.state.caption = this.model.caption;
        this.state.srfactiveviewdata = null;
        this.state.viewMessages = {};
        this.state.isClosing = false;
        this.state.hasError = false;
        this.state.isShortCut = false;
        this.state.presetClassList = [];
    }
    async onCreated() {
        var _a;
        // 新增识别srfloadingtext视图动态参数，用于指定视图加载时的提示文本，优先级高于全局配置
        const { appViewParams } = this.model;
        const LoaddingTextValue = (_a = appViewParams === null || appViewParams === void 0 ? void 0 : appViewParams.find(item => item.id.toLowerCase() === 'srfloadingtext')) === null || _a === void 0 ? void 0 : _a.value;
        this.state.loadingText = LoaddingTextValue
            ? ibiz.appUtil.resolveI18nText(LoaddingTextValue)
            : ibiz.config.view.loadingText;
        this.state.isLoading = true;
        await super.onCreated();
        // 给modal的关闭前回调注入视图关闭事件
        this.modal.hooks.beforeDismiss.tapPromise(async (modalData) => {
            // 如果视图设置了关闭状态，根据关闭状态返回
            if (isNotNil(this.state.closeOK)) {
                modalData.ok = this.state.closeOK;
            }
            await this._evt.emit('onCloseView', Object.assign({}, modalData));
        });
        // 抛出初始的视图信息
        this._evt.emit('onViewInfoChange', {
            caption: this.model.caption,
            title: this.model.title,
        });
        // 处理上下文和导航参数
        this.handleContextParams();
        // 初始化视图布局面板适配器
        const viewLayoutPanel = this.model.viewLayoutPanel;
        this.childNames.push(viewLayoutPanel.name);
        const provider = await getControlProvider(viewLayoutPanel);
        this.providers[viewLayoutPanel.name] = provider;
        // 初始化部件的适配器
        const controls = getControlsByView(this.model);
        if (controls) {
            await Promise.all(controls.map(async (ctrl) => {
                const ctrlProvider = await getControlProvider(ctrl);
                this.providers[ctrl.name || ctrl.id] = ctrlProvider;
            }));
        }
        // 初始化计时器服务
        await this.initCounters();
        // 初始化视图逻辑调度器
        const appViewLogics = getViewLogics(this.model);
        if (appViewLogics.length) {
            this.scheduler = ibiz.scheduler.createViewScheduler(appViewLogics);
            this.scheduler.defaultParamsCb = () => {
                return this.getEventArgs();
            };
            if (this.scheduler.hasViewEventTrigger) {
                // 监听视图事件触发视图事件触发器
                this.evt.onAll(async (_eventName, event) => {
                    await this.scheduler.triggerViewEvent(event);
                });
            }
        }
        // 监听预置class变更事件
        this._evt.on('onPresetClassChange', (args) => {
            const { data } = args;
            if (data && Array.isArray(data)) {
                this.state.presetClassList.push(...data);
            }
        });
        // 初始化视图消息
        this.initViewMsg();
        // 执行部件引擎的onCreated
        if (this.ctrlEngines.length) {
            await Promise.all(this.ctrlEngines.map(engine => engine.onCreated()));
        }
        // 执行视图引擎的doCreated
        if (this.engines.length) {
            await Promise.all(this.engines.map(engine => engine.onCreated()));
        }
        // 监听视图错误信息
        ibiz.mc.error.on(this.handleViewError);
        this.state.isLoading = false;
    }
    async onMounted() {
        var _a;
        await super.onMounted();
        // 执行部件引擎的onMounted
        if (this.ctrlEngines.length) {
            await Promise.all(this.ctrlEngines.map(engine => engine.onMounted()));
        }
        // 执行视图引擎的doMounted
        if (this.engines.length) {
            await Promise.all(this.engines.map(engine => engine.onMounted()));
        }
        // 启动定时器触发
        (_a = this.scheduler) === null || _a === void 0 ? void 0 : _a.startTimerTrigger();
        // 初始化是否最小化
        await this.initShortCut();
    }
    /**
     * 初始化最小化状态
     *
     * @protected
     * @memberof ViewController
     */
    async initShortCut() {
        const { model, context } = this;
        const key = await ibiz.util.shortCut.calcShortCutKey({
            context,
            appViewId: model.id,
        });
        this.state.isShortCut = ibiz.util.shortCut.isExist(key);
    }
    async onDestroyed() {
        const srfSessionId = this.context.srfsessionid;
        await super.onDestroyed();
        // 执行部件引擎的onDestroyed
        if (this.ctrlEngines.length) {
            await Promise.all(this.ctrlEngines.map(engine => engine.onDestroyed()));
        }
        // 执行视图引擎的doDestroyed
        if (this.engines.length) {
            await Promise.all(this.engines.map(engine => engine.onDestroyed()));
        }
        // 销毁视图计数器
        Object.values(this.counters).forEach(counter => counter.destroy());
        this.ctx.destroy();
        this.engines = [];
        if (this.scheduler) {
            this.scheduler.destroy();
        }
        // 销毁界面域，谁创建谁销毁
        if (this.id === srfSessionId) {
            ibiz.uiDomainManager.destroy(srfSessionId);
        }
        this.context.destroy();
        ibiz.log.debug(ibiz.i18n.t('runtime.controller.common.view.viewDestroy', {
            name: this.model.name,
            id: this.model.id,
        }));
        // 销毁视图错误监听
        ibiz.mc.error.off(this.handleViewError);
        // 删除触发源
        ibiz.util.record.removeTriggerLogic(this.id);
        // 从视图控制器缓存中心删除
        if (this.model.codeName) {
            ibiz.appUtil.viewCacheCenter.delete(this.model.codeName.toLowerCase());
        }
    }
    /**
     * 处理上下文和导航参数相关的，如自定义导航参数的处理
     *
     * @author lxm
     * @date 2022-09-08 15:09:47
     * @protected
     */
    handleContextParams() {
        var _a;
        this.context.srfappid = this.model.appId || ibiz.env.appId;
        // 新增识别srfrenewsession视图动态参数，值为true时，强制重新构建界面域
        const { appViewParams } = this.model;
        const renewSessionValue = (_a = appViewParams === null || appViewParams === void 0 ? void 0 : appViewParams.find(item => item.id.toLowerCase() === 'srfrenewsession')) === null || _a === void 0 ? void 0 : _a.value;
        // 只要上下文中无 srfsessionid 则生成一个
        if (isNil(this.context.srfsessionid) ||
            isEmpty(this.context.srfsessionid) ||
            renewSessionValue === 'true') {
            // 生成一个界面域，界面域标识为当前控制器实例的标识
            const domain = ibiz.uiDomainManager.create(this.id, this.model.appDataEntityId);
            this.context.srfsessionid = domain.id;
        }
        // 视图标识添加到上下文中
        this.context.srfviewid = this.id;
        // 处理自定义导航上下文
        const navContexts = this.model.appViewNavContexts;
        let context = {};
        if (notNilEmpty(navContexts)) {
            context = convertNavData(navContexts, this.params, this.context);
        }
        Object.assign(this.context, context);
        // 预置视图srfreadonly字段
        if (!Object.prototype.hasOwnProperty.call(this.context, 'srfreadonly')) {
            Object.assign(this.context, { srfreadonly: false });
        }
        else if (typeof this.context.srfreadonly === 'string') {
            this.context.srfreadonly = this.context.srfreadonly === 'true';
        }
        // 处理自定义视图参数
        const navParams = this.model.appViewNavParams;
        let params = {};
        if (notNilEmpty(navParams)) {
            params = convertNavData(navParams, this.params, this.context);
        }
        Object.assign(this.params, params);
        this.engines.forEach(engine => {
            engine.handleContextParams();
        });
        if (this.state.isMounted) {
            // 视图已经加载过了，算完后触发刷新
            this.callUIAction(SysUIActionTag.REFRESH);
        }
    }
    async call(key, args) {
        let result;
        for (const engine of this.engines) {
            // eslint-disable-next-line no-await-in-loop
            result = await engine.call(key, args);
            if (result !== undefined) {
                break;
            }
        }
        return result;
    }
    async callUIAction(key, args) {
        const result = await this.call(key, args);
        if (result === undefined) {
            ibiz.log.warn(ibiz.i18n.t('runtime.controller.common.view.noSupportBehavior', {
                key,
            }));
        }
        return result;
    }
    async closeView(modalData = { ok: false, data: [] }) {
        await this.modal.dismiss(modalData);
    }
    redrawView(redrawData) {
        this._evt.emit('onRedrawView', { redrawData });
    }
    startLoading(loadingText) {
        var _a;
        this.viewLoading.begin();
        this.state.isLoading = this.viewLoading.isLoading;
        if (isNotNil(loadingText)) {
            this.state.loadingText = loadingText;
        }
        else {
            const { appViewParams } = this.model;
            const LoaddingTextValue = (_a = appViewParams === null || appViewParams === void 0 ? void 0 : appViewParams.find(item => item.id.toLowerCase() === 'srfloadingtext')) === null || _a === void 0 ? void 0 : _a.value;
            this.state.loadingText = LoaddingTextValue
                ? ibiz.appUtil.resolveI18nText(LoaddingTextValue)
                : ibiz.config.view.loadingText;
        }
    }
    endLoading() {
        this.viewLoading.end();
        this.state.isLoading = this.viewLoading.isLoading;
    }
    /**
     * 设置布局面板控制器
     * @author lxm
     * @date 2023-08-01 03:28:04
     * @param {IViewLayoutPanelController} panel
     */
    setLayoutPanel(panel) {
        var _a;
        this.layoutPanel = panel;
        if (this.layoutPanel.state.isMounted) {
            this.mountCounter.attend(this.layoutPanel.model.name);
        }
        else {
            this.layoutPanel.evt.on('onMounted', () => {
                this.mountCounter.attend(this.layoutPanel.model.name);
            });
        }
        if ((_a = this.scheduler) === null || _a === void 0 ? void 0 : _a.hasControlEventTrigger) {
            // 监听部件事件触发部件事件触发器
            panel.evt.on('onControlEvent', event => {
                this.scheduler.triggerControlEvent(event.triggerControlName, event.triggerEventName, event.triggerEvent);
            });
        }
    }
    /**
     * 初始化视图消息
     * @author lxm
     * @date 2023-09-20 09:19:20
     */
    async initViewMsg() {
        const { appViewMsgGroupId, codeName } = this.model;
        if (appViewMsgGroupId) {
            this.state.viewMessages = { TOP: [], BOTTOM: [], BODY: [], POPUP: [] };
            this.viewMsgController = new ViewMsgController(appViewMsgGroupId, `${codeName}_${this.modal.mode}`);
            await this.viewMsgController.init(this.context);
            const messages = await this.viewMsgController.calcViewMessages(this.context, this.params);
            messages.forEach(message => {
                if (['TOP', 'BOTTOM', 'BODY', 'POPUP'].includes(message.position)) {
                    this.state.viewMessages[message.position].push(message);
                }
            });
            if (this.state.viewMessages.POPUP.length) {
                this.alertViewMessage(this.state.viewMessages.POPUP);
            }
        }
    }
    /**
     * 弹出视图消息,一个接一个弹
     * @author lxm
     * @date 2023-09-20 10:17:42
     * @param {ViewMessage[]} messages
     * @return {*}  {Promise<void>}
     */
    async alertViewMessage(messages) {
        var _a, _b;
        const [message, ...rest] = messages;
        const modalParams = {
            title: message.title,
            desc: message.message,
            options: {
                showClose: message.removeMode !== 0,
                showConfirmButton: message.removeMode !== 0,
                customClass: ((_a = message.sysCss) === null || _a === void 0 ? void 0 : _a.cssName) || '',
            },
        };
        if (message.layoutPanel && modalParams.options) {
            const alertClass = new Namespace('view-message').m('alert');
            modalParams.options.customClass = `${modalParams.options.customClass || ''} ${alertClass}`;
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            modalParams.options.message = () => {
                return ibiz.render.renderCtrlShell(message.layoutPanel, this.context, this.params, { data: message.data });
            };
        }
        // userTag为确认按钮文本
        if (message.extraParams.userTag) {
            Object.assign(modalParams, {
                confirmButtonText: message.extraParams.userTag,
            });
        }
        try {
            if (message.messageType === 'WARN') {
                await ibiz.modal.warning(modalParams);
            }
            else if (message.messageType === 'ERROR') {
                await ibiz.modal.error(modalParams);
            }
            else {
                await ibiz.modal.info(modalParams);
            }
        }
        finally {
            (_b = this.viewMsgController) === null || _b === void 0 ? void 0 : _b.setMsgRemoveModeStorage(message);
        }
        if (rest.length) {
            this.alertViewMessage(rest);
        }
    }
    /**
     * 转换各类多语言
     *
     * @date 2023-05-18 02:57:00
     * @protected
     */
    convertMultipleLanguages() {
        var _a;
        if ((_a = this.model.capLanguageRes) === null || _a === void 0 ? void 0 : _a.lanResTag) {
            this.model.caption = ibiz.i18n.t(this.model.capLanguageRes.lanResTag, this.model.caption);
        }
    }
    /**
     * 处理视图错误
     *
     * @author tony001
     * @date 2024-04-28 12:04:27
     * @protected
     * @param {IPortalMessage} msg
     */
    handleViewError(msg) {
        const { type, data } = msg;
        if (type === 'ERROR' && data instanceof HttpError && data.tag === this.id) {
            if (this.operateState === 'DEFAULT') {
                this.error = data;
                this.state.hasError = true;
            }
            else if (data.status && data.status === 403) {
                // 存在403错误用户未确认，再次触发403错误时不做处理
                if (this.hasPermErrPending) {
                    return;
                }
                this.hasPermErrPending = true;
                ibiz.confirm
                    .warning({
                    title: ibiz.i18n.t('runtime.controller.common.view.forbiddenAccess'),
                    desc: ibiz.i18n.t('runtime.controller.common.view.logoutAccount'),
                    options: { showCancelButton: false },
                })
                    .then(_result => {
                    this.hasPermErrPending = false;
                });
            }
            else {
                ibiz.message.error(data.message);
            }
        }
    }
    /**
     * @description 获取当前实例
     * @template K
     * @param {K} _type 视图类型
     * @returns {*}  {IApiViewMapping[K]}
     * @memberof ViewController
     */
    getCurrentInstance(_type) {
        return this;
    }
    /**
     * @description 获取部件
     * @template K
     * @param {K} _type 部件类型
     * @param {string} name 部件名称
     * @param {boolean} [traceRoot] 是否跨越视图作用域，一路向根上找
     * @returns {*}  {IApiControlMapping[K]}
     * @memberof ViewController
     */
    getCtrl(_type, name, traceRoot) {
        return this.getController(name, traceRoot);
    }
}
