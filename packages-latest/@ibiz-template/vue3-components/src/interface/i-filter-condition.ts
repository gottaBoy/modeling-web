import { IEditorController, IEditorProvider } from '@ibiz-template/runtime';
import { IEditor } from '@ibiz/model-core';

export interface IFilterCondition {
  /**
   * 标识
   *
   * @author zhanghengfeng
   * @date 2024-07-25 15:07:07
   * @type {string}
   */
  key: string;

  /**
   * 属性字段
   *
   * @author zhanghengfeng
   * @date 2024-07-25 15:07:18
   * @type {string}
   */
  field: string;

  /**
   * 操作符
   *
   * @author zhanghengfeng
   * @date 2024-07-25 15:07:26
   * @type {string}
   */
  valueOP: string;

  /**
   * 值
   *
   * @author zhanghengfeng
   * @date 2024-07-25 15:07:37
   * @type {unknown}
   */
  value?: unknown;

  /**
   * 编辑器适配器
   *
   * @author zhanghengfeng
   * @date 2024-07-25 15:07:46
   * @type {IEditorProvider}
   */
  editorProvider?: IEditorProvider;

  /**
   * 编辑器
   *
   * @author zhanghengfeng
   * @date 2024-07-25 15:07:58
   * @type {IEditorController<IEditor>}
   */
  editor?: IEditorController<IEditor>;
}
