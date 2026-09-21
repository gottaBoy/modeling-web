/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { IEditor } from '@ibiz/model-core';
import { PresetRawitemEditorController } from './preset-rawitem.controller';

/**
 * 预置直接内容编辑器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class PresetRawitemEditorProvider
 * @implements {EditorProvider}
 */
export class PresetRawitemEditorProvider implements IEditorProvider {
  formEditor: string = 'IBizPresetRawitem';

  gridEditor: string = 'IBizPresetRawitem';

  async createController(
    editorModel: IEditor,
    parentController: IEditorContainerController,
  ): Promise<PresetRawitemEditorController> {
    const c = new PresetRawitemEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}
