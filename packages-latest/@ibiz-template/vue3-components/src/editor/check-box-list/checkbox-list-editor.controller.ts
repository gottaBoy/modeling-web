import { CodeListEditorController } from '@ibiz-template/runtime';
import { IAppCodeList, ICheckBoxList } from '@ibiz/model-core';

/**
 * 选项框列表编辑器控制器
 * @return {*}
 * @author: zhujiamin
 * @Date: 2022-08-25 10:57:58
 */
export class CheckBoxListEditorController extends CodeListEditorController<ICheckBoxList> {
  /**
   * 代码表模型
   * @return {*}
   * @author: zhujiamin
   * @Date: 2023-05-24 10:55:50
   */
  codeList: IAppCodeList | undefined = undefined;

  /**
   * 多选一行展示几个
   * @author fangZhiHao
   * @date 2024-07-17 10:07:40
   * @type {(number | undefined)}
   */
  rowNumber: number | undefined = undefined;

  /**
   * @description 自动选中第一个
   * @memberof CheckBoxListEditorController
   */
  public autoSelectFirstOption = false;

  protected async onInit(): Promise<void> {
    super.onInit();
    if (this.model.appCodeListId) {
      const app = await ibiz.hub.getApp(this.context.srfappid);
      this.codeList = app.codeList.getCodeList(this.model.appCodeListId);
    }
    if (this.editorParams?.rowNumber) {
      this.rowNumber = Number(this.editorParams.rowNumber);
    }
    if (this.editorParams?.rownumber) {
      this.rowNumber = Number(this.editorParams.rownumber);
    }
    if (this.editorParams?.autoselectfirstoption) {
      this.autoSelectFirstOption = this.toBoolean(
        this.editorParams.autoselectfirstoption,
      );
    }
  }
}
