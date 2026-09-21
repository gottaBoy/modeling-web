import { ValueOP } from '@ibiz-template/runtime';

export interface ISchemaField {
  /**
   * 属性标识
   *
   * @author zhanghengfeng
   * @date 2024-07-19 12:07:21
   * @type {string}
   */
  appDEFieldId: string;

  /**
   * 标题
   *
   * @author zhanghengfeng
   * @date 2024-07-19 12:07:31
   * @type {string}
   */
  caption: string;

  /**
   * 预置操作符
   *
   * @author zhanghengfeng
   * @date 2024-07-19 12:07:58
   * @type {ValueOP[]}
   */
  valueOPs: ValueOP[];

  /**
   * 代码表标识
   *
   * @author zhanghengfeng
   * @date 2024-07-19 12:07:46
   * @type {string}
   */
  appCodeListId?: string;

  /**
   * 应用实体标识
   *
   * @author zhanghengfeng
   * @date 2024-07-19 12:07:10
   * @type {string}
   */
  appDataEntityId?: string;

  /**
   * 应用实体完全标识
   *
   * @author zhanghengfeng
   * @date 2024-07-19 12:07:22
   * @type {string}
   */
  appDataEntityFullTag?: string;
}
