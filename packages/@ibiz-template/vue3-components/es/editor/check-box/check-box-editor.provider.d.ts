import { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
import { ICheckBox } from '@ibiz/model-core';
import { CheckBoxEditorController } from './check-box-editor.controller';
/**
 * 选项框编辑器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class CheckBoxEditorProvider
 * @implements {EditorProvider}
 */
export declare class CheckBoxEditorProvider implements IEditorProvider {
    formEditor: string;
    gridEditor: string;
    createController(editorModel: ICheckBox, parentController: IEditorContainerController): Promise<CheckBoxEditorController>;
}
