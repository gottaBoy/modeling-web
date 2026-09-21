import { IPqlNode } from './i-pql-node';

export interface IPqlNodeItem {
  /**
   * 类型
   *
   * @author zhanghengfeng
   * @date 2024-07-30 19:07:38
   * @type {('connection' | 'condition')}
   */
  type?: 'connection' | 'condition';

  /**
   * 属性
   *
   * @author zhanghengfeng
   * @date 2024-07-30 19:07:50
   * @type {IPqlNode}
   */
  key?: IPqlNode;

  /**
   * 操作符
   *
   * @author zhanghengfeng
   * @date 2024-07-30 19:07:59
   * @type {IPqlNode}
   */
  operator?: IPqlNode;

  /**
   * 值
   *
   * @author zhanghengfeng
   * @date 2024-07-30 19:07:08
   * @type {IPqlNode[]}
   */
  value?: IPqlNode[];
}
