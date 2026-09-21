import { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
import { IEditor } from '@ibiz/model-core';
import { PresetRawitemEditorController } from './preset-rawitem.controller';
/**
 * 预置直接内容编辑器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class PresetRawitemEditorProvider
 * @implements {EditorProvider}
 */
export declare class PresetRawitemEditorProvider implements IEditorProvider {
    formEditor: string;
    gridEditor: string;
    createController(editorModel: IEditor, parentController: IEditorContainerController): Promise<PresetRawitemEditorController>;
}
