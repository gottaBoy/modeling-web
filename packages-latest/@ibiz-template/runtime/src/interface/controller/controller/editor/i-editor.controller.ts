import { IEditor } from '@ibiz/model-core';
import { IEditorContainerController } from './i-editor-container.controller';

/**
 * 编辑器控制器
 * @author lxm
 * @date 2023-05-04 01:57:44
 * @export
 * @interface IEditorController
 */
export interface IEditorController<T extends IEditor = IEditor> {
  /**
   * 编辑器模型
   *
   * @author lxm
   * @date 2022-08-24 20:08:12
   * @type {T}
   */
  readonly model: T;

  /**
   * 编辑器样式
   *
   * @author chitanda
   * @date 2023-09-12 16:09:27
   * @type {IData}
   */
  readonly style: IData;

  /**
   * 上下文
   *
   * @author lxm
   * @date 2022-08-24 20:08:55
   * @type {IContext}
   */
  readonly context: IContext;

  /**
   * 视图参数
   *
   * @author lxm
   * @date 2022-08-24 20:08:52
   * @type {IParams}
   */
  readonly params: IParams;

  /**
   * 父控制器，可以使表单项控制器，也可以是表格编辑项控制器
   *
   * @author lxm
   * @date 2022-08-24 20:08:52
   */
  readonly parent: IEditorContainerController;

  /**
   * 初始化方法
   * @author lxm
   * @date 2022-08-18 22:08:30
   * @returns {*}  {Promise<void>}
   */
  init(): Promise<void>;
}
