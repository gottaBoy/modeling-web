import { EditorController } from '@ibiz-template/runtime';
import { ISlider } from '@ibiz/model-core';
/**
 * 滑动输入条编辑器控制器
 *
 * @export
 * @class SliderEditorController
 * @extends {EditorController}
 */
export declare class SliderEditorController extends EditorController<ISlider> {
    protected onInit(): Promise<void>;
}
