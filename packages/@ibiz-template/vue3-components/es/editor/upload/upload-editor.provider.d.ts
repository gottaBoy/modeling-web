import { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
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
export declare class FileUploaderEditorProvider implements IEditorProvider {
    formEditor: string;
    gridEditor: string;
    constructor(editorType: string);
    createController(editorModel: IFileUploader, parentController: IEditorContainerController): Promise<UploadEditorController>;
}
