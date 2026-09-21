/* eslint-disable no-param-reassign */
import { RuntimeError, recursiveExecute, recursiveIterate, } from '@ibiz-template/core';
import { AsyncSeriesHook } from 'qx-util';
import { getAllPanelField } from '../../../../model';
import { getPanelItemProvider } from '../../../../register';
import { PanelData } from '../../../../service/vo';
import { ControlController } from '../../../common';
import { PanelNotifyState } from '../../../constant';
import { CounterService } from '../../../../service';
/**
 * 面板部件控制器
 *
 * @author lxm
 * @date 2022-09-08 20:09:55
 * @export
 * @class PanelController
 * @extends {ControlController<PanelModel>}
 */
export class PanelController extends ControlController {
    get _evt() {
        return this.evt;
    }
    /**
     * 面板数据
     *
     * @author lxm
     * @date 2023-02-10 07:21:09
     * @readonly
     * @memberof PanelController
     */
    get data() {
        return this.state.data;
    }
    constructor(model, context, params, ctx, container) {
        super(model, context, params, ctx);
        /**
         * 面板钩子
         *
         * @memberof PanelController
         */
        this.hooks = {
            validate: new AsyncSeriesHook(),
        };
        /**
         * 所有面板成员的控制器
         *
         * @author lxm
         * @date 2022-08-24 20:08:07
         * @type {{ [key: string]: IPanelItemController }}
         */
        this.panelItems = {};
        /**
         * 所有面板成员的适配器
         *
         * @author lxm
         * @date 2022-08-24 20:08:07
         * @type {{ [key: string]: IPanelItemProvider  | IControlProvider}}
         */
        this.providers = {};
        /**
         * @description 计数器对象
         * @type {AppCounter}
         * @memberof PanelController
         */
        this.counters = {};
        this.container = container;
    }
    initState() {
        super.initState();
        this.state.data = {};
    }
    setInputData(data) {
        this.inputData = data;
    }
    getData() {
        return [this.data];
    }
    async onCreated() {
        var _a;
        await super.onCreated();
        await this.initCounter();
        await this.initPanelItemControllers();
        if ((_a = this.scheduler) === null || _a === void 0 ? void 0 : _a.hasControlEventTrigger) {
            // 监听部件事件触发部件事件触发器
            this._evt.on('onPanelItemEvent', event => {
                this.scheduler.triggerControlEvent(event.panelItemName, event.panelItemEventName, event);
            });
            // 监听数据容器事件触发部件事件触发器
            this._evt.on('onPanelDataContainerEvent', event => {
                this.scheduler.triggerControlEvent(event.panelDataContainerName, event.panelDataContainerEventName, event);
            });
        }
    }
    async onMounted() {
        await super.onMounted();
        this.load();
    }
    /**
     * @description 初始化计数器
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof PanelController
     */
    async initCounter() {
        if (this.state.isCounterDisabled)
            return;
        this.counters = {};
        const { appCounterRefs } = this.model;
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
    /**
     * 生命周期-销毁完成
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof PanelController
     */
    async onDestroyed() {
        var _a, _b;
        await super.onDestroyed();
        (_b = (_a = this.data).destroy) === null || _b === void 0 ? void 0 : _b.call(_a);
        // 销毁视图计数器
        Object.values(this.counters).forEach(counter => counter.destroy());
        this.hooks.validate.clear();
        Object.values(this.panelItems).forEach(item => {
            item.destroy();
        });
    }
    /**
     * 值校验
     *
     * @param {string} [parentId] 数据父容器标识
     * @return {*}  {Promise<boolean>}
     * @memberof PanelController
     */
    async validate(parentId) {
        const result = [];
        await this.hooks.validate.call({ result, parentId });
        return result.every(value => value);
    }
    /**
     * 初始化面板成员控制器
     *
     * @author lxm
     * @date 2022-08-24 21:08:48
     * @protected
     */
    async initPanelItemControllers(panelItems = this.model.rootPanelItems, panel = this, parent = undefined) {
        if (!panelItems) {
            return;
        }
        await Promise.all(panelItems.map(async (panelItem) => {
            var _a, _b;
            // 生成面板成员控制器
            const panelItemProvider = await getPanelItemProvider(panelItem, panel.model, panel.view.model);
            if (!panelItemProvider) {
                return;
            }
            panel.providers[panelItem.id] = panelItemProvider;
            const panelItemController = await panelItemProvider.createController(panelItem, panel, parent);
            panel.panelItems[panelItem.id] = panelItemController;
            // 有子成员的,且不是数据容器的。生成子控制器
            if (((_a = panelItem.panelItems) === null || _a === void 0 ? void 0 : _a.length) &&
                !panelItemController
                    .isDataContainer) {
                await this.initPanelItemControllers(panelItem.panelItems, panel, panelItemController);
            }
            if ((_b = panelItem.panelTabPages) === null || _b === void 0 ? void 0 : _b.length) {
                await this.initPanelItemControllers(panelItem.panelTabPages, panel, panelItemController);
            }
        }));
    }
    /**
     * 部件加载，获取数据，并执行一系列后续初始化逻辑
     *
     * @author lxm
     * @date 2023-02-10 01:46:24
     * @memberof PanelController
     */
    async load() {
        var _a, _b;
        // 准备面板数据
        const data = await this.prepareData();
        if (!data) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.panel.panelData'));
        }
        // 转换数据，处理原始数据和面板项的映射。
        const panelData = this.convertData(data);
        // 清空上一个，如果存在的话。
        (_b = (_a = this.data).destroy) === null || _b === void 0 ? void 0 : _b.call(_a);
        this.state.data = panelData;
        this.panelStateNotify(PanelNotifyState.LOAD);
    }
    /**
     * 根据获取模式准备原始数据
     *
     * @author lxm
     * @date 2023-02-10 02:04:39
     * @returns {*}  {(Promise<IData | undefined>)}
     * @memberof PanelController
     */
    async prepareData() {
        let data;
        // 根据数据获取模式获取数据
        switch (this.model.dataMode) {
            // 未传入时获取
            case 1:
                if (this.inputData) {
                    data = this.inputData;
                }
                break;
            // 不获取（使用传入数据）
            default:
                data = this.inputData || {};
        }
        return data;
    }
    /**
     * 转换原始数据，映射面板属性
     *
     * @author lxm
     * @date 2023-02-10 02:10:41
     * @param {IData} data
     * @returns {*}  {IData}
     * @memberof PanelController
     */
    convertData(data) {
        const fields = getAllPanelField(this.model);
        const fieldKeys = fields.map(item => item.id);
        const panelData = new PanelData(fields, data);
        // 面板属性变更的触发变更通知
        panelData._evt.on('change', key => {
            if (fieldKeys.includes(key)) {
                this.dataChangeNotify([key]);
            }
        });
        return panelData;
    }
    /**
     * 通知所有面板成员面板操作过程中的数据变更
     *
     * @author lxm
     * @date 2022-09-20 18:09:40
     * @param {string[]} names
     */
    dataChangeNotify(names) {
        Object.values(this.panelItems).forEach(panelItem => {
            panelItem.dataChangeNotify(names);
        });
    }
    /**
     * 面板状态变更通知
     *
     * @author lxm
     * @date 2022-09-20 18:09:07
     */
    panelStateNotify(state) {
        Object.values(this.panelItems).forEach(panelItem => {
            panelItem.panelStateNotify(state);
        });
    }
    /**
     * 设置面板数据的值
     *
     * @param {string} name 要设置的数据的属性名称
     * @param {unknown} value 要设置的值
     */
    async setDataValue(name, value) {
        if (Object.prototype.hasOwnProperty.call(this.state.data, name) &&
            this.state.data[name] === value) {
            // *`面板里没有属性${name}或者${name}的值未发生改变`
            return;
        }
        // 改变值
        this.state.data[name] = value;
    }
    initControlScheduler(logics = []) {
        const actualLogics = [...logics];
        // 遍历所有的项，如果有逻辑的话加入
        recursiveIterate(this.model, (item) => {
            if (item.controlLogics) {
                actualLogics.push(...item.controlLogics);
            }
        }, { childrenFields: ['rootPanelItems', 'panelItems', 'panelTabPages'] });
        if (actualLogics.length === 0) {
            return;
        }
        this.scheduler = ibiz.scheduler.createControlScheduler(actualLogics, [
            // 面板部件事件参数
            'triggerControlName',
            'triggerEventName',
            'triggerEvent',
            // 面板成员事件参数
            'panelItemName',
            'panelItemEventName',
        ]);
        this.scheduler.defaultParamsCb = () => {
            return this.getEventArgs();
        };
    }
    /**
     * @description 获取面板成员控制器
     * @param {string} name 面板成员名称
     * @returns {*}  {(IPanelItemController | undefined)}
     * @memberof PanelController
     */
    findPanelItemByName(name) {
        let result = this.panelItems[name];
        if (!result) {
            recursiveExecute(this, (item) => {
                if (name === item.model.id) {
                    result = item;
                    return true;
                }
            }, {
                childrenFields: ['panelItems'],
            });
        }
        return result;
    }
}
