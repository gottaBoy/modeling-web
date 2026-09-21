import { ISpan } from '@ibiz/model-core';
import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { SpanEditorController } from './span-editor.controller';

/**
 * 标签编辑器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class SpanEditorProvider
 * @implements {EditorProvider}
 */
export class SpanEditorProvider implements IEditorProvider {
  formEditor: string = 'IBizSpan';

  gridEditor: string = 'IBizSpan';

  constructor(editorType?: string) {
    if (editorType === 'SPAN_LINK') {
      this.formEditor = 'IBizSpanLink';
      this.gridEditor = 'IBizSpanLink';
    }
  }

  async createController(
    editorModel: ISpan,
    parentController: IEditorContainerController,
  ): Promise<SpanEditorController> {
    const c = new SpanEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}
