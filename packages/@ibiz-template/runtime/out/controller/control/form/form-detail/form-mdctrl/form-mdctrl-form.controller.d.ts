import { IControlProvider, IEditFormController } from '../../../../../interface';
import { FormNotifyState } from '../../../../constant';
import { EditFormService } from '../../edit-form';
import { FormMDCtrlFormState } from './form-mdctrl-form.state';
import { FormMDCtrlController } from './form-mdctrl.controller';
/**
 * 表单多数据部件(引用实体表单部件模型)控制器
 * 类型是表单
 *
 * @author lxm
 * @date 2023-11-09 04:32:02
 * @export
 * @class FormMDCtrlController
 * @extends {FormDetailController<IDEFormMDCtrl>}
 */
export declare class FormMDCtrlFormController extends FormMDCtrlController {
    /**
     * 表单多数据部件控制器状态
     *
     * @author lxm
     * @date 2023-11-09 04:33:47
     * @type {FormMDCtrlFormState}
     */
    state: FormMDCtrlFormState;
    /**
     * 忽略下一次自身对应表单项数据变更
     * @author lxm
     * @date 2023-12-19 11:47:21
     */
    ignoreNextSelfChange: boolean;
    protected createState(): FormMDCtrlFormState;
    /**
     * 表单控制器Map
     * @author lxm
     * @date 2023-11-11 08:03:56
     */
    formMap: Map<string, IEditFormController>;
    /**
     * 表单部件的适配器
     *
     * @author lxm
     * @date 2022-08-24 20:08:07
     * @type {{ [key: string]: IControlProvider }}
     */
    formProvider: IControlProvider;
    /**
     * 编辑表单服务
     * @author lxm
     * @date 2023-05-15 11:03:34
     * @type {EditFormService}
     */
    service: EditFormService;
    /**
     * 实体上下文主键标识
     * @author lxm
     * @date 2023-11-11 08:33:08
     * @type {string}
     */
    deName: string;
    /**
     * 数据集合
     *
     * @type {IData[]}
     * @memberof FormMDCtrlFormController
     */
    items: IData[];
    /**
     * 初始化
     *
     * @author zk
     * @date 2023-07-25 10:07:11
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof FormMDCtrlController
     */
    onInit(): Promise<void>;
    /**
     * 加载实体的数据
     * @author lxm
     * @date 2023-11-10 05:02:40
     * @return {*}  {Promise<void>}
     */
    fetchData(): Promise<void>;
    /**
     * 更新数据
     * - 仅支持更新临时数据
     * @return {*}  {Promise<void>}
     * @memberof FormMDCtrlFormController
     */
    updateData(): Promise<void>;
    /**
     * 表单状态变更通知
     *
     * @author lxm
     * @date 2022-09-20 18:09:07
     */
    formStateNotify(state: FormNotifyState): Promise<void>;
    /**
     * 设置表单控制器
     * @author lxm
     * @date 2023-11-11 08:03:06
     * @param {string} id
     * @param {IEditFormController} controller
     */
    setFormController(id: string, controller: IEditFormController): void;
    /**
     * 校验
     *
     * @return {*}  {Promise<boolean>}
     * @memberof FormMDCtrlFormController
     */
    validate(): Promise<boolean>;
    /**
     * 静默校验
     *
     * @return {*}  {Promise<boolean>}
     * @memberof FormMDCtrlFormController
     */
    silentValidate(): Promise<boolean>;
    /**
     * 删除数据
     * @author lxm
     * @date 2023-11-11 08:06:12
     * @param {string} id
     * @return {*}  {Promise<void>}
     */
    remove(id: string): Promise<void>;
    /**
     * 新建一条数据
     * @author lxm
     * @date 2023-11-11 08:01:49
     */
    create(index?: number): void;
    refresh(): void;
    dataChangeNotify(names: string[]): Promise<void>;
    /**
     * 通知表单多数据部件对应的表单项数据变更
     * @author lxm
     * @date 2023-12-19 11:46:13
     * @protected
     */
    protected notifyFormDataChange(): void;
    /**
     * 保存
     *
     * @return {*}  {Promise<void>}
     * @memberof FormMDCtrlMDController
     */
    save(): Promise<void>;
}
//# sourceMappingURL=form-mdctrl-form.controller.d.ts.map