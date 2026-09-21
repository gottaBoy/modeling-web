import { IDEForm } from '@ibiz/model-core';
import { IFormEvent } from '../../event';
import { IFormState } from '../../state';
import { IControlController } from './i-control.controller';
/**
 * 表单控制器
 * @author lxm
 * @date 2023-05-04 03:00:27
 * @export
 * @interface IFormController
 * @extends {IControlController}
 */
export interface IFormController<T extends IDEForm = IDEForm, S extends IFormState = IFormState, E extends IFormEvent = IFormEvent> extends IControlController<T, S, E> {
    /**
     * 获取表单数据
     * @author lxm
     * @date 2023-05-15 12:14:33
     * @return {*}  {IData[]}
     */
    getData(): IData[];
    /**
     * 表单值规则校验
     * @author zzq
     * @date 2023-08-23 16:38:33
     * @return {*}  {Promise<boolean>}
     */
    validate(): Promise<boolean>;
    /**
     * 静默校验
     * - 只校验无提示信息
     * @return {*}  {Promise<boolean>}
     * @memberof IFormController
     */
    silentValidate(): Promise<boolean>;
    /**
     * 刷新
     *
     * @return {*}  {Promise<void>}
     * @memberof IFormController
     */
    refresh(): Promise<void>;
    /**
     * @description 切换折叠
     * @param {IData} [params]
     * @memberof IFormController
     */
    changeCollapse(params?: IData): void;
    /**
     * 设置表单激活分页
     *
     * @param {string} name
     * @memberof IFormController
     */
    setActiveTab(name: string): void;
}
//# sourceMappingURL=i-form.controller.d.ts.map