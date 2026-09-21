/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
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
export class ColorPickerEditorProvider implements IEditorProvider {
  formEditor: string = 'IBizColorPicker';

  gridEditor: string = 'IBizColorPicker';

  async createController(
    editorModel: ITextBox,
    parentController: IEditorContainerController,
  ): Promise<ColorPickerEditorController> {
    const c = new ColorPickerEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}
