import { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
import { ISlider } from '@ibiz/model-core';
import { WaterLevelPondController } from './water-level-pond.controller';

/**
 * 水位图适配器
 *
 * @export
 * @class WaterLevelPondProvider
 * @implements {EditorProvider}
 */
export declare class WaterLevelPondProvider implements IEditorProvider {
    formEditor: string;
    gridEditor: string;
    createController(editorModel: ISlider, parentController: IEditorContainerController): Promise<WaterLevelPondController>;
}
