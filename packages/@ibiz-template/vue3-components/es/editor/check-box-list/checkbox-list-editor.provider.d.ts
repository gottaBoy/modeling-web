import { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
import { ICheckBoxList } from '@ibiz/model-core';
import { CheckBoxListEditorController } from './checkbox-list-editor.controller';
/**
 * 多选框列表编辑器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class CheckBoxListEditorProvider
 * @implements {EditorProvider}
 */
export declare class CheckBoxListEditorProvider implements IEditorProvider {
    formEditor: string;
    gridEditor: string;
    createController(editorModel: ICheckBoxList, parentController: IEditorContainerController): Promise<CheckBoxListEditorController>;
}
