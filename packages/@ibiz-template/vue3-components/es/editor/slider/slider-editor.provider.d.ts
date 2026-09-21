import { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
import { ISlider } from '@ibiz/model-core';
import { SliderEditorController } from './slider-editor.controller';
/**
 * 滑动输入条编辑器适配器
 *
 * @export
 * @class SliderEditorProvider
 * @implements {EditorProvider}
 */
export declare class SliderEditorProvider implements IEditorProvider {
    formEditor: string;
    gridEditor: string;
    createController(editorModel: ISlider, parentController: IEditorContainerController): Promise<SliderEditorController>;
}
