/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty, isNil } from 'ramda';

/**
 * 搜索过滤
 *
 * @export
 * @class SearchFilter
 */
export class SearchFilter {
  /**
   * 上下文
   *
   * @author chitanda
   * @date 2022-08-17 22:08:24
   * @type {IParams}
   */
  readonly context: IContext;

  /**
   * 分页
   *
   * @type {number}
   * @memberof SearchFilter
   */
  readonly page = 0;

  /**
   * 分页数据量
   *
   * @type {number}
   * @memberof SearchFilter
   */
  readonly size = 1000;

  /**
   * 快速搜索值
   *
   * @type {string}
   * @memberof SearchFilter
   */
  readonly query!: string;

  /**
   * 数据
   *
   * @author chitanda
   * @date 2022-08-17 22:08:00
   * @type {IData}
   */
  readonly data: IData = {};

  /**
   * 排序属性
   *
   * @type {string}
   * @memberof SearchFilter
   */
  readonly sortField = 'srfordervalue';

  /**
   * 排序模式
   *
   * @type {('ASC' | 'DESC')}
   * @memberof SearchFilter
   */
  readonly sortMode: 'ASC' | 'DESC' = 'ASC';

  /**
   * 默认条件
   *
   * @author tony001
   * @date 2024-09-05 17:09:06
   * @type {IData}
   */
  readonly srfDefaultCond: IData = {};

  /**
   * Creates an instance of SearchFilter.
   *
   * @param {*} context
   * @param {*} [data]
   * @memberof SearchFilter
   */
  constructor(context: IContext, data?: IData) {
    this.context = context;
    if (data) {
      if (!isNil(data.page) && !isEmpty(data.page)) {
        this.page = data.page;
      }
      if (!isNil(data.size) && !isEmpty(data.size)) {
        this.size = data.size;
      }
      if (!isNil(data.query) && !isEmpty(data.query)) {
        this.query = data.query;
      }
      if (!isNil(data.sort) && !isEmpty(data.sort)) {
        const arr = (data.sort as any).split(',');
        if (arr.length >= 1) {
          [this.sortField] = arr;
        }
        if (arr.length >= 2) {
          this.sortMode = arr[1].toUpperCase();
        }
      }
      if (!isNil(data.srfdefaultcond) && !isEmpty(data.srfdefaultcond)) {
        this.srfDefaultCond = data.srfdefaultcond;
      }
      this.data = { ...data };
      delete this.data.page;
      delete this.data.size;
      delete this.data.query;
      delete this.data.sort;
      delete this.data.srfdefaultcond;
    }
  }

  /**
   * 获取条件值
   *
   * @author chitanda
   * @date 2022-08-17 22:08:11
   * @param {string} key
   * @return {*}  {unknown}
   */
  getValue(key: string): unknown {
    if (this.data[key]) {
      return this.data[key];
    }
    return this.context[key];
  }
}
