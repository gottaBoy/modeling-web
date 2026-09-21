import { IDEFormMDCtrl, IUIActionGroupDetail } from '@ibiz/model-core';
import { FormDetailController } from '../form-detail';
import { FormMDCtrlState } from './form-mdctrl.state';
import { FormNotifyState } from '../../../../constant';
/**
 * 表单多数据部件控制器
 *
 * @author lxm
 * @date 2023-11-09 04:32:02
 * @export
 * @class FormMDCtrlController
 * @extends {FormDetailController<IDEFormMDCtrl>}
 */
export declare class FormMDCtrlController extends FormDetailController<IDEFormMDCtrl> {
    /**
     * 表单多数据部件控制器状态
     *
     * @author lxm
     * @date 2023-11-09 04:33:47
     * @type {FormMDCtrlFormState}
     */
    state: FormMDCtrlState;
    protected createState(): FormMDCtrlState;
    /**
     * 名称
     * @author lxm
     * @date 2023-11-22 03:31:02
     * @readonly
     * @type {string}
     */
    get name(): string;
    /**
     * 上下文
     *
     * @author lxm
     * @date 2022-08-24 20:08:55
     * @type {IContext}
     */
    get context(): IContext;
    /**
     * 视图参数
     *
     * @author lxm
     * @date 2022-08-24 20:08:52
     * @type {IParams}
     */
    get params(): IParams;
    /**
     * 是否允许新建
     *
     * @author lxm
     * @date 2023-11-09 06:14:13
     * @readonly
     * @type {boolean}
     */
    get enableCreate(): boolean;
    /**
     * 是否允许更新
     *
     * @author lxm
     * @date 2023-11-09 06:14:13
     * @readonly
     * @type {boolean}
     */
    get enableUpdate(): boolean;
    /**
     * 是否允许删除
     * @author lxm
     * @date 2023-11-09 06:14:17
     * @readonly
     * @type {boolean}
     */
    get enableDelete(): boolean;
    /**
     * 如果配置了表单项更新，则执行表单项更新
     * @author lxm
     * @date 2023-11-10 04:55:40
     * @return {*}  {Promise<void>}
     */
    updateFormItem(): Promise<void>;
    formStateNotify(state: FormNotifyState): Promise<void>;
    /**
     * 初始化
     *
     * @author zk
     * @date 2023-07-25 10:07:11
     * @return {*}  {Promise<void>}
     * @memberof FormMDCtrlController
     */
    protected onInit(): Promise<void>;
    initActionStates(): Promise<void>;
    /**
     * 触发操作列点击事件
     *
     * @author lxm
     * @date 2022-09-07 22:09:46
     * @param {IPSUIActionGroupDetail} detail
     * @param {MouseEvent} event
     */
    onActionClick(detail: IUIActionGroupDetail, event: MouseEvent): Promise<void>;
    /**
     * 刷新
     * @author lxm
     * @date 2023-11-13 11:21:06
     */
    refresh(): void;
    /**
     * 校验内部数据
     * @author lxm
     * @date 2023-11-13 05:55:20
     * @return {*}  {Promise<boolean>}
     */
    validate(): Promise<boolean>;
    /**
     * 静默校验
     *
     * @return {*}  {Promise<boolean>}
     * @memberof FormMDCtrlController
     */
    silentValidate(): Promise<boolean>;
    /**
     * 保存
     * - 子类实现
     * @return {*}  {Promise<void>}
     * @memberof FormMDCtrlController
     */
    save(): Promise<void>;
}
//# sourceMappingURL=form-mdctrl.controller.d.ts.map