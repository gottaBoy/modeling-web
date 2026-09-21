import { IDEEditForm } from '@ibiz/model-core';
import { IDataAbilityParams } from '../../../common';
import { IEditFormEvent } from '../../event';
import { IEditFormState } from '../../state';
import { IFormController } from './i-form.controller';
export interface FormSaveParams extends IDataAbilityParams {
    /**
     * 保存之后是否不合并后台回来的数据
     * @author lxm
     * @date 2023-11-11 11:28:23
     * @type {boolean}
     */
    noFillBack?: boolean;
    /**
     * 是否静默校验
     *
     * @type {boolean}
     * @memberof FormSaveParams
     */
    silentVerify?: boolean;
}
/**
 * 编辑表单控制器
 * @author lxm
 * @date 2023-05-04 03:01:41
 * @export
 * @interface IEditFormController
 * @extends {IFormController}
 */
export interface IEditFormController extends IFormController<IDEEditForm, IEditFormState, IEditFormEvent> {
    /**
     * 加载数据
     * @author lxm
     * @date 2023-05-16 11:08:45
     * @return {*}  {Promise<IData>}
     */
    load(args?: IDataAbilityParams): Promise<IData>;
    /**
     * 保存表单数据
     * @author lxm
     * @date 2023-05-16 12:59:03
     * @return {*}  {Promise<IData>}
     */
    save(args?: FormSaveParams): Promise<IData>;
    /**
     * 删除表单数据
     *
     * @author zk
     * @date 2023-06-01 10:06:15
     * @return {*}  {Promise<boolean>}
     * @memberof IEditFormController
     */
    remove(args?: IDataAbilityParams): Promise<boolean>;
    /**
     * 自动保存
     *
     * @return {*}  {Promise<void>}
     * @memberof IEditFormController
     */
    autoSave(): Promise<void>;
    /**
     * 立即执行自动保存
     *
     * @return {*}  {Promise<void>}
     * @memberof IEditFormController
     */
    immediateAutoSave(): Promise<void>;
    /**
     * 工作流提交(调用前先确保调用保存)
     *
     * @author lxm
     * @date 2022-10-08 18:10:56
     * @param {IParams} [extraParams={}] 不走工作流操作视图时使用
     * @returns {*}  {Promise<void>}
     */
    wfSubmit(args?: IDataAbilityParams): Promise<void>;
    /**
     * 工作流启动(调用前先确保调用保存)
     *
     * @author lxm
     * @date 2022-10-08 18:10:41
     * @param {IParams} [extraParams={}] 不走工作流启动视图时使用
     * @returns {*}  {Promise<void>}
     */
    wfStart(args?: IDataAbilityParams): Promise<void>;
}
//# sourceMappingURL=i-edit-form.controller.d.ts.map