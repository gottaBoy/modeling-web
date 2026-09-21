import { IEditorContainerController, IEditorProvider } from '@ibiz-template/runtime';
import { IRadioButtonList } from '@ibiz/model-core';
import { ScreenRadioListEditorController } from './screen-radio-list.controller';

/**
 * 单选框列表编辑器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class RadioButtonListEditorProvider
 * @implements {EditorProvider}
 */
export declare class ScreenRadioButtonListEditorProvider implements IEditorProvider {
    formEditor: string;
    gridEditor: string;
    createController(editorModel: IRadioButtonList, parentController: IEditorContainerController): Promise<ScreenRadioListEditorController>;
}
