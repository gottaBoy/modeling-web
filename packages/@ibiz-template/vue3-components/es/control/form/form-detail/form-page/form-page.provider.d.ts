import { FormController, FormPageController, IFormDetailProvider } from '@ibiz-template/runtime';
import { IDEFormPage } from '@ibiz/model-core';
/**
 * 表单分页部件适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class FormPageProvider
 * @implements {EditorProvider}
 */
export declare class FormPageProvider implements IFormDetailProvider {
    component: string;
    createController(detailModel: IDEFormPage, form: FormController, _parent: undefined): Promise<FormPageController>;
}
