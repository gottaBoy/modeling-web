import { FormController, FormDRUIPartController, IFormDetailContainerController, IFormDetailProvider } from '@ibiz-template/runtime';
import { IDEFormDRUIPart } from '@ibiz/model-core';
/**
 * 表单按钮适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class FormDRUIPartProvider
 * @implements {EditorProvider}
 */
export declare class FormDRUIPartProvider implements IFormDetailProvider {
    component: string;
    createController(detailModel: IDEFormDRUIPart, form: FormController, parent: IFormDetailContainerController | undefined): Promise<FormDRUIPartController>;
}
