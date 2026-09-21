import { IDEFormMDCtrl, IUIActionGroupDetail } from '@ibiz/model-core';
import { FormDetailController } from '../form-detail';
import { FormMDCtrlState } from './form-mdctrl.state';
import { FormNotifyState } from '../../../../constant';
import { IFormMDCtrlController } from '../../../../../interface';
/**
 * @description 表单多数据部件控制器
 * @export
 * @class FormMDCtrlController
 * @extends {FormDetailController<IDEFormMDCtrl>}
 * @implements {IFormMDCtrlController}
 */
export declare class FormMDCtrlController extends FormDetailController<IDEFormMDCtrl> implements IFormMDCtrlController {
    /**
     * @description 表单多数据部件控制器状态
     * @type {FormMDCtrlState}
     * @memberof FormMDCtrlController
     */
    state: FormMDCtrlState;
    protected createState(): FormMDCtrlState;
    /**
     * @description 名称
     * @readonly
     * @type {string}
     * @memberof FormMDCtrlController
     */
    get name(): string;
    /**
     * @description 上下文
     * @readonly
     * @type {IContext}
     * @memberof FormMDCtrlController
     */
    get context(): IContext;
    /**
     * @description 视图参数
     * @readonly
     * @type {IParams}
     * @memberof FormMDCtrlController
     */
    get params(): IParams;
    /**
     * @description 是否允许新建
     * @readonly
     * @type {boolean}
     * @memberof FormMDCtrlController
     */
    get enableCreate(): boolean;
    /**
     * @description 是否允许更新
     * @readonly
     * @type {boolean}
     * @memberof FormMDCtrlController
     */
    get enableUpdate(): boolean;
    /**
     * @description 是否允许删除
     * @readonly
     * @type {boolean}
     * @memberof FormMDCtrlController
     */
    get enableDelete(): boolean;
    /**
     * @description 执行表单项更新(配置了表单项更新)
     * @returns {*}  {Promise<void>}
     * @memberof FormMDCtrlController
     */
    updateFormItem(): Promise<void>;
    formStateNotify(state: FormNotifyState): Promise<void>;
    /**
     * @description 初始化
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof FormMDCtrlController
     */
    protected onInit(): Promise<void>;
    /**
     * @description 初始化界面行为组
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof FormMDCtrlController
     */
    protected initUIActions(): Promise<void>;
    /**
     * @description  操作列按钮状态控制
     * @returns {*}  {Promise<void>}
     * @memberof FormMDCtrlController
     */
    initActionStates(): Promise<void>;
    /**
     * @description 执行界面行为
     * @param {IUIActionGroupDetail} detail
     * @param {MouseEvent} event
     * @returns {*}  {Promise<void>}
     * @memberof FormMDCtrlController
     */
    onActionClick(detail: IUIActionGroupDetail, event: MouseEvent): Promise<void>;
    /**
     * @description 刷新
     * @memberof FormMDCtrlController
     */
    refresh(): void;
    /**
     * @description 校验
     * @returns {*}  {Promise<boolean>}
     * @memberof FormMDCtrlController
     */
    validate(): Promise<boolean>;
    /**
     * @description 静默校验
     * @returns {*}  {Promise<boolean>}
     * @memberof FormMDCtrlController
     */
    silentValidate(): Promise<boolean>;
    /**
     * @description 保存
     * @returns {*}  {Promise<void>}
     * @memberof FormMDCtrlController
     */
    save(): Promise<void>;
}
//# sourceMappingURL=form-mdctrl.controller.d.ts.map