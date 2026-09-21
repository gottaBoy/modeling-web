/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEditorProvider,
  IEditorContainerController,
} from '@ibiz-template/runtime';
import { ICheckBox } from '@ibiz/model-core';
import { SwitchEditorController } from './switch-editor.controller';

/**
 * 开关编辑器适配器
 *
 * @export
 * @class SwitchEditorProvider
 * @implements {EditorProvider}
 */
export class SwitchEditorProvider implements IEditorProvider {
  formEditor: string = 'IBizSwitch';

  gridEditor: string = 'IBizSwitch';

  constructor(editorStyle?: string) {
    if (editorStyle === 'TRISTATE') {
      this.formEditor = 'IBizSwitchTriState';
      this.gridEditor = 'IBizSwitchTriState';
    }
  }

  async createController(
    editorModel: ICheckBox,
    parentController: IEditorContainerController,
  ): Promise<SwitchEditorController> {
    const c = new SwitchEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}
