/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
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
export class CheckBoxEditorProvider implements IEditorProvider {
  formEditor: string = 'IBizCheckbox';

  gridEditor: string = 'IBizCheckbox';

  async createController(
    editorModel: ICheckBox,
    parentController: IEditorContainerController,
  ): Promise<CheckBoxEditorController> {
    const c = new CheckBoxEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}
