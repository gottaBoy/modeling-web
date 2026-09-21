import { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
import { IDropDownList } from '@ibiz/model-core';
import { DropDownListEditorController } from './dropdown-list-editor.controller';
/**
 * 多选框列表编辑器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class DropDownListEditorProvider
 * @implements {EditorProvider}
 */
export declare class DropDownListEditorProvider implements IEditorProvider {
    formEditor: string;
    gridEditor: string;
    constructor(editorType?: string);
    createController(editorModel: IDropDownList, parentController: IEditorContainerController): Promise<DropDownListEditorController>;
}
