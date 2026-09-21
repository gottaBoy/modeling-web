/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { ITextBox } from '@ibiz/model-core';
import { EmbedAIChatEditorController } from './embed-ai-chat-editor.controller';

/**
 * @description 嵌入式AI聊天框适配器
 * @author tony001
 * @date 2026-05-15 11:05:11
 * @export
 * @class EmbedAIChatEditorProvider
 * @implements {IEditorProvider}
 */
export class EmbedAIChatEditorProvider implements IEditorProvider {
  formEditor: string = 'IBizEmbedAIChat';

  gridEditor: string = 'IBizEmbedAIChat';

  async createController(
    editorModel: ITextBox,
    parentController: IEditorContainerController,
  ): Promise<EmbedAIChatEditorController> {
    const c = new EmbedAIChatEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}
