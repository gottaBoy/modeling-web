import { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
import { ITextBox } from '@ibiz/model-core';
import { ColorPickerEditorController } from './color-picker-editor.controller';
/**
 * 颜色选择器适配器
 *
 * @author zzq
 * @date 2323-8-14 19:42:00
 * @export
 * @class ColorPickerEditorProvider
 * @implements {EditorProvider}
 */
export declare class ColorPickerEditorProvider implements IEditorProvider {
    formEditor: string;
    gridEditor: string;
    createController(editorModel: ITextBox, parentController: IEditorContainerController): Promise<ColorPickerEditorController>;
}
