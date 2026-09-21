/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { IRadioButtonList } from '@ibiz/model-core';
import { RadioButtonListEditorController } from './radio-button-list.controller';

/**
 * 单选框列表编辑器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class RadioButtonListEditorProvider
 * @implements {EditorProvider}
 */
export class RadioButtonListEditorProvider implements IEditorProvider {
  formEditor: string = 'IBizRadio';

  gridEditor: string = 'IBizRadio';

  async createController(
    editorModel: IRadioButtonList,
    parentController: IEditorContainerController,
  ): Promise<RadioButtonListEditorController> {
    const c = new RadioButtonListEditorController(
      editorModel,
      parentController,
    );
    await c.init();
    return c;
  }
}
