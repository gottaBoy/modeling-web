import { FormController, IFormDetailProvider, FormButtonListController, IFormDetailContainerController } from '@ibiz-template/runtime';
import { IDEFormButtonList } from '@ibiz/model-core';
/**
 * 表单按钮组适配器
 *
 * @export
 * @class FormButtonListProvider
 * @implements {IFormDetailProvider}
 */
export declare class FormButtonListProvider implements IFormDetailProvider {
    component: string;
    createController(detailModel: IDEFormButtonList, form: FormController, parent: IFormDetailContainerController | undefined): Promise<FormButtonListController>;
}
