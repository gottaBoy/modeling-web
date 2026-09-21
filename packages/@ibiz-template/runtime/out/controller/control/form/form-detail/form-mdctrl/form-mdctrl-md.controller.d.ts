import { IControlProvider, IMDControlController } from '../../../../../interface';
import { FormMDCtrlController } from './form-mdctrl.controller';
import { FormNotifyState } from '../../../../constant';
/**
 * 表单多数据部件(引用实体多数据部件模型)控制器
 * 类型是列表，卡片，表格时
 *
 * @author lxm
 * @date 2023-11-09 04:32:02
 * @export
 * @class FormMDCtrlController
 * @extends {FormDetailController<IDEFormMDCtrl>}
 */
export declare class FormMDCtrlMDController extends FormMDCtrlController {
    /**
     * 多数据部件的适配器
     *
     * @author lxm
     * @date 2022-08-24 20:08:07
     * @type {{ [key: string]: IControlProvider }}
     */
    mdProvider: IControlProvider;
    /**
     * 多数据部件控制器
     * @author lxm
     * @date 2023-11-10 03:30:34
     * @type {IMDControlController}
     */
    mdController: IMDControlController;
    /**
     * 忽略下一次自身对应表单项数据变更
     * @author lxm
     * @date 2023-12-19 11:47:21
     */
    ignoreNextSelfChange: boolean;
    /**
     * 表单项名称
     *
     * @author lxm
     * @date 2022-09-04 18:09:32
     * @readonly
     */
    get name(): string;
    protected onInit(): Promise<void>;
    /**
     * 设置多数据部件控制器
     * @author lxm
     * @date 2023-11-10 03:31:16
     * @param {IMDControlController} controller
     */
    setMDControl(controller: IMDControlController): void;
    updateFormItem(): Promise<void>;
    /**
     * 删除多数据选中的数据
     * @author lxm
     * @date 2023-11-10 03:32:30
     */
    remove(): void;
    /**
     * 多数据新建一条数据
     * @author lxm
     * @date 2023-11-10 03:32:30
     */
    create(): void;
    refresh(): void;
    /**
     * 表单状态变更通知
     *
     * @author lxm
     * @date 2022-09-20 18:09:07
     */
    formStateNotify(state: FormNotifyState): Promise<void>;
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
//# sourceMappingURL=form-mdctrl-md.controller.d.ts.map