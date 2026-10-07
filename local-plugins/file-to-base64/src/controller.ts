import { EditorController } from '@ibiz-template/runtime';
import type { IFileUploader } from '@ibiz/model-core';
import { resolveFileConfig, type FileConfig } from './file-logic';

export class FileToBase64Controller extends EditorController<IFileUploader> {
  public config: FileConfig = resolveFileConfig();

  protected async onInit(): Promise<void> {
    await super.onInit();
    this.config = resolveFileConfig(this.model, this.editorParams);
  }
}
