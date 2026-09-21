import { IControlProvider, IEditFormController, IFormMDCtrlFormController } from '../../../../../interface';
import { FormNotifyState } from '../../../../constant';
import { EditFormService } from '../../edit-form';
import { FormMDCtrlFormState } from './form-mdctrl-form.state';
import { FormMDCtrlController } from './form-mdctrl.controller';
/**
 * @description 表单多数据部件(引用实体表单部件模型)控制器 类型是表单
 * @export
 * @class FormMDCtrlFormController
 * @extends {FormMDCtrlController}
 */
export declare class FormMDCtrlFormController extends FormMDCtrlController implements IFormMDCtrlFormController {
    /**
     * @description 表单多数据部件控制器状态
     * @type {FormMDCtrlFormState}
     * @memberof FormMDCtrlFormController
     */
    state: FormMDCtrlFormState;
    /**
     * @description 忽略下一次自身对应表单项数据变更
     * @memberof FormMDCtrlFormController
     */
    ignoreNextSelfChange: boolean;
    protected createState(): FormMDCtrlFormState;
    /**
     * @description 表单控制器Map
     * @memberof FormMDCtrlFormController
     */
    formMap: Map<string, IEditFormController>;
    /**
     * @description 表单部件的适配器
     * @type {IControlProvider}
     * @memberof FormMDCtrlFormController
     */
    formProvider: IControlProvider;
    /**
     * @description 编辑表单服务
     * @type {EditFormService}
     * @memberof FormMDCtrlFormController
     */
    service: EditFormService;
    /**
     * @description 实体上下文主键标识
     * @type {string}
     * @memberof FormMDCtrlFormController
     */
    deName: string;
    /**
     * @description  数据集合
     * @type {IData[]}
     * @memberof FormMDCtrlFormController
     */
    items: IData[];
    /**
     * @description 初始化
     * @returns {*}  {Promise<void>}
     * @memberof FormMDCtrlFormController
     */
    onInit(): Promise<void>;
    /**
     * @description 加载实体的数据
     * @returns {*}  {Promise<void>}
     * @memberof FormMDCtrlFormController
     */
    fetchData(): Promise<void>;
    /**
     * @description 更新数据,仅支持更新临时数据
     * @returns {*}  {Promise<void>}
     * @memberof FormMDCtrlFormController
     */
    updateData(): Promise<void>;
    /**
     * @description 表单状态变更通知
     * @param {FormNotifyState} state
     * @returns {*}  {Promise<void>}
     * @memberof FormMDCtrlFormController
     */
    formStateNotify(state: FormNotifyState): Promise<void>;
    /**
     * @description 设置表单控制器
     * @param {string} id
     * @param {IEditFormController} controller
     * @memberof FormMDCtrlFormController
     */
    setFormController(id: string, controller: IEditFormController): void;
    /**
     * @description 校验
     * @returns {*}  {Promise<boolean>}
     * @memberof FormMDCtrlFormController
     */
    validate(): Promise<boolean>;
    /**
     * @description 静默校验
     * @returns {*}  {Promise<boolean>}
     * @memberof FormMDCtrlFormController
     */
    silentValidate(): Promise<boolean>;
    /**
     * @description 删除数据
     * @param {string} id
     * @returns {*}  {Promise<void>}
     * @memberof FormMDCtrlFormController
     */
    remove(id: string): Promise<void>;
    /**
     * @description  新建一条数据
     * @param {number} [index]
     * @memberof FormMDCtrlFormController
     */
    create(index?: number): void;
    /**
     * @description 刷新
     * @memberof FormMDCtrlFormController
     */
    refresh(): void;
    /**
     * @description 数据变更通知
     * @param {string[]} names
     * @returns {*}  {Promise<void>}
     * @memberof FormMDCtrlFormController
     */
    dataChangeNotify(names: string[]): Promise<void>;
    /**
     * @description 通知表单多数据部件对应的表单项数据变更
     * @protected
     * @memberof FormMDCtrlFormController
     */
    protected notifyFormDataChange(): void;
    /**
     * @description 保存
     * @returns {*}  {Promise<void>}
     * @memberof FormMDCtrlFormController
     */
    save(): Promise<void>;
}
//# sourceMappingURL=form-mdctrl-form.controller.d.ts.map