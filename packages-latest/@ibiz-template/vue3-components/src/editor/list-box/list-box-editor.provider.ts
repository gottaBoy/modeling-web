/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { IListBox, IListBoxPicker } from '@ibiz/model-core';
import { ListBoxEditorController } from './list-box-editor.controller';
import { ListBoxPickerEditorController } from './list-box-picker-editor.controller';

/**
 * 列表框编辑器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class ListBoxEditorProvider
 * @implements {EditorProvider}
 */
export class ListBoxEditorProvider implements IEditorProvider {
  formEditor: string = 'IBizListBox';

  gridEditor: string = 'IBizListBox';

  async createController(
    editorModel: IListBox | IListBoxPicker,
    parentController: IEditorContainerController,
  ): Promise<ListBoxEditorController | ListBoxPickerEditorController> {
    let c;
    if (editorModel.editorType === 'LISTBOXPICKUP') {
      c = new ListBoxPickerEditorController(
        editorModel as IListBoxPicker,
        parentController,
      );
    } else {
      c = new ListBoxEditorController(
        editorModel as IListBox,
        parentController,
      );
    }
    await c.init();
    return c;
  }
}
