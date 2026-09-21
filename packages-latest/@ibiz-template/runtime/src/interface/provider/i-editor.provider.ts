import { IEditor } from '@ibiz/model-core';
import { IEditorContainerController, IEditorController } from '../controller';

/**
 * 编辑器适配器的接口
 *
 * @author lxm
 * @date 2022-09-19 19:09:10
 * @export
 * @interface IEditorProvider
 */
export interface IEditorProvider {
  /**
   * 表单编辑器组件
   *
   * @author lxm
   * @date 2022-09-20 10:09:50
   * @type {unknown}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formEditor: any;

  /**
   * 表格编辑器组件
   *
   * @author lxm
   * @date 2022-09-20 10:09:08
   * @type {unknown}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gridEditor: any;

  /**
   * 创建编辑器控制器
   *
   * @author lxm
   * @date 2022-09-20 10:09:57
   * @param {EditorModel} editorModel 编辑器模型
   * @param {unknown} parentController 父控制器
   * @returns {*}  {Promise<T>}
   */
  createController(
    editorModel: IEditor,
    parentController: IEditorContainerController,
  ): Promise<IEditorController>;
}
