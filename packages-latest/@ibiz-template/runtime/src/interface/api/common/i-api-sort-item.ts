/**
 * @description 排序项
 * @export
 * @interface IApiSortItem
 */
export interface IApiSortItem {
  /**
   * @description 唯一标识
   * @type {string}
   * @memberof IApiSortItem
   */
  key: string;

  /**
   * @description 显示标题
   * @type {string}
   * @memberof IApiSortItem
   */
  caption: string;

  /**
   * @description 排序顺序
   * @type {('asc' | 'desc')}
   * @memberof IApiSortItem
   */
  order?: 'asc' | 'desc';
}
