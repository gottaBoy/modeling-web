import type { IFileUploader } from '@ibiz/model-core';
import type { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
import { FileToBase64Controller } from './controller';

export const COMPONENT_NAME = 'AIBizFileToBase64';
export const PROVIDER_KEY = 'EDITOR_CUSTOMSTYLE_FILE_TO_BASE64';

export class FileToBase64Provider implements IEditorProvider {
  public formEditor = COMPONENT_NAME;
  public gridEditor = COMPONENT_NAME;

  public async createController(
    model: IFileUploader,
    parent: IEditorContainerController,
  ): Promise<FileToBase64Controller> {
    const controller = new FileToBase64Controller(model, parent);
    await controller.init();
    return controller;
  }
}
