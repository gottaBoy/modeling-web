import { IControlProvider, IMDControlController, IFormMDCtrlMDController } from '../../../../../interface';
import { FormMDCtrlController } from './form-mdctrl.controller';
import { FormNotifyState } from '../../../../constant';
/**
 * @description 表单多数据部件(引用实体多数据部件模型)控制器 (类型是列表，卡片，表格时)
 * @export
 * @class FormMDCtrlMDController
 * @extends {FormMDCtrlController}
 * @implements {IFormMDCtrlMDController}
 */
export declare class FormMDCtrlMDController extends FormMDCtrlController implements IFormMDCtrlMDController {
    /**
     * @description 多数据部件的适配器
     * @type {IControlProvider}
     * @memberof FormMDCtrlMDController
     */
    mdProvider: IControlProvider;
    /**
     * @description 多数据部件控制器
     * @type {IMDControlController}
     * @memberof FormMDCtrlMDController
     */
    mdController: IMDControlController;
    /**
     * @description 忽略下一次自身对应表单项数据变更
     * @memberof FormMDCtrlMDController
     */
    ignoreNextSelfChange: boolean;
    /**
     * @description 是否允许刷新，可能存在当表单数据变更后，需要通知多数据部件刷新时但多数据部件还没有加载好的情况，所以需要记录是否存在通知刷新的历史记录，等多数据部件加载完成后若判断存在，会调用一次刷新
     * @memberof FormMDCtrlMDController
     */
    enableRefresh: boolean;
    /**
     * @description 表单项名称
     * @readonly
     * @type {string}
     * @memberof FormMDCtrlMDController
     */
    get name(): string;
    /**
     * @description 初始化
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof FormMDCtrlMDController
     */
    protected onInit(): Promise<void>;
    /**
     * @description 设置多数据部件控制器
     * @param {IMDControlController} controller
     * @memberof FormMDCtrlMDController
     */
    setMDControl(controller: IMDControlController): void;
    /**
     * @description 更新表单项
     * @returns {*}  {Promise<void>}
     * @memberof FormMDCtrlMDController
     */
    updateFormItem(): Promise<void>;
    /**
     * @description 删除多数据选中的数据
     * @memberof FormMDCtrlMDController
     */
    remove(): void;
    /**
     * @description 多数据新建一条数据
     * @memberof FormMDCtrlMDController
     */
    create(): void;
    /**
     * @description 刷新
     * @memberof FormMDCtrlMDController
     */
    refresh(): void;
    /**
     * @description 表单状态变更通知
     * @param {FormNotifyState} state
     * @returns {*}  {Promise<void>}
     * @memberof FormMDCtrlMDController
     */
    formStateNotify(state: FormNotifyState): Promise<void>;
    /**
     * @description 表单数据变更通知
     * @param {string[]} names
     * @returns {*}  {Promise<void>}
     * @memberof FormMDCtrlMDController
     */
    dataChangeNotify(names: string[]): Promise<void>;
    /**
     * @description 通知表单多数据部件对应的表单项数据变更
     * @protected
     * @memberof FormMDCtrlMDController
     */
    protected notifyFormDataChange(): void;
    /**
     * @description 保存
     * @returns {*}  {Promise<void>}
     * @memberof FormMDCtrlMDController
     */
    save(): Promise<void>;
}
//# sourceMappingURL=form-mdctrl-md.controller.d.ts.map