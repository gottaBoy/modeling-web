import { FormController, FormItemController, IFormDetailContainerController, IFormDetailProvider } from '@ibiz-template/runtime';
import { IDEFormDetail } from '@ibiz/model-core';
/**
 * 表单项适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class FormItemProvider
 * @implements {EditorProvider}
 */
export declare class FormItemProvider implements IFormDetailProvider {
    component: string;
    createController(detailModel: IDEFormDetail, form: FormController, parent: IFormDetailContainerController | undefined): Promise<FormItemController>;
}
