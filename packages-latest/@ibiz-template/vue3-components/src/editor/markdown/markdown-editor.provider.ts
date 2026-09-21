/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { IMarkdown } from '@ibiz/model-core';
import { MarkDownEditorController } from './markdown-editor.controller';

/**
 * 代码框编辑器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class MarkDownEditorProvider
 * @implements {EditorProvider}
 */
export class MarkDownEditorProvider implements IEditorProvider {
  formEditor: string = 'IBizMarkDown';

  gridEditor: string = 'IBizMarkDown';

  async createController(
    editorModel: IMarkdown,
    parentController: IEditorContainerController,
  ): Promise<MarkDownEditorController> {
    const c = new MarkDownEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}
