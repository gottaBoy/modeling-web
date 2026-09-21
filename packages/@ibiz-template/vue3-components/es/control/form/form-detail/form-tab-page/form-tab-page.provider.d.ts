import { FormController, FormTabPageController, IFormDetailContainerController, IFormDetailProvider } from '@ibiz-template/runtime';
import { IDEFormTabPage } from '@ibiz/model-core';
/**
 * 表单分页部件分页适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class FormTabPageProvider
 * @implements {EditorProvider}
 */
export declare class FormTabPageProvider implements IFormDetailProvider {
    component: string;
    createController(detailModel: IDEFormTabPage, form: FormController, parent: IFormDetailContainerController | undefined): Promise<FormTabPageController>;
}
