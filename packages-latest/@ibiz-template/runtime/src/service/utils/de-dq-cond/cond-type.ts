/* eslint-disable no-shadow */
/**
 * 逻辑类型
 *
 * @export
 * @enum {number}
 */
export const enum CondType {
  /**
   * 等于操作
   */
  CONDOP_EQ = 'EQ',

  /**
   * 绝对等于（保留）
   */
  CONDOP_ABSEQ = 'ABSEQ',

  /**
   * 大于操作
   */
  CONDOP_GT = 'GT',

  /**
   * 大于等于操作
   */
  CONDOP_GTANDEQ = 'GTANDEQ',

  /**
   * 小于操作
   */
  CONDOP_LT = 'LT',

  /**
   * 小于等于操作
   */
  CONDOP_LTANDEQ = 'LTANDEQ',

  /**
   * 不等于操作
   */
  CONDOP_NOTEQ = 'NOTEQ',

  /**
   * 为空判断操作
   */
  CONDOP_ISNULL = 'ISNULL',

  /**
   * 不为空判断操作
   */
  CONDOP_ISNOTNULL = 'ISNOTNULL',

  /**
   * 文本包含
   */
  CONDOP_USERLIKE = 'USERLIKE',

  /**
   * 文本包含
   */
  CONDOP_LIKE = 'LIKE',

  /**
   * 文本左包含
   */
  CONDOP_LEFTLIKE = 'LEFTLIKE',

  /**
   * 文本右包含
   */
  CONDOP_RIGHTLIKE = 'RIGHTLIKE',

  /**
   * 空判断
   */
  CONDOP_TESTNULL = 'TESTNULL',

  /**
   * 值包含在给定的范围中
   */
  CONDOP_IN = 'IN',

  /**
   * 值不包含在给定的范围中
   */
  CONDOP_NOTIN = 'NOTIN',

  /**
   * 指定数据的子数据
   */
  CONDOP_CHILDOF = 'CHILDOF',

  /**
   * 指定数据的父数据
   */
  CONDOP_PARENTOF = 'PARENTOF',

  /**
   * 组逻辑操作，或处理
   */
  CONDOP_OR = 'OR',

  /**
   * 组逻辑操作，与处理
   */
  CONDOP_AND = 'AND',

  /**
   * 组逻辑操作，位与处理
   */
  CONDOP_BITAND = 'BITAND',
}
