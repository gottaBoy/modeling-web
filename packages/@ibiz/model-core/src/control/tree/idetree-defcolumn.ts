import { IDETreeColumn } from './idetree-column';

/**
 *
 * @export
 * @interface IDETreeDEFColumn
 */
export interface IDETreeDEFColumn extends IDETreeColumn {
  /**
   * 默认值
   * @type {string}
   * 来源  getDefaultValue
   */
  defaultValue?: string;
}
