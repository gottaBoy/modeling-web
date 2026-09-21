export interface IField {
  /**
   *  类型
   *
   * @author zhanghengfeng
   * @date 2024-07-25 15:07:54
   * @type {string}
   */
  type?: string;

  /**
   * 原始类型
   *
   * @author zhanghengfeng
   * @date 2024-07-25 15:07:40
   * @type {string}
   */
  originalType?: string;

  /**
   * 属性标识
   *
   * @author zhanghengfeng
   * @date 2024-07-25 15:07:09
   * @type {string}
   */
  appDEFieldId: string;

  /**
   * 属性标题
   *
   * @author zhanghengfeng
   * @date 2024-07-25 15:07:23
   * @type {string}
   */
  caption?: string;

  /**
   * 操作符
   *
   * @author zhanghengfeng
   * @date 2024-07-25 18:07:00
   * @type {{
   *     valueOP: string;
   *     label: string;
   *     sqlOP: string;
   *   }[]}
   */
  valueOPs?: {
    valueOP: string;
    label: string;
    sqlOP: string;
  }[];

  /**
   * 代码表标识
   *
   * @author zhanghengfeng
   * @date 2024-07-25 18:07:19
   * @type {string}
   */
  appCodeListId?: string;

  /**
   * 应用实体标识
   *
   * @author zhanghengfeng
   * @date 2024-07-25 18:07:18
   * @type {string}
   */
  appDataEntityId?: string;
}
