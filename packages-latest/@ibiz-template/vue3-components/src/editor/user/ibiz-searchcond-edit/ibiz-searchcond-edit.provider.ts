/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { IPicker } from '@ibiz/model-core';
import { SearchCondEditEditorController } from './ibiz-searchcond-edit.controller';

/**
 * 搜索过滤项编辑器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class SearchCondEditEditorProvider
 * @implements {EditorProvider}
 */
export class SearchCondEditEditorProvider implements IEditorProvider {
  formEditor: string = 'IBizSearchCondEdit';

  gridEditor: string = 'IBizSearchCondEdit';

  async createController(
    editorModel: IPicker,
    parentController: IEditorContainerController,
  ): Promise<SearchCondEditEditorController> {
    const c = new SearchCondEditEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}
