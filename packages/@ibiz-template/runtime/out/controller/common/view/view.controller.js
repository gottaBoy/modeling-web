/* eslint-disable @typescript-eslint/no-explicit-any */
import { notNilEmpty } from 'qx-util';
import { HttpError, IBizContext, Namespace, RuntimeError, } from '@ibiz-template/core';
import { isEmpty, isNil, isNotNil } from 'ramda';
import { LoadingState } from '../../utils/loading/loading.state';
import { SysUIActionTag } from '../../../constant';
import { convertNavData, Modal } from '../../../utils';
import { CTX } from '../../ctx';
import { BaseController } from '../base.controller';
import { getControlProvider } from '../../../register';
import { CounterService } from '../../../service';
import { getControlsByView, getViewEngines, getViewLogics, } from '../../../model';
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
     * 设置操作状态
     *
     * @author tony001
     * @date 2025-01-17 17:01:13
     * @param {('DEFAULT' | 'MANUAL')} state
     */
    setOperateState(state) {
        this.operateState = state;
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
        // 预置模型合并。
        const _model = ibiz.util.layoutPanel.fill(model);
        super(_model, IBizContext.create({}, context), params || {}, new CTX(ctx));
        this.session = {};
        this.modal = new Modal({});
        this.providers = {};
        this.engines = [];
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
        // 如果视图有上层ctx，作为上层的子在上层注册自身
        if (ctx) {
            ctx.registerController(this.model.name, this);
        }
        this.ctx.init(this);
        this.initEngines();
        this.handleViewError = this.handleViewError.bind(this);
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
    }
    /**
     * 初始化计数器
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-07-10 14:53:53
     */
    async initCounters() {
        const viewLayoutPanel = this.model.viewLayoutPanel;
        const { appCounterRefs } = viewLayoutPanel;
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
        this.state.caption = this.model.caption;
        this.state.srfactiveviewdata = null;
        this.state.viewMessages = {};
        this.state.isClosing = false;
        this.state.hasError = false;
        this.state.isShortCut = false;
        this.state.presetClassList = [];
    }
    async onCreated() {
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
                this.evt.onAll((_eventName, event) => {
                    this.scheduler.triggerViewEvent(event);
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
    }
    /**
     * 处理上下文和导航参数相关的，如自定义导航参数的处理
     *
     * @author lxm
     * @date 2022-09-08 15:09:47
     * @protected
     */
    handleContextParams() {
        this.context.srfappid = this.model.appId || ibiz.env.appId;
        // 只要上下文中无 srfsessionid 则生成一个
        if (isNil(this.context.srfsessionid) ||
            isEmpty(this.context.srfsessionid)) {
            // 生成一个界面域，界面域标识为当前控制器实例的标识
            const domain = ibiz.uiDomainManager.create(this.id);
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
        const result = this.call(key, args);
        if (result === undefined) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.common.view.noSupportBehavior', {
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
    startLoading() {
        this.viewLoading.begin();
        this.state.isLoading = this.viewLoading.isLoading;
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
        if (this.model.capLanguageRes && this.model.capLanguageRes.lanResTag) {
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
                ibiz.confirm.warning({
                    title: ibiz.i18n.t('runtime.controller.common.view.forbiddenAccess'),
                    desc: ibiz.i18n.t('runtime.controller.common.view.logoutAccount'),
                    options: { showCancelButton: false },
                });
            }
            else {
                ibiz.message.error(data.message);
            }
        }
    }
}
