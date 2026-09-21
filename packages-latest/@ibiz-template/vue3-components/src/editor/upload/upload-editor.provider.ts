/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { IFileUploader } from '@ibiz/model-core';
import { UploadEditorController } from './upload-editor.controller';

/**
 * 文件上传编辑器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class FileUploaderEditorProvider
 * @implements {EditorProvider}
 */
export class FileUploaderEditorProvider implements IEditorProvider {
  formEditor: string = 'IBizFileUpload';

  gridEditor: string = 'IBizFileUpload';

  constructor(editorType: string) {
    let componentName = 'IBizFileUpload';
    switch (editorType) {
      case 'PICTURE':
      case 'PICTURE_ONE':
      case 'MOBPICTURE':
      case 'MOBPICTURELIST':
        componentName = 'IBizImageUpload';
        break;
      case 'PICTURE_CROPPING':
        componentName = 'IBizImageCropping';
        break;
      case 'PICTURE_ONE_RAW':
      case 'MOBPICTURE_RAW':
        componentName = 'IBizImagePreview';
        break;
      default:
    }
    this.formEditor = componentName;
    this.gridEditor = componentName;
  }

  async createController(
    editorModel: IFileUploader,
    parentController: IEditorContainerController,
  ): Promise<UploadEditorController> {
    const c = new UploadEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}
