import { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
import { IArray } from '@ibiz/model-core';
import { ArrayEditorController } from './array-editor.controller';
/**
 * 数组编辑器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class ArrayEditorProvider
 * @implements {EditorProvider}
 */
export declare class ArrayEditorProvider implements IEditorProvider {
    formEditor: string;
    gridEditor: string;
    createController(editorModel: IArray, parentController: IEditorContainerController): Promise<ArrayEditorController>;
}
