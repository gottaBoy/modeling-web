import { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
import { ISlider } from '@ibiz/model-core';
import { PercentPondController } from './percent-pond.controller';

export declare class PercentPondProvider implements IEditorProvider {
    formEditor: string;
    gridEditor: string;
    createController(editorModel: ISlider, parentController: IEditorContainerController): Promise<PercentPondController>;
}
