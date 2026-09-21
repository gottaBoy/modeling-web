import { EditorController } from '@ibiz-template/runtime';
import { ISlider } from '@ibiz/model-core';

/**
 * 滑动输入条编辑器控制器
 *
 * @export
 * @class SliderEditorController
 * @extends {EditorController}
 */
export class SliderEditorController extends EditorController<ISlider> {
  protected async onInit(): Promise<void> {
    super.onInit();
    if (this.model.precision) {
      ibiz.log.warn('滑动输入条不支持配置精度');
    }
  }
}
