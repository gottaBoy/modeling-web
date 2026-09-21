/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { ICascader } from '@ibiz/model-core';
import { CascaderEditorController } from './cascader-editor.controller';

/**
 * 级联选择器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class CascaderEditorProvider
 * @implements {EditorProvider}
 */
export class CascaderEditorProvider implements IEditorProvider {
  formEditor: string = 'IBizCascader';

  gridEditor: string = 'IBizCascader';

  async createController(
    editorModel: ICascader,
    parentController: IEditorContainerController,
  ): Promise<CascaderEditorController> {
    const c = new CascaderEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}
