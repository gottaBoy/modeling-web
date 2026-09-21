export interface IPqlNode {
  /**
   * 类型
   *
   * @author zhanghengfeng
   * @date 2024-07-12 22:07:25
   * @type {('pql-field'
   *     | 'pql-field-operator'
   *     | 'pql-field-value'
   *     | 'pql-field-connection')}
   */
  type?:
    | 'pql-field'
    | 'pql-field-operator'
    | 'pql-field-value'
    | 'pql-field-connection';

  /**
   * 标签
   *
   * @author zhanghengfeng
   * @date 2024-07-12 22:07:36
   * @type {string}
   */
  label?: string;

  /**
   * 值
   *
   * @author zhanghengfeng
   * @date 2024-07-12 22:07:47
   * @type {string}
   */
  value?: string;

  /**
   * 文本
   *
   * @author zhanghengfeng
   * @date 2024-07-12 22:07:54
   * @type {string}
   */
  text?: string;
}
