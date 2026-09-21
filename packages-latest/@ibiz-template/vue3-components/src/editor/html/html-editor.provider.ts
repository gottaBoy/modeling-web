/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { IHtml } from '@ibiz/model-core';
import { HtmlEditorController } from './html-editor.controller';

/**
 * html框编辑器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class HtmlEditorProvider
 * @implements {EditorProvider}
 */
export class HtmlEditorProvider implements IEditorProvider {
  formEditor: string = 'IBizHtml';

  gridEditor: string = 'IBizHtml';

  async createController(
    editorModel: IHtml,
    parentController: IEditorContainerController,
  ): Promise<HtmlEditorController> {
    const c = new HtmlEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}
