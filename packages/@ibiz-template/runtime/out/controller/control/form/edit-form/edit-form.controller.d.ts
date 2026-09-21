import { IPortalMessage } from '@ibiz-template/core';
import { IAppDEEditView, IDEEditForm, IDEFormPage } from '@ibiz/model-core';
import { IEditFormState, IEditFormEvent, IEditFormController, IViewController, IEditViewState, IEditViewEvent, IDataAbilityParams, FormSaveParams } from '../../../../interface';
import { ControlVO } from '../../../../service';
import { FormController } from '../form';
import { EditFormService } from './edit-form.service';
/**
 * 编辑表单控制器
 *
 * @author chitanda
 * @date 2022-08-03 11:08:20
 * @export
 * @class EditFormController
 * @extends {FormController<EditFormModel>}
 */
export declare class EditFormController extends FormController<IDEEditForm, IEditFormState, IEditFormEvent> implements IEditFormController {
    /**
     * 编辑表单服务
     * @author lxm
     * @date 2023-05-15 11:03:34
     * @type {EditFormService}
     */
    service: EditFormService;
    get view(): IViewController<IAppDEEditView, IEditViewState, IEditViewEvent>;
    /**
     * 表单旧数据
     *
     * @author zk
     * @date 2023-12-20 11:12:43
     * @protected
     * @type {IData}
     * @memberof FormController
     */
    protected oldData: IData;
    /**
     * 锚点数据
     *
     * @type {IData[]}
     * @memberof EditFormController
     */
    anchorData: IData[];
    /**
     * 初始化方法
     *
     * @author lxm
     * @date 2022-08-22 22:08:16
     * @protected
     * @returns {*}  {Promise<void>}
     */
    protected onCreated(): Promise<void>;
    /**
     * 初始化锚点栏数据
     *
     * @memberof EditFormController
     */
    initAnchorData(): void;
    /**
     * 解析锚点模型
     *
     * @param {IData[]} [details=[]]
     * @memberof EditFormController
     */
    parseAnchorModel(page: IDEFormPage, details?: IData[]): void;
    protected onMounted(): Promise<void>;
    /**
     * 加载草稿行为
     * @author lxm
     * @date 2023-08-25 02:45:11
     * @return {*}  {Promise<IData>}
     */
    loadDraft(args?: IDataAbilityParams): Promise<IData>;
    /**
     * 拷贝模式加载数据
     *
     * @author chitanda
     * @date 2023-09-26 19:09:21
     * @return {*}  {Promise<IData>}
     */
    protected copy(): Promise<IData>;
    /**
     * 部件加载数据行为
     *
     * @author lxm
     * @date 2022-08-19 14:08:50
     */
    load(args?: IDataAbilityParams): Promise<IData>;
    /**
     * 保存表单数据
     *
     * @author lxm
     * @date 2022-08-31 22:08:40
     */
    save(args?: FormSaveParams): Promise<IData>;
    /**
     * 删除表单数据
     *
     * @author lxm
     * @date 2022-09-01 09:09:36
     * @returns {*}
     */
    remove(args?: IDataAbilityParams): Promise<boolean>;
    /**
     * 执行返回行为
     *
     * @author lxm
     * @date 2022-09-01 09:09:36
     * @returns {*}
     */
    goBack(): Promise<IData>;
    /**
     * 表单项更新
     *
     * @author lxm
     * @date 2022-09-15 21:09:13
     * @param {string} methodName 更新实体方法
     * @param {string[]} updateItems 更新项名称集合
     */
    updateFormItem(formItemUpdateId: string): Promise<void>;
    /**
     * 工作流启动(调用前先确保调用保存)
     *
     * @author lxm
     * @date 2022-10-08 18:10:41
     * @param {IParams} [extraParams={}] 不走工作流启动视图时使用
     * @returns {*}  {Promise<void>}
     */
    wfStart(args?: IDataAbilityParams): Promise<void>;
    /**
     * 工作流提交(调用前先确保调用保存)
     *
     * @author lxm
     * @date 2022-10-08 18:10:56
     * @param {IParams} [extraParams={}] 不走工作流操作视图时使用
     * @returns {*}  {Promise<void>}
     */
    wfSubmit(args?: IDataAbilityParams): Promise<void>;
    dataChangeNotify(names: string[]): Promise<void>;
    /**
     * 自动保存
     * @author lxm
     * @date 2023-08-23 05:44:48
     * @return {*}  {Promise<void>}
     */
    autoSave(): Promise<void>;
    /**
     * 立即执行自动保存
     *
     * @return {*}  {Promise<void>}
     * @memberof EditFormController
     */
    immediateAutoSave(): Promise<void>;
    /**
     * 比较旧数据跟当前数据的差异返回差异数据
     *
     * @author zk
     * @date 2023-12-20 10:12:06
     * @protected
     * @return {*}  {ControlVO}
     * @memberof EditFormController
     */
    protected getDiffData(): ControlVO;
    /**
     * 设置simple模式的数据
     * @author lxm
     * @date 2023-11-22 07:11:21
     * @param {IData} data
     */
    setSimpleData(data: IData): void;
    /**
     * 检测实体数据变更
     *
     * @author tony001
     * @date 2024-03-28 18:03:14
     * @protected
     * @param {IPortalMessage} msg
     * @return {*}  {void}
     */
    protected onDEDataChange(msg: IPortalMessage): void;
}
//# sourceMappingURL=edit-form.controller.d.ts.map