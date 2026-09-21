import { EditorController } from '@ibiz-template/runtime';
import { ITextBox } from '@ibiz/model-core';

/**
 * 颜色选择器控制器
 *
 * @author zzq
 * @date 2323-8-14 19:42:00
 * @export
 * @class ColorPickerEditorController
 * @extends {EditorController}
 */
export class ColorPickerEditorController extends EditorController<ITextBox> {
  /**
   * @description 默认显示颜色
   * @type {string[]}
   * @memberof ColorPickerEditorController
   */
  defaultVal: string[] = [];

  protected async onInit(): Promise<void> {
    await super.onInit();
    const { defaultVal, defaultval } = this.editorParams;
    if (defaultVal) {
      this.defaultVal = JSON.parse(defaultVal);
    }
    if (defaultval) {
      this.defaultVal = JSON.parse(defaultval);
    }
  }
}
