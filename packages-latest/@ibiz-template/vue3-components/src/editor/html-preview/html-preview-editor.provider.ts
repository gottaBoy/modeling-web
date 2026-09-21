/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { IHtml } from '@ibiz/model-core';
import { HtmlPreviewEditorController } from './html-preview-editor.controller';

/**
 * @description 预览html框编辑器适配器
 * @export
 * @class HtmlPreviewEditorProvider
 * @implements {IEditorProvider}
 */
export class HtmlPreviewEditorProvider implements IEditorProvider {
  formEditor: string = 'IBizHtmlPreview';

  gridEditor: string = 'IBizHtmlPreview';

  async createController(
    editorModel: IHtml,
    parentController: IEditorContainerController,
  ): Promise<HtmlPreviewEditorController> {
    const c = new HtmlPreviewEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}
