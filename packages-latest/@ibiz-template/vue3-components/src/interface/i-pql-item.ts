export interface IPqlItem {
  /**
   * 类型
   *
   * @author zhanghengfeng
   * @date 2024-07-12 22:07:04
   * @type {('condition' | 'connection')}
   */
  type?: 'condition' | 'connection';

  /**
   * 键
   *
   * @author zhanghengfeng
   * @date 2024-07-12 22:07:12
   * @type {{
   *     value?: string;
   *     label?: string;
   *   }}
   */
  key?: {
    value?: string;
    label?: string;
  };

  /**
   * 操作符
   *
   * @author zhanghengfeng
   * @date 2024-07-12 22:07:24
   * @type {{
   *     value?: string;
   *     label?: string;
   *   }}
   */
  operator?: {
    value?: string;
    label?: string;
  };

  /**
   * 值
   *
   * @author zhanghengfeng
   * @date 2024-07-12 22:07:31
   * @type {{
   *     value?: string;
   *     label?: string;
   *   }}
   */
  value?: {
    value?: string;
    label?: string;
    type?: string;
  };
}
