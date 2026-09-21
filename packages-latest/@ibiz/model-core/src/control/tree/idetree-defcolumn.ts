import { IDETreeColumn } from './idetree-column';

/**
 *
 * 实体树表格属性列模型对象接口
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
