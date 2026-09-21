/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { IRating } from '@ibiz/model-core';
import { RateEditorController } from './rate-editor.controller';

/**
 * 评分器编辑器适配器
 *
 * @export
 * @class RateEditorProvider
 * @implements {EditorProvider}
 */
export class RateEditorProvider implements IEditorProvider {
  formEditor: string = 'IBizRate';

  gridEditor: string = 'IBizRate';

  async createController(
    editorModel: IRating,
    parentController: IEditorContainerController,
  ): Promise<RateEditorController> {
    const c = new RateEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}
