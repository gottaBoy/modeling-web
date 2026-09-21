import { FormController, FormRawItemController, IFormDetailContainerController, IFormDetailProvider } from '@ibiz-template/runtime';
import { IDEFormRawItem } from '@ibiz/model-core';
/**
 * 表单直接内容适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class FormRawItemProvider
 * @implements {EditorProvider}
 */
export declare class FormRawItemProvider implements IFormDetailProvider {
    component: string;
    createController(detailModel: IDEFormRawItem, form: FormController, parent: IFormDetailContainerController | undefined): Promise<FormRawItemController>;
}
