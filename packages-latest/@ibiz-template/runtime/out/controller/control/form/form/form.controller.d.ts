import { IControlLogic, IDEForm, IDEFormDetail } from '@ibiz/model-core';
import { IFormState, IFormEvent, IFormController, IFormDetailController, IFormDetailProvider, IApiFormDetailMapping } from '../../../../interface';
import { AppCounter } from '../../../../service';
import { ControlController } from '../../../common';
import { FormNotifyState } from '../../../constant';
import { ControllerEvent } from '../../../utils';
import type { FormDRUIPartController, FormDetailController, FormGroupPanelController, FormItemController, FormMDCtrlController } from '../form-detail';
import { FormService } from './form.service';
/**
 * 表单控制器
 *
 * @author chitanda
 * @date 2022-08-03 11:08:29
 * @export
 * @class FormController
 * @extends {ControlController<T>}
 * @template T
 */
export declare abstract class FormController<T extends IDEForm = IDEForm, S extends IFormState = IFormState, E extends IFormEvent = IFormEvent> extends ControlController<T, S, E> implements IFormController<T, S, E> {
    service: FormService;
    protected get _evt(): ControllerEvent<IFormEvent>;
    /**
     * 所有表单项成员的控制器
     *
     * @author lxm
     * @date 2022-08-24 20:08:07
     * @type {{ [key: string]: IFormDetailController }}
     */
    details: {
        [key: string]: IFormDetailController;
    };
    /**
     * 所有表单项成员的适配器
     *
     * @author lxm
     * @date 2022-08-24 20:08:07
     * @type {{ [key: string]: IFormDetailProvider }}
     */
    providers: {
        [key: string]: IFormDetailProvider;
    };
    /**
     * 表单项控制器的集合
     *
     * @author lxm
     * @date 2022-09-05 00:09:52
     * @type {FormItemController[]}
     */
    formItems: FormItemController[];
    /**
     * 表单多数据部件控制器的集合
     *
     * @author lxm
     * @date 2022-09-05 00:09:52
     * @type {FormMDCtrlController[]}
     */
    formMDCtrls: FormMDCtrlController[];
    /**
     * @description 表单关系界面
     * @type {FormDRUIPartController[]}
     * @memberof FormController
     */
    formDruipart: FormDRUIPartController[];
    /**
     * 计数器对象
     * @author lxm
     * @date 2024-01-18 05:12:35
     * @type {AppCounter}
     */
    counters: {
        [key: string]: AppCounter;
    };
    /**
     * 表单数据
     *
     * @author chitanda
     * @date 2023-01-04 10:01:46
     * @readonly
     * @type {IData}
     */
    get data(): IData;
    /**
     * @description 校验模式
     * @readonly
     * @type {('default' | 'notification')}
     * @memberof FormController
     */
    get validateMode(): 'default' | 'notification';
    /**
     * @description 是否启用缓存
     * @readonly
     * @type {boolean}
     * @memberof FormController
     */
    get srfCachePos(): boolean;
    /**
     * @description 是否显示提示图标
     * @readonly
     * @type {boolean}
     * @memberof FormController
     */
    get showTipsIcon(): boolean;
    /**
     * @description 缓存标识
     * @readonly
     * @type {string}
     * @memberof FormController
     */
    get srfcachekeytempl(): string;
    /**
     * @description jsonSchema属性集合对象
     * @type {IData}
     * @memberof FormController
     */
    jsonSchemaProperties?: IData;
    /**
     * @description 是否启用jsonschema
     * @readonly
     * @type {boolean}
     * @memberof FormController
     */
    get enableJsonSchema(): boolean;
    protected initState(): void;
    /**
     * 设置激活分页
     *
     * @param {string} name
     * @memberof FormController
     */
    setActiveTab(name: string): void;
    /**
     * @description 设置简单模式数据索引
     * @param {number} [index]
     * @memberof EditFormController
     */
    setSimpleDataIndex(index?: number): void;
    /**
     * @description 获取简单模式数据索引
     * @returns {*}  {number}
     * @memberof EditFormController
     */
    getSimpleDataIndex(): number;
    /**
     * @description 获取多数据部件表单模式下当前表单索引
     * @returns {*}  {number}
     * @memberof FormController
     */
    getMdCtrlFormIndex(): number;
    /**
     * @description 设置多数据部件表单模式下当前表单的索引
     * @param {number} index
     * @memberof FormController
     */
    setMdCtrlFormIndex(index: number): void;
    /**
     * 更新表单分页面板
     *
     * @author zhanghengfeng
     * @date 2025-02-05 20:02:12
     */
    updateFormTabPanel(): void;
    /**
     * 通知所有表单成员表单操作过程中的数据变更
     *
     * @author lxm
     * @date 2022-09-20 18:09:40
     * @param {string[]} names
     */
    dataChangeNotify(names: string[]): Promise<void>;
    /**
     * 表单状态变更通知
     *
     * @author lxm
     * @date 2022-09-20 18:09:07
     */
    formStateNotify(state: FormNotifyState): void;
    /**
     * 初始化
     *
     * @author lxm
     * @date 2022-08-24 20:08:59
     * @protected
     * @returns {*}  {Promise<void>}
     */
    protected onCreated(): Promise<void>;
    /**
     * 初始化表单成员控制器
     *
     * @author lxm
     * @date 2022-08-24 21:08:48
     * @protected
     */
    protected initDetailControllers(details?: IDEFormDetail[], form?: FormController, parent?: FormGroupPanelController | undefined): Promise<void>;
    /**
     * 加载
     *
     * @author lxm
     * @date 2022-09-22 17:09:04
     * @returns {*}  {Promise<IData>}
     */
    abstract load(): Promise<IData>;
    /**
     * 获取表单数据
     *
     * @author lxm
     * @date 2022-08-30 19:08:11
     * @returns {*}
     */
    getData(): IData[];
    /**
     * @description 获取原始实体数据
     * @returns {*}  {IData[]}
     * @memberof FormController
     */
    getReal(): IData[];
    /**
     * 设置表单数据的值
     *
     * @author lxm
     * @date 2022-08-24 10:08:40
     * @param {string} name 要设置的表单数据的属性名称
     * @param {unknown} value 要设置的值
     * @param {boolean} ignore 忽略脏值检查
     */
    setDataValue(name: string, value: unknown, ignore?: boolean): Promise<void>;
    updateFormItem(_formItemUpdateId: string): Promise<void>;
    /**
     * 检查忽略输入值(解除表单项和实体属性之间的联系，方便表单服务过滤)
     *
     * @author tony001
     * @date 2025-01-09 16:01:29
     * @param {IData} data
     * @return {*}  {IData}
     */
    checkIgnoreInput(data: IData): IData;
    /**
     * 校验表单的全部表单项
     *
     * @author lxm
     * @date 2022-09-05 00:09:53
     * @returns {*}  {Promise<boolean>}
     */
    validate(): Promise<boolean>;
    /**
     * @description 处理校验失败
     * @memberof FormController
     */
    handleValidateFail(): void;
    /**
     * 静默校验
     * - 只校验无提示信息
     *
     * @return {*}  {Promise<boolean>}
     * @memberof FormController
     */
    silentValidate(): Promise<boolean>;
    /**
     * 输出校验失败的错误日志
     * @description 收集校验失败的表单成员名称，通过 ibiz.log.error 输出。名称使用表单成员标识
     * @protected
     * @param {FormDetailController[]} failedDetails 校验失败的表单成员集合
     * @memberof FormController
     */
    protected logValidateFail(failedDetails: FormDetailController[]): void;
    /**
     * 执行对应部件行为消息提示
     * @author zzq
     * @date 2024-04-03 15:51:21
     * @param {string} tag
     * @param {({ default?: string; data?: IData | IData[]; error?: Error })} [opts]
     * @return {*}  {void}
     */
    actionNotification(tag: string, opts?: {
        default?: string;
        error?: Error;
    }): void;
    /**
     * 初始化部件逻辑调度器
     * @author lxm
     * @date 2023-08-21 11:53:37
     * @param {IControlLogic[]} logics
     * @return {*}  {void}
     */
    protected initControlScheduler(logics?: IControlLogic[]): void;
    protected onDestroyed(): Promise<void>;
    /**
     * 初始化计数器
     * @author lxm
     * @date 2024-01-18 05:12:02
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected initCounter(): Promise<void>;
    /**
     * @description 设置表单项错误信息
     * @param {string} name
     * @param {string} message
     * @memberof FormController
     */
    setDetailError(name: string, message: string): void;
    /**
     * 刷新
     * - 表单刷新时刷新所有数据（表单数据，计数器数据）
     * @return {*}  {Promise<void>}
     * @memberof FormController
     */
    refresh(): Promise<void>;
    /**
     * @description 切换折叠，tag=指定分组标识(不传则全部)，expand=目标状态(不传则反转)
     * @param {{ tag?: string; expand?: boolean }} [params={}]
     * @memberof FormController
     */
    changeCollapse(params?: {
        tag?: string;
        expand?: boolean;
    }): void;
    /**
     * @description 获取表单成员
     * @template K
     * @param {K} type
     * @param {string} id
     * @returns {*}  {IApiFormDetailMapping[K]}
     * @memberof FormController
     */
    getFormDetail<K extends keyof IApiFormDetailMapping>(type: K, id: string): IApiFormDetailMapping[K];
    /**
     * @description 初始化jsonschema
     * @returns {*}  {Promise<void>}
     * @memberof FormController
     */
    initByEntitySchema(): Promise<void>;
}
//# sourceMappingURL=form.controller.d.ts.map