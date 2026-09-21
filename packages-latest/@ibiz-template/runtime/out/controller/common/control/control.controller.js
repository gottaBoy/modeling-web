import { HttpError, StringUtil, IBizParams, IBizContext, NoticeError, RuntimeError, } from '@ibiz-template/core';
import { clone, isNil, isNotNil } from 'ramda';
import { notNilEmpty } from 'qx-util';
import { BaseController } from '..';
import { getControlProvider } from '../../../register';
import { convertNavData, ScriptFactory } from '../../../utils';
import { calcDeCodeNameById, getControlPanel } from '../../../model';
import { ControlVO } from '../../../service';
/**
 * 部件控制器
 *
 * @author chitanda
 * @date 2022-07-21 15:07:08
 * @export
 * @class ControlController
 */
export class ControlController extends BaseController {
    get _evt() {
        return this.evt;
    }
    get view() {
        return this.ctx.view;
    }
    // 部件标识
    get ctrlId() {
        return `${this.view.model.id}@${this.model.id}`;
    }
    /**
     * Creates an instance of ControlController.
     *
     * @author chitanda
     * @date 2022-07-24 17:07:58
     * @param {T} model
     * @param {IContext} context
     * @param {IParams} [params={}]
     */
    constructor(model, context, params, ctx) {
        super(model, IBizContext.create({}, context), new IBizParams({}, params), ctx);
        /**
         * 部件参数
         *
         * @author zk
         * @date 2023-09-26 03:09:21
         * @type {IData}
         * @memberof ControlController
         */
        this.controlParams = {};
        /**
         * 子适配器
         * @author lxm
         * @date 2023-07-19 04:14:50
         * @type {{ [key: string]: IProvider }}
         */
        this.providers = {};
        /**
         * 触发源key
         *
         * @author tony001
         * @date 2024-03-28 17:03:03
         * @type {string}
         */
        this.triggerKey = '';
        /**
         * 等到激活的回调函数集合
         *
         * @author tony001
         * @date 2024-03-28 17:03:15
         */
        this.awaitActiveCbs = new Map();
        /**
         * 延迟执行（防抖用）
         *
         * @author tony001
         * @date 2024-03-28 17:03:27
         */
        this.delayCbs = new Map();
        /**
         * 运行模式
         *
         * @type {('DESIGN' | 'RUNTIME')} （设计模式 | 运行时）
         * @memberof ControlController
         */
        this.runMode = 'RUNTIME';
        this.registerToCtx();
        this.runMode = context.srfrunmode || 'RUNTIME';
        // 初始化部件的布局面板
        this.controlPanel = getControlPanel(model);
        if (!this.controlPanel) {
            const panelModel = ibiz.util.layoutPanel.get(`${model.controlType}_DEFAULT`);
            if (panelModel) {
                this.controlPanel = clone(panelModel);
            }
        }
        this.updateContextParams({});
        // 处理部件控件参数时机
        this.handleControlParams();
    }
    /**
     * 往ctx里注册控制器
     * @author lxm
     * @date 2023-07-31 08:37:17
     * @protected
     */
    registerToCtx() {
        this.ctx.registerController(this.model.name || this.model.id, this);
    }
    /**
     * 获取部件通用的事件参数
     * @author lxm
     * @date 2023-03-26 11:42:21
     * @readonly
     */
    getEventArgs() {
        const result = super.getEventArgs();
        return Object.assign(Object.assign({}, result), { data: this.getData() || [], ctrl: this });
    }
    /**
     * @description 获取是否静默参数的值
     * @param {IParams} [args]
     * @returns {*}  {boolean}
     * @memberof ControlController
     */
    getSilent(args) {
        return ((args === null || args === void 0 ? void 0 : args.silent) ||
            this.context.srfsilent === true ||
            this.context.srfsilent === 'true');
    }
    initState() {
        super.initState();
        this.state.activated = true;
        this.state.isLoading = false;
        this.state.loadingText = '';
        this.state.disabled = false;
        this.state.maskOption = { mode: 'BLANK' };
        this.state.zIndex = undefined;
        this.state.isCounterDisabled = false;
    }
    async onCreated() {
        var _a;
        await super.onCreated();
        // 填充部件加载提示文本
        if (isNotNil(ibiz.config.view.loadingText)) {
            this.state.loadingText = ibiz.config.view.loadingText;
        }
        // 部件布局面板
        if (this.controlPanel) {
            this.childNames.push(this.controlPanel.name);
            const provider = await getControlProvider(this.controlPanel);
            this.providers[this.controlPanel.name] = provider;
        }
        // 部件逻辑初始化
        this.initControlScheduler(this.model.controlLogics);
        // 监听部件所有事件触发部件逻辑
        if ((_a = this.scheduler) === null || _a === void 0 ? void 0 : _a.hasControlEventTrigger) {
            this._evt.onAll((eventName, event) => {
                this.scheduler.triggerControlEvent(event.targetName, event.eventName, event);
            });
        }
        // 初始化triggerKey
        if (this.model.appDataEntityId) {
            const codeName = calcDeCodeNameById(this.model.appDataEntityId);
            this.triggerKey = `${this.view.name}@${codeName}@${this.model.controlType}@${this.model.codeName}`;
        }
        // 监听实体数据变更
        if (this.controlParams.ignoremcmsg !== 'true') {
            this.onDEDataChange = this.onDEDataChange.bind(this);
            ibiz.mc.command.change.on(this.onDEDataChange);
        }
    }
    async onMounted() {
        var _a;
        await super.onMounted();
        // 启动定时器触发
        (_a = this.scheduler) === null || _a === void 0 ? void 0 : _a.startTimerTrigger();
    }
    async onDestroyed() {
        if (this.controlParams.ignoremcmsg !== 'true') {
            ibiz.mc.command.change.off(this.onDEDataChange);
        }
        await super.onDestroyed();
        if (this.scheduler) {
            this.scheduler.destroy();
        }
        this.params.destroy();
    }
    /**
     * 处理上下文和导航参数相关的，如自定义导航参数的处理
     *
     * @author lxm
     * @date 2022-09-08 15:09:47
     * @protected
     */
    updateContextParams(opts) {
        // 不改变引用的情况下，重置控制器里的上下文和视图参数。
        if (opts.context) {
            this.context.reset({}, opts.context);
        }
        if (opts.params) {
            this.params.reset({}, opts.params);
        }
        const { controlNavContexts, controlNavParams } = this.model;
        // 处理自定义导航上下文
        let context = {};
        if (notNilEmpty(controlNavContexts)) {
            context = convertNavData(controlNavContexts, this.params, this.context);
        }
        Object.assign(this.context, context);
        // 处理自定义视图参数
        let params = {};
        if (notNilEmpty(controlNavParams)) {
            params = convertNavData(controlNavParams, this.params, this.context);
        }
        Object.assign(this.params, params);
    }
    /**
     * 获取部件类型
     * @author lxm
     * @date 2023-03-28 02:23:37
     * @return {*}  {string}
     */
    getControlType() {
        return this.model.controlType;
    }
    /**
     * 获取部件数据，非数据部件没有数据
     * @author lxm
     * @date 2023-03-26 11:41:51
     * @return {*}  {(IData[] | null)}
     */
    getData() {
        return null;
    }
    /**
     * 开始加载
     *
     * @author chitanda
     * @date 2022-09-21 15:09:18
     * @return {*}  {Promise<void>}
     */
    async startLoading(loadingText) {
        this.state.isLoading = true;
        if (isNotNil(loadingText)) {
            this.state.loadingText = ibiz.appUtil.resolveI18nText(loadingText);
        }
        else if (isNotNil(ibiz.config.view.loadingText)) {
            this.state.loadingText = ibiz.config.view.loadingText;
        }
        else {
            this.state.loadingText = '';
        }
        this.ctx.startLoading(this.state.loadingText);
    }
    /**
     * 加载完毕
     *
     * @author chitanda
     * @date 2022-09-21 15:09:31
     * @return {*}  {Promise<void>}
     */
    async endLoading() {
        this.state.isLoading = false;
        this.ctx.endLoading();
    }
    /**
     * 部件重新激活
     *
     * @author chitanda
     * @date 2023-07-12 17:07:55
     */
    onActivated() {
        this._evt.emit('onActivated', undefined);
        this.state.activated = true;
        // 执行等待激活执行的回调集合，执行完后清空
        if (this.awaitActiveCbs.size > 0) {
            this.awaitActiveCbs.forEach(cb => {
                cb();
            });
        }
        this.awaitActiveCbs.clear();
        ibiz.log.debug(ibiz.i18n.t('runtime.controller.common.control.componentActivation', {
            name: this.model.name,
            id: this.model.id,
        }));
    }
    /**
     * 部件暂时停用
     *
     * @author chitanda
     * @date 2023-07-12 17:07:06
     */
    onDeactivated() {
        this._evt.emit('onDeactivated', undefined);
        this.state.activated = false;
        ibiz.log.debug(ibiz.i18n.t('runtime.controller.common.control.componentPause', {
            name: this.model.name,
            id: this.model.id,
        }));
    }
    /**
     * 处理数据能力方法通用参数，返回能力执行最终使用的参数
     * @author lxm
     * @date 2023-05-23 03:12:47
     * @protected
     * @param {IDataAbilityParams} [args]
     * @return {*}
     */
    handlerAbilityParams(args) {
        const context = this.context.clone();
        const params = Object.assign({}, this.params);
        let data = this.getData() || [];
        if (args === null || args === void 0 ? void 0 : args.data) {
            data = Array.isArray(args.data) ? args.data : [args.data];
        }
        // 合并附加上下文
        if (args === null || args === void 0 ? void 0 : args.context) {
            Object.assign(context, args.context);
        }
        // 合并附加视图参数
        if (args === null || args === void 0 ? void 0 : args.viewParam) {
            Object.assign(params, args.viewParam);
        }
        return { context, params, data };
    }
    /**
     * 设置布局面板控制器
     * @author lxm
     * @date 2023-08-01 03:28:17
     * @param {IViewLayoutPanelController} panel
     */
    setLayoutPanel(panel) {
        this.layoutPanel = panel;
        if (this.layoutPanel.state.isMounted) {
            this.mountCounter.attend(this.layoutPanel.model.name);
        }
        else {
            this.layoutPanel.evt.on('onMounted', () => {
                this.mountCounter.attend(this.layoutPanel.model.name);
            });
        }
    }
    /**
     * 部件参数解析
     *
     * @author zk
     * @date 2023-09-27 07:09:08
     * @protected
     * @memberof ControlController
     */
    handleControlParams() {
        if (!this.model.controlParam) {
            return;
        }
        const { ctrlParams } = this.model.controlParam;
        let params = {};
        if (notNilEmpty(ctrlParams)) {
            params = convertNavData(ctrlParams, this.params, this.context);
        }
        Object.assign(this.controlParams, params);
    }
    /**
     * 初始化部件逻辑调度器
     * @author lxm
     * @date 2023-08-21 11:53:37
     * @param {IControlLogic[]} logics
     * @return {*}  {void}
     */
    initControlScheduler(logics = []) {
        if (logics.length === 0) {
            return;
        }
        this.scheduler = ibiz.scheduler.createControlScheduler(logics);
        this.scheduler.defaultParamsCb = () => {
            return this.getEventArgs();
        };
    }
    /**
     * 获取指定标识部件消息
     *
     * @author tony001
     * @date 2024-05-29 17:05:52
     * @protected
     * @param {string} tag
     * @return {*}  {(ICtrlMsgItem | undefined)}
     */
    findCtrlMsgByTag(tag) {
        let targetCtrlMsg;
        const { ctrlMsg } = this.model;
        if (ctrlMsg && ctrlMsg.ctrlMsgItems) {
            targetCtrlMsg = ctrlMsg.ctrlMsgItems.find(item => item.name === tag);
        }
        return targetCtrlMsg;
    }
    /**
     * 执行对应部件行为消息提示
     * @author lxm
     * @date 2023-09-07 04:51:21
     * @param {string} tag
     * @param {({ default?: string; data?: IData | IData[]; error?: Error })} [opts]
     * @return {*}  {void}
     */
    actionNotification(tag, opts) {
        let message = '';
        let duration;
        const hiddenSsgItem = this.findCtrlMsgByTag(`${tag}_HIDDEN`);
        if (hiddenSsgItem) {
            return;
        }
        const msgItem = this.findCtrlMsgByTag(tag);
        if (msgItem && msgItem.content) {
            // 自定义部件消息提示
            duration = isNil(msgItem.timeout) ? undefined : msgItem.timeout / 1000; // 单位转换为秒
            const scriptParams = Object.assign({}, this.getEventArgs());
            if (opts === null || opts === void 0 ? void 0 : opts.data) {
                scriptParams.data = opts.data;
            }
            message = ScriptFactory.execScriptFn(scriptParams, `\`${msgItem.content}\``, {
                isAsync: false,
                singleRowReturn: true,
            });
        }
        if (!message && ibiz.i18n) {
            // 全局多语言资源提示信息
            const resTag = `CONTROL.${this.model.controlType}.${tag}`.toUpperCase();
            message = ibiz.i18n.t(resTag, '');
            // 多语言如果给出来是标识，说明没找到，消息改成空值
            if (message === resTag) {
                message = '';
            }
        }
        // 都没有的时候如果给了默认输出信息，弹出默认输出信息
        if (!message && (opts === null || opts === void 0 ? void 0 : opts.default)) {
            message = opts.default;
        }
        // 如果报错有Message的时候给报错的信息
        if (!message && (opts === null || opts === void 0 ? void 0 : opts.error)) {
            message = message || opts.error.message;
        }
        // 如果默认信息也没有就不弹出信息
        if (!message) {
            return;
        }
        if (opts === null || opts === void 0 ? void 0 : opts.error) {
            // 401和403的报错原样抛出
            if (opts.error instanceof HttpError) {
                if (opts.error.status !== 500) {
                    throw opts.error;
                }
                else if (opts.error.status === 500) {
                    const { response } = opts.error;
                    if (response) {
                        const { data } = response;
                        if ((data === null || data === void 0 ? void 0 : data.type) === 'DataEntityRuntimeException') {
                            throw opts.error;
                        }
                    }
                }
            }
            // 其他报错时抛错误信息
            ibiz.log.error(opts.error);
            throw new NoticeError(message, duration);
        }
        else {
            ibiz.message.success(message, duration, duration === 0);
        }
    }
    /**
     * 监听实体数据变更
     *
     * @author tony001
     * @date 2024-03-28 18:03:33
     * @protected
     * @param {IPortalMessage} msg
     */
    onDEDataChange(msg) {
        ibiz.log.debug('onDEDataChange', msg);
    }
    /**
     * 触发实体数据变更的通知
     *
     * @author tony001
     * @date 2024-03-28 18:03:44
     * @param {('create' | 'update' | 'remove')} type
     * @param {IData} data
     */
    emitDEDataChange(type, data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const msg = (data instanceof ControlVO ? data.$origin : data);
        const meta = { triggerKey: this.triggerKey };
        switch (type) {
            case 'create':
                ibiz.mc.command.create.send(msg, meta);
                break;
            case 'update':
                ibiz.mc.command.update.send(msg, meta);
                break;
            case 'remove':
                ibiz.mc.command.remove.send(msg, meta);
                break;
            default:
                throw new RuntimeError(ibiz.i18n.t('runtime.controller.common.control.unsupportedType', {
                    type,
                }));
        }
    }
    /**
     * 如果当前视图没有激活，则等待激活后执行回调函数
     * - 在执行之前key相同的会替换
     * 如果当前视图已经激活，则立即执行回调函数
     * - delay参数指定延迟执行时间,可以防抖
     *
     * @author tony001
     * @date 2024-03-28 18:03:00
     * @param {() => void} cb
     * @param {{ key: string; delay?: number }} opts
     */
    doNextActive(cb, opts) {
        if (isNil(opts.delay)) {
            opts.delay = 300;
        }
        if (this.state.activated === false) {
            this.awaitActiveCbs.set(opts.key, cb);
        }
        else if (opts.delay) {
            // 清除之前的延迟执行
            const _timer = this.delayCbs.get(opts.key);
            clearTimeout(_timer);
            // 设置新的延迟执行
            const timer = setTimeout(() => {
                if (!this.ctx.isDestroyed) {
                    cb();
                }
                clearTimeout(this.delayCbs.get(opts.key));
            }, opts.delay);
            this.delayCbs.set(opts.key, timer);
        }
        else if (!this.ctx.isDestroyed) {
            cb();
        }
    }
    /**
     * @description 取消部件禁用
     * @memberof ControlController
     */
    enable() {
        this.state.disabled = false;
        this.state.maskOption = { mode: 'BLANK' };
    }
    /**
     * @description 设置部件禁用
     * @param {IApiMaskOption} [options={ mode: 'BLANK' }]
     * @memberof ControlController
     */
    disabled(options = { mode: 'BLANK' }) {
        this.state.disabled = true;
        if (options.maskInfo) {
            options.maskInfo = StringUtil.fill(options.maskInfo, this.context, this.params);
        }
        this.state.maskOption = options;
    }
    /**
     * @description 禁用部件计数器
     * @memberof ControlController
     */
    disableCounter() {
        this.state.isCounterDisabled = true;
    }
}
