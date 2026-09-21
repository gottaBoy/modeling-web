import { IControlLogic, IDEForm, IDEFormDetail } from '@ibiz/model-core';
import { IFormState, IFormEvent, IFormController, IFormDetailController, IFormDetailProvider } from '../../../../interface';
import { AppCounter } from '../../../../service';
import { ControlController } from '../../../common';
import { FormNotifyState } from '../../../constant';
import { ControllerEvent } from '../../../utils';
import type { FormDRUIPartController, FormGroupPanelController, FormItemController, FormMDCtrlController } from '../form-detail';
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
    protected initState(): void;
    /**
     * 设置激活分页
     *
     * @param {string} name
     * @memberof FormController
     */
    setActiveTab(name: string): void;
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
     * @return {*}  {Promise<void>}
     */
    checkIgnoreInput(data: IData): Promise<void>;
    /**
     * 校验表单的全部表单项
     *
     * @author lxm
     * @date 2022-09-05 00:09:53
     * @returns {*}  {Promise<boolean>}
     */
    validate(): Promise<boolean>;
    /**
     * 静默校验
     * - 只校验无提示信息
     *
     * @return {*}  {Promise<boolean>}
     * @memberof FormController
     */
    silentValidate(): Promise<boolean>;
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
     * 设置表单项错误信息
     * @author zzq
     * @date 2024-04-03 18:12:02
     * @protected
     * @return {*}  {void}
     */
    protected setDetailError(name: string, message: string): void;
    /**
     * 刷新
     * - 表单刷新时刷新所有数据（表单数据，计数器数据）
     * @return {*}  {Promise<void>}
     * @memberof FormController
     */
    refresh(): Promise<void>;
    /**
     * @description 切换分组折叠
     * @memberof FormController
     */
    changeCollapse(params?: IData): void;
}
//# sourceMappingURL=form.controller.d.ts.map